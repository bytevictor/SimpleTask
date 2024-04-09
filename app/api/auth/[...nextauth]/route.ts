import { authConfig } from "@/app/_lib/auth/auth"
import NextAuth from "next-auth/next";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };