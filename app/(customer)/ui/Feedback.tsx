import useApiRequest from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import React, { FormEvent, MouseEvent, useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { sendFeedbackApi } from "../api/support.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";
import { EMAIL } from "@/utils/constants";
import closeIcon from "@/public/close_icn.svg";
import Image from "next/image";

interface FeedbackProps {
  handleSubmitButton: Function;
  handleCancleButton?: any;
}

const Feedback = ({
  handleCancleButton,
  handleSubmitButton = () => {},
}: FeedbackProps) => {
  const starts = Array(5).fill(0);
  const [starCurrentValue, setStarCurrentValue] = useState(0);
  const [starValueError, setStarValueError] = useState("");
  const [hoverValue, setHoverValue] = useState(undefined);
  const router = useRouter();
  const [message, setMessage] = useState("");

  const {
    loading: isSendFeedbackLoading,
    data: sendFeedbackResponse,
    request: sendFeedbackRequest,
  } = useApiRequest(sendFeedbackApi);

  useEffect(() => {
    if (!isSendFeedbackLoading && sendFeedbackResponse) {
      if (sendFeedbackResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(sendFeedbackResponse.message);
      }
      handleSubmitButton();
    }
  }, [handleSubmitButton, isSendFeedbackLoading, sendFeedbackResponse]);

  const handleClick = (value: any) => {
    setStarCurrentValue(value);
    if (value == 0) {
      setStarValueError("rating is required");
    } else {
      setStarValueError("");
    }
  };

  const handleHoverIn = (value: any) => {
    setHoverValue(value);
  };

  const handleHoverOut = (value: any) => {
    setHoverValue(undefined);
  };

  const handleInsideDropdown = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "message") {
      setMessage(value);
    }
  };

  const onSubmitClickHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!starCurrentValue) {
      setStarValueError("rating is required");
      return;
    }

    sendFeedbackRequest(router, starCurrentValue, message);
    clearInputs();
  };

  const clearInputs = () => {
    setMessage("");
    setStarCurrentValue(0);
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 h-dvh w-full z-50 bg-black/15 p-5 md:p-0  md:flex justify-center items-center">
      <div
        className="bg-white max-w-[800px] w-full rounded-[10px] md:mx-3 "
        onClick={handleInsideDropdown}
      >
        <div className=" relative font-poppins text-tertiary border-b-[1px] border-primary/50 py-2">
          <h3 className="font-medium text-4xl leading-[54px] text-center">
            Feedback
          </h3>
          <Image
            onClick={handleCancleButton}
            src={closeIcon}
            alt=""
            className="absolute top-[25px] right-[30px] cursor-pointer"
          />
        </div>
        <div className="p-[24px] ">
          <form
            action=""
            onSubmit={onSubmitClickHandler}
            className="normal-case"
          >
            <h2 className="font-libre-barskerville font-bold text-4xl leading-[44px] text-tertiary text-center">
              MOTIBA
            </h2>
            <a
              href={`mailto:${EMAIL}`}
              className="font-poppins font-normal text-lg leading-7 text-center mt-[5px] mb-[12px] block normal-case"
            >
              {EMAIL}
            </a>
            <div className="flex flex-row justify-center items-center gap-x-3 ">
              {starts.map((_, index: number) => {
                return (
                  <IoStarSharp
                    name="rating"
                    size={48}
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    className={`${
                      (hoverValue || starCurrentValue) > index
                        ? `fill-tertiary`
                        : `fill-[#D9D9D9]`
                    }`}
                    onMouseOver={() => handleHoverIn(index + 1)}
                    onMouseLeave={handleHoverOut}
                  />
                );
              })}
            </div>
            <div className="flex flex-col justify-start my-7 max-w-[618px] w-full m-auto">
              <label
                htmlFor="comment"
                className="font-poppins font-bold text-base left-6"
              >
                Comment
              </label>
              <textarea
                className="bg-customer-background rounded-[10px] py-[17px] px-[28px] mt-[6px] mb-[15px]"
                name="message"
                placeholder="Write short message"
                rows={3}
                value={message}
                onChange={inputChangeHandler}
              />
              <p className="text-red-600 text-xs ml-[1rem]">{starValueError}</p>
            </div>
            <div className="flex justify-center">
              <button className="font-medium font-poppins border-[1px] rounded-[10px] border-tertiary bg-tertiary text-white py-[10px] px-[37px]  hover:-translate-y-1 hover:scale-105 duration-500">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
