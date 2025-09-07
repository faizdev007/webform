"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen text-black">
      <div className="bg-white/60 p-10 rounded-2xl shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold mb-6">Login to Access the 25 Anniversary Form 🎉</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg w-full font-medium"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
