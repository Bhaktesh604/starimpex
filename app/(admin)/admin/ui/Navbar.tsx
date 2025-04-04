"use client";
import { links } from "@/utils/links";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import NotificationIcon from "@/public/assets/admin-dashboard/notification.png";
import UserIcon from "@/public/assets/images/ic-user-profile.svg";
import LogoutIcon from "@/public/assets/images/ic-logout.svg";
import DrawerIcon from "@/public/assets/images/ic-drawer.svg";
import CancelIcon from "@/public/assets/images/ic-cancel.svg";
import navClasses from "./Navbar.module.scss";
import { FCM_TOKEN_KEY, TOKEN_KEY, USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";
import DownArrowIcon from "@/public/assets/images/ic-down-arrow.svg";
import { TECollapse } from "tw-elements-react";
import Link from "next/link";
import { adminLogoutApi } from "../api/auth.api";
import useApiRequest from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import { useDispatch } from "react-redux";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { firebaseApp } from "@/utils/fcm.util";
import { getMessaging, onMessage } from "firebase/messaging";
import Ellipse_icon from "@/public/assets/admin-dashboard/ic-ellipse-red.svg";
import {
  clearAllNotificationApi,
  clearSingleNotificationApi,
  getNotificationListApi,
  markNotificationReadApi,
} from "../api/notification.api";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { NotificationTypes } from "@/utils/content.util";
import { notificationIcon } from "@/utils/notificationConst";
import close_icon from "@/public/assets/admin-dashboard/notif_close_icon.svg";
import { formatNotificationTime } from "@/utils/helper";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
// import motibaGemsLogo from "@/public/assets/images/motiba-gems-logo.svg";
import motibaGemsLogo from "@/public/assets/images/starimpex.png";
import Report from "./Report";
import SearchIcon from "@/public/assets/customer-dashboard/ic-search.svg";

function Navbar() {
  const router = useRouter();

  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDiamondDropdownOpen, setIsDiamondDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationList, setNotificationList] = useState<any>([]);
  const [reports, setReports] = useState(false);
  const searchParam = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [expandSearch, setExpandSearch] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const {
    loading: isLogoutRequestLoading,
    data: logoutResponse,
    request: logoutRequest,
  } = useApiRequest(adminLogoutApi);
  const dispatch = useDispatch();

  const {
    loading: isGetAllNotificationRequestLoading,
    data: getAllNotificationResponse,
    request: getAllNotificationRequest,
  } = useApiRequest(getNotificationListApi);

  const {
    loading: isClearSingleNotificationRequestLoading,
    data: getClearSingleNotificationResponse,
    request: getClearSingleNotificationRequest,
  } = useApiRequest(clearSingleNotificationApi);

  const {
    loading: isClearAllNotificationRequestLoading,
    data: getClearAllNotificationResponse,
    request: getClearAllNotificationRequest,
  } = useApiRequest(clearAllNotificationApi);

  const {
    loading: markReadNotificationLoading,
    data: markReadNotificationResponse,
    request: markReadNotificationsRequest,
  } = useApiRequest(markNotificationReadApi);

  const toggleDiamondDropdown = () => {
    setIsOrderDropdownOpen(false);
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false);
    setIsMoreDropdownOpen(false);
    setIsDiamondDropdownOpen((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setIsDiamondDropdownOpen(false);
    setIsMenuOpen(false);
    setIsMoreDropdownOpen(false);
    setIsOrderDropdownOpen(false);
    setIsUserDropdownOpen((prev) => !prev);
  };

  const toggleOrderDropdown = () => {
    setIsDiamondDropdownOpen(false);
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false);
    setIsMoreDropdownOpen(false);
    setIsOrderDropdownOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsDiamondDropdownOpen(false);
    setIsUserDropdownOpen(false);
    setIsMoreDropdownOpen(false);
    setIsOrderDropdownOpen(false);
    setIsMenuOpen((prev) => !prev);
  };

  const toggleReports = () => {
    setReports(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      // setIsMoreDropdownOpen(false);
      setIsDiamondDropdownOpen(false);
      setIsOrderDropdownOpen(false);
      setIsUserDropdownOpen(false);
      setIsMenuOpen(false);
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

  useEffect(() => {
    const userType = localStorage.getItem(USER_TYPE_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
  
    if (!token || userType !== EUserType.ADMIN) {
      router.push(links.LOGIN);
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);

      const unsubscribe = onMessage(messaging, (payload) => {
        if (payload && payload.notification?.body) {
          dispatch(
            showAlert({
              message: payload.notification?.body,
              variant: EVariant.SUCCESS,
            })
          );
        }
        if (payload?.data?.data) {
          try {
            const parsedData = JSON.parse(payload.data.data);

            if (
              parsedData.type === NotificationTypes.USER_ADD_TO_CART_ACTION ||
              parsedData.type === NotificationTypes.NEW_ORDER ||
              parsedData.type === NotificationTypes.NEW_REGISTRATION ||
              parsedData.type ===
                NotificationTypes.USER_ADD_TO_PRICE_TRACK_ACTION
            ) {
              setNotificationList((prevList: any) => [
                {
                  title: parsedData.title,
                  body: parsedData.body,
                  url: parsedData.url,
                  createdAt: parsedData.createdAt,
                  updatedAt: parsedData.updatedAt,
                  _id: parsedData._id,
                },
                ...prevList,
              ]);
            }
            getNotification();
          } catch (error) {
            throw error;
          }
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [dispatch]);

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
        router.replace(links.ADMIN_LOGIN);
      }
    }
  }, [dispatch, isLogoutRequestLoading, logoutResponse, router]);

  useEffect(() => {
    if (!isGetAllNotificationRequestLoading && getAllNotificationResponse) {
      if (getAllNotificationResponse.responseCode === ResponseCodes.SUCCESS) {
        setNotificationList(getAllNotificationResponse.data.notifications);
      }
    }
  }, [getAllNotificationResponse, isGetAllNotificationRequestLoading]);

  const onLogoutHandler = (e: any) => {
    e.preventDefault();

    logoutRequest(router, localStorage.getItem(FCM_TOKEN_KEY) || "");
  };

  useEffect(() => {
    const userType = localStorage.getItem(USER_TYPE_KEY);
  if (userType === EUserType.ADMIN) {
    getNotification();
  }
  }, []);

  const getNotification = useCallback(() => {
    const userType = localStorage.getItem(USER_TYPE_KEY);
  if (userType === EUserType.ADMIN) {
    getAllNotificationRequest(router);
  }
  }, [getAllNotificationRequest, router]);

  useEffect(() => {
    if (!markReadNotificationLoading && markReadNotificationResponse) {
      if (markReadNotificationResponse.responseCode === ResponseCodes.SUCCESS) {
        getNotification();
      }
    }
  }, [markReadNotificationLoading, markReadNotificationResponse]);

  useEffect(() => {
    if (
      !isClearSingleNotificationRequestLoading &&
      getClearSingleNotificationResponse
    ) {
      if (
        getClearSingleNotificationResponse.responseCode ===
        ResponseCodes.SUCCESS
      ) {
        toast.success(getClearSingleNotificationResponse.message);
        getNotification();
      }
    }
  }, [
    getClearSingleNotificationResponse,
    isClearSingleNotificationRequestLoading,
  ]);

  useEffect(() => {
    if (
      !isClearAllNotificationRequestLoading &&
      getClearAllNotificationResponse
    ) {
      if (
        getClearAllNotificationResponse.responseCode === ResponseCodes.SUCCESS
      ) {
        toast.success(getClearAllNotificationResponse.message);
        getNotification();
      }
    }
  }, [getClearAllNotificationResponse, isClearAllNotificationRequestLoading]);

  const allClearNotification = async () => {
    getClearAllNotificationRequest(router);
  };

  const handleSingeClear = async (e: any, item: any) => {
    e.stopPropagation();
    getClearSingleNotificationRequest(router, item._id);
  };

  const markAsReadNotification = async (item: any, url: any) => {
    if (item.isRead === false) {
      markReadNotificationsRequest(router, item._id);
    }

    if (url) {
      router.push(url);
    }
  };

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
    let searchLink = links.ADMIN_SEARCH_RESULT;

    if (searchLink === path) {
      urlParams.set("stoneIds", searchValue);
      searchLink = `${searchLink}?${urlParams}`;
    } else {
      searchLink = `${searchLink}?stoneIds=${searchValue}`;
    }
    router.push(searchLink);
  };

  return (
    <div className="fixed top-0 bg-secondary w-full z-30 shadow-md lg:h-20 pb-3 lg:pb-0">
      <div className="flex h-full items-center justify-between md:justify-start px-8 py-2 w-full">
        <div className="w-full block md:hidden z-[3] relative">
          <Image
            src={DrawerIcon}
            alt="drawer icon"
            className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem]"
            onClick={() => {
              setIsOpen((open) => !open);
            }}
          />
        </div>
        <a href={links.ADMIN_DASHBOARD}>
          <Image
            src={motibaGemsLogo}
            alt="logo"
            className="max-md:h-10 md:w-16 aspect-[4/3] hover:scale-105 transition-transform duration-500"
            id="logo-blue"
          />
        </a>
        <div className="flex items-center justify-end md:justify-between pl-5 w-full">
          <div
            ref={dropdownRef}
            className={`${
              isOpen ? "!block !left-0 w-full" : "h-[3rem] -left-[150%] "
            } ${
              navClasses["nav-links"]
            } md:left-0 z-[3] flex flex-col md:flex-row items-center`}
          >
            <ul className="flex flex-col md:flex-row items-baseline max-md:items-center mt-[2rem] md:mt-[0rem] gap-5 xl:gap-6">
              <li className="w-full md:hidden">
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
                className={`m-0 cursor-pointer after:content-[''] after:h-0.5 after:bg-tertiary after:rounded-full after:block w-fit after:w-0 hover:after:w-full after:scale-x-0 hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 ${
                  path === links.ADMIN_DASHBOARD
                    ? navClasses["active-link"]
                    : ""
                }`}
              >
                <a
                  href={links.ADMIN_DASHBOARD}
                  className={`font-medium ${
                    path === links.ADMIN_DASHBOARD
                      ? "text-tertiary"
                      : "text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </a>
              </li>
              <li className="relative z-[3] md:z-[4] mb-0">
                <div className="md:hidden">
                  <h2 className="mb-0" id="headingOne">
                    <button
                      className={`${
                        isDiamondDropdownOpen &&
                        `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                      } group relative flex w-full items-center rounded-t-[15rem] border-white border-0 bg-white px-5 py-2  text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                      type="button"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div
                        className={`cursor-pointer relative after:content-[''] after:block after:h-0.5 after:absolute after:top-full after:bg-tertiary after:w-0 after:scale-x-0 after:transition after:transform after:duration-300 after:ease-in-out flex items-center gap-1 group ${
                          path === links.ADMIN_ADVANCE_SEARCH ||
                          path === links.UPLOAD_DIAMONDS ||
                          path === links.SEARCH_ANALYTICS
                            ? navClasses["active-link"]
                            : "hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 hover:after:w-full"
                        }`}
                        onClick={toggleDiamondDropdown}
                      >
                        <a
                          className={`font-medium text-primary cursor-pointer ${
                            path === links.ADMIN_ADVANCE_SEARCH ||
                            path === links.UPLOAD_DIAMONDS ||
                            path === links.SEARCH_ANALYTICS
                              ? "text-tertiary"
                              : "text-primary"
                          }`}
                        >
                          Diamonds
                        </a>
                        <Image
                          src={DownArrowIcon}
                          alt="dropdown icon"
                          width={10}
                          height={10}
                          className={`w-[0.8rem] h-[0.8rem]  ${
                            isDiamondDropdownOpen ? "rotate-180" : ""
                          } transition duration-300`}
                          id="menuIconDark2"
                        />
                      </div>
                    </button>
                  </h2>
                  <TECollapse
                    show={isDiamondDropdownOpen}
                    className="!mt-0 !rounded-b-none !shadow-none"
                  >
                    <div className="bg-white flex flex-col justify-center rounded-[1rem]">
                      <Link
                        href={{
                          pathname: links.ADMIN_ADVANCE_SEARCH,
                        }}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.ADMIN_ADVANCE_SEARCH
                            ? "bg-gray-200"
                            : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          Search Diamonds
                        </p>
                      </Link>
                      <Link
                        href={{
                          pathname: links.UPLOAD_DIAMONDS,
                        }}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.UPLOAD_DIAMONDS ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          Upload Diamonds
                        </p>
                      </Link>
                      <Link
                        href={{
                          pathname: links.SEARCH_ANALYTICS,
                        }}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.SEARCH_ANALYTICS ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          Analytics
                        </p>
                      </Link>
                    </div>
                  </TECollapse>
                </div>
                <div
                  className={`max-md:hidden cursor-pointer relative after:content-[''] after:block after:h-0.5 after:absolute after:top-full after:bg-tertiary after:w-0 after:scale-x-0 after:transition after:transform after:duration-300 after:ease-in-out flex items-center gap-1 group ${
                    path === links.ADMIN_ADVANCE_SEARCH ||
                    path === links.UPLOAD_DIAMONDS ||
                    path === links.SEARCH_ANALYTICS
                      ? navClasses["active-link"]
                      : "hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 hover:after:w-full"
                  }`}
                  onClick={toggleDiamondDropdown}
                >
                  <span
                    className={`font-medium text-primary  cursor-pointer ${
                      path === links.ADMIN_ADVANCE_SEARCH ||
                      path === links.UPLOAD_DIAMONDS ||
                      path === links.SEARCH_ANALYTICS
                        ? "text-tertiary"
                        : "text-primary"
                    }`}
                  >
                    Diamonds
                  </span>
                  <Image
                    src={DownArrowIcon}
                    alt="dropdown icon"
                    width={10}
                    height={10}
                    className={`w-3 h-w-3 ${
                      isDiamondDropdownOpen ? "rotate-180" : ""
                    } transition duration-300`}
                    id="menuIconDark2"
                  />
                  <div
                    className={`absolute z-[2] top-full right-0 w-36 ${
                      isDiamondDropdownOpen ? "flex flex-col" : "hidden"
                    }  transition-all duration-300 ease-in-out origin-top`}
                  >
                    <div className="rounded-md overflow-hidden bg-white mt-1 flex flex-col justify-center shadow-md">
                      <Link
                        className={`flex items-center justify-center py-2  hover:bg-gray-200 ${
                          path === links.ADMIN_ADVANCE_SEARCH
                            ? "bg-gray-200"
                            : ""
                        }`}
                        href={links.ADMIN_ADVANCE_SEARCH}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          Search Diamonds
                        </span>
                      </Link>
                      <Link
                        className={`flex items-center justify-center py-2 hover:bg-gray-200 ${
                          path === links.UPLOAD_DIAMONDS ? "bg-gray-200" : ""
                        }`}
                        href={links.UPLOAD_DIAMONDS}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          Upload Diamonds
                        </span>
                      </Link>
                      <Link
                        className={`flex items-center justify-center py-2  hover:bg-gray-200 ${
                          path === links.SEARCH_ANALYTICS ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                        href={links.SEARCH_ANALYTICS}
                      >
                        <span className="font-medium text-primary text-xs">
                          Analytics
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              <li className="relative z-[3] md:z-[4] mb-0">
                <div className="md:hidden">
                  <h2 className="mb-0" id="headingOne">
                    <button
                      className={`${
                        isUserDropdownOpen &&
                        `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                      } group relative flex w-full items-center rounded-t-[15rem] border-white border-0 bg-white px-5 py-2  text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                      type="button"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div
                        className={`cursor-pointer relative after:content-[''] after:block after:h-0.5 after:absolute after:top-full after:bg-tertiary after:w-0 after:scale-x-0 after:transition after:transform after:duration-300 after:ease-in-out flex items-center gap-1 group ${
                          path === links.USER_LIST ||
                          path === links.ADMIN_CART ||
                          path === links.ADMIN_PRICE_TRACK
                            ? navClasses["active-link"]
                            : "hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 hover:after:w-full"
                        }`}
                        onClick={toggleUserDropdown}
                      >
                        <a
                          className={`font-medium text-primary cursor-pointer ${
                            path === links.USER_LIST ||
                            path === links.ADMIN_CART ||
                            path === links.ADMIN_PRICE_TRACK
                              ? "text-tertiary"
                              : "text-primary"
                          }`}
                        >
                          Users
                        </a>
                        <Image
                          src={DownArrowIcon}
                          alt="dropdown icon"
                          width={10}
                          height={10}
                          className={`w-3 h-3 ${
                            isUserDropdownOpen ? "rotate-180" : ""
                          } transition duration-300`}
                          id="menuIconDark2"
                        />
                      </div>
                    </button>
                  </h2>
                  <TECollapse
                    show={isUserDropdownOpen}
                    className="!mt-0 !rounded-none !shadow-none"
                  >
                    <div className="bg-white flex flex-col justify-center rounded-[1rem]">
                      <Link
                        href={{
                          pathname: links.USER_LIST,
                        }}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.USER_LIST ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          User List
                        </p>
                      </Link>
                      <Link
                        href={{
                          pathname: links.ADMIN_CART,
                        }}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.ADMIN_CART ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">Cart</p>
                      </Link>
                      <Link
                        href={links.ADMIN_PRICE_TRACK}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === "" ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          Tracked Diamonds
                        </p>
                      </Link>
                    </div>
                  </TECollapse>
                </div>
                <div
                  className={`max-md:hidden cursor-pointer relative after:content-[''] after:block after:h-0.5 after:absolute after:top-full after:bg-tertiary after:w-0 after:scale-x-0 after:transition after:transform after:duration-300 after:ease-in-out flex items-center gap-1 group ${
                    path === links.USER_LIST ||
                    path === links.ADMIN_CART ||
                    path === links.ADMIN_PRICE_TRACK
                      ? navClasses["active-link"]
                      : "hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 hover:after:w-full"
                  }`}
                  onClick={toggleUserDropdown}
                >
                  <span
                    className={`font-medium text-primary cursor-pointer ${
                      path === links.USER_LIST ||
                      path === links.ADMIN_CART ||
                      path === links.ADMIN_PRICE_TRACK
                        ? "text-tertiary"
                        : "text-primary"
                    }`}
                  >
                    Users
                  </span>
                  <Image
                    src={DownArrowIcon}
                    alt="dropdown icon"
                    width={10}
                    height={10}
                    className={`w-3 h-3  ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    } transition duration-300`}
                    id="menuIconDark2"
                  />
                  <div
                    className={`absolute z-[2] top-full right-0 w-36  ${
                      isUserDropdownOpen ? "flex flex-col" : "hidden"
                    }  transition-all duration-300 ease-in-out origin-top`}
                  >
                    <div className="rounded-md overflow-hidden bg-white mt-1 flex flex-col justify-center shadow-md">
                      <Link
                        className={`flex items-center justify-center py-2  hover:bg-gray-200 ${
                          path === links.USER_LIST ? "bg-gray-200" : ""
                        }`}
                        href={links.USER_LIST}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          User List
                        </span>
                      </Link>
                      <Link
                        className={`flex items-center justify-center py-2  hover:bg-gray-200 ${
                          path === links.ADMIN_CART ? "bg-gray-200" : ""
                        }`}
                        href={links.ADMIN_CART}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          Cart
                        </span>
                      </Link>
                      <Link
                        className={`flex items-center justify-center py-2 hover:bg-gray-200 ${
                          path === links.ADMIN_PRICE_TRACK ? "bg-gray-200" : ""
                        }`}
                        href={links.ADMIN_PRICE_TRACK}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          Tracked Diamonds
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              <li className="relative z-[3] md:z-[4] mb-0">
                <div className="md:hidden">
                  <h2 className="mb-0" id="headingOne">
                    <button
                      className={`${
                        isOrderDropdownOpen &&
                        `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                      } group relative flex w-full items-center rounded-t-[15rem] border-white border-0 bg-white px-5 py-2  text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                      type="button"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div
                        className={`cursor-pointer relative after:content-[''] after:block after:h-0.5 after:absolute after:top-full after:bg-tertiary after:w-0 after:scale-x-0 after:transition after:transform after:duration-300 after:ease-in-out flex items-center gap-1 group ${
                          path === links.ORDER_LIST
                            ? navClasses["active-link"]
                            : "hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 hover:after:w-full"
                        }`}
                        onClick={toggleOrderDropdown}
                      >
                        <a
                          className={`font-medium text-primary cursor-pointer ${
                            path === links.ORDER_LIST
                              ? "text-tertiary"
                              : "text-primary"
                          }`}
                        >
                          Orders
                        </a>
                        <Image
                          src={DownArrowIcon}
                          alt="dropdown icon"
                          width={10}
                          height={10}
                          className={`w-3 h-3  ${
                            isOrderDropdownOpen ? "rotate-180" : ""
                          } transition duration-300`}
                          id="menuIconDark2"
                        />
                      </div>
                    </button>
                  </h2>
                  <TECollapse
                    show={isOrderDropdownOpen}
                    className="!mt-0 !rounded-none !shadow-none"
                  >
                    <div className="bg-white flex flex-col justify-center mb-2">
                      <Link
                        href={{
                          pathname: links.ORDER_LIST,
                        }}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.ORDER_LIST ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          Sales
                        </p>
                      </Link>
                      <Link
                        href={{
                          pathname: links.ADMIN_PURCHASE_LIST,
                        }}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.ADMIN_PURCHASE_LIST
                            ? "bg-gray-200"
                            : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          Purchase
                        </p>
                      </Link>
                      <Link
                        href=""
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === "" ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          Reports
                        </p>
                      </Link>
                    </div>
                  </TECollapse>
                </div>
                <div
                  className={`max-md:hidden cursor-pointer relative after:content-[''] after:block after:h-0.5 after:absolute after:top-full after:bg-tertiary after:w-0 after:scale-x-0 after:transition after:transform after:duration-300 after:ease-in-out flex items-center gap-1 group ${
                    path === links.ORDER_LIST
                      ? navClasses["active-link"]
                      : "hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 hover:after:w-full"
                  }`}
                  onClick={toggleOrderDropdown}
                >
                  <span
                    className={`font-medium text-primary cursor-pointer ${
                      path === links.ORDER_LIST
                        ? "text-tertiary"
                        : "text-primary"
                    }`}
                  >
                    Orders
                  </span>
                  <Image
                    src={DownArrowIcon}
                    alt="dropdown icon"
                    width={10}
                    height={10}
                    className={`w-3 h-3  ${
                      isOrderDropdownOpen ? "rotate-180" : ""
                    } transition duration-300`}
                    id="menuIconDark2"
                  />
                  <div
                    className={`absolute z-[2] top-full right-0 w-36  ${
                      isOrderDropdownOpen ? "flex flex-col" : "hidden"
                    }  transition-all duration-300 ease-in-out origin-top`}
                  >
                    <div className="rounded-md overflow-hidden bg-white mt-1 flex flex-col justify-center shadow-md">
                      <Link
                        className={`flex items-center justify-center py-2 hover:bg-gray-200 ${
                          path === links.ORDER_LIST ? "bg-gray-200" : ""
                        }`}
                        href={links.ORDER_LIST}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          Sales
                        </span>
                      </Link>
                      <Link
                        className={`flex items-center justify-center py-2 hover:bg-gray-200 ${
                          path === links.ADMIN_PURCHASE_LIST
                            ? "bg-gray-200"
                            : ""
                        }`}
                        href={{ pathname: links.ADMIN_PURCHASE_LIST }}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          Purchase
                        </span>
                      </Link>
                      <Link
                        className={`flex items-center justify-center py-2 hover:bg-gray-200 ${
                          path === "" ? "bg-gray-200" : ""
                        }`}
                        href=""
                        onClick={toggleReports}
                      >
                        <span className="font-medium text-primary text-xs">
                          Reports
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
              {reports ? (
                <Report handleCloseReport={() => setReports(false)} />
              ) : (
                ""
              )}

              <li className="relative z-[3] md:z-[4] mb-0">
                <div className="md:hidden">
                  <h2 className="mb-0" id="headingOne">
                    <button
                      className={`${
                        isMenuOpen &&
                        `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)]`
                      } group relative flex w-full items-center rounded-t-[15rem] border-white border-0 bg-white px-5 py-2 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none`}
                      type="button"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div
                        className={`cursor-pointer relative after:content-[''] after:block after:h-[0rem] after:absolute after:top-full after:bg-tertiary after:w-0 after:scale-x-0 after:transition after:transform after:duration-300 after:ease-in-out flex items-center justify-center gap-1 group  ${
                          path === links.ADMIN_CONTACT ||
                          path === links.ADMIN_INQUIRY ||
                          path === links.ADMIN_HELP ||
                          path === links.ADMIN_FEEDBACK
                            ? `${navClasses["active-link"]} `
                            : ""
                        }`}
                        onClick={toggleMenu}
                      >
                        <a
                          className={`font-medium text-primary  cursor-pointer after:content-[''] after:h-0.5 after:bg-tertiary after:block w-fit after:w-0 hover:after:w-full after:scale-x-0 hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 ${
                            path === links.ADMIN_CONTACT ||
                            path === links.ADMIN_INQUIRY ||
                            path === links.ADMIN_HELP ||
                            path === links.ADMIN_FEEDBACK
                              ? "text-tertiary"
                              : "text-primary"
                          }`}
                        >
                          Support
                        </a>

                        <Image
                          src={DownArrowIcon}
                          alt="dropdown icon"
                          width={10}
                          height={10}
                          className={`w-3 h-3 ${
                            isMenuOpen ? "rotate-180" : ""
                          } transition duration-300`}
                          id="menuIconDark2"
                        />
                      </div>
                    </button>
                  </h2>
                  <TECollapse
                    show={isMenuOpen}
                    className="!mt-0 !rounded-none !shadow-none"
                  >
                    <div className="bg-white  flex flex-col justify-center mb-2">
                      <Link
                        href={links.ADMIN_CONTACT}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.ADMIN_CONTACT ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          Contact
                        </p>
                      </Link>
                      <Link
                        href={links.ADMIN_INQUIRY}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.ADMIN_INQUIRY ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          Inquiry
                        </p>
                      </Link>
                      <Link
                        href={links.ADMIN_HELP}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.ADMIN_HELP ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">Help</p>
                      </Link>
                      <Link
                        href={links.ADMIN_FEEDBACK}
                        className={`flex items-center p-2 mt-1 hover:bg-gray-200 ${
                          path === links.ADMIN_FEEDBACK ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <p className="font-medium text-sm text-primary">
                          Feedback
                        </p>
                      </Link>
                    </div>
                  </TECollapse>
                </div>
                <div
                  className={`max-md:hidden cursor-pointer relative after:content-[''] after:block after:h-0.5 after:absolute after:top-full after:bg-tertiary after:w-0 after:scale-x-0 after:transition after:transform after:duration-300 after:ease-in-out flex items-center gap-1 group ${
                    path === links.ADMIN_CONTACT ||
                    path === links.ADMIN_INQUIRY ||
                    path === links.ADMIN_HELP ||
                    path === links.ADMIN_FEEDBACK
                      ? `${navClasses["active-link"]} `
                      : "hover:after:scale-x-[0.3] after:transform after:transition-all after:duration-300 hover:after:w-full"
                  }`}
                  onClick={toggleMenu}
                >
                  <span
                    className={`font-medium text-primary cursor-pointer ${
                      path === links.ADMIN_CONTACT ||
                      path === links.ADMIN_INQUIRY ||
                      path === links.ADMIN_HELP ||
                      path === links.ADMIN_FEEDBACK
                        ? "text-tertiary"
                        : "text-primary"
                    }`}
                  >
                    Support
                  </span>

                  <Image
                    src={DownArrowIcon}
                    alt="dropdown icon"
                    width={10}
                    height={10}
                    className={`w-3 h-3  ${
                      isMenuOpen ? "rotate-180" : ""
                    } transition duration-300`}
                    id="menuIconDark2"
                  />
                  <div
                    className={`absolute z-20 top-full right-0 w-36  ${
                      isMenuOpen ? "flex flex-col" : "hidden"
                    }  transition-all duration-300 ease-in-out origin-top`}
                  >
                    <div className="rounded-md bg-white flex overflow-hidden flex-col justify-center mt-1 shadow-md">
                      <Link
                        href={links.ADMIN_CONTACT}
                        className={`flex justify-center items-center py-2  hover:bg-gray-200 ${
                          path === links.ADMIN_CONTACT ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          Contact
                        </span>
                      </Link>
                      <Link
                        href={links.ADMIN_INQUIRY}
                        className={`flex justify-center items-center py-2  hover:bg-gray-200 ${
                          path === links.ADMIN_INQUIRY ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          Inquiry
                        </span>
                      </Link>
                      <Link
                        href={links.ADMIN_HELP}
                        className={`flex justify-center items-center py-2  hover:bg-gray-200 ${
                          path === links.ADMIN_HELP ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          Help
                        </span>
                      </Link>
                      <Link
                        href={links.ADMIN_FEEDBACK}
                        className={`flex justify-center items-center py-2  hover:bg-gray-200 ${
                          path === links.ADMIN_FEEDBACK ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="font-medium text-primary text-xs">
                          Feedback
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
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
            <div className="flex items-center">
              <Popover placement="bottom-end">
                <PopoverHandler>
                  <div className="relative">
                    <div className=" cursor-pointer relative flex justify-center items-center">
                      <div className="w-5 h-5">
                        <Image
                          width={20}
                          height={20}
                          alt="image"
                          src={NotificationIcon}
                          className="w-5 h-5 "
                        />
                      </div>
                      {notificationList.filter((item: any) => !item.isRead)
                        .length > 0 && (
                        <Image
                          className="w-2 h-2  absolute -top-1 -right-0"
                          src={Ellipse_icon}
                          alt="employee status"
                        />
                      )}
                    </div>
                  </div>
                </PopoverHandler>
                <PopoverContent
                  className="z-50 p-0 w-full h-auto max-w-sm"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <div className="px-2 py-3">
                    <div className="flex">
                      <label className="ml-2 text-[1rem] font-medium text-[#1A1B56]">
                        Notifications
                      </label>
                      {notificationList && notificationList.length > 0 ? (
                        <label
                          className="text-xs font-medium text-[#FE3333] ml-auto mr-2 cursor-pointer"
                          onClick={allClearNotification}
                        >
                          Clear all
                        </label>
                      ) : null}
                    </div>
                  </div>{" "}
                  <hr className="w-[100%] md:w-[100%] "></hr>
                  <div className="space-y-3  py-3 text-sm text-gray-700 overflow-y-auto h-[25rem]">
                    {isGetAllNotificationRequestLoading ? (
                      <div className="flex items-center justify-center h-[25rem]">
                        <Spinner />
                      </div>
                    ) : null}
                    {!isGetAllNotificationRequestLoading &&
                    notificationList &&
                    notificationList.length > 0 ? (
                      notificationList.map((item: any) => (
                        <div
                          className={`flex justify-center items-center  group w-full max-w-full hover:bg-gray-50 hover:rounded-md px-4 pt-2 cursor-pointer `}
                          key={item._id}
                          onClick={() => markAsReadNotification(item, item.url)}
                        >
                          <div className="relative w-6 h-7 mr-4">
                            <Image
                              src={
                                NotificationTypes.USER_ADD_TO_CART_ACTION ===
                                item.type
                                  ? notificationIcon.add_to_cart_icon
                                  : NotificationTypes.NEW_ORDER === item.type
                                  ? notificationIcon.order_icon
                                  : NotificationTypes.NEW_REGISTRATION ===
                                    item.type
                                  ? notificationIcon.registration_icon
                                  : notificationIcon.add_to_price_track_icon
                              }
                              alt=""
                              width={24}
                              height={28}
                            />
                            {!item.isRead ? (
                              <Image
                                className="w-2 h-2  absolute -top-[2px] -left-[2px]"
                                src={Ellipse_icon}
                                alt="employee status"
                              />
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="relative flex flex-col justify-start pb-1 border-b-[0.8px] w-full border-[#F5F5F5]">
                            <span className="text-xs font-medium mb-1">
                              {item.title}
                            </span>
                            <p className="font-normal text-[10px]">
                              {item.body}
                            </p>
                            <Image
                              src={close_icon}
                              alt=""
                              className="absolute -top-1 right-0  opacity-0 group-hover:opacity-100 transition-all duration-300"
                              onClick={(e) => handleSingeClear(e, item)}
                            />
                            <span className="absolute bottom-0 right-0 text-[0.5rem] leading-3 text-black/80">
                              {formatNotificationTime(item.createdAt)}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="flex items-center justify-center py-1 text-xs text-red-600">
                        You don&apos;t have any notifications
                      </p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <div className="flex gap-1 items-center ml-3">
                <div className="bg-customer-background border border-tertiary rounded-full w-7 h-7 flex justify-center items-center">
                  <Image
                    src={UserIcon}
                    alt="image"
                    className="rounded-full w-5 h-5"
                  />
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs">Hello</p>
                  <p className="font-medium text-sm">Admin</p>
                </div>
              </div>
              <button className="ml-3 w-5 h-5" onClick={onLogoutHandler}>
                <Image
                  src={LogoutIcon}
                  alt="image"
                  width={14}
                  height={14}
                  className="w-5 h-5 object-contain"
                />
              </button>
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
  );
}

export default Navbar;
