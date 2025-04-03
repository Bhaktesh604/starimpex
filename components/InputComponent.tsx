import React, { FocusEventHandler, useState } from "react";

interface Props {
  type: string;
  placeholder?: string;
  className?: string;
  value?: string;
  handleChange?: any;
  name?: string;
  onKeyDown?: any;
  step?: any;
  defaultValue?: any;
  onclick?: any;
}

const InputComponent = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    type,
    placeholder,
    className,
    value,
    handleChange,
    name,
    onKeyDown,
    step,
    defaultValue,
    onclick,
  } = props;

  return (
    <>
      <input
        onChange={handleChange}
        value={value}
        type={type}
        className={`p-2 bg-dashboard_primary rounded-[5px] placeholder:text-sm placeholder:font-poppins placeholder:font-normal placeholder:leading-[14px] placeholder:text-black outline-none ${
          !isFocused && !value ? "placeholder-visible" : ""
        } ${className}`}
        placeholder={placeholder}
        name={name}
        onKeyDown={onKeyDown}
        step={step}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ color: value || isFocused ? "#000" : "transparent" }}
        data-placeholder={placeholder}
        defaultValue={defaultValue ? defaultValue : ""}
        onClick={onclick}
      />
      {!isFocused && !value && type === "date" && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-sm">
          {placeholder}
        </span>
      )}
    </>
  );
};

export default InputComponent;
