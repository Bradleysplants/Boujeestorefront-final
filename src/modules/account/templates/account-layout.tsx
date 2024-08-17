import React from "react";
import UnderlineLink from "@modules/common/components/interactive-link";
import AccountNav from "../components/account-nav";
import { Customer } from "@medusajs/medusa";

interface AccountLayoutProps {
  customer: Omit<Customer, "password_hash"> | null;
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12 bg-slate-gray" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col rounded-lg shadow-lg">
        <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] py-12 px-6 sm:px-8 lg:px-10">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-primary-green py-12 px-6 sm:px-8 lg:px-10 gap-8 bg-darker-slate-gray rounded-b-lg">
          <div>
            <h3 className="text-3xl text-pastel-pink mb-4">Got questions?</h3>
            <span className="text-lg text-pastel-pink">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service/index" className="text-pastel-pink hover:text-primary-green">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
