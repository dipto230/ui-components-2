import React, { useState } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
  clearable?: boolean;
  passwordToggle?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled:
    "bg-gray-100 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
  outlined:
    "border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
  ghost:
    "bg-transparent border-b border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-200",
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
  passwordToggle,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col gap-1">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        <input
          type={passwordToggle ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={classNames(
            "rounded-lg w-full transition-all duration-200 focus:outline-none",
            sizeClasses[size],
            variantClasses[variant],
            disabled && "opacity-50 cursor-not-allowed",
            invalid &&
              "border-red-500 focus:border-red-500 focus:ring-red-200 focus:ring-2"
          )}
          aria-invalid={invalid}
          aria-disabled={disabled}
        />

        {/* Clear Button */}
        {clearable && value && (
          <button
            type="button"
            className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            onClick={() => onChange?.({ target: { value: "" } } as any)}
          >
            ✕
          </button>
        )}

        {/* Password Toggle */}
        {passwordToggle && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {/* Error / Helper with Animation */}
      <AnimatePresence mode="wait">
        {invalid && errorMessage ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-red-500"
          >
            {errorMessage}
          </motion.p>
        ) : helperText ? (
          <motion.p
            key="helper"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-gray-500"
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
