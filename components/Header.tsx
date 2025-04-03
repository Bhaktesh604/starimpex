"use client";

import goToAccountBlue from "@/public/assets/images/go_to_account_blue.svg";
import goToAccountWhite from "@/public/assets/images/go_to_account_white.svg";
import loginWhiteIcon from "@/public/assets/images/ic-login.svg";
import loginBlueIcon from "@/public/assets/images/ic-login-blue.svg";
import inquiryBlueIcon from "@/public/assets/images/ic-inquiry.svg";
import inquiryWhiteIcon from "@/public/assets/images/ic-inquiry-white.svg";
import chevronIcon from "@/public/assets/images/ic-chevron-white.svg";
import naturalDiamondsIcon from "@/public/assets/images/ic-natural-diamonds-product.svg";
import labGrowIcon from "@/public/assets/images/ic-lab-grown-product.svg";
import diamondJewelryIcon from "@/public/assets/images/ic-diamond-jewelry-product.svg";
import motibaGemsLogo from "@/public/assets/images/motiba-gems-logo.svg";
import motibaGemsWhiteLogo from "@/public/assets/images/motiba-gems-logo-white.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { links } from "@/utils/links";
import { usePathname, useRouter } from "next/navigation";
import { AttentionSeeker } from "react-awesome-reveal";
import { TOKEN_KEY, USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";
let isSideNavbarOpen = false;
var lastScrollTop: number;
let path = "";

const Header = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isProductsDropdownMenuOpen, setIsProductsDropdownMenuOpen] =
    useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [matchPath, setMatchPath] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  path = pathname;

  const toggleSideMenu = () => {
    isSideNavbarOpen = !isSideMenuOpen;
    setIsSideMenuOpen((prevIsOpen) => !prevIsOpen);
  };

  const changeNavbarStyle = () => {
    const changeStyle = !(
      path === links.PRIVACY_POLICY ||
      path === links.TERMS ||
      path === links.LOGIN ||
      path === links.SIGNUP ||
      path === links.FORGOT_PASSWORD ||
      path === links.RESET_PASSWORD  ||
      path.startsWith(links.VIEW_PRODUCT) ||
      path.startsWith(links.VIEW_CERTIFICATE) ||
      path.startsWith(links.VIEW_VIDEO) || 
      path === links.DATA_NOT_FOUND
    );
    if (isSideNavbarOpen) {
      setIsSideMenuOpen(false);
      isSideNavbarOpen = false;
    }

    const navbar = document.getElementById("navbar");
    const heading = document.getElementById("heading");
    const btnLogin = document.getElementById("btn-login");
    const btnInquiry = document.getElementById("btn-inquiry");
    const inquiryIcon = document.getElementById("inquiry-icon");
    const inquiryIconSecondary = document.getElementById("inquiry-icon-1");
    const loginIcon = document.getElementById("login-icon");
    const loginIconSecondary = document.getElementById("login-icon-1");
    const hamburgerSecondary = document.getElementById("hamburger-secondary");
    const hamburgerTertiary = document.getElementById("hamburger-tertiary");
    const logoMain = document.getElementById("logo-main");
    const logoBlue = document.getElementById("logo-blue");
    const btnMyAccount = document.getElementById("btn-my-account");

    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && navbar) {
      navbar.style.top = "-80px";
      navbar.style.position = "!absolute";
    }
    if (scrollTop <= lastScrollTop && navbar) {
      navbar.style.top = "0";
      navbar.style.position = "fixed";
      if (changeStyle) {
        navbar.classList.add("!bg-white");
        navbar.classList.remove("!bg-transparent");
        if (heading) {
          heading.classList.add("!text-tertiary");
        }
        if (btnLogin) {
          btnLogin.classList.add("!btn-tertiary-outline");
        }
        if (btnMyAccount) {
          btnMyAccount.classList.add("!btn-tertiary-outline");
        }
        if (btnInquiry) {
          btnInquiry.classList.add("!btn-tertiary-outline");
        }
        if (inquiryIcon) {
          inquiryIcon.classList.add("!hidden");
        }
        if (inquiryIconSecondary) {
          inquiryIconSecondary.classList.remove("hidden");
        }
        if (loginIcon) {
          loginIcon.classList.add("!hidden");
        }
        if (loginIconSecondary) {
          loginIconSecondary.classList.remove("hidden");
        }
        if (hamburgerSecondary) {
          hamburgerSecondary.classList.add("hidden");
        }
        if (hamburgerTertiary) {
          hamburgerTertiary.classList.remove("hidden");
        }
        if (logoMain) {
          logoMain.classList.add("hidden");
        }
        if (logoBlue) {
          logoBlue.classList.remove("hidden");
        }
      }
    }
    if (window.scrollY < 80 && navbar && changeStyle) {
      navbar.classList.remove("!bg-white");
      navbar.classList.add("!bg-transparent");
      navbar.style.top = "0px";
      if (heading) {
        heading.classList.remove("!text-tertiary");
      }
      if (btnLogin) {
        btnLogin.classList.remove("!btn-tertiary-outline");
      }
      if (btnMyAccount) {
        btnMyAccount.classList.remove("!btn-tertiary-outline");
      }
      if (btnInquiry) {
        btnInquiry.classList.remove("!btn-tertiary-outline");
      }
      if (inquiryIcon) {
        inquiryIcon.classList.remove("!hidden");
      }
      if (inquiryIconSecondary) {
        inquiryIconSecondary.classList.add("hidden");
      }
      if (loginIcon) {
        loginIcon.classList.remove("!hidden");
      }
      if (loginIconSecondary) {
        loginIconSecondary.classList.add("hidden");
      }
      if (hamburgerSecondary) {
        hamburgerSecondary.classList.remove("hidden");
      }
      if (hamburgerTertiary) {
        hamburgerTertiary.classList.add("hidden");
      }
      if (logoMain) {
        logoMain.classList.remove("hidden");
      }
      if (logoBlue) {
        logoBlue.classList.add("hidden");
      }
    }
    lastScrollTop = scrollTop;
  };

  useEffect(() => {
    const userType = localStorage.getItem(USER_TYPE_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && userType === EUserType.USER) {
      setIsUserLoggedIn(true);
    }
    window.addEventListener("scroll", changeNavbarStyle);

    return () => {
      window.removeEventListener("scroll", changeNavbarStyle);
    };
  }, []);

  const onLinkClick = () => {
    setIsProductsDropdownMenuOpen(false);
    setIsSideMenuOpen(false);
  };

  useEffect(() => {
    if (pathname) {
      const matchCondition =
        pathname === links.PRIVACY_POLICY ||
        pathname === links.TERMS ||
        pathname === links.LOGIN ||
        pathname === links.SIGNUP ||
        pathname === links.FORGOT_PASSWORD ||
        pathname === links.RESET_PASSWORD ||
        pathname.startsWith(links.VIEW_PRODUCT) ||
        pathname.startsWith(links.VIEW_CERTIFICATE) ||
        pathname.startsWith(links.VIEW_VIDEO) || 
        pathname === links.DATA_NOT_FOUND;
      setMatchPath(matchCondition);
    }
  }, [pathname]);

  const navbarTheme = {
    navbarClasses: matchPath ? "navbar-light" : "navbar-main",
    titleColor: matchPath ? "text-tertiary" : "text-secondary",
    loginButtonClasses: matchPath
      ? "btn-tertiary-outline"
      : "btn-secondary-outline",
    inquiryButtonClasses: matchPath ? "btn-tertiary-outline" : "btn-secondary",
    showHamburgerTertiaryClasses: matchPath ? "" : "hidden",
    showHamburgerSecondaryClasses: matchPath ? "hidden" : "",
    loginIconClasses: matchPath ? "hidden" : "w-5 h-5",
    loginIcon1Classes: matchPath ? " " : "hidden",
    inquiryIconClasses: matchPath ? "hidden" : "w-5 h-5",
    inquiryIcon1Classes: matchPath ? " " : "hidden",
    logo: matchPath ? motibaGemsLogo : motibaGemsWhiteLogo,
  };

  const goToMyAccountButtonClickHandler = () => {
    const userType = localStorage.getItem(USER_TYPE_KEY);
    if (userType === EUserType.USER) {
      router.push(links.DASHBOARD);
      return;
    }

    localStorage.clear();
    router.refresh();
  };

  return (
    <header className="relative">
      <div
        className={`absolute h-20 w-full top-0 transition-all duration-500 ease-in-out z-[3] shadow ${navbarTheme.navbarClasses}`}
        id="navbar"
      >
        <div className="flex justify-between items-center relative px-3 sm:px-8 py-5">
          <div className="flex items-center">
            <button className="relative z-[6]" onClick={toggleSideMenu}>
              <div
                id="hamburger-secondary"
                className={navbarTheme.showHamburgerSecondaryClasses}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className={`h-1 w-7 bg-secondary rounded-full ${
                      isSideMenuOpen ? "rotate-45 translate-y-2" : ""
                    } transition-all duration-400 ease-in-out`}
                  />
                  <span
                    className={`h-1 w-7 bg-secondary rounded-full ${
                      isSideMenuOpen ? "opacity-0" : ""
                    } transition-all duration-400 ease-in-out`}
                  />
                  <span
                    className={`h-1 w-7 bg-secondary rounded-full ${
                      isSideMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    } transition-all duration-400 ease-in-out`}
                  />
                </div>
              </div>
              <div
                id="hamburger-tertiary"
                className={navbarTheme.showHamburgerTertiaryClasses}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className={`h-1 w-7 rounded-full ${
                      isSideMenuOpen
                        ? "rotate-45 translate-y-2 bg-secondary"
                        : "bg-tertiary"
                    } transition-all duration-400 ease-in-out`}
                  />
                  <span
                    className={`h-1 w-7 rounded-full ${
                      isSideMenuOpen ? "opacity-0" : "bg-tertiary"
                    } transition-all duration-400 ease-in-out`}
                  />
                  <span
                    className={`h-1 w-7 rounded-full ${
                      isSideMenuOpen
                        ? "-rotate-45 -translate-y-2 bg-secondary"
                        : "bg-tertiary"
                    } transition-all duration-400 ease-in-out`}
                  />
                </div>
              </div>
            </button>
          </div>

          <div className="relative z-[3] flex gap-3">
            {!isUserLoggedIn ? (
              <Link
                id="btn-login"
                className={`btn ${navbarTheme.loginButtonClasses} max-md:!p-2 group`}
                href={links.CONTACT_US}
                onClick={onLinkClick}
              >
                <div
                  className={navbarTheme.loginIcon1Classes}
                  id="login-icon-1"
                >
                  <Image
                    src={inquiryBlueIcon}
                    alt="login blue icon"
                    className="w-5 h-5 block group-hover:hidden"
                  />
                  <Image
                    src={inquiryBlueIcon}
                    alt="login white icon"
                    className="w-5 h-5 hidden group-hover:block"
                  />
                </div>
                <Image
                  src={inquiryWhiteIcon}
                  alt="login icon"
                  className={navbarTheme.loginIconClasses}
                  id="login-icon"
                />
                <span className="hidden md:block">Contact</span>
              </Link>
            ) : (
              <>
                {/* <button
                  id="btn-my-account"
                  className={`btn ${navbarTheme.loginButtonClasses} max-md:p-3 group`}
                  onClick={goToMyAccountButtonClickHandler}
                >
                  <div
                    className={navbarTheme.loginIcon1Classes}
                    id="login-icon-1"
                  >
                    <Image
                      src={goToAccountBlue}
                      alt="login blue icon"
                      className="w-5 h-5 block group-hover:hidden"
                    />
                    <Image
                      src={goToAccountWhite}
                      alt="login white icon"
                      className="w-5 h-5 hidden group-hover:block"
                    />
                  </div>
                  <Image
                    src={goToAccountWhite}
                    alt="login icon"
                    className={navbarTheme.loginIconClasses}
                    id="login-icon"
                  />
                  <span className="hidden md:block">Go to my account</span>
                </button> */}
              </>
            )}
            {pathname !== links.HOME ? (
              <>
                {/* <button
                  id="btn-inquiry"
                  className={`btn ${navbarTheme.inquiryButtonClasses} max-md:!p-3 group `}
                  onClick={() => {
                    router.push(links.CONTACT_US);
                    onLinkClick();
                  }}
                >
                  <div
                    className={navbarTheme.inquiryIcon1Classes}
                    id="inquiry-icon-1"
                  >
                    <Image
                      src={inquiryBlueIcon}
                      alt="inquiry blue icon"
                      className="w-5 h-5 group-hover:hidden"
                    />
                    <Image
                      src={inquiryWhiteIcon}
                      alt="inquiry white icon"
                      className="w-5 h-5 hidden group-hover:block"
                    />
                  </div>
                  <Image
                    src={inquiryBlueIcon}
                    alt="inquiry blue icon"
                    className={navbarTheme.inquiryIconClasses}
                    id="inquiry-icon"
                  />
                  <span className="hidden md:block">Contact us</span>
                </button> */}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="absolute w-full left-0 flex justify-center items-center z-[1]">
            <AttentionSeeker effect="pulse" triggerOnce>
              <Link href={links.HOME} onClick={onLinkClick}>
                <Image
                  src={navbarTheme.logo}
                  alt="logo"
                  className="object-contain w-40 hover:scale-105 transition-transform duration-500"
                  id="logo-main"
                />
                <Image
                  src={motibaGemsLogo}
                  alt="logo"
                  className="object-contain w-40 hover:scale-105 transition-transform duration-500 hidden"
                  id="logo-blue"
                />
              </Link>
            </AttentionSeeker>
          </div>
          <div
            className={`cursor-pointer absolute w-full z-[5] h-dvh top-0 ${
              isSideMenuOpen ? "left-0" : "left-[-100%]"
            } transition-all duration-500 ease-in-out origin-left`}
          >
            <div className="w-full sm:w-[300px] h-full shadow-lg overflow-auto bg-tertiary-dark">
              <ul className="pt-20 grid place-content-center gap-5 h-full px-8">
                <li>
                  <Link
                    href={links.HOME}
                    onClick={onLinkClick}
                    className="text-base text-secondary font-poppins"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={links.ABOUT_US}
                    onClick={onLinkClick}
                    className="text-base text-secondary font-poppins"
                  >
                    About us
                  </Link>
                </li>
                <li className="relative">
                  <div
                    className="text-base text-secondary font-poppins flex gap-1 items-center"
                    onClick={() => {
                      setIsProductsDropdownMenuOpen(
                        (prevIsOpen) => !prevIsOpen
                      );
                    }}
                  >
                    Our Products
                    <Image
                      src={chevronIcon}
                      alt="menu dropdown icon"
                      className={`${
                        isProductsDropdownMenuOpen ? "rotate-0" : "rotate-180"
                      } transition-transform duration-300 ease-in-out`}
                    />
                  </div>
                  <div
                    className={`${
                      isProductsDropdownMenuOpen ? "block" : "hidden"
                    } transition-all duration-500 ease-in-out`}
                  >
                    <ul className="grid ml-2 gap-3 mt-3">
                      <li>
                        {/* <Link
                          href={links.NATURAL_DIAMONDS}
                          onClick={onLinkClick}
                          className="flex gap-1 font-poppins text-sm capitalize text-secondary/80"
                        >
                          <Image
                            src={naturalDiamondsIcon}
                            alt="natural diamonds icon"
                          />
                          <span>Natural Diamonds</span>
                        </Link> */}
                      </li>
                      <li>
                        <Link
                          href={links.LAB_GROWN_DIAMONDS}
                          onClick={onLinkClick}
                          className="flex gap-1 font-poppins text-sm capitalize text-secondary/80"
                        >
                          <Image src={labGrowIcon} alt="lab grow icon" />
                          <span>Lab Grown Diamonds</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={links.DIAMOND_JEWELRY}
                          onClick={onLinkClick}
                          className="flex gap-1 font-poppins text-sm capitalize text-secondary/80"
                        >
                          <Image
                            src={diamondJewelryIcon}
                            alt="diamond jewelry icon"
                          />
                          <span>Diamond Jewelry</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <Link
                    href={links.INQUIRY}
                    onClick={onLinkClick}
                    className="text-base text-secondary font-poppins"
                  >
                    Inquire for Loose Parcel Diamonds
                  </Link>
                </li>
                <li>
                  <Link
                    href={links.GUIDE}
                    onClick={onLinkClick}
                    className="text-base text-secondary font-poppins"
                  >
                    Diamond&apos;s 4C Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href={links.PRIVACY_POLICY}
                    onClick={onLinkClick}
                    className="text-base text-secondary font-poppins"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={links.TERMS}
                    onClick={onLinkClick}
                    className="text-base text-secondary font-poppins"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href={links.CONTACT_US}
                    onClick={onLinkClick}
                    className="text-base text-secondary font-poppins"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
