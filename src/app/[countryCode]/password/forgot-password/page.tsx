'use client';

import Footer from "@modules/layout/templates/footer";
import { useState, useCallback } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BASE_URL; // Using environment variable
      if (!backendUrl) {
        throw new Error("Backend URL is not defined");
      }

      const response = await fetch(`${backendUrl}/store/customers/password-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("If this email is registered, a password reset link will be sent.");
        setError("");
      } else {
        const errorData = await response.text();
        setError("Failed to send reset email. Please try again.");
        setMessage("");
        console.error("Failed to send reset email:", errorData);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setMessage("");
      console.error("An error occurred during the request:", err);
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-gray">
      <header className="bg-darker-slate-gray text-pastel-pink py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <a href="/account" className="bg-black text-pastel-pink px-4 py-2 rounded hover:bg-pink-600">
            Back
          </a>
          <h1 className="text-2xl font-bold text-center flex-grow">
            DeLisa&apos;s Boujee Botanical Store
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      <div className="flex items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-pastel-pink">Forgot Password</h2>
          {message && <p className="text-green-500 mb-4" aria-live="polite">{message}</p>}
          {error && <p className="text-red-500 mb-4" aria-live="assertive">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-pastel-pink mb-2" htmlFor="email">
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-pastel-pink rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-pastel-pink border border-pastel-pink rounded hover:bg-pink-600"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
