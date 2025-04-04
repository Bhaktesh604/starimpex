"use client";

import motibaGemsLogo from "@/public/assets/images/motiba-gems-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { links } from "@/utils/links";
import { AttentionSeeker } from "react-awesome-reveal";

const HeaderAdmin = () => {
  return (
    <header>
      <div
        className={`fixed h-20 w-full top-0 transition-all duration-500 ease-in-out z-[3] shadow navbar-light`}
      >
        <div className="flex justify-between items-center relative px-3 sm:px-8 py-5">
          <div className="absolute w-full left-0 flex justify-center items-center z-[1] pt-7">
            <AttentionSeeker effect="pulse" triggerOnce>
              <Link href={links.HOME}>
                <Image
                  src={motibaGemsLogo}
                  alt="logo"
                  className="object-contain w-56 hover:scale-105 transition-transform duration-500"
                  id="logo-main"
                />
              </Link>
            </AttentionSeeker>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
