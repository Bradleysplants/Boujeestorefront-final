import InteractiveLink from "@modules/common/components/interactive-link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
};

export default async function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)] bg-slate-gray text-pastel-pink">
      <h1 className="text-2xl-semi">Page not found</h1>
      <p className="text-small-regular">
        The page you tried to access does not exist.
      </p>
      <InteractiveLink
        href="/"
        className="bg-black text-pastel-pink border border-pastel-pink py-2 px-4 rounded-lg hover:bg-pastel-pink hover:text-black transition-colors duration-200"
      >
        Go to frontpage
      </InteractiveLink>
    </div>
  );
}
