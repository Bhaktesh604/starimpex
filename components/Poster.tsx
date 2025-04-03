"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import close_icon from "@/public/assets/images/ic-cancel.svg";

const Poster = () => {
  const [showPoster, setShowPoster] = useState(false);
  useEffect(() => {
    setShowPoster(true);
  }, []);
  const handleClose = () => {
    setShowPoster(false);
  };
  return (
    showPoster && (
      <div className="fixed bottom-0 right-0 top-0 left-0 h-dvh min-h-full px-2 w-full max-w-full bg-black/60 z-[99]">
        <div className="max-w-full h-full flex justify-center items-center">
          <div className="relative">
            <Image
              src={""}
              alt="diwali poster"
              className="h-full w-full max-w-[25rem] object-cover"
            />
            <div
              className="absolute top-1 right-1 cursor-pointer bg-white/50 rounded-full hover:opacity-50 transition-all duration-300"
              onClick={handleClose}
            >
              <Image src={close_icon} alt="close icon" width={40} height={40} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Poster;
