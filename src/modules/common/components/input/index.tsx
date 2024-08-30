import { Label } from "@medusajs/ui";
import React, { useEffect, useImperativeHandle, useState } from "react";

import Eye from "@modules/common/icons/eye";
import EyeOff from "@modules/common/icons/eye-off";

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string;
  errors?: Record<string, unknown>;
  touched?: Record<string, unknown>;
  name: string;
  topLabel?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [value, setValue] = useState<string>(
      props.value ? String(props.value) : ""
    );

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text");
      }

      if (type === "password" && !showPassword) {
        setInputType("password");
      }
    }, [type, showPassword]);

    useImperativeHandle(ref, () => inputRef.current!);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 txt-compact-medium-plus text-pastel-pink">
            {topLabel}
          </Label>
        )}
        <div className="flex relative z-0 w-full txt-compact-medium">
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={handleInputChange}
            placeholder=" "
            required={required}
            className="pt-4 pb-1 block w-full h-11 px-4 mt-0 bg-black text-pastel-pink border border-pastel-pink rounded-md appearance-none focus:bg-black focus:text-pastel-pink focus:border-pastel-pink hover:bg-black hover:text-pastel-pink hover:border-pastel-pink active:bg-black active:text-pastel-pink active:border-pastel-pink visited:bg-black visited:text-pastel-pink visited:border-pastel-pink focus:ring-pastel-pink focus:outline-none transition-all duration-200"
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={`absolute transition-all duration-300 top-3 left-4 transform origin-0 text-pastel-pink ${
              value ? "-translate-y-6 scale-75" : ""
            }`}
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-pastel-pink px-4 focus:outline-none transition-all duration-150 absolute right-0 top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;