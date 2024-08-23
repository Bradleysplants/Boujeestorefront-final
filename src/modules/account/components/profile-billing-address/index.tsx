"use client";

import { Customer, Region } from "@medusajs/medusa";
import React, { useEffect, useMemo } from "react";

import Input from "@modules/common/components/input";
import NativeSelect from "@modules/common/components/native-select";

import AccountInfo from "../account-info";
import { useFormState } from "react-dom";
import { updateCustomerBillingAddress } from "@modules/account/actions";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
  regions: Region[];
};

const ProfileBillingAddress: React.FC<MyInformationProps> = ({
  customer,
  regions,
}) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }));
        })
        .flat() || []
    );
  }, [regions]);

  const [successState, setSuccessState] = React.useState(false);

  const [state, formAction] = useFormState(updateCustomerBillingAddress, {
    error: false,
    success: false,
  });

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  const currentInfo = useMemo(() => {
    if (!customer.billing_address) {
      return "No billing address";
    }

    const country =
      regionOptions?.find(
        (country) => country.value === customer.billing_address.country_code
      )?.label || customer.billing_address.country_code?.toUpperCase();

    return (
      <div className="flex flex-col font-semibold text-pastel-pink" data-testid="current-info">
        <span>
          {customer.billing_address.first_name}{" "}
          {customer.billing_address.last_name}
        </span>
        <span>{customer.billing_address.company}</span>
        <span>
          {customer.billing_address.address_1}
          {customer.billing_address.address_2
            ? `, ${customer.billing_address.address_2}`
            : ""}
        </span>
        <span>
          {customer.billing_address.postal_code},{" "}
          {customer.billing_address.city}
        </span>
        <span>{country}</span>
      </div>
    );
  }, [customer, regionOptions]);

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Billing address"
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!state.error}
        clearState={clearState}
        data-testid="account-billing-address-editor"
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <Input
            label="First name"
            name="billing_address.first_name"
            defaultValue={customer.billing_address?.first_name || undefined}
            required
            data-testid="billing-first-name-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
          <Input
            label="Last name"
            name="billing_address.last_name"
            defaultValue={customer.billing_address?.last_name || undefined}
            required
            data-testid="billing-last-name-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
          <Input
            label="Company"
            name="billing_address.company"
            defaultValue={customer.billing_address?.company || undefined}
            data-testid="billing-company-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
          <Input
            label="Address"
            name="billing_address.address_1"
            defaultValue={customer.billing_address?.address_1 || undefined}
            required
            data-testid="billing-address-1-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
          <Input
            label="Apartment, suite, etc."
            name="billing_address.address_2"
            defaultValue={customer.billing_address?.address_2 || undefined}
            data-testid="billing-address-2-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
          <Input
            label="City"
            name="billing_address.city"
            defaultValue={customer.billing_address?.city || undefined}
            required
            data-testid="billing-city-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
          <Input
            label="Postal code"
            name="billing_address.postal_code"
            defaultValue={customer.billing_address?.postal_code || undefined}
            required
            data-testid="billing-postal-code-input"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          />
          <NativeSelect
            name="billing_address.country_code"
            defaultValue={customer.billing_address?.country_code || undefined}
            required
            data-testid="billing-country-code-select"
            className="bg-black text-pastel-pink border border-pastel-pink h-10"
          >
            <option value="">-</option>
            {regionOptions.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </NativeSelect>
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

export default ProfileBillingAddress;
