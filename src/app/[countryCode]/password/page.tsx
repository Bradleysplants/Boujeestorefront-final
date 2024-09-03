'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import Footer from "@modules/layout/templates/footer";

const PasswordResetPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const part1 = searchParams.get('part1') || '';
    const part2 = searchParams.get('part2') || '';
    const part3 = searchParams.get('part3') || '';

    const token = decodeURIComponent(`${part1}${part2}${part3}`);

    if (!token || token.length < 20) {  // Basic check to validate the token
      setError('Invalid or missing token.');
      return;
    }

    if (!email) {
      setError('Email is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      console.log('Making POST request to:', `${process.env.NEXT_PUBLIC_BASE_URL}/store/customers/password-reset`);
      console.log('Payload:', { email, password, token });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/customers/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, token }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(`Error: ${response.status} ${errorText}`);
        return;
      }

      setSuccess(true);
      setError('');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email, password, confirmPassword, searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-gray">
      <Head>
        <title>Reset Password - DeLisa&apos;s Boujee Botanicals</title>
        <meta
          name="description"
          content="Reset the password for your DeLisa's Boujee Botanicals customer account. Enter your new password to regain access."
        />
      </Head>

      <header className="bg-darker-slate-gray text-pastel-pink py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <a href="/account/login" className="bg-black text-pastel-pink px-4 py-2 rounded hover:bg-pink-600">
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
          <h2 className="text-3xl font-bold mb-4 text-pastel-pink">Reset Password</h2>
          {success ? (
            <p className="text-pastel-pink" aria-live="polite">
              Your password has been reset successfully. You can now <a href="/account/login" className="text-pastel-pink underline hover:text-primary-green">log in</a>.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-pastel-pink mb-2" htmlFor="email">
                  Email Address
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
              <div className="mb-4">
                <label className="block text-pastel-pink mb-2" htmlFor="password">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-pastel-pink rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-pastel-pink mb-2" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full p-2 border border-pastel-pink rounded"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 mb-4" aria-live="assertive">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-pastel-pink border border-pastel-pink rounded hover:bg-pink-600"
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PasswordResetPage;
