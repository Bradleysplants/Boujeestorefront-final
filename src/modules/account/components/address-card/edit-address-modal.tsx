"use client";

import React, { useEffect, useState, useCallback } from "react";
import { PencilSquare as Edit, Trash } from "@medusajs/icons";
import { Button, Heading, Text, clx } from "@medusajs/ui";
import { Address, Region } from "@medusajs/medusa";

import useToggleState from "@lib/hooks/use-toggle-state";
import CountrySelect from "@modules/checkout/components/country-select";
import Input from "@modules/common/components/input";
import Modal from "@modules/common/components/modal";
import {
  deleteCustomerShippingAddress,
  updateCustomerShippingAddress,
} from "@modules/account/actions";
import Spinner from "@modules/common/icons/spinner";
import { useFormState } from "react-dom";
import { SubmitButton } from "@modules/checkout/components/submit-button";

type EditAddressProps = {
  region: Region;
  address: Address;
  isActive?: boolean;
};

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const { state, open, close: closeModal } = useToggleState(false);

  const [formState, formAction] = useFormState(updateCustomerShippingAddress, {
    success: false,
    error: null,
    addressId: address.id,
  });

  const [inputValues, setInputValues] = useState({
    first_name: address.first_name || "",
    last_name: address.last_name || "",
    company: address.company || "",
    address_1: address.address_1 || "",
    address_2: address.address_2 || "",
    postal_code: address.postal_code || "",
    city: address.city || "",
    province: address.province || "",
    phone: address.phone || "",
  });

  const close = useCallback(() => {
    setSuccessState(false);
    closeModal();
  }, [closeModal]);

  useEffect(() => {
    if (successState) {
      close();
    }
  }, [successState, close]);

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const removeAddress = async () => {
    setRemoving(true);
    await deleteCustomerShippingAddress(address.id);
    setRemoving(false);
  };

  const renderInput = (
    label: string,
    name: string,
    type = "text",
    required = false
  ) => (
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={name}
        value={inputValues[name as keyof typeof inputValues]}
        onChange={handleInputChange}
        className="bg-white text-slate-gray border border-primary-green p-2 h-10 w-full focus:outline-none focus:ring-0 transition-all duration-200 text-sm"
      />
      <label
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-gray pointer-events-none transition-all duration-200 ease-in-out text-sm ${
          inputValues[name as keyof typeof inputValues] ? "opacity-0" : "opacity-100"
        }`}
      >
        {label}
      </label>
    </div>
  );

  return (
    <>
      <div
        className={clx(
          "border rounded-lg p-5 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors bg-slate-gray",
          {
            "border-gray-900": isActive,
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col">
          <Heading className="text-left text-base-semi text-pastel-pink" data-testid="address-name">
            {address.first_name} {address.last_name}
          </Heading>
          {address.company && (
            <Text className="txt-compact-small text-pastel-pink" data-testid="address-company">
              {address.company}
            </Text>
          )}
          <Text className="flex flex-col text-left text-pastel-pink mt-2 text-sm">
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </Text>
        </div>
        <div className="flex items-center gap-x-4">
          <button
            className="text-small-regular text-pastel-pink flex items-center gap-x-2 hover:text-primary-green"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit />
            Edit
          </button>
          <button
            className="text-small-regular text-pastel-pink flex items-center gap-x-2 hover:text-red-500"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner /> : <Trash />}
            Remove
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <div className="bg-[#353A40] p-6 rounded-lg" style={{ maxHeight: "80vh" }}>
          <Modal.Title>
            <Heading className="mb-2 text-pastel-pink text-lg">Edit address</Heading>
          </Modal.Title>
          <form action={formAction}>
            <Modal.Body>
              <div className="grid grid-cols-1 gap-y-3">
                <div className="grid grid-cols-2 gap-x-2">
                  {renderInput("First name", "first_name", "text", true)}
                  {renderInput("Last name", "last_name", "text", true)}
                </div>
                {renderInput("Company", "company")}
                {renderInput("Address", "address_1", "text", true)}
                {renderInput("Apartment, suite, etc.", "address_2")}
                <div className="grid grid-cols-[144px_1fr] gap-x-2">
                  {renderInput("Postal code", "postal_code", "text", true)}
                  {renderInput("City", "city", "text", true)}
                </div>
                {renderInput("Province / State", "province")}
                <CountrySelect
                  name="country_code"
                  region={region}
                  required
                  autoComplete="country"
                  className="bg-white text-slate-gray border border-primary-green p-2 h-10 w-full focus:outline-none focus:ring-0 text-sm"
                  data-testid="country-select"
                />
                {renderInput("Phone", "phone")}
              </div>
              {formState.error && (
                <div className="text-red-500 text-small-regular py-2">
                  {formState.error}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <div className="flex gap-3 mt-4">
                <Button
                  type="reset"
                  variant="secondary"
                  onClick={close}
                  className="h-8 bg-gray-100 text-slate-gray hover:bg-gray-200 text-sm"
                  data-testid="cancel-button"
                >
                  Cancel
                </Button>
                <SubmitButton className="w-full bg-primary-green text-slate-gray hover:bg-pastel-pink h-8 text-sm" data-testid="save-button">
                  Save
                </SubmitButton>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditAddress;
