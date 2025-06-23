"use client";

import { signIn } from "next-auth/react";
// import { useSearchParams } from "next/navigation";

export default function SignInPage() {
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Sign in</h1>
      <button
        onClick={() => signIn("google", { callbackUrl : "/dashboard" })}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}
