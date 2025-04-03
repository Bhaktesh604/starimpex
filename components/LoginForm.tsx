"use client";
import React, { FormEvent, useEffect, useState } from "react";
import diamond_img from "@/public/diamond.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginApi } from "@/app/(customer)/api/auth.api";
import useApi from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { useDispatch } from "react-redux";
import {
  EMAIL_INVALID,
  PASSWORD_INVALID,
  REQUIRED_ERROR,
} from "@/utils/validationError";
import { isEmailValid, isPasswordValid } from "@/utils/validation";
import { TOKEN_KEY, USER_KEY, USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";
import { links } from "@/utils/links";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    loading: isSignInRequestLoading,
    data: signInResponse,
    request: signInRequest,
  } = useApi(loginApi);

  useEffect(() => {
    if (
      localStorage.getItem(TOKEN_KEY) &&
      localStorage.getItem(USER_TYPE_KEY) === EUserType.USER
    ) {
      router.push(links.DASHBOARD);
      return;
    }
    if (
      localStorage.getItem(TOKEN_KEY) &&
      localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN
    ) {
      router.push(links.ADMIN_DASHBOARD);
      return;
    }
  }, [router]);

  useEffect(() => {
    if (!isSignInRequestLoading && signInResponse) {
      if (signInResponse?.responseCode === ResponseCodes.SUCCESS) {
        router.push(links.DASHBOARD);
        dispatch(
          showAlert({
            message: signInResponse.message,
            variant: EVariant.SUCCESS,
          })
        );
        localStorage.setItem(TOKEN_KEY, signInResponse.data.token);
        localStorage.setItem(USER_TYPE_KEY, EUserType.USER);
        localStorage.setItem(
          USER_KEY,
          JSON.stringify(signInResponse.data.user)
        );
        clearInputs();
      }
    }
  }, [dispatch, isSignInRequestLoading, router, signInResponse]);

  const inputChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;

    if (name === "email") {
      setEmail(value);
      if (value.trim() && !isEmailValid(value.trim())) {
        setEmailError(EMAIL_INVALID);
      } else {
        setEmailError("");
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

  const onSubmitClickHandler = (e: FormEvent) => {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }

    if (!email || !password) {
      if (!email) {
        setEmailError(REQUIRED_ERROR);
      }
      if (!password) {
        setPasswordError(REQUIRED_ERROR);
      }
      return;
    }

    signInRequest(router, email, password);
  };

  const clearInputs = () => {
    setPassword("");
    setEmail("");
  };

  return (
    <div className="pt-[173px] md:pt-[150px]">
      <div className="max-w-[1398px] w-full px-4 m-auto overflow-hidden">
        <div className="flex flex-col justify-center items-center py-[63px] max-w-[473px] m-auto relative">
          <div className="mb-[30px] relative w-full">
            <h1 className="font-libre-barskerville font-bold text-2xl leading-7 uppercase text-center">
              Login
            </h1>
            <p className="font-poppins font-normal text-base leading-6 mt-[11px] max-w-[473px] text-center text-primary/85">
              Welcome back! Log in to your account to access exclusive wholesale
              diamond deals. Enter your email and password below to continue
            </p>
            <Image
              src={diamond_img}
              alt=""
              className="absolute top-[-19px] left-[-320px]"
            />
          </div>
          <div className="w-full">
            <form className="font-poppins" onSubmit={onSubmitClickHandler}>
              <div className="flex flex-col mb-[30px]">
                <label
                  htmlFor="inp-email"
                  className="font-medium text-base leading-6 ml-[17px]"
                >
                  Email
                </label>
                <input
                  className="login-form-input"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email "
                  value={email}
                  onChange={inputChangeHandler}
                />
                <p className="text-red-600 ml-[1rem]">{emailError}</p>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="font-medium text-base leading-6 ml-[17px]"
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
              <div className="text-end mb-[30px]">
                <Link
                  href="/forgot-password"
                  className="font-poppins text-sm leading-4 text-primary/50 "
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="btn btn-tertiary font-poppins !px-[54px] !py-[14px] mb-[30px]"
                >
                  Login
                </button>
                <span className="font-poppins text-base leading-6">
                  Don’t have account?
                  <Link
                    href="/signup"
                    className="text-[#024093] font-poppins text-base leading-6 ml-[2px]"
                  >
                    Signup
                  </Link>
                </span>
              </div>
            </form>
          </div>
          <Image
            src={diamond_img}
            alt=""
            className="absolute bottom-[120px] right-[-250px] rotate-90"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;