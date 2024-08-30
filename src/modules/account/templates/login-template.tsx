"use client";

import { useFormState } from "react-dom";
import { LOGIN_VIEW } from "@modules/account/components/login-template";
import { logCustomerIn } from "@modules/account/actions";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import Link from "next/link"; // Import Link for navigation

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null);

  return (
    <div 
      className="max-w-sm w-full flex flex-col items-center bg-slate-gray p-6 rounded-lg shadow-lg"
      style={{ paddingLeft: '10%', paddingRight: '10%' }}  
      data-testid="login-page"
    >
      <h1 className="text-3xl text-pastel-pink uppercase mb-6">Welcome back</h1>
      <p className="text-center text-lg text-pastel-pink mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              title="Enter a valid email address."
              autoComplete="email"
              required
              placeholder="Email"
              data-testid="email-input"
              className="bg-black text-pastel-pink border border-pastel-pink p-4 h-14 w-full focus:outline-none focus:bg-black focus:text-pastel-pink focus:border-pastel-pink hover:bg-black hover:text-pastel-pink hover:border-pastel-pink active:bg-black active:text-pastel-pink active:border-pastel-pink visited:bg-black visited:text-pastel-pink transition-all duration-200"
            />
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              data-testid="password-input"
              className="bg-black text-pastel-pink border border-pastel-pink p-4 h-14 w-full focus:outline-none focus:bg-black focus:text-pastel-pink focus:border-pastel-pink hover:bg-black hover:text-pastel-pink hover:border-pastel-pink active:bg-black active:text-pastel-pink active:border-pastel-pink visited:bg-black visited:text-pastel-pink transition-all duration-200"
            />
          </div>
          <div className="text-right">
            <Link href="/password/forgot-password" className="text-pastel-pink hover:text-primary-green underline">
              Forgot Password?
            </Link>
          </div>
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton 
          data-testid="sign-in-button" 
          className="w-full mt-6 bg-black text-pastel-pink border border-pastel-pink hover:bg-darker-slate-gray"
        >
          Sign in
        </SubmitButton>
      </form>
      <span className="text-center text-small-regular mt-6 text-pastel-pink">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline hover:text-primary-green"
          data-testid="register-button"
        >
          Sign up
        </button>
        .
      </span>
    </div>
  );
};

export default Login;
