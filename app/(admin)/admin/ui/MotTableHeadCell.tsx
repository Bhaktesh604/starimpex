import { MouseEventHandler, ReactNode } from "react";

const MotTableHeadCell = (props: {
  children: ReactNode;
  styles?: string;
  onClick?: MouseEventHandler<HTMLTableHeaderCellElement> | undefined;
}) => {
  const { onClick, styles, ...otherProps } = props;

  return (
    <th
      {...otherProps}
      className={`bg-tertiary text-secondary text-sm py-1.5 px-4 border-r-[0.5px] border-r-[#808080] first:rounded-l-md last:rounded-r-md last:border-none truncate    ${
        styles ? styles : ""
      }`}
      onClick={onClick}
    />
  );
};

export default MotTableHeadCell;
