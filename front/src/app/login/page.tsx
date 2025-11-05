"use client";

import { useState } from "react";
import { signIn, fetchAuthSession } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signIn({ username: email, password });
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (token) localStorage.setItem("cognito_token", token);

      alert("✅ Login successful!");
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Error logging in");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-6 text-center font-semibold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded mt-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}
