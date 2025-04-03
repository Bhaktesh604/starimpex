"use client";
import { sendInquiryApi } from "@/app/(customer)/api/support.api";
import useApiRequest from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import { EDiamondTypes } from "@/utils/content.util";
import { countryList } from "@/utils/country.util";
import { isCountryValid, isEmailValid } from "@/utils/validation";
import {
  EMAIL_INVALID,
  NAME_INVALID,
  REQUIRED_ERROR,
} from "@/utils/validationError";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";

const InquiryForm = () => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [diamondType, setDiamondType] = useState("");

  const router = useRouter();

  const {
    loading: isSendInquiryRequestLoading,
    data: sendInquiryResponse,
    request: sendInquiryRequest,
  } = useApiRequest(sendInquiryApi);

  const onChangePhone = (e: any) => {
    setPhone(e);
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;

    if (name === "name" && value.trim().length <= 50) {
      setFirstName(value);
    }
    if (name === "surname" && value.trim().length <= 50) {
      setLastName(value);
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
    if (name === "country") {
      setCountry(value);
      if (value.trim() && !isCountryValid(value.trim())) {
        setCountryError(NAME_INVALID);
      } else {
        setCountryError("");
      }
    }
    if (name === "message") {
      setMessage(value);
    }
    if (name === "company-name" && value.trim().length <= 50) {
      setCompanyName(value);
    }
    if (name === "diamond-type") {
      setDiamondType(value);
    }

    if (firstName) {
      setFirstNameError("");
    }
    if (lastName) {
      setLastNameError("");
    }
    if (country) {
      setCountryError("");
    }
    if (email) {
      setEmailError("");
    }
    if (message) {
      setMessageError("");
    }
  };

  const onSubmitClickHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      firstNameError ||
      lastNameError ||
      countryError ||
      emailError ||
      messageError
    ) {
      return;
    }

    if (!firstName || !lastName || !country || !email || !message) {
      if (!firstName) {
        setFirstNameError(REQUIRED_ERROR);
      }
      if (!lastName) {
        setLastNameError(REQUIRED_ERROR);
      }
      if (!country) {
        setCountryError(REQUIRED_ERROR);
      }
      if (!email) {
        setEmailError(REQUIRED_ERROR);
      }
      if (!message) {
        setMessageError(REQUIRED_ERROR);
      }
      return;
    }

    sendInquiryRequest(
      router,
      firstName,
      lastName,
      email,
      country,
      message,
      phone,
      diamondType,
      companyName
    );

    clearInputs();
  };

  useEffect(() => {
    if (!isSendInquiryRequestLoading && sendInquiryResponse) {
      if (sendInquiryResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(sendInquiryResponse.message);
      }
    }
  }, [isSendInquiryRequestLoading, sendInquiryResponse]);

  const clearInputs = () => {
    setPhone("");
    setCountry("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
    setCompanyName("");
    setDiamondType("");
  };

  return (
    <form
      className="grid sm:grid-cols-2 sm:place-content-center gap-5 py-10 max-md:px-6 lg:px-6 bg-white"
      onSubmit={onSubmitClickHandler}
    >
      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-name">
          First Name
        </label>
        <input
          className="form-input"
          type="text"
          name="name"
          id="inp-name"
          placeholder="Enter your first name"
          onChange={inputChangeHandler}
          value={firstName}
        />
        <p className="text-red-600 ml-[1rem]">{firstNameError}</p>
      </div>
      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-surname">
          Last Name
        </label>
        <input
          className="form-input"
          type="text"
          name="surname"
          id="inp-surname"
          placeholder="Enter your last name"
          onChange={inputChangeHandler}
          value={lastName}
        />
        <p className="text-red-600 ml-[1rem]">{lastNameError}</p>
      </div>
      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-phone">
          Phone
        </label>
        <PhoneInput
          id="inp-phone"
          defaultCountry="US"
          focusInputOnCountrySelection={false}
          value={phone}
          onChange={onChangePhone}
          international
          countryCallingCodeEditable={false}
          className="form-input !px-2 !outline-none focus:!outline-none"
        />
      </div>
      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-email">
          Email
        </label>
        <input
          className="form-input"
          type="text"
          name="email"
          id="inp-email"
          placeholder="Enter your email"
          onChange={inputChangeHandler}
          value={email}
        />
        <p className="text-red-600 ml-[1rem]">{emailError}</p>
      </div>

      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-companyname">
          Company Name
        </label>
        <input
          className="form-input"
          type="text"
          name="company-name"
          id="inp-companyname"
          placeholder="Enter your company name"
          onChange={inputChangeHandler}
          value={companyName}
        />
      </div>

      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-diamond-type">
          Diamond Type
        </label>
        <div>
          <select
            id="inp-diamond-type"
            name="diamond-type"
            className="form-input w-full"
            value={diamondType}
            onChange={inputChangeHandler}
          >
            <option disabled value="">
              Select Diamond Type
            </option>
            <option value={EDiamondTypes.NATURAL_DIAMONDS}>
              Natural Diamonds
            </option>
            <option value={EDiamondTypes.LAB_GROWN_DIAMONDS_CVD}>
              Lab Grown Diamonds (CVD)
            </option>
            <option value={EDiamondTypes.LAB_GROWN_DIAMONDS_HPHT}>
              Lab Grown Diamonds (HPHT)
            </option>
          </select>
        </div>
      </div>

      <div className="form-group sm:col-span-2">
        <label className="form-label ml-3" htmlFor="inp-country">
          Country
        </label>
        <div>
          <select
            id="inp-country"
            name="country"
            className="form-input w-full"
            value={country}
            onChange={inputChangeHandler}
          >
            <option disabled value="">
              Select Country
            </option>
            {countryList.map((data, index) => (
              <option value={data.country} key={`country-${index}`}>
                {data.country}
              </option>
            ))}
          </select>
          <p className="text-red-600 ml-[1rem]">{countryError}</p>
        </div>
      </div>
      <div className="form-group sm:col-span-2">
        <label className="form-label ml-3" htmlFor="inp-message">
          Message
        </label>
        <textarea
          className="form-input"
          name="message"
          id="inp-message"
          placeholder="Describe your message..."
          rows={7}
          onChange={inputChangeHandler}
          value={message}
        />
        <p className="text-red-600 ml-[1rem]">{messageError}</p>
      </div>
      <div className="mx-auto sm:col-span-2">
        <button className="btn btn-tertiary !px-8 !py-2.5">Submit</button>
      </div>
    </form>
  );
};

export default InquiryForm;
