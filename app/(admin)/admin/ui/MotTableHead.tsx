import { ReactNode } from "react";

const MotTableHead = (props: { children: ReactNode; styles?: string }) => {
  const { styles, ...otherProps } = props;
  return (
    <thead className="sticky top-0 z-[4]">
      <tr
        {...otherProps}
        className={`${styles ? styles : ""} cursor-pointer`}
      ></tr>
    </thead>
  );
};

export default MotTableHead;
