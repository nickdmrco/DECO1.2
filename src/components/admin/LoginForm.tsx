"use client";

import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Button } from "@/components/site/Button";
import { createClient } from "@/lib/supabase/client";

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[1rem] text-navy " +
  "transition-colors duration-300 placeholder:text-slate/55 focus:border-deep focus:outline-none";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
    });

    if (signInError) {
      setError(signInError.message);
      setBusy(false);
      return;
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-7 space-y-5">
      <div>
        <label htmlFor="email" className="label block text-slate">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={`${field} mt-2.5`}
        />
      </div>
      <div>
        <label htmlFor="password" className="label block text-slate">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={`${field} mt-2.5`}
        />
      </div>

      {error ? (
        <motion.p
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-deep/25 bg-mist px-4 py-3 text-[0.875rem] text-navy"
        >
          {error}
        </motion.p>
      ) : null}

      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
        {busy ? null : <ArrowRight />}
      </Button>
    </form>
  );
}
