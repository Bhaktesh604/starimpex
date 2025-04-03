import React, { ReactNode } from 'react'

const MotTableBody = (props: {children: ReactNode,styles?: string}) => {
  const {styles, ...otherProps} = props;
  return (
    <tbody {...otherProps} className={`${styles ? styles: ''}`}  />
  )
}

export default MotTableBody