import { Checkbox, Label } from "@medusajs/ui"
import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  'data-testid'?: string
  className?: string // Add className as an optional prop
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  'data-testid': dataTestId,
  className, // Destructure className prop
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Checkbox
        className="bg-black text-pastel-pink border-pastel-pink checked:border-pastel-pink checked:bg-pastel-pink checked:text-black font-bold h-5 w-5 flex items-center justify-center rounded-sm"
        id="checkbox"
        role="checkbox"
        type="button"
        checked={checked}
        aria-checked={checked}
        onClick={onChange}
        name={name}
        data-testid={dataTestId}
      />
      <Label
        htmlFor="checkbox"
        className="text-pastel-pink text-base-regular font-bold"
        size="large"
      >
        {label}
      </Label>
    </div>
  )
}

export default CheckboxWithLabel
