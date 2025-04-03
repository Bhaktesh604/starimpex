"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import arrow_img from "@/public/arrow.svg";
import diamond_img from "@/public/diamond.svg";
import useApiRequest from "@/hooks/useApi";
import { forgotPasswordApi } from "@/app/(customer)/api/auth.api";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/interfaces/response.interface";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { isEmailValid } from "@/utils/validation";
import { EMAIL_INVALID, REQUIRED_ERROR } from "@/utils/validationError";

const ForgotPasswordForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
  
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
  
    const {
      loading: isForgotPasswordLoading,
      data: forgotPasswordResponse,
      request: forogtPasswordRequest,
    } = useApiRequest(forgotPasswordApi);
  
    useEffect(() => {
      if (
        !isForgotPasswordLoading &&
        forgotPasswordResponse?.responseCode === ResponseCodes.SUCCESS
      ) {
        dispatch(
          showAlert({
            message: forgotPasswordResponse.message,
            variant: EVariant.SUCCESS,
          })
        );
        clearInputs();
      }
    }, [isForgotPasswordLoading, forgotPasswordResponse, dispatch]);
  
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
    };
  
    const onSubmitClickHandler = (e: FormEvent) => {
      e.preventDefault();
      if (emailError) {
        return;
      }
  
      if (!email.trim()) {
        setEmailError(REQUIRED_ERROR);
        return;
      }
      forogtPasswordRequest(router, email);
    };
  
    const clearInputs = () => {
      setEmail("");
    };
    return (
      <div className="py-[173px] relative md:py-[150px]">
        <div className="max-w-[1398px] w-full px-4 m-auto  relative">
          <div className="flex flex-col justify-center items-center py-[63px] max-w-[458px] m-auto relative">
            <div className="mb-[15px] relative">
              <h1 className="font-libre-barskerville font-bold text-2xl leading-7 uppercase text-center">
                Forgot password
              </h1>
              <p className="font-poppins font-normal text-base leading-6 mt-[9px] max-w-[458px] text-center text-primary/85">
                Forgot your password? No worries! Enter your email address below
                and we&apos;ll send you a link to reset your password.
              </p>
            </div>
            <div className="w-full">
              <form className="font-poppins" onSubmit={onSubmitClickHandler}>
                <div className="flex flex-col mb-[34px]">
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
                    required
                  />
                  <p className="text-red-600 ml-[1rem]">{emailError}</p>
                </div>
  
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    className="btn btn-tertiary font-poppins !px-[54px] !py-[14px] mb-[30px]"
                  >
                    RECOVER
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Link
            href={"/login"}
            className="absolute top-[-30px] left-[26px] rounded-full border-[3px] w-[46px] h-[46px] flex items-center justify-center border-[#212121] transition-all duration-500 md:hover:opacity-50"
          >
            <Image src={arrow_img} alt="" />
          </Link>
        </div>
        <Image
          src={diamond_img}
          alt=""
          className="absolute bottom-[146px] left-[158px]"
        />
        <Image
          src={diamond_img}
          alt=""
          className="absolute top-[146px] right-[158px] rotate-45"
        />
      </div>
    );
}

export default ForgotPasswordForm;