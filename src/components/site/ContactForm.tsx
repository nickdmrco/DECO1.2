"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Button, ArrowRight } from "@/components/site/Button";
import { Mark } from "@/components/brand/Logo";
import { services } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

type Errors = Record<string, string>;

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[1.0625rem] text-navy " +
  "transition-colors duration-300 placeholder:text-slate/55 " +
  "focus:border-deep focus:outline-none focus-visible:outline-none";

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label block text-slate">
        {label}
      </label>
      <div className="mt-2.5">{children}</div>
      <AnimatePresence>
        {error ? (
          <motion.p
            role="alert"
            className="mt-2 text-[0.8125rem] text-deep"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrors({});
    setFormError("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setErrors(result.fieldErrors ?? {});
        setFormError(result.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      form.reset();
      setState("sent");
    } catch {
      setFormError("We couldn't reach the server. Please try again, or email us directly.");
      setState("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-2xl border border-line bg-white p-10 text-center"
          >
            <Mark className="mx-auto w-16" animate="draw" />
            <h2 className="mt-8 text-h2 text-navy">Thank you — it&rsquo;s on its way.</h2>
            <span className="rule-green mx-auto mt-5" aria-hidden="true" />
            <p className="mx-auto mt-6 max-w-md text-body text-slate">
              George reads every one of these himself. Expect a reply within two business
              days.
            </p>
            <Button
              variant="secondary"
              className="mt-8"
              onClick={() => setState("idle")}
              type="button"
            >
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="rounded-2xl border border-line bg-white p-7 sm:p-10"
          >
            {/* Honeypot — hidden from people, irresistible to bots. */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={field}
                  aria-invalid={Boolean(errors.name)}
                />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jane@company.com"
                  className={field}
                  aria-invalid={Boolean(errors.email)}
                />
              </Field>
              <Field id="company" label="Company" error={errors.company}>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company name"
                  className={field}
                />
              </Field>
              <Field id="role" label="Role" error={errors.role}>
                <input
                  id="role"
                  name="role"
                  type="text"
                  autoComplete="organization-title"
                  placeholder="Owner, President, VP Operations…"
                  className={field}
                />
              </Field>
              <Field id="topic" label="What is this about?" error={errors.topic} className="sm:col-span-2">
                <select id="topic" name="topic" className={`${field} appearance-none`} defaultValue="">
                  <option value="">Not sure yet</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                id="message"
                label="What can we help with?"
                error={errors.message}
                className="sm:col-span-2"
              >
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="The question that has been sitting on your desk."
                  className={`${field} resize-y`}
                  aria-invalid={Boolean(errors.message)}
                />
              </Field>
            </div>

            <AnimatePresence>
              {formError ? (
                <motion.p
                  role="alert"
                  className="mt-6 rounded-xl border border-deep/25 bg-mist px-4 py-3 text-[0.9375rem] text-navy"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {formError}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button type="submit" size="lg" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : "Request a consultation"}
                {state === "sending" ? (
                  <motion.span
                    aria-hidden="true"
                    className="h-4 w-4 rounded-full border-2 border-white/35 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <ArrowRight />
                )}
              </Button>
              <p className="text-[0.8125rem] text-slate">
                We reply to every enquiry. No lists, no sequences.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
