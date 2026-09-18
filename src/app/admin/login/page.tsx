import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";
import { LogoStacked } from "@/components/brand/Logo";
import { supabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <LogoStacked size={30} tone="ink" animate="draw" />
        </div>

        <div className="mt-12 rounded-2xl border border-line-light bg-white p-8">
          <h1 className="text-h3 text-deep">Sign in</h1>
          <span className="rule-green mt-4" aria-hidden="true" />
          {supabaseConfigured ? (
            <Suspense>
              <LoginForm />
            </Suspense>
          ) : (
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-muted">
              Supabase isn&rsquo;t configured yet. Add{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-[0.85em]">
                NEXT_PUBLIC_SUPABASE_URL
              </code>{" "}
              and{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-[0.85em]">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </code>{" "}
              to your environment, then run{" "}
              <code className="rounded bg-white px-1.5 py-0.5 text-[0.85em]">
                supabase/schema.sql
              </code>
              .
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-[0.8125rem] text-ink-muted">
          Accounts are created in the Supabase dashboard. There is no self-signup.
        </p>
      </div>
    </div>
  );
}
