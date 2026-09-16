"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { LogoHorizontal } from "@/components/brand/Logo";
import { createClient } from "@/lib/supabase/client";

export function AdminShell({
  email,
  children,
  actions,
}: {
  email: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[76rem] flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div className="flex items-center gap-5">
            <Link href="/admin" aria-label="Admin home">
              <LogoHorizontal size={22} />
            </Link>
            <span className="label hidden text-slate sm:inline">Editor</span>
          </div>
          <div className="flex items-center gap-5">
            {actions}
            <span className="hidden text-[0.8125rem] text-slate md:inline">{email}</span>
            <button
              type="button"
              onClick={signOut}
              className="text-[0.875rem] font-medium text-deep transition-colors hover:text-navy"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="split-bar" aria-hidden="true" />
      </header>
      <main className="mx-auto max-w-[76rem] px-6 py-10 lg:px-8">{children}</main>
    </div>
  );
}
