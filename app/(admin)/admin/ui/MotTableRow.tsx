import { ReactNode } from "react";

const MotTableRow = (props: {
  children: ReactNode;
  styles?: string;
  isSelected?: boolean;
  onSelection?: () => void;
  onClick?: any;
}) => {
  const { styles, isSelected, ...otherProps } = props;
  return (
    <tr
      {...otherProps}
      className={`cursor-pointer border-b border-[#808080] text-sm font-normal ${
        isSelected ? "bg-[#CFDBEB]" : ""
      } ${styles ? styles : ""}`}
    />
  );
};

export default MotTableRow;
