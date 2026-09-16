import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostEditor } from "@/components/admin/PostEditor";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  if (!supabaseConfigured) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminShell email={user.email ?? ""}>
      <PostEditor />
    </AdminShell>
  );
}
