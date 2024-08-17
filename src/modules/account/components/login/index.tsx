import { useFormState } from "react-dom";
import { LOGIN_VIEW } from "@modules/account/templates/login-template";
import { logCustomerIn } from "@modules/account/actions";
import ErrorMessage from "@modules/checkout/components/error-message";
import { SubmitButton } from "@modules/checkout/components/submit-button";

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(logCustomerIn, null);

  return (
    <div className="max-w-sm w-full flex flex-col items-center bg-slate-gray p-6 rounded-lg shadow-lg" data-testid="login-page">
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
              className="bg-white text-slate-gray border border-primary-green p-4 h-14 w-full focus:text-slate-gray focus:outline-none focus:ring-0 transition-all duration-200"
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
              className="bg-white text-slate-gray border border-primary-green p-4 h-14 w-full focus:text-slate-gray focus:outline-none focus:ring-0 transition-all duration-200"
            />
          </div>
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6 bg-primary-green text-slate-gray hover:bg-pastel-pink">
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
          Join us
        </button>
        .
      </span>
    </div>
  );
};

export default Login;
