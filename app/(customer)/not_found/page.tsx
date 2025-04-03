import React from "react";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex justify-center items-center pt-20">
      <div className="max-w-[420px] w-full h-auto flex flex-col justify-center items-center gap-y-6 px-3">
        <Image src={dataNotFoundImage} alt="Data Not Found" />
        <span className="font-poppins font-semibold text-[42px] leading-[62px] max-[400px]:text-[32px] max-[400px]:leading-[42px] text-tertiary uppercase">
          DATA NOT FOUND
        </span>
      </div>
    </div>
  );
};

export default Page;
