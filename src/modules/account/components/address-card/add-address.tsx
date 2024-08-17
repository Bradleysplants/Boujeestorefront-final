"use client";

import { Region } from "@medusajs/medusa";
import { Plus } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";
import React, { useEffect, useState, useCallback } from "react";
import { useFormState } from "react-dom";

import useToggleState from "@lib/hooks/use-toggle-state";
import CountrySelect from "@modules/checkout/components/country-select";
import Input from "@modules/common/components/input";
import Modal from "@modules/common/components/modal";
import { SubmitButton } from "@modules/checkout/components/submit-button";
import { addCustomerShippingAddress } from "@modules/account/actions";

const AddAddress = ({ region }: { region: Region }) => {
  const [successState, setSuccessState] = useState(false);
  const { state, open, close: closeModal } = useToggleState(false);

  const close = useCallback(() => {
    setSuccessState(false);
    closeModal();
  }, [closeModal]);

  const [formState, formAction] = useFormState(addCustomerShippingAddress, {
    success: false,
    error: null,
  });

  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    company: "",
    address_1: "",
    address_2: "",
    postal_code: "",
    city: "",
    province: "",
    phone: "",
  });

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

  const renderInput = (label: string, name: string, type = "text", required = false) => (
    <div className="relative">
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={name}
        value={inputValues[name as keyof typeof inputValues]}
        onChange={handleInputChange}
        className="bg-white text-slate-gray border border-primary-green p-2 h-10 w-full focus:outline-none focus:ring-0 transition-all duration-200"
      />
      <label
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-gray pointer-events-none transition-all duration-200 ease-in-out ${
          inputValues[name as keyof typeof inputValues] ? "opacity-0" : "opacity-100"
        }`}
      >
        {label}
      </label>
    </div>
  );

  return (
    <>
      <button
        className="border border-gray-900 bg-slate-gray text-pastel-pink rounded-lg p-5 min-h-[220px] h-full w-full flex flex-col justify-between hover:bg-gray-800"
        onClick={open}
        data-testid="add-address-button"
      >
        <span className="text-base-semi">New address</span>
        <Plus className="text-pastel-pink" />
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <div className="bg-slate-gray text-pastel-pink max-w-lg w-full p-4 rounded-lg">
          <Modal.Title>
            <Heading className="mb-2 text-pastel-pink">Add address</Heading>
          </Modal.Title>
          <form action={formAction}>
            <Modal.Body>
              <div className="flex flex-col gap-y-2">
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
                  region={region}
                  name="country_code"
                  required
                  autoComplete="country"
                  className="bg-white text-slate-gray border border-primary-green p-2 h-10 w-full focus:outline-none focus:ring-0"
                  data-testid="country-select"
                />
                {renderInput("Phone", "phone")}
              </div>
              {formState.error && (
                <div className="text-red-500 text-small-regular py-1" data-testid="address-error">
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
                  className="h-10 bg-gray-100 text-slate-gray hover:bg-gray-200"
                  data-testid="cancel-button"
                >
                  Cancel
                </Button>
                <SubmitButton className="w-full bg-primary-green text-slate-gray hover:bg-pastel-pink" data-testid="save-button">
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

export default AddAddress;
