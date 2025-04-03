"use client";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import diamond_img from "@/public/diamond.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { PASSWORD_INVALID, REQUIRED_ERROR } from "@/utils/validationError";
import { isPasswordValid } from "@/utils/validation";
import useApiRequest from "@/hooks/useApi";
import { resetPasswordApi } from "@/app/(customer)/api/auth.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { links } from "@/utils/links";

const ResetPasswordForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  //for hash and email
  const email = searchParams.get("email");
  const hash = searchParams.get("hash");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const {
    loading: isResetPasswordLoading,
    data: resetPasswordResponse,
    request: resetPasswordRequest,
  } = useApiRequest(resetPasswordApi);

  useEffect(() => {
    if (
      !isResetPasswordLoading &&
      resetPasswordResponse?.responseCode === ResponseCodes.SUCCESS
    ) {
      dispatch(
        showAlert({
          message: resetPasswordResponse.message,
          variant: EVariant.SUCCESS,
        })
      );
      clearInputs();
      router.push(links.LOGIN);
    }
  }, [dispatch, isResetPasswordLoading, resetPasswordResponse, router]);

  const inputChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;

    if (name === "password") {
      setPassword(value);
      if (value.trim() && !isPasswordValid(value.trim())) {
        setPasswordError(PASSWORD_INVALID);
      } else {
        setPasswordError("");
      }
      if (confirmPassword !== value) {
        setConfirmPasswordError("Password does not match");
      } else {
        setConfirmPasswordError("");
      }
      return;
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);

      if (value !== password) {
        setConfirmPasswordError("Password does not match");
      } else if (value === password) {
        setConfirmPasswordError("");
      }
      return;
    }
  };

  const onSubmitClickHandler = (e: FormEvent) => {
    e.preventDefault();
    if (passwordError) {
      return;
    }
    if (confirmPasswordError) {
      return;
    }

    if (!password) {
      setPasswordError(REQUIRED_ERROR);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Password does not match");
      return;
    }

    resetPasswordRequest(router, password, email || "", hash || "");
  };

  const clearInputs = () => {
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="py-[173px] relative md:py-[150px]">
      <div className="max-w-[1398px] w-full px-4 m-auto  relative">
        <div className="flex flex-col justify-center items-center py-[63px] max-w-[458px] m-auto relative">
          <div className="mb-[15px] relative">
            <h1 className="font-libre-barskerville font-bold text-2xl leading-7 uppercase text-center">
              Reset password
            </h1>
            <p className="font-poppins font-normal text-base leading-6 mt-[9px] max-w-[458px] text-center text-primary/85">
              Please, Enter your new password below.
            </p>
          </div>
          <div className="w-full">
            <form className="font-poppins" onSubmit={onSubmitClickHandler}>
              <div className="flex flex-col mb-[34px]">
                <label
                  htmlFor="inp-email"
                  className="font-medium text-base leading-6 ml-[17px]"
                >
                  New Password
                </label>
                <input
                  className="login-form-input"
                  type="password"
                  name="password"
                  placeholder="Enter Your New Password"
                  value={password}
                  onChange={inputChangeHandler}
                  required
                />
                <p className="text-red-600 ml-[1rem]">{passwordError}</p>
              </div>
              <div className="flex flex-col mb-[34px]">
                <label
                  htmlFor="inp-email"
                  className="font-medium text-base leading-6 ml-[17px]"
                >
                  Confirm Password
                </label>
                <input
                  className="login-form-input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter Your Confirm Password"
                  value={confirmPassword}
                  onChange={inputChangeHandler}
                  required
                />
                <p className="text-red-600 ml-[1rem]">{confirmPasswordError}</p>
              </div>

              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="btn btn-tertiary font-poppins !px-[54px] !py-[14px] mb-[30px]"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
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

export default ResetPasswordForm;