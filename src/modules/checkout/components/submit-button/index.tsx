"use client";

import { Button } from "@medusajs/ui";
import React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  className,
  'data-testid': dataTestId,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
  variant?: "primary" | "secondary" | "danger";
}) {
  const { pending } = useFormStatus();

  const variantStyles = {
    primary: "bg-black text-pastel-pink font-bold border-2 border-pastel-pink",
    secondary: "bg-gray-500 text-pastel-pink font-bold border-2 border-pastel-pink",
    danger: "bg-red-500 text-white font-bold border-2 border-pastel-pink",
  };

  return (
    <Button
      size="large"
      className={`${variantStyles[variant]} ${className}`} // Apply the variant and custom styles
      type="submit"
      isLoading={pending}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  );
}
