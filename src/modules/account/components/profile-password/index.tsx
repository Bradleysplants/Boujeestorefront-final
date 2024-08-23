"use client";

import { Customer } from "@medusajs/medusa";
import React, { useEffect } from "react";

import Input from "@modules/common/components/input";

import AccountInfo from "../account-info";
import { updateCustomerPassword } from "@modules/account/actions";
import { useFormState } from "react-dom";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
};

const ProfilePassword: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false);

  const [state, formAction] = useFormState(updateCustomerPassword, {
    customer,
    success: false,
    error: false,
  });

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Password"
        currentInfo={
          <span className="text-pastel-pink">The password is not shown for security reasons</span>
        }
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
        data-testid="account-password-editor"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Old password"
            name="old_password"
            required
            type="password"
            data-testid="old-password-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
          <Input
            label="New password"
            type="password"
            name="new_password"
            required
            data-testid="new-password-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
          <Input
            label="Confirm password"
            type="password"
            name="confirm_password"
            required
            data-testid="confirm-password-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-black text-pastel-pink border border-pastel-pink py-2 px-4 rounded-lg hover:bg-pastel-pink hover:text-black transition-colors duration-200"
            data-testid="submit-button"
          >
            Save
          </button>
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfilePassword;
