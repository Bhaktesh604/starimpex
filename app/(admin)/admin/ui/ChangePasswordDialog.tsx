import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import close_icon from "@/public/assets/images/ic-cancel.svg";
import MotButtonComponent from "./MotButtonComponent";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { PASSWORD_INVALID, REQUIRED_ERROR } from "@/utils/validationError";
import { isPasswordValid } from "@/utils/validation";
import ChangePasswordConfirmationDialog from "./ChangePasswordConfirmationDialog";
import { changeUserPasswordApi } from "../api/user.api";
import useApiRequest from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";

function ChangePasswordDialog({
  handleCloseChangePasswordDialog,
  userId,
}: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [
    isChangePasswordConfirmationOpen,
    setIsChangePasswordConfirmationOpen,
  ] = useState(false);

  const {
    loading: isChangePasswordRequestLoading,
    data: changePasswordRequestResponse,
    request: changePasswordRequestRequest,
  } = useApiRequest(changeUserPasswordApi);

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
        handleCloseChangePasswordDialog();
        clearInputs();
      }
    }
  }, [isChangePasswordRequestLoading, changePasswordRequestResponse, dispatch]);

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

    setIsChangePasswordConfirmationOpen(true);
  };

  const clearInputs = () => {
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 h-dvh w-full z-50 bg-black/40 p-5 md:p-0  flex justify-center items-center">
      <div className="bg-white max-w-[37.5rem] w-full rounded-lg md:mx-3 ">
        <div className="relative flex justify-center items-center py-3 border-b border-primary/50">
          <span className="font-semibold text-xl text-tertiary uppercase">
            Change Password
          </span>
          <Image
            src={close_icon}
            alt=""
            width={35}
            height={35}
            className="absolute top-2 right-8 cursor-pointer"
            onClick={handleCloseChangePasswordDialog}
          />
        </div>
        <form
          onSubmit={onSubmitClickHandler}
          className="py-5 px-8 flex flex-col  gap-4"
        >
          <div className="flex flex-col mb-[10px]">
            <label
              htmlFor="inp-email"
              className="font-medium text-base leading-6 mb-2"
            >
              New Password
            </label>
            <input
              className="bg-[#EDF0F5] px-6 py-3 rounded-lg placeholder:font-poppins placeholder:text-sm leading-5 placeholder:text-primary/60  placeholder:capitalize outline-none"
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
              className="font-medium text-base leading-6 mb-2"
            >
              Confirm Password
            </label>
            <input
              className="bg-[#EDF0F5] px-6 py-3 rounded-lg placeholder:font-poppins placeholder:text-sm leading-5 placeholder:text-primary/60  placeholder:capitalize outline-none"
              type="password"
              name="confirmPassword"
              placeholder="Enter Your Confirm Password"
              value={confirmPassword}
              onChange={inputChangeHandler}
              required
            />
            <p className="text-red-600 ml-[1rem]">{confirmPasswordError}</p>
          </div>
          <div className="flex justify-end items-center">
            <MotButtonComponent
              buttonText="Change Password"
              buttonType="submit"
            />
          </div>
        </form>
      </div>
      {isChangePasswordConfirmationOpen ? (
        <ChangePasswordConfirmationDialog
          onCancel={() => setIsChangePasswordConfirmationOpen(false)}
          onSend={() => {
            changePasswordRequestRequest(router, userId, password);
          }}
          isLoading={isChangePasswordRequestLoading}
        />
      ) : null}
    </div>
  );
}

export default ChangePasswordDialog;
