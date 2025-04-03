import React from "react";

const MotTableWrapper = ({
  children,
  styles,
}: {
  children: any;
  styles: string;
}) => {
  return (
    <div
      className={`rounded-md bg-white flex flex-col flex-grow  ${styles}`}
    >
      {children}
    </div>
  );
};

export default MotTableWrapper;
