import React, { MouseEventHandler } from "react";

interface MotButtonProps {
  buttonType?: "button" | "submit" | "reset" | undefined;
  className?: string;
  buttonText: string;
  handleButtonOnClick?: MouseEventHandler<HTMLButtonElement>;
}

const MotButtonComponent = ({
  buttonType,
  className,
  buttonText,
  handleButtonOnClick,
}: MotButtonProps) => {
  return (
    <button
      type={buttonType}
      onClick={handleButtonOnClick}
      className={`bg-tertiary text-white rounded-lg font-medium text-sm leading-4 py-2.5 px-4 ${className ? className : ""}`}
    >
      {buttonText}
    </button>
  );
};

export default MotButtonComponent;
