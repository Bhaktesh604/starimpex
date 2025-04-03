"use client";

import { useRef, useState, useEffect, FormEvent } from "react";
import "react-phone-number-input/style.css";
import emailjs from "@emailjs/browser";
import PhoneInput from "react-phone-number-input";
import { countryList } from "@/utils/country.util";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useApiRequest from "@/hooks/useApi";
import { contactUsApi } from "@/app/(customer)/api/support.api";
import { isCountryValid, isEmailValid } from "@/utils/validation";
import { EMAIL_INVALID, NAME_INVALID, REQUIRED_ERROR } from "@/utils/validationError";
import { ResponseCodes } from "@/interfaces/response.interface";

const ContactUsForm = () => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState(""); // ✅ Requirement field wapas add kiya
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loader state

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [requirementError, setRequirementError] = useState(""); // ✅ Requirement error state wapas add kiya
  const [countryError, setCountryError] = useState("");
  const [messageError, setMessageError] = useState("");

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const { loading: isContactUsRequestLoading, data: contactUsResponse, request: contactUsRequest } = useApiRequest(contactUsApi);

  const onChangePhone = (value: string) => setPhone(value);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setFirstName(value);
        setFirstNameError(value ? "" : REQUIRED_ERROR);
        break;
      case "surname":
        setLastName(value);
        setLastNameError(value ? "" : REQUIRED_ERROR);
        break;
      case "email":
        setEmail(value);
        setEmailError(value && !isEmailValid(value) ? EMAIL_INVALID : "");
        break;
      case "country":
        setCountry(value);
        setCountryError(value && !isCountryValid(value) ? NAME_INVALID : "");
        break;
      case "requirement":
        setRequirement(value);
        setRequirementError(value ? "" : REQUIRED_ERROR); // ✅ Requirement error validate kar raha hai
        break;
      case "message":
        setMessage(value);
        setMessageError(value ? "" : REQUIRED_ERROR);
        break;
    }
  };

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true); // ✅ Loader start

    try {
      await emailjs.sendForm(
        "service_e2huge7", // Replace with your EmailJS Service ID
        "template_5grh3id", // Replace with your EmailJS Template ID
        formRef.current,
        "P7tsu6N4ZVevQiGTy" // Replace with your EmailJS Public Key
      );

      toast.success("Message sent successfully!");
      clearInputs();
    } catch (error) {
      toast.error("Failed to send message, try again!");
    } finally {
      setLoading(false); // ✅ Loader stop
    }
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
    setRequirement(""); // ✅ Requirement ko bhi clear kar raha hai
    setMessage("");
  };

  return (
    <form className="grid sm:grid-cols-2 gap-5 py-10 px-6 bg-white" ref={formRef} onSubmit={sendEmail}>
      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-name">First Name</label>
        <input className="form-input" type="text" name="name" id="inp-name" placeholder="Enter your first name" value={firstName} onChange={inputChangeHandler} />
        {firstNameError && <p className="text-red-600 ml-[1rem]">{firstNameError}</p>}
      </div>

      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-surname">Last Name</label>
        <input className="form-input" type="text" name="surname" id="inp-surname" placeholder="Enter your last name" value={lastName} onChange={inputChangeHandler} />
        {lastNameError && <p className="text-red-600 ml-[1rem]">{lastNameError}</p>}
      </div>

      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-phone">Phone</label>
        <PhoneInput id="inp-phone" defaultCountry="US" placeholder="Enter phone number" value={phone} onChange={onChangePhone} international countryCallingCodeEditable={false} className="form-input" />
      </div>

      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-country">Country</label>
        <select className="form-input w-full" name="country" value={country} id="inp-country" onChange={inputChangeHandler}>
          <option disabled value="">Select Country</option>
          {countryList.map((data, index) => (
            <option value={data.country} key={`country-${index}`}>{data.country}</option>
          ))}
        </select>
        {countryError && <p className="text-red-600 ml-[1rem]">{countryError}</p>}
      </div>

      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-email">Email</label>
        <input className="form-input" type="email" name="email" id="inp-email" placeholder="Enter your email" value={email} onChange={inputChangeHandler} />
        {emailError && <p className="text-red-600 ml-[1rem]">{emailError}</p>}
      </div>

      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-requirement">Requirement</label>
        <input className="form-input" type="text" name="requirement" id="inp-requirement" placeholder="Enter your requirement" value={requirement} onChange={inputChangeHandler} />
        {requirementError && <p className="text-red-600 ml-[1rem]">{requirementError}</p>}
      </div>

      <div className="form-group">
        <label className="form-label ml-3" htmlFor="inp-message">Message</label>
        <textarea className="form-input" name="message" id="inp-message" placeholder="Describe your message..." rows={7} value={message} onChange={inputChangeHandler}></textarea>
        {messageError && <p className="text-red-600 ml-[1rem]">{messageError}</p>}
      </div>

      <div className="mx-auto md:col-span-2">
        <button className="btn btn-tertiary !px-8 !py-2.5 flex items-center justify-center relative" type="submit" disabled={loading}>
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
