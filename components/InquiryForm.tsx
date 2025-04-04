"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    companyName: "",
    diamondType: "",
    country: "",
    message: ""
  });

  const [messageStatus, setMessageStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 🔄 Loader state

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onChangePhone = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const onSubmitClickHandler = (e) => {
    e.preventDefault();
    setIsLoading(true); // 🔄 Show loader

    emailjs.send(
      "service_jrnjdss",
      "template_0ynv3bf",
      formData,
      "P7tsu6N4ZVevQiGTy"
    )
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      setMessageStatus("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        companyName: "",
        diamondType: "",
        country: "",
        message: ""
      });
    })
    .catch((err) => {
      console.log("FAILED...", err);
      setMessageStatus("Failed to send message. Please try again.");
    })
    .finally(() => {
      setIsLoading(false); // ✅ Hide loader after response
    });
  };

  return (
    <form
      className="grid sm:grid-cols-2 gap-5 py-10 px-6 bg-white"
      onSubmit={onSubmitClickHandler}
    >
      <div className="form-group">
        <label className="form-label ml-3">First Name</label>
        <input className="form-input" type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={inputChangeHandler} required />
      </div>

      <div className="form-group">
        <label className="form-label ml-3">Last Name</label>
        <input className="form-input" type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={inputChangeHandler} required />
      </div>

      <div className="form-group">
        <label className="form-label ml-3">Phone</label>
        <PhoneInput className="form-input" value={formData.phone} onChange={onChangePhone} required />
      </div>

      <div className="form-group">
        <label className="form-label ml-3">Email</label>
        <input className="form-input" type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={inputChangeHandler} required />
      </div>

      <div className="form-group">
        <label className="form-label ml-3">Company Name</label>
        <input className="form-input" type="text" name="companyName" placeholder="Enter your company name" value={formData.companyName} onChange={inputChangeHandler} required />
      </div>

      <div className="form-group">
        <label className="form-label ml-3">Diamond Type</label>
        <select name="diamondType" className="form-input" value={formData.diamondType} onChange={inputChangeHandler} required>
          <option value="">Select Diamond Type</option>
          <option value="Natural Diamonds">Natural Diamonds</option>
          <option value="Lab Grown Diamonds (CVD)">Lab Grown Diamonds (CVD)</option>
          <option value="Lab Grown Diamonds (HPHT)">Lab Grown Diamonds (HPHT)</option>
        </select>
      </div>

      <div className="form-group sm:col-span-2">
        <label className="form-label ml-3">Country</label>
        <select name="country" className="form-input" value={formData.country} onChange={inputChangeHandler} required>
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="UK">UK</option>
        </select>
      </div>

      <div className="form-group sm:col-span-2">
        <label className="form-label ml-3">Message</label>
        <textarea className="form-input" name="message" placeholder="Describe your message..." rows={5} value={formData.message} onChange={inputChangeHandler} required />
      </div>

      <div className="mx-auto sm:col-span-2">
        <button className="btn btn-tertiary px-8 py-2.5 flex items-center justify-center" disabled={isLoading}>
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>

      {messageStatus && <p className="text-center text-green-600">{messageStatus}</p>}
    </form>
  );
};

export default InquiryForm;
