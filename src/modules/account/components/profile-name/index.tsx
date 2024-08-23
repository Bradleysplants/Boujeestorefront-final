"use client";

import { Customer } from "@medusajs/medusa";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";

import Input from "@modules/common/components/input";
import { updateCustomerName } from "@modules/account/actions";

import AccountInfo from "../account-info";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
};

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false);

  const [state, formAction] = useFormState(updateCustomerName, {
    error: false,
    success: false,
  });

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  return (
    <form action={formAction} className="w-full overflow-visible">
      <AccountInfo
        label="Name"
        currentInfo={`${customer.first_name} ${customer.last_name}`}
        isSuccess={successState}
        isError={!!state?.error}
        clearState={clearState}
        data-testid="account-name-editor"
      >
        <div className="grid grid-cols-2 gap-x-2">
          <Input
            label="First name"
            name="first_name"
            required
            defaultValue={customer.first_name}
            data-testid="first-name-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            defaultValue={customer.last_name}
            data-testid="last-name-input"
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

export default ProfileName;
