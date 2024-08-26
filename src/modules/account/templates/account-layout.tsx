import React from "react";
import UnderlineLink from "@modules/common/components/interactive-link";
import AccountNav from "../components/account-nav";
import { Customer } from "@medusajs/medusa";

interface AccountLayoutProps {
  customer: Omit<Customer, "password_hash"> | null;
  children: React.ReactNode;
  showWelcomeBack?: boolean;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
  showWelcomeBack = false,
}) => {
  return (
    <div className="small:py-12 bg-slate-gray min-h-screen flex flex-col items-center" data-testid="account-page">
      <div className="relative flex-1 content-container h-full max-w-5xl mx-auto bg-slate-gray flex flex-col justify-center items-center p-8">
        <div className="w-full grid grid-cols-1 small:grid-cols-1 gap-8">
          {/* Account Navigation on the left */}
          <div className={`transition-transform transform ${showWelcomeBack ? "translate-x-0" : "-translate-x-full"} absolute left-0 top-0 bg-slate-gray p-4 rounded-lg`}>
            {customer && <AccountNav customer={customer} />}
          </div>
          
          {/* Main content on the right */}
          <div className={`relative bg-slate-gray flex-1 p-8 rounded-lg ${showWelcomeBack ? 'shadow-[0_0_20px_5px_rgba(255,197,225,0.75)]' : ''}`}>
            {children}
          </div>
        </div>
      </div>
      
      {/* Got Questions section at the bottom */}
      <div className="w-full bg-darker-slate-gray py-12 px-6 sm:px-8 lg:px-10">
        <div className="text-center">
          <h3 className="text-3xl text-pastel-pink mb-4">Got questions?</h3>
          <span className="text-lg text-pastel-pink">
            You can find frequently asked questions and answers on our customer service page.
          </span>
          <div className="mt-4 flex justify-center">
            <UnderlineLink href="/customer-service" className="text-pastel-pink hover:text-primary-green">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
