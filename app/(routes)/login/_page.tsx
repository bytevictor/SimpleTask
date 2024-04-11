import { getServerSession } from "next-auth";
import { authConfig } from "@/app/_lib/auth/auth";
import { redirect } from "next/navigation";
import { getCsrfToken } from "next-auth/react";
import { AuthLoginPanel } from "@/app/Components/Auth/AuthLoginPanel";

export default async function SignInPage() {
  const session = await getServerSession(authConfig);

  console.log("Session: ", session);

  if (session) return redirect("/");

  return (
    <main className="flex flex-col grow justify-center items-center py-0 p-16 ">
      <AuthLoginPanel />
    </main>
  );
}