import { ReactNode } from "react";

const MotTable = (props: { children: ReactNode; styles?: string }) => {
  const { styles, ...otherProps } = props;
  return (
    <table
      {...otherProps}
      className={`rounded-t-md w-full ${styles ? styles : ""}`}
    />
  );
};

export default MotTable;
