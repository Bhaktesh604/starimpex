import React, { MouseEventHandler } from "react";

interface Props {
  buttonText: string;
  active?: boolean;
  handleTabOnClick?: MouseEventHandler<HTMLButtonElement>;
  activeClass?: string;
  hoverClass?: string;
}

const ButtonComponent = (props: Props) => {
  const { buttonText, active, handleTabOnClick,activeClass,hoverClass } = props;

  return (
    <button
      className={` rounded-[12px] py-3 px-5 text-primary border border-primary max-[640px]:py-[10px] max-[640px]:px-4 max-[640px]:text-base max-[640px]:leading-4  font-poppins font-medium text-lg leading-5    ${
        active ? activeClass || "bg-tertiary border-tertiary text-white" : ''}
        ${hoverClass ? hoverClass : "hover:bg-tertiary hover:border-tertiary hover:text-white"}
      `}
      onClick={handleTabOnClick}
    >
      {buttonText}
    </button>
  );
};

export default ButtonComponent;
