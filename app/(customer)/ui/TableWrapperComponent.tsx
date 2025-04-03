import { ReactNode } from "react";

const MotTableWrapperComponent = (props: {
  children: ReactNode;
  styles?: string;
}) => {
  const { styles, ...otherProps } = props;
  return <div {...otherProps} className={` ${styles ? styles : ""}`} />;
};

export default MotTableWrapperComponent;
