"use client";

import { useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"signup" | "confirm">("signup");

  const handleSignup = async () => {
    try {
      await signUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      });
      setStep("confirm");
    } catch (err: any) {
      alert(err.message || "Error signing up");
    }
  };

  const handleConfirm = async () => {
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      alert("✅ Signup confirmed! You can now log in.");
    } catch (err: any) {
      alert(err.message || "Error confirming signup");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-6 text-center font-semibold">Sign Up</h2>

        {step === "signup" && (
          <>
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
              onClick={handleSignup}
              className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded mt-2"
            >
              Sign Up
            </button>
          </>
        )}

        {step === "confirm" && (
          <>
            <p className="text-sm mb-3">
              Enter the verification code sent to your email.
            </p>
            <input
              type="text"
              placeholder="Verification Code"
              className="w-full p-2 mb-3 bg-gray-700 rounded"
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleConfirm}
              className="bg-green-600 hover:bg-green-700 w-full py-2 rounded mt-2"
            >
              Confirm Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}
