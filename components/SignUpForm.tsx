"use client";
import { countryList } from "@/utils/country.util";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import arrow_img from "@/public/arrow.svg";
import diamond_img from "@/public/diamond.svg";
import { signupApi } from "@/app/(customer)/api/auth.api";
import useApi from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  EMAIL_INVALID,
  NAME_INVALID,
  PASSWORD_INVALID,
  REQUIRED_ERROR,
} from "@/utils/validationError";
import {
  isAddressValid,
  isCityValid,
  isCountryValid,
  isEmailValid,
  isPasswordValid,
  isStateValid,
} from "@/utils/validation";
import { TOKEN_KEY, USER_TYPE_KEY } from "@/utils/constants";
import { EMessengerType, EUserType } from "@/interfaces/common.interface";
import { links } from "@/utils/links";

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messenger, setMessenger] = useState("");
  const [messengerId, setMessengerId] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [notes, setNotes] = useState("");

  const {
    loading: isSignUpRequestLoading,
    data: signUpResponse,
    request: signUpRequest,
  } = useApi(signupApi);

  useEffect(() => {
    if (
      localStorage.getItem(TOKEN_KEY) &&
      localStorage.getItem(USER_TYPE_KEY) === EUserType.USER
    ) {
      router.push(links.DASHBOARD);
    }
  }, [router]);

  useEffect(() => {
    if (
      !isSignUpRequestLoading &&
      signUpResponse?.responseCode === ResponseCodes.SUCCESS
    ) {
      dispatch(
        showAlert({
          message: signUpResponse.message,
          variant: EVariant.SUCCESS,
        })
      );
      clearInputs();
    }
  }, [dispatch, isSignUpRequestLoading, signUpResponse]);

  const onChangePhone = (e: any) => {
    setMobileNumber(e);
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;

    if (name === "firstName" && value.trim().length <= 50) {
      setFirstName(value);
    }
    if (name === "lastName" && value.trim().length <= 50) {
      setLastName(value);
    }
    if (name === "companyName" && value.trim().length <= 50) {
      setCompanyName(value);
    }
    if (name === "address") {
      setAddress(value);

      if (value.trim() && !isAddressValid(value.trim())) {
        setAddressError(NAME_INVALID);
      } else {
        setAddressError("");
      }
      return;
    }
    if (name === "state") {
      setState(value);

      if (value.trim() && !isStateValid(value.trim())) {
        setStateError(NAME_INVALID);
      } else {
        setStateError("");
      }
      return;
    }
    if (name === "city") {
      setCity(value);

      if (value.trim() && !isCityValid(value.trim())) {
        setCityError(NAME_INVALID);
      } else {
        setCityError("");
      }
      return;
    }
    if (name === "country") {
      setCountry(value);
      if (value.trim() && !isCountryValid(value.trim())) {
        setCountryError(NAME_INVALID);
      } else {
        setCountryError("");
      }
      return;
    }
    if (name === "mobileNumber") {
      setMobileNumber(value);
    }
    if (name === "telephoneNumber") {
      setTelephone(value);
    }
    if (name === "email") {
      setEmail(value);

      if (value.trim() && !isEmailValid(value.trim())) {
        setEmailError(EMAIL_INVALID);
      } else {
        setEmailError("");
      }
      return;
    }
    if (name === "messengerType") {
      setMessenger(value);
    }
    if (name === "messengerIdNumber") {
      setMessengerId(value);
    }
    if (name === "website") {
      setWebsite(value);
    }
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
    if (name === "notes") {
      setNotes(value);
    }
  };

  const onSubmitClickHandler = (e: FormEvent) => {
    e.preventDefault();

    if (
      firstNameError ||
      lastNameError ||
      companyNameError ||
      addressError ||
      stateError ||
      cityError ||
      countryError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    ) {
      return;
    }

    if (
      !firstName ||
      !lastName ||
      !companyName ||
      !address ||
      !state ||
      !city ||
      !country ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      if (!firstName) {
        setFirstNameError(REQUIRED_ERROR);
      }
      if (!lastName) {
        setLastNameError(REQUIRED_ERROR);
      }
      if (!companyName) {
        setCompanyNameError(REQUIRED_ERROR);
      }
      if (!address) {
        setAddressError(REQUIRED_ERROR);
      }
      if (!state) {
        setStateError(REQUIRED_ERROR);
      }
      if (!city) {
        setCityError(REQUIRED_ERROR);
      }
      if (!country) {
        setCountryError(REQUIRED_ERROR);
      }

      if (!email) {
        setEmailError(REQUIRED_ERROR);
      }
      if (!password) {
        setPasswordError(REQUIRED_ERROR);
      }
      if (!confirmPasswordError) {
        setConfirmPasswordError(REQUIRED_ERROR);
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError("Password does not match");
        return;
      }
      return;
    }
    signUpRequest(
      router,
      firstName,
      lastName,
      companyName,
      address,
      state,
      city,
      country,
      email,
      password,
      mobileNumber,
      telephone,
      messenger,
      messengerId,
      website,
      notes
    );
    clearInputs();
  };

  const clearInputs = () => {
    setFirstName("");
    setLastName("");
    setCompanyName("");
    setAddress("");
    setState("");
    setCity("");
    setCountry("");
    setMobileNumber("");
    setTelephone("");
    setEmail("");
    setMessenger("");
    setMessengerId("");
    setWebsite("");
    setPassword("");
    setConfirmPassword("");
    setNotes("");
  };
  return (
    <div className="pt-[120px]">
      <div className="max-w-[1398px] w-full px-4 m-auto relative overflow-hidden">
        <div className="flex flex-col justify-center items-center py-[63px] max-w-[943px] m-auto relative">
          <div className="mb-[40px] relative">
            <h1 className="font-libre-barskerville font-bold text-2xl leading-7 uppercase text-center">
              Create an Account
            </h1>
            <p className="font-poppins font-normal text-base leading-6 mt-[9px] max-w-[560px] text-center">
              Join our exclusive B2B diamond marketplace today! Sign up for free
              to access our wide range of high-quality diamonds at wholesale
              prices. Fill in your details below to get started.
            </p>
          </div>
          <div className="w-full">
            <form className="font-poppins" onSubmit={onSubmitClickHandler}>
              <div className="grid grid-cols-2 gap-x-9 gap-y-7 max-[768px]:gap-x-5 max-[768px]:gap-y-3 ">
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="inp-first-name"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      First Name*
                    </label>
                    <input
                      className="login-form-input"
                      type="text"
                      name="firstName"
                      id="inp-first-name"
                      placeholder="Enter Your First Name "
                      value={firstName}
                      onChange={inputChangeHandler}
                    />
                    <p className="text-red-600 ml-[1rem]">{firstNameError}</p>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="inp-last-name"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Last Name*
                    </label>
                    <input
                      className="login-form-input"
                      type="text"
                      name="lastName"
                      id="inp-last-name"
                      placeholder="Enter Your Last Name "
                      value={lastName}
                      onChange={inputChangeHandler}
                    />
                    <p className="text-red-600 ml-[1rem]">{lastNameError}</p>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="company-name"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Company Name*
                    </label>
                    <input
                      className="login-form-input"
                      type="text"
                      name="companyName"
                      placeholder="Enter Your Company Name"
                      value={companyName}
                      onChange={inputChangeHandler}
                    />
                    <p className="text-red-600 ml-[1rem]">{companyNameError}</p>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="address"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Address*
                    </label>
                    <input
                      className="login-form-input"
                      type="address"
                      name="address"
                      placeholder="Enter Your Address"
                      value={address}
                      onChange={inputChangeHandler}
                    />
                    <p className="text-red-600 ml-[1rem]">{addressError}</p>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="state"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      State or province*
                    </label>
                    <input
                      className="login-form-input"
                      type="text"
                      name="state"
                      value={state}
                      onChange={inputChangeHandler}
                      placeholder="Enter your State or province "
                    />
                    <p className="text-red-600 ml-[1rem]">{stateError}</p>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="city"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      City*
                    </label>
                    <input
                      className="login-form-input"
                      type="text"
                      name="city"
                      value={city}
                      onChange={inputChangeHandler}
                      placeholder="Enter Your City"
                    />
                    <p className="text-red-600 ml-[1rem]">{cityError}</p>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="country"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Country*
                    </label>
                    <select
                      className="login-form-input cursor-pointer"
                      name="country"
                      value={country}
                      onChange={inputChangeHandler}
                    >
                      <option value="">Select Country</option>
                      {countryList.map((data, index) => (
                        <option value={data.country} key={`country-${index}`}>
                          {data.country}
                        </option>
                      ))}
                    </select>
                    <p className="text-red-600 ml-[1rem]">{countryError}</p>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="mobile"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Mobile
                    </label>
                    <PhoneInput
                      defaultCountry="US"
                      placeholder="Enter phone number"
                      onChange={onChangePhone}
                      value={mobileNumber}
                      international
                      countryCallingCodeEditable={false}
                      className="login-form-input "
                      name="mobileNumber"
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="telephone"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Telephone
                    </label>
                    <input
                      className="login-form-input"
                      type="string"
                      name="telephoneNumber"
                      value={telephone}
                      onChange={inputChangeHandler}
                      placeholder="Enter Your Telephone Number"
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Email*
                    </label>
                    <input
                      className="login-form-input"
                      type="email"
                      name="email"
                      value={email}
                      onChange={inputChangeHandler}
                      placeholder="Enter Your Email"
                    />
                    <p className="text-red-600 ml-[1rem]">{emailError}</p>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="messenger"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Messenger ID
                    </label>
                    <div className="flex">
                      <select
                        className="login-form-input cursor-pointer rounded-e-none capitalize w-1/3 text-sm"
                        name="messengerType"
                        value={messenger}
                        onChange={inputChangeHandler}
                      >
                        {Object.values(EMessengerType).map((type) => (
                          <option
                            value={type}
                            key={type}
                            className="capitalize"
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                      <input
                        className="login-form-input rounded-s-none w-2/3"
                        type="text"
                        name="messengerIdNumber"
                        value={messengerId}
                        onChange={inputChangeHandler}
                        placeholder="Enter ID or Number"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="website"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Website
                    </label>
                    <input
                      className="login-form-input"
                      type="text"
                      value={website}
                      onChange={inputChangeHandler}
                      name="website"
                      placeholder="Www.example.com"
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="password"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Password*
                    </label>
                    <input
                      className="login-form-input"
                      type="password"
                      name="password"
                      value={password}
                      onChange={inputChangeHandler}
                      placeholder="Enter Your Password"
                    />
                    <p className="text-red-600 ml-[1rem]">{passwordError}</p>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 ">
                  <div className="flex flex-col">
                    <label
                      htmlFor="inp-confirmPassword"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Confirm Password*
                    </label>
                    <input
                      className="login-form-input"
                      type="password"
                      id="inp-confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={inputChangeHandler}
                      placeholder="Confirm your Password "
                    />
                    <p className="text-red-600 ml-[1rem]">
                      {confirmPasswordError}
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col ">
                    <label
                      htmlFor="notes"
                      className="font-medium text-base leading-6 ml-[17px] mb-[4px]"
                    >
                      Notes
                    </label>
                    <textarea
                      className="login-form-input h-auto"
                      name="notes"
                      value={notes}
                      onChange={inputChangeHandler}
                      placeholder="Write Notes"
                      rows={5}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col items-center">
                    <button
                      type="submit"
                      className="btn btn-tertiary font-poppins !px-[54px] !py-[14px] mb-[30px]"
                    >
                      CREATE ACCOUNT
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <Image
            src={diamond_img}
            alt=""
            className="absolute top-[50%] left-[-110px] -rotate-12"
          />
          <Image
            src={diamond_img}
            alt=""
            className="absolute top-[75px] right-[-135px] rotate-45"
          />
        </div>
        <Link
          href={"/login"}
          className="absolute top-[0px] left-[26px] rounded-full border-[3px] w-[46px] h-[46px] flex items-center justify-center border-[#212121] transition-all duration-500 md:hover:opacity-50"
        >
          <Image src={arrow_img} alt="" />
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;