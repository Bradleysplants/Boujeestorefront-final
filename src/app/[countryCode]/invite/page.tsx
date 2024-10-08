'use client';

import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Head from 'next/head';
import Footer from "@modules/layout/templates/footer";

const InvitePage = () => {
  const searchParams = useSearchParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid or missing token.');
      return;
    }

    if (!firstName || !lastName) {
      setError('First name and last name are required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!backendUrl) {
        throw new Error('Backend URL is not defined');
      }

      const response = await fetch(`${backendUrl}/admin/invites/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          user: {
            first_name: firstName,
            last_name: lastName,
            password,
          },
        }),
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
  }, [firstName, lastName, password, confirmPassword, searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-gray">
      <Head>
        <title>Set Up Your Account - DeLisa&apos;s Boujee Botanicals</title>
        <meta
          name="description"
          content="Set up your account at DeLisa's Boujee Botanicals. Complete the form to secure your new account and start exploring our exclusive plant collection."
        />
      </Head>
      
      <header className="bg-darker-slate-gray text-pastel-pink py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <a href="/account" className="bg-black text-pastel-pink px-4 py-2 rounded hover:bg-pink-600 focus:ring focus:ring-pink-600">
            Back
          </a>
          <h1 className="text-2xl font-bold text-center flex-grow">
            DeLisa&apos;s Boujee Botanical Store
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      <main className="flex items-center justify-center flex-grow">
        <div className="bg-slate-gray p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-pastel-pink">Set Up Your Account</h2>
          {success ? (
            <p className="text-pastel-pink" aria-live="polite">
              Your account has been set up successfully. You can now <a href="https://delisasboujeebotanical.store/app" className="text-pastel-pink underline hover:text-primary-green">log in</a>.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-pastel-pink mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full p-2 border border-pastel-pink rounded focus:ring focus:ring-pastel-pink"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-pastel-pink mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full p-2 border border-pastel-pink rounded focus:ring focus:ring-pastel-pink"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
                  className="w-full p-2 border border-pastel-pink rounded focus:ring focus:ring-pastel-pink"
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
                  className="w-full p-2 border border-pastel-pink rounded focus:ring focus:ring-pastel-pink"
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
                className="w-full py-2 px-4 bg-black text-pastel-pink border border-pastel-pink rounded hover:bg-pink-600 focus:ring focus:ring-pink-600"
                disabled={loading}
                aria-busy={loading}
                aria-live="polite"
              >
                {loading ? 'Setting up...' : 'Set Up Account'}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InvitePage;
