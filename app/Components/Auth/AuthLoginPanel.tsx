"use client";

import Image from "next/image";
import googleLogo from "@/public/google.svg";

import { signIn } from "next-auth/react";

export function AuthLoginPanel() {
  return (
    <div className="w-8/12 mt-52 mockup-browser border bg-base-300">
      <div className="mockup-browser-toolbar">
        <div className="input">https://SimpleTask.com</div>
      </div>
      <div className="w-full flex flex-col items-center justify-center py-12">
        <div className="flex flex-col items-center p-10 ">
          <h1 className="mb-4 text-4xl font-bold">Sign In</h1>
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}

function GoogleSignInButton() {
  function googleLogin() {
    signIn("google");
  }

  return (
    <button
      onClick={googleLogin}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}