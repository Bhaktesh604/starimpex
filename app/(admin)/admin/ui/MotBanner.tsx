import React from "react";

interface MotBannerProps {
  bannerName: string;
  bannerValue: any;
  className?: string;
  bodyStyle?: string
}

const MotBanner = ({ bannerName, bannerValue, className, bodyStyle}: MotBannerProps) => {
  return (
    <div
      className={`text-sm leading-4 font-medium bg-white rounded-xl border-[0.5px] border-primary/20 ${className}`}
    >
      <div className="bg-tertiary text-white rounded-md py-1.5 px-3 text-center">
        {bannerName}
      </div>
      <div className={`font-poppins py-1 text-center px-2 ${bodyStyle ? bodyStyle : ""}`}>{bannerValue}</div>
    </div>
  );
};

export default MotBanner;
