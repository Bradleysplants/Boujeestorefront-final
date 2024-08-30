"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import Input from "@modules/common/components/input";
import { LOGIN_VIEW } from "@modules/account/components/login-template";
import { signUp } from "@modules/account/actions";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import PrivacyPolicyModal from "@modules/layout/components/privacy-modal";
import TermsOfUseModal from "@modules/layout/components/terms-modal"; // New import

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(signUp, null);
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false); // State for Terms of Use modal

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const renderInput = (
    label: string,
    name: string,
    type: string = "text",
    autoComplete: string = "",
    required: boolean = false
  ) => {
    return (
      <div className="relative">
        <input
          type={type}
          name={name}
          required={required}
          autoComplete={autoComplete}
          value={inputValues[name as keyof typeof inputValues]}
          onChange={handleInputChange}
          className="bg-white text-slate-gray border border-primary-green p-4 h-14 w-full focus:text-slate-gray focus:outline-none focus:ring-0 transition-all duration-200"
        />
        <label
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-gray pointer-events-none transition-all duration-200 ease-in-out ${
            inputValues[name as keyof typeof inputValues] ? "opacity-0" : "opacity-100"
          }`}
        >
          {label}
        </label>
      </div>
    );
  };

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center bg-slate-gray p-6 rounded-lg shadow-lg"
      data-testid="register-page"
    >
      <h1 className="text-3xl text-pastel-pink uppercase mb-6">
        Become a Member
      </h1>
      <p className="text-center text-lg text-pastel-pink mb-4">
        Create your Member profile, and get access to an enhanced shopping
        experience.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-6">
          {renderInput("First name", "first_name", "text", "given-name", true)}
          {renderInput("Last name", "last_name", "text", "family-name", true)}
          {renderInput("Email", "email", "email", "email", true)}
          {renderInput("Phone", "phone", "tel", "tel")}
          {renderInput("Password", "password", "password", "new-password", true)}
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-small-regular mt-6 text-pastel-pink">
          By creating an account, you agree to Delisa&apos;s Boujee Botanical
          Store{" "}
          <button
            className="underline hover:text-primary-green"
            onClick={() => setShowPrivacyModal(true)}
          >
            Privacy Policy
          </button>{" "}
          and{" "}
          <button
            className="underline hover:text-primary-green"
            onClick={() => setShowTermsModal(true)} // Show Terms of Use modal
          >
            Terms of Use
          </button>
          .
        </span>
        <SubmitButton
          className="w-full mt-6 bg-black text-pastel-pink font-bold border-2 border-pastel-pink hover:bg-pastel-pink hover:text-black"
          data-testid="register-button"
        >
          Join
        </SubmitButton>
      </form>
      <span className="text-center text-small-regular mt-6 text-pastel-pink">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline hover:text-primary-green"
        >
          Sign in
        </button>
        .
      </span>

      {showPrivacyModal && (
        <PrivacyPolicyModal onClose={() => setShowPrivacyModal(false)} />
      )}

      {showTermsModal && (
        <TermsOfUseModal onClose={() => setShowTermsModal(false)} />
      )}
    </div>
  );
};

export default Register;
