"use client";

import { Button } from "@medusajs/ui";
import React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  variant = "primary",
  className,
  'data-testid': dataTestId
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "danger"; // Remove null from type
  className?: string;
  'data-testid'?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      size="large"
      className={className}
      type="submit"
      isLoading={pending}
      variant={variant || undefined} // Ensure it falls back to undefined if null
      data-testid={dataTestId}
    >
      {children}
    </Button>
  );
}