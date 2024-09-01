import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on form submission

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || ''; // Use environment variable for backend URL
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
        setError("Failed to send reset email. Please try again.");
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setMessage("");
    } finally {
      setLoading(false); // Reset loading state after request is complete
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-gray">
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
            disabled={loading} // Disable button while loading
          >
            {loading ? "Sending..." : "Send Reset Link"} {/* Dynamic button text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
