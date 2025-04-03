import React from "react";

interface MotBannerProps {
  bannerName: string;
  bannerValue: any;
  className?: string;
  bodyStyle?: string
}

const MotBanner = ({ bannerName, bannerValue, className, bodyStyle }: MotBannerProps) => {
  return (
    <div
      className={`text-sm leading-4 font-medium bg-white rounded-[11px] border-[0.5px] border-primary/20  ${className}`}
    >
      <div className="bg-tertiary font-poppins text-white rounded-[5px] py-1.5 px-3 text-center">
        {bannerName}&nbsp;
      </div>
      <div className={`font-poppins py-0.5 text-center px-2 ${bodyStyle ? bodyStyle : ""}`}>{bannerValue}</div>
    </div>
  );
};

export default MotBanner;
