"use client";
import { links } from "@/utils/links";
import DownArrowIcon from "../../../public/assets/images/ic-down-arrow.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TECollapse } from "tw-elements-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import cartIcon from "@/public/assets/images/ic-cart.svg";
import MoreIcon from "@/public/assets/images/ic-more.svg";
import UserProfileIcon from "@/public/assets/images/ic-user-profile.svg";
import User from "@/public/assets/images/ic-user.svg";
import MyOrderIcon from "@/public/assets/images/ic-my-order-2.svg";
import LogoutIcon from "@/public/assets/images/ic-logout.svg";
import DrawerIcon from "@/public/assets/images/ic-drawer.svg";
import CancelIcon from "@/public/assets/images/ic-cancel.svg";
import navClasses from "./Navbar.module.scss";
import HelpDropDown from "./HelpDropDown";
import Feedback from "./Feedback";
import { TOKEN_KEY, USER_KEY, USER_TYPE_KEY } from "@/utils/constants";
import { EDiamondType, EUserType } from "@/interfaces/common.interface";
import { logoutApi } from "../api/auth.api";
import useApiRequest from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import { useDispatch, useSelector } from "react-redux";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import Link from "next/link";
import GuestNavbar from "@/components/Header";
import motibaGemsLogo from "@/public/assets/images/motiba-gems-logo.svg";
import { getCartList } from "../api/cart.api";
import changePasswordIcon from "@/public/assets/images/ic-change-password.svg";
import ChangePasswordConfirmation from "./ChangePasswordConfirmation";
import { changePasswordApi } from "../api/user.api";
import SearchIcon from "@/public/assets/customer-dashboard/ic-search.svg";
import { RootState } from "@/store/store";
import { setItems } from "@/store/cartSlice";

function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const router = useRouter();
  const dispatch = useDispatch();
  const path = usePathname();
  const searchParam = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isCssDropdownOpen, setIsCssDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const [isFeedBackOpen, setIsFeedBackOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [expandSearch, setExpandSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const {
    loading: isGetCartDiamondListLoading,
    data: getCartDiamondListResponse,
    request: getCartDiamondListRequest,
  } = useApiRequest(getCartList);
  const [
    isChangePasswordConfirmationOpen,
    setIsChangePasswordConfirmationOpen,
  ] = useState(false);
  const {
    loading: isChangePasswordRequestLoading,
    data: changePasswordRequestResponse,
    request: changePasswordRequestRequest,
  } = useApiRequest(changePasswordApi);

  const getDiamondList = useCallback(async () => {
    if (
      localStorage.getItem(TOKEN_KEY) &&
      localStorage.getItem(USER_TYPE_KEY) === EUserType.USER
    ) {
      getCartDiamondListRequest(router);
    }
  }, [getCartDiamondListRequest, router]);

  useEffect(() => {
    getDiamondList();
  }, [getDiamondList]);

  useEffect(() => {
    if (!isGetCartDiamondListLoading && getCartDiamondListResponse) {
      if (getCartDiamondListResponse.responseCode === ResponseCodes.SUCCESS) {
        dispatch(setItems(getCartDiamondListResponse.data.totalPieces));
      }
    }
  }, [dispatch, getCartDiamondListResponse, isGetCartDiamondListLoading]);

  const toggleCssDropdown = () => {
    setIsCssDropdownOpen((prev) => !prev);
  };

  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen((prev) => !prev);
  };

  const toggleHelpDropdown = () => {
    setIsHelpDropdownOpen((prev) => !prev);
  };

  const toggleFeedBackHandle = () => {
    setIsFeedBackOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsCssDropdownOpen(false);
      /* COMMENTED AS DROP MENU CLICK IS NOT WORKING */
      //setIsMoreDropdownOpen(false);
      setIsHelpDropdownOpen(false);
      setIsFeedBackOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const {
    loading: isLogoutRequestLoading,
    data: logoutResponse,
    request: logoutRequest,
  } = useApiRequest(logoutApi);

  useEffect(() => {
    if (!isLogoutRequestLoading && logoutResponse) {
      if (logoutResponse.responseCode === ResponseCodes.SUCCESS) {
        dispatch(
          showAlert({
            message: logoutResponse.message,
            variant: EVariant.SUCCESS,
          })
        );
        localStorage.clear();
        router.replace(links.LOGIN);
      }
    }
  }, [dispatch, isLogoutRequestLoading, logoutResponse, router]);

  const handleLogout = () => {
    logoutRequest(router);
  };

  useEffect(() => {
    const isGuestUser = !localStorage.getItem(TOKEN_KEY) || !localStorage.getItem(USER_TYPE_KEY);
    const isAdminUser = localStorage.getItem(TOKEN_KEY) && localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN;
    if (isGuestUser || isAdminUser) {
      const matchPathCondition =
        !path.startsWith(links.VIEW_PRODUCT) &&
        !path.startsWith(links.VIEW_VIDEO) &&
        !path.startsWith(links.VIEW_CERTIFICATE) &&
        path !== links.DATA_NOT_FOUND;

      if (matchPathCondition) {
        router.push(links.LOGIN);
      }
    } else {
      const user = localStorage.getItem(USER_KEY)
        ? JSON.parse(localStorage.getItem(USER_KEY) || "")
        : null;
      if (typeof user === "object") {
        setUsername(user?.firstName);
      }
      setIsLoggedIn(true);
    }
  }, [router, path]);

  const handleCart = () => {
    router.push(links.CART);
  };

  useEffect(() => {
    if (!isChangePasswordRequestLoading && changePasswordRequestResponse) {
      if (
        changePasswordRequestResponse.responseCode === ResponseCodes.SUCCESS
      ) {
        dispatch(
          showAlert({
            variant: EVariant.SUCCESS,
            message: changePasswordRequestResponse.message,
          })
        );
        setIsChangePasswordConfirmationOpen(false);
      }
    }
  }, [isChangePasswordRequestLoading, changePasswordRequestResponse, dispatch]);

  const onExpandSearch = () => {
    if (!isInputFocused) {
      setExpandSearch((prev) => !prev);
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const inputChangedHandler = (e: any) => {
    const { value, id } = e.target;

    if (id === "search") {
      setSearchValue(value);
      return;
    }
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParam.toString());
    let searchLink = links.SEARCH_RESULT;

    if (searchLink === path) {
      urlParams.set("stoneIds", searchValue);
      searchLink = `${searchLink}?${urlParams}`;
    } else {
      searchLink = `${searchLink}?stoneIds=${searchValue}`;
    }
    router.push(searchLink);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="fixed top-0 lg:h-20 bg-secondary shadow-md w-full z-30 py-3">
          <div className="flex gap-3 h-full items-center justify-between lg:justify-start px-4 md:px-8 w-full">
            <div className="w-full block lg:hidden z-[3] relative">
              <Image
                src={DrawerIcon}
                alt="drawer"
                className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] cursor-pointer"
                onClick={() => {
                  setIsOpen((open) => !open);
                }}
              />
            </div>
            <Link href={links.HOME}>
              <Image
                src={motibaGemsLogo}
                alt="logo"
                className="h-10 lg:w-20 hover:scale-105 transition-transform duration-500"
                id="logo-blue"
              />
            </Link>
            <div className="flex items-center justify-end lg:justify-between w-full">
              <div
                ref={dropdownRef}
                className={`${
                  isOpen ? "!block !left-0 w-full" : "h-[3rem] -left-[150%] "
                } ${
                  navClasses["nav-links"]
                } lg:left-0 z-[3] flex flex-col lg:flex-row items-center`}
              >
                <ul className="flex flex-col lg:flex-row items-center mt-[2rem] md:mt-[0rem] gap-5 xl:gap-8">
                  <li className="w-full lg:hidden">
                    <Image
                      alt="image"
                      src={CancelIcon}
                      width={40}
                      height={40}
                      className="ml-auto mr-[1rem]"
                      onClick={() => setIsOpen((open) => !open)}
                    />
                  </li>
                  <li
                    className={`m-0 cursor-pointer after:content-[''] after:h-0.5 rounded-[60rem] after:bg-tertiary after:rounded-full after:block w-fit after:w-0 hover:after:w-full after:scale-x-0 hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 ${
                      path === links.DASHBOARD ? navClasses["active-link"] : ""
                    }`}
                  >
                    <a
                      href={links.DASHBOARD}
                      className={`title ${
                        path === links.DASHBOARD
                          ? "text-tertiary"
                          : "text-primary"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="relative z-[3] md:z-[4]">
                    <div className="md:hidden">
                      <h2 className="mb-0" id="headingOne">
                        <button
                          className={`${
                            isCssDropdownOpen &&
                            `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                          } group relative flex w-full items-center rounded-t-[15rem] border-white border-0 bg-white px-5 py-2 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                          type="button"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <div
                            className={`cursor-pointer relative after:content-[''] after:block after:h-[0rem] after:absolute after:top-full after:bg-tertiary after:w-0 after:scale-x-0 after:transition after:transform after:duration-300 after:ease-in-out flex items-center justify-center gap-1 group ${
                              path === links.ADVANCE_SEARCH
                                ? `${navClasses["active-link"]} `
                                : ""
                            }`}
                            onClick={toggleCssDropdown}
                          >
                            <span
                              className={`title text-primary  cursor-pointer after:content-[''] after:h-0.5 rounded-[60rem] after:bg-tertiary after:block w-fit after:w-0 hover:after:w-full after:scale-x-0 hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 ${
                                path === links.ADVANCE_SEARCH
                                  ? "text-tertiary"
                                  : "text-primary"
                              }`}
                            >
                              Certified stock search
                            </span>

                            <Image
                              src={DownArrowIcon}
                              alt="dropdown icon"
                              width={10}
                              height={10}
                              className={`w-[0.8rem] h-[0.8rem] ${
                                isCssDropdownOpen ? "rotate-180" : ""
                              } transition duration-300`}
                              id="menuIconDark2"
                            />
                          </div>
                        </button>
                      </h2>
                      <TECollapse
                        show={isCssDropdownOpen}
                        className="!mt-0 !rounded-b-none !shadow-none"
                      >
                        <div className="bg-white flex flex-col justify-center rounded-[1rem]">
                          <Link
                            href={{
                              pathname: links.ADVANCE_SEARCH,
                              query: {
                                diamondType: EDiamondType.NATURAL_DIAMONDS,
                              },
                            }}
                            className={`flex items-center pl-5 py-2 mt-[0.5rem] hover:bg-[#0000000d]`}
                            onClick={() => setIsOpen(false)}
                          >
                            <p className="title text-primary">
                              Natural Diamonds
                            </p>
                          </Link>
                          <Link
                            href={{
                              pathname: links.ADVANCE_SEARCH,
                              query: {
                                diamondType: EDiamondType.LAB_GROWN_DIAMONDS,
                              },
                            }}
                            className={`flex items-center pl-5 py-2 mt-[0.5rem] hover:bg-[#0000000d]`}
                            onClick={() => setIsOpen(false)}
                          >
                            <p className="title text-primary">
                              Lab Grown Diamonds
                            </p>
                          </Link>
                        </div>
                      </TECollapse>
                    </div>
                    <div
                      className={`max-md:hidden cursor-pointer relative after:content-[''] after:block after:h-[2px] after:absolute after:top-full after:bg-tertiary after:w-0 after:scale-x-0 after:transition after:transform after:duration-300 after:ease-in-out flex items-center gap-1 group ${
                        path === links.ADVANCE_SEARCH
                          ? `${navClasses["active-link"]} `
                          : "hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 hover:after:w-full"
                      }`}
                      onClick={toggleCssDropdown}
                    >
                      <span
                        className={`mt-[0.6rem] title text-primary  cursor-pointer  rounded-[60rem]  ${
                          path === links.ADVANCE_SEARCH
                            ? "text-tertiary"
                            : "text-primary"
                        }`}
                      >
                        Certified stock search
                      </span>

                      <Image
                        src={DownArrowIcon}
                        alt="dropdown icon"
                        width={10}
                        height={10}
                        className={`w-[0.8rem] h-[0.8rem] mt-2 ${
                          isCssDropdownOpen ? "rotate-180" : ""
                        } transition duration-300`}
                        id="menuIconDark2"
                      />
                      <div
                        className={`absolute z-[2] top-full right-0 w-[11rem]  ${
                          isCssDropdownOpen ? "flex flex-col" : "hidden"
                        }  transition-all duration-300 ease-in-out origin-top`}
                      >
                        <div className="rounded-[1rem] bg-white flex flex-col justify-center mt-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] pb-4">
                          <Link
                            href={{
                              pathname: links.ADVANCE_SEARCH,
                              query: {
                                diamondType: EDiamondType.NATURAL_DIAMONDS,
                              },
                            }}
                            className={`flex items-center justify-center py-2 mt-[0.5rem] hover:bg-[#0000000d]`}
                            onClick={() => setIsOpen(false)}
                          >
                            <p className="title text-primary text-[12px]">
                              Natural Diamonds
                            </p>
                          </Link>

                          <Link
                            href={{
                              pathname: links.ADVANCE_SEARCH,
                              query: {
                                diamondType: EDiamondType.LAB_GROWN_DIAMONDS,
                              },
                            }}
                            className={`flex items-center justify-center py-2 hover:bg-[#0000000d]`}
                            onClick={() => setIsOpen(false)}
                          >
                            <p className="title text-primary text-[12px]">
                              Lab Grown Diamonds
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`m-0 cursor-pointer after:content-[''] after:h-0.5 rounded-[60rem] after:bg-tertiary after:rounded-full after:block w-fit after:w-0 hover:after:w-full after:scale-x-0 hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 ${
                      path === links.PRICE_TRACK
                        ? `${navClasses["active-link"]} hover:after:scale-x-[0]`
                        : ""
                    }`}
                  >
                    <a
                      href={links.PRICE_TRACK}
                      className={`title ${
                        path === links.PRICE_TRACK
                          ? "text-tertiary"
                          : "text-primary"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Price track
                    </a>
                  </li>
                  {/*<li
                  className={`m-0 cursor-pointer after:content-[''] after:h-0.5 rounded-[60rem] after:bg-tertiary after:rounded-full after:block w-fit after:w-0 hover:after:w-full after:scale-x-0 hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 ${
                    path === links.PRICE_TRACK ? navClasses["active-link"] : ""
                  }`}
                >
                  <a
                    href="#"
                    className={`title text-primary`}
                    onClick={() => setIsOpen(false)}
                  >
                    My offers
                  </a>
                </li>*/}
                  <li
                    className={`m-0 cursor-pointer after:content-[''] after:h-0.5 rounded-[60rem] after:bg-tertiary after:rounded-full after:block w-fit after:w-0 hover:after:w-full after:scale-x-0 hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 ${
                      path === links.HISTORY
                        ? "after:bg-tertiary after:scale-x-[0.3] after:transform after:transition-all after:w-full"
                        : ""
                    }`}
                  >
                    <a
                      href={links.HISTORY}
                      className={`title ${
                        path === links.HISTORY
                          ? "text-tertiary"
                          : "text-primary"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Purchase history
                    </a>
                  </li>
                  <li
                    className={`m-0 cursor-pointer after:content-[''] after:h-0.5 rounded-[60rem] after:bg-tertiary after:rounded-full after:block w-fit after:w-0 hover:after:w-full after:scale-x-0 hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 ${
                      path === links.DASHBOARD
                        ? "after:bg-tertiary after:scale-x-[0.3] after:transform after:transition-all "
                        : ""
                    }`}
                    onClick={toggleFeedBackHandle}
                  >
                    <a
                      href="#"
                      className={`title text-primary`}
                      onClick={() => setIsOpen(false)}
                    >
                      Feedback
                    </a>
                    {isFeedBackOpen ? (
                      <Feedback
                        handleSubmitButton={() => setIsFeedBackOpen(false)}
                        handleCancleButton={() => setIsFeedBackOpen(false)}
                      />
                    ) : (
                      ""
                    )}
                  </li>
                  <li
                    className={`m-0 cursor-pointer after:content-[''] after:h-0.5 rounded-[60rem] after:bg-tertiary after:rounded-full after:block w-fit after:w-0 hover:after:w-full after:scale-x-0 hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 ${
                      path === links.DASHBOARD
                        ? "after:bg-tertiary after:scale-x-[0.3] after:transform after:transition-all "
                        : ""
                    }`}
                    onClick={toggleHelpDropdown}
                  >
                    <span
                      className={`title text-primary`}
                      onClick={() => setIsOpen(false)}
                    >
                      Help
                    </span>
                    {isHelpDropdownOpen ? (
                      <HelpDropDown
                        handleCancleButton={() => setIsHelpDropdownOpen(false)}
                        handleSubmitButton={() => setIsHelpDropdownOpen(false)}
                      />
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              </div>

              <div className=" flex items-center">
                <div
                  className={`hidden md:flex items-center bg-customer-background ${
                    expandSearch ? "py-0" : " py-[0.6rem]"
                  } px-5 rounded-xl cursor-pointer mr-3`}
                  onClick={onExpandSearch}
                >
                  <Image alt="image" src={SearchIcon} className="w-5 h-5" />
                  {expandSearch ? (
                    <>
                      <form onSubmit={onSearch}>
                        <input
                          type="text"
                          className="mx-2 bg-customer-background font-normal text-sm font-poppins py-[0.6rem] outline-none"
                          placeholder="Search.."
                          value={searchValue}
                          id="search"
                          onChange={inputChangedHandler}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                        />
                      </form>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="flex items-center justify-center bg-customer-background py-2 px-5 rounded-xl ml-4 cursor-pointer"
                  onClick={handleCart}
                >
                  <Image alt="image" src={cartIcon} className="w-6 h-6" />
                  <p className="title pl-2 !text-base">{cartItems}</p>
                </div>
                <div className="flex items-center ml-2 lg:ml-3">
                  <div className="bg-customer-background border border-tertiary rounded-full w-8 h-8 flex justify-center items-center">
                    <Image
                      src={UserProfileIcon}
                      alt="image"
                      className="object-contain w-5 h-5"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:ml-1">
                  <div className="flex justify-between w-full">
                    <p className="text-xs max-lg:hidden">Hello,</p>
                    <div
                      className={`cursor-pointer relative transition transform duration-300 ease-in-out group`}
                      onClick={toggleMoreDropdown}
                    >
                      <Image
                        src={MoreIcon}
                        alt="image"
                        className="w-7 sm:w-4 h-7 sm:h-4 cursor-pointer"
                      />
                      <TECollapse
                        show={isMoreDropdownOpen}
                        className="!absolute !z-[2] !top-full !rounded-[1rem] !right-0 !w-max !shadow-md !h-auto"
                      >
                        <div
                          className={`rounded-[1rem] shadow-md bg-white flex flex-col justify-center mt-3 pb-4 relative z-[2] ${
                            isMoreDropdownOpen ? "visible" : "invisible"
                          }`}
                        >
                          <a
                            href={links.USER_PROFILE}
                            className={`flex items-center py-2 mt-[0.5rem] hover:bg-[#0000000d] ${
                              path === links.USER_PROFILE
                                ? "bg-[#0000000d]"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-center px-4">
                              <Image
                                src={User}
                                alt="image"
                                width={18}
                                height={18}
                                className="w-5 h-5 object-contain"
                              />
                              <p className="text-sm font-medium text-primary ml-[0.7rem]">
                                My Profile
                              </p>
                            </div>
                          </a>

                          <a
                            type="button"
                            className={`flex items-center  py-2 hover:bg-[#0000000d]`}
                            onClick={() =>
                              setIsChangePasswordConfirmationOpen(true)
                            }
                          >
                            <div className="flex items-center justify-center px-4">
                              <Image
                                src={changePasswordIcon}
                                alt="image"
                                width={18}
                                height={18}
                                className="w-5 h-5 object-contain"
                              />
                              <p className="text-sm font-medium text-primary ml-[0.7rem]">
                                Change Password
                              </p>
                            </div>
                          </a>

                          <a
                            href={links.HISTORY}
                            className={`flex items-center  py-2 hover:bg-[#0000000d]  ${
                              path === links.HISTORY ? "bg-[#0000000d]" : ""
                            }`}
                          >
                            <div className="flex items-center justify-center px-4">
                              <Image
                                src={MyOrderIcon}
                                alt="image"
                                width={18}
                                height={18}
                                className="w-5 h-5 object-contain"
                              />
                              <p className="text-sm font-medium text-primary ml-[0.7rem]">
                                My Orders
                              </p>
                            </div>
                          </a>

                          <a
                            onClick={handleLogout}
                            className={`flex items-center  py-2 hover:bg-[#0000000d]`}
                          >
                            <div className="flex items-center justify-center px-4">
                              <Image
                                src={LogoutIcon}
                                alt="image"
                                width={18}
                                height={18}
                                className="w-5 h-5 object-contain"
                              />
                              <p className="text-sm font-medium text-primary ml-[0.7rem]">
                                Log out
                              </p>
                            </div>
                          </a>
                        </div>
                      </TECollapse>
                    </div>
                  </div>
                  <p className="font-semibold !text-xs capitalize max-lg:hidden">
                    {username
                      ? username.length > 10
                        ? `${username.slice(0, 10)}...`
                        : username
                      : "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="block md:hidden mt-3">
            <form onSubmit={onSearch} className="flex justify-center">
              <input
                type="text"
                className="bg-customer-background font-normal text-sm font-poppins p-3 w-[95%] rounded-xl"
                placeholder="Search.."
                value={searchValue}
                id="search"
                onChange={inputChangedHandler}
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="fixed top-0 lg:h-20 w-full z-30">
          <GuestNavbar />
        </div>
      )}
      {isChangePasswordConfirmationOpen ? (
        <ChangePasswordConfirmation
          onCancel={() => setIsChangePasswordConfirmationOpen(false)}
          onSend={() => {
            changePasswordRequestRequest(router);
          }}
          isLoading={isChangePasswordRequestLoading}
        />
      ) : null}
    </>
  );
}

export default Navbar;
