"use client";
import { isEmailValid } from "@/utils/validation";
import { EMAIL_INVALID } from "@/utils/validationError";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sendStoneDetailsMail } from "../api/diamond.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import useApiRequest from "@/hooks/useApi";
import { useRouter } from "next/navigation";

interface EmailBoxProps {
  exportRowData: any;
  handleOpenClose: Function;
}

const EmailBox = ({ exportRowData, handleOpenClose }: EmailBoxProps) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const {
    loading: isStoneDetailMailLoading,
    data: stoneDetailMailResponse,
    request: stoneDetailMailRequest,
  } = useApiRequest(sendStoneDetailsMail);

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

  const sendStoneDetailsViaMail = (event: any) => {
    event.preventDefault();

    let selectedRowData: Array<any> = [...exportRowData];
    let newData: any = selectedRowData.map((item) => item._id);
    if (newData.length >= 1) {
      stoneDetailMailRequest(router, email, newData);
    } else {
      toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    if (!isStoneDetailMailLoading && stoneDetailMailResponse) {
      if (stoneDetailMailResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(stoneDetailMailResponse.message);
      }
      handleOpenClose(false);
    }
  }, [handleOpenClose, isStoneDetailMailLoading, stoneDetailMailResponse]);

  const handleEmailBox = () => {
    handleOpenClose(false);
  };
  return (
    <div className="max-w-[620px] w-full bg-white rounded-xl mx-5 ">
      <div className="p-4 border-b-[1px] border-black/15">
        <h2 className="font-poppins font-medium text-lg">Send Excel to Mail</h2>
      </div>
      <form className="p-4" onSubmit={sendStoneDetailsViaMail}>
        <p className="font-poppins text-sm leading-5 font-normal pt-2 pb-4">
          Selected diamonds will be sent to the below entered email you have
          provided as an attachment
        </p>
        <div className="flex justify-start items-center gap-x-2 mb-4">
          <label
            htmlFor=""
            className="font-medium capitalize text-base leading-6 "
          >
            email
          </label>
          <input
            onChange={inputChangeHandler}
            value={email}
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="border border-primary/20 px-3 py-2 rounded-md placeholder:font-poppins placeholder:text-sm leading-5 placeholder:text-primary/60  placeholder:capitalize outline-none max-w-[400px] w-full"
          />
        </div>
        <p className="text-red-600 ml-[1rem]">{emailError}</p>
        <div className="flex justify-end items-center gap-x-2 ">
          <button
            className="font-poppins uppercase font-medium text-base leading-6 rounded-xl py-2 px-4 border border-black"
            onClick={handleEmailBox}
          >
            Cancel
          </button>
          <button
            className={`font-poppins uppercase font-medium text-base leading-6 bg-tertiary text-white rounded-xl py-2 px-4 `}
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailBox;
