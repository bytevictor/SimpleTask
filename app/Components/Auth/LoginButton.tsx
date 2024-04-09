"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function LoginButton() {
  //const session = await getServerSession(authConfig);
  const session = useSession();

  const { email, image } = session?.data?.user || {};

  //if (!email) return null;

  console.log("Session: ", session);

  return (
    <>
      {session?.status == "authenticated" ? (
        <>
          <Image
            className="rounded-full border-2 border-secondary mr-4"
            alt={email!}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={45}
            height={45}
          />
          <button
            onClick={() => {
              signOut();
            }}
            className="btn btn-sm btn-secondary btn-outline"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login">
            <button className=" btn btn-accent btn-outline">Login</button>
          </Link>
        </>
      )}
      <div className="divider divider-horizontal"></div>
    </>
  );
}
