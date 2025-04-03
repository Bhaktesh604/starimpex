import useApiRequest from "@/hooks/useApi";
import React, {
  FormEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { getHelpApi } from "../api/support.api";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";
import { CONTACT_NUMBER, EMAIL } from "@/utils/constants";
import { REQUIRED_ERROR } from "@/utils/validationError";

interface HelpDropDownProps {
  handleCancleButton?: MouseEventHandler<HTMLButtonElement>;
  handleSubmitButton?: Function;
}

const HelpDropDown = ({
  handleCancleButton,
  handleSubmitButton = () => {},
}: HelpDropDownProps) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const {
    loading: isGetHelpLoading,
    data: getHelpResponse,
    request: getHelpRequest,
  } = useApiRequest(getHelpApi);

  const handleInsideDropdown = (event: MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (!isGetHelpLoading && getHelpResponse) {
      if (getHelpResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(getHelpResponse.message);
        handleSubmitButton();
      }
    }
  }, [getHelpResponse, handleSubmitButton, isGetHelpLoading]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "message") {
      setMessage(value);
      if (value == "") {
        setMessageError(REQUIRED_ERROR);
      } else {
        setMessageError("");
      }
      return;
    }
  };

  const onSubmitClickHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!message) {
      setMessageError(REQUIRED_ERROR);
      return;
    }

    getHelpRequest(router, message);
    clearInputs();
  };

  const clearInputs = () => {
    setMessage("");
  };

  return (
    <div className="max-[1024px]:fixed max-[1024px]:top-0 max-[1024px]:left-0 max-[1024px]:bottom-0 max-[1024px]:right-0 max-[1024px]:flex max-[1024px]:justify-center max-[1024px]:items-center max-[1024px]:bg-black/15">
      <div
        className={`lg:fixed lg:left-[55%] lg:top-[70px]  mx-3 transition-all duration-300 ease-in-out origin-top`}
        onClick={handleInsideDropdown}
      >
        <div className="rounded-[1rem] bg-white flex flex-col justify-center mt-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full max-w-[470px] py-4 pl-[18px] pr-[10px] ">
          <form
            action=""
            className="font-poppins font-normal text-sm leading-5 normal-case"
            onSubmit={onSubmitClickHandler}
          >
            <div>
              <p>
                Feel Free to let us know how do we can help you, please contact
                the below contact information or describe your queries in text
                box at the end. to let us know any of your queries & questions,
                our executive will respond you shortly.
              </p>
              <p className="my-2">
                Reach out on :&nbsp;
                <a href={`tel:${CONTACT_NUMBER}`} className="text-tertiary">
                  {CONTACT_NUMBER}
                </a>
                &nbsp;through Whatspp,Skype & Call. Email us on :&nbsp;
                <a href={`mailto:${EMAIL}`} className="text-tertiary">
                  {EMAIL}.
                </a>
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="query">You can describe your queries below</label>
              <textarea
                className="bg-customer-background rounded-[10px] py-[10px] px-3 mt-[6px] mb-[15px]"
                name="message"
                placeholder="Write short message"
                rows={3}
                value={message}
                onChange={inputChangeHandler}
              />
              <p className="text-red-600 text-xs ml-[1rem]">{messageError}</p>
              <div className="flex flex-row justify-end items-center gap-1">
                <button
                  className="font-medium font-poppins border-[1px] rounded-[10px] border-primary/85 text-primary/85 py-[9px] px-[18px]  hover:-translate-y-1 hover:scale-105 duration-500"
                  onClick={handleCancleButton}
                >
                  Cancel
                </button>
                <button
                  className="font-medium font-poppins border-[1px] rounded-[10px] border-tertiary bg-tertiary text-white py-[9px] px-[18px]  hover:-translate-y-1 hover:scale-105 duration-500"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpDropDown;
