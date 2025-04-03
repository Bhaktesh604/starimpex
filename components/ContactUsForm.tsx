"use client";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FormEvent, useEffect, useState } from "react";
import { countryList } from "@/utils/country.util";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useApiRequest from "@/hooks/useApi";
import { contactUsApi } from "@/app/(customer)/api/support.api";
import { isCountryValid, isEmailValid } from "@/utils/validation";
import {
  EMAIL_INVALID,
  NAME_INVALID,
  REQUIRED_ERROR,
} from "@/utils/validationError";
import { ResponseCodes } from "@/interfaces/response.interface";

const ContactUsForm = () => {
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

  const router = useRouter();

  const {
    loading: isContactUsRequestLoading,
    data: contactUsResponse,
    request: contactUsRequest,
  } = useApiRequest(contactUsApi);

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

    contactUsRequest(
      router,
      firstName,
      lastName,
      email,
      country,
      message,
      phone
    );
    clearInputs();
  };

  useEffect(() => {
    if (!isContactUsRequestLoading && contactUsResponse) {
      if (contactUsResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(contactUsResponse.message);
      }
    }
  }, [contactUsResponse, isContactUsRequestLoading]);

  const clearInputs = () => {
    setPhone("");
    setCountry("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
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
          value={firstName}
          onChange={inputChangeHandler}
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
          value={lastName}
          onChange={inputChangeHandler}
        />
        <p className="text-red-600 ml-[1rem]">{lastNameError}</p>
      </div>
      <div className="grid gap-5">
        <div className="form-group">
          <label className="form-label ml-3" htmlFor="inp-phone">
            Phone
          </label>
          <PhoneInput
            id="inp-phone"
            defaultCountry="US"
            placeholder="Enter phone number"
            value={phone}
            onChange={onChangePhone}
            international
            countryCallingCodeEditable={false}
            className="form-input !px-2 !outline-none"
          />
        </div>
        <div className="form-group">
          <label className="form-label ml-3" htmlFor="inp-country">
            Country
          </label>
          <div>
            <select
              className="form-input w-full"
              name="country"
              value={country}
              id="inp-country"
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
            value={email}
            onChange={inputChangeHandler}
          />
          <p className="text-red-600 ml-[1rem]">{emailError}</p>
        </div>
      </div>
      <div className="form-group grid">
        <label className="form-label ml-3" htmlFor="inp-message">
          Message
        </label>
        <textarea
          className="form-input"
          name="message"
          id="inp-message"
          placeholder="Describe your message..."
          rows={7}
          value={message}
          onChange={inputChangeHandler}
        />
        <p className="text-red-600 ml-[1rem]">{messageError}</p>
      </div>
      <div className="mx-auto md:col-span-2">
        <button className="btn btn-tertiary !px-8 !py-2.5">Submit</button>
      </div>
    </form>
  );
};

export default ContactUsForm;
