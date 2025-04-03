"use client";

import React, { FormEvent, useEffect, useState } from "react";
import diamond_img from "@/public/diamond.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { links } from "@/utils/links";
import { adminLoginApi } from "../api/auth.api";
import useApi from "@/hooks/useApi";
import { useDispatch } from "react-redux";
import { FCM_TOKEN_KEY, TOKEN_KEY, USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";
import { ResponseCodes } from "@/interfaces/response.interface";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { PASSWORD_INVALID, REQUIRED_ERROR } from "@/utils/validationError";
import { isPasswordValid } from "@/utils/validation";
import { getFcmToken } from "@/utils/fcm.util";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    loading: isSignInRequestLoading,
    data: signInResponse,
    request: signInRequest,
  } = useApi(adminLoginApi);

  useEffect(() => {
    if (
      localStorage.getItem(TOKEN_KEY) &&
      localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN
    ) {
      router.push(links.ADMIN_DASHBOARD);
    }
  }, [router]);

  useEffect(() => {
    if (
      !isSignInRequestLoading &&
      signInResponse?.responseCode === ResponseCodes.SUCCESS
    ) {
      dispatch(
        showAlert({
          message: signInResponse.message,
          variant: EVariant.SUCCESS,
        })
      );
      localStorage.setItem(TOKEN_KEY, signInResponse.data.token);
      localStorage.setItem(USER_TYPE_KEY, EUserType.ADMIN);
      clearInputs();
      router.push(links.ADMIN_DASHBOARD, { scroll: false });
    }
    if (
      !isSignInRequestLoading &&
      signInResponse &&
      signInResponse?.responseCode !== ResponseCodes.SUCCESS
    ) {
      localStorage.removeItem(FCM_TOKEN_KEY);
    }
  }, [dispatch, isSignInRequestLoading, router, signInResponse]);

  const inputChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;

    if (name === "username") {
      setUserName(value);
      if (value.trim() === "") {
        setUserNameError(REQUIRED_ERROR);
      } else {
        setUserNameError("");
      }
      return;
    }

    if (name === "password") {
      setPassword(value);
      if (value.trim() && !isPasswordValid(value.trim())) {
        setPasswordError(PASSWORD_INVALID);
      } else {
        setPasswordError("");
      }
      return;
    }
  };

  const onSubmitClickHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (userNameError || passwordError) {
      return;
    }

    if (!userName || !password) {
      if (!userName) {
        setUserNameError(REQUIRED_ERROR);
      }
      if (!password) {
        setPasswordError(REQUIRED_ERROR);
      }
      return;
    }
    const fcmToken = await getFcmToken();
    localStorage.setItem(FCM_TOKEN_KEY, fcmToken);
    signInRequest(router, userName, password, fcmToken);
  };

  const clearInputs = () => {
    setPassword("");
    setUserName("");
  };

  return (
    <div className="max-w-[87.375rem] w-full px-4 m-auto overflow-hidden">
      <div className="flex flex-col h-[calc(100dvh-5rem)] justify-center items-center max-w-[29.563rem] m-auto relative">
        <div className="mb-7 relative w-full">
          <h1 className="font-bold text-2xl leading-7 uppercase text-center">
            Admin Login
          </h1>
          <p className="font-normal text-base leading-6 mt-3 max-w-[29.563rem] text-center text-primary/85">
            Enter Admin credentials to login into admin panel
          </p>
          <Image
            src={diamond_img}
            alt=""
            className="absolute -top-5 -left-80"
          />
        </div>
        <div className="w-full">
          <form onSubmit={onSubmitClickHandler}>
            <div className="flex flex-col mb-7">
              <label
                htmlFor="user-name"
                className="font-medium text-base leading-6 ml-4"
              >
                User Name
              </label>
              <input
                className="login-form-input"
                type="text"
                name="username"
                placeholder="Enter Your User Name "
                value={userName}
                onChange={inputChangeHandler}
              />
              <p className="text-red-600 ml-[1rem]">{userNameError}</p>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="font-medium text-base leading-6 ml-4"
              >
                Password
              </label>
              <input
                className="login-form-input"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={inputChangeHandler}
              />
              <p className="text-red-600 ml-[1rem]">{passwordError}</p>
            </div>

            <div className="flex flex-col items-center py-6">
              <button
                type="submit"
                className="btn btn-tertiary !px-14 !py-[0.875rem] mb-7"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <Image
          src={diamond_img}
          alt=""
          className="absolute bottom-[7.5rem] right-[-15.625rem] rotate-90"
        />
      </div>
    </div>
  );
};

export default Page;
