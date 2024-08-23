"use client";

import { Customer } from "@medusajs/medusa";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";

import Input from "@modules/common/components/input";

import AccountInfo from "../account-info";
import { updateCustomerPhone } from "@modules/account/actions";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
};

const ProfilePhone: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false);

  const [state, formAction] = useFormState(updateCustomerPhone, {
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
    <form action={formAction} className="w-full">
      <AccountInfo
        label="Phone"
        currentInfo={`${customer.phone}`}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
        data-testid="account-phone-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            defaultValue={customer.phone}
            data-testid="phone-input"
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

export default ProfilePhone;
