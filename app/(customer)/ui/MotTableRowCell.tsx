import React, { ReactNode } from "react";

const MotTableRowCell = (props: { children: ReactNode; styles?: string }) => {
  const { styles, ...otherProps } = props;

  return (
    <td
      {...otherProps}
      className={`text-sm text-center border-r-[0.5px] border-r-[#808080] last:border-none py-0.5 z-3 ${
        styles ? styles : ""
      }`}
    />
  );
};

export default MotTableRowCell;
