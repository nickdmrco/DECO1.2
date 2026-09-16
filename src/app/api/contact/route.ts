import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { services, site } from "@/lib/site";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  role: z.string().trim().max(160).optional().or(z.literal("")),
  topic: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more — 10 characters minimum.").max(5000),
  /* Honeypot. Real people leave it empty; bots fill everything in. Kept
     permissive here so a filled one never surfaces as a named field error
     — that would tell the bot exactly what tripped it. */
  website: z.string().optional(),
});

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

function emailHtml(data: z.infer<typeof schema>) {
  const topic =
    services.find((s) => s.slug === data.topic)?.title ?? data.topic ?? "Not specified";
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Role", data.role || "—"],
    ["Interested in", topic],
  ];

  return `<!doctype html>
<html><body style="margin:0;background:#F2F8FB;font-family:Arial,Helvetica,sans-serif;color:#10324A">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="max-width:600px;background:#fff;border:1px solid #E2E9EE;border-radius:12px;overflow:hidden">
        <tr><td style="height:4px;background:#1898CD;width:50%"></td><td style="height:4px;background:#6CBF45;width:50%"></td></tr>
        <tr><td colspan="2" style="padding:32px">
          <p style="margin:0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6273">
            New consultation request
          </p>
          <h1 style="margin:12px 0 0;font-size:24px;line-height:1.2;color:#10324A">
            ${escapeHtml(data.name)}${data.company ? ` &middot; ${escapeHtml(data.company)}` : ""}
          </h1>
          <div style="height:3px;width:64px;background:#6CBF45;margin:20px 0 28px"></div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">
            ${rows
              .map(
                ([label, value]) => `<tr>
              <td style="padding:8px 0;color:#4A6273;width:130px;vertical-align:top">${label}</td>
              <td style="padding:8px 0;color:#10324A">${escapeHtml(value)}</td>
            </tr>`,
              )
              .join("")}
          </table>
          <p style="margin:28px 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#4A6273">
            Message
          </p>
          <div style="background:#F2F8FB;border-radius:8px;padding:18px;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(
            data.message,
          )}</div>
          <p style="margin:28px 0 0;font-size:13px;color:#4A6273">
            Sent from ${site.domain} &middot; reply directly to reach ${escapeHtml(data.name)}.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json({ error: "Please check the form.", fieldErrors }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot tripped — accept silently so the bot learns nothing.
  if (data.website) return NextResponse.json({ ok: true });

  /* Durable copy first: an email that fails to send should not lose the lead. */
  const supabase = createAdminClient();
  if (supabase) {
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      role: data.role || null,
      message: data.message,
      source: data.topic || null,
    });
    if (error) console.error("[contact] supabase insert:", error.message);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn("[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL missing — not emailing.");
    /* The submission is stored; don't fail the visitor over our own config. */
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Consultation request — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html: emailHtml(data),
    });
    if (error) {
      console.error("[contact] resend:", error);
      return NextResponse.json({ ok: true, delivered: false });
    }
  } catch (error) {
    console.error("[contact] resend threw:", error);
    return NextResponse.json({ ok: true, delivered: false });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
