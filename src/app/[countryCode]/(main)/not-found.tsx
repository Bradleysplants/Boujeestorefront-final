import { Metadata } from "next";
import InteractiveLink from "@modules/common/components/interactive-link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
};

export default function NotFound() {
  return (
    <div
      className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)] bg-slate-gray"
      role="alert"
      aria-label="404 - Page not found"
    >
      <h1 className="text-4xl font-bold text-pastel-pink">Page Not Found</h1>
      <p className="text-lg text-primary-green">
        The page you tried to access does not exist.
      </p>
      <InteractiveLink 
        href="/" 
        className="px-6 py-3 bg-black text-pastel-pink rounded-md hover:bg-pink-600 transition duration-200"
        aria-label="Go to homepage"
      >
        Go to Homepage
      </InteractiveLink>
    </div>
  );
}
