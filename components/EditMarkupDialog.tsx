import React, { useEffect, useState } from "react";
import CancelIcon from "@/public/assets/admin-dashboard/ic-cancel.svg";
import Image from "next/image";
import InputComponent from "./InputComponent";
import { REQUIRED_ERROR } from "@/utils/validationError";
import useApi from "@/hooks/useApi";
import { updateMarkupApi } from "@/app/(admin)/admin/api/api-managment.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

function EditMarkupDialog({
  hideMarkupDialog = () => {},
  apiObj,
  getAPIList
}: {
  hideMarkupDialog: () => void;
  apiObj: any;
  getAPIList: () => void;
}) {
  const [markup, setMarkup] = useState<any>(apiObj && apiObj.markupPercentage === 0 ? 0 : apiObj.markupPercentage);
  const [markupError, setMarkupError] = useState<string>();
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: updateMarkupRequestLoading,
    data: updateMarkupResponse,
    request: updateMarkupRequest,
  } = useApi(updateMarkupApi);


  useEffect(() => {
    if (!updateMarkupRequestLoading && updateMarkupResponse) {
      if (updateMarkupResponse.responseCode === ResponseCodes.SUCCESS) {
        dispatch(
          showAlert({
            message: updateMarkupResponse.message,
            variant: EVariant.SUCCESS,
          })
        );
        hideMarkupDialog();
        getAPIList();
      }
    }
  }, [updateMarkupRequestLoading, updateMarkupResponse]);

  const inputChangeHandler = (e: any) => {
    const { value, name } = e.target;
    let requiredError = value.trim() === "" ? REQUIRED_ERROR : "";
    if (name === "markup") {
      setMarkup(value);
      if (requiredError) {
        setMarkupError(requiredError);
      } else {
        setMarkupError("");
      }
      return;
    }
  };

  const onSave = (e: any) => {
    e.preventDefault();
    if (markupError) {
      return;
    }

    if (!markup) {
      setMarkupError(REQUIRED_ERROR);
      return;
    }

    updateMarkupRequest(router,apiObj.sourceType,Number(markup));
  };

  return (
    <div>
      <div className="relative w-full max-w-xl mx-auto bg-white rounded-[11px] shadow-lg">
        <div className="flex justify-between items-center p-4">
          <p className="text-tertiary text-xl font-poppins font-semibold text-center uppercase">
            Edit markup
          </p>
          <div className="flex justify-end">
            <Image
              src={CancelIcon}
              width={15}
              height={15}
              className="cursor-pointer"
              alt="image"
              onClick={hideMarkupDialog}
            />
          </div>
        </div>
        <hr className="border-primary border-opacity-[50%]"></hr>
        <div className="overflow-y-auto w-full">
          <div className="mx-[2rem] my-[1rem]">
            <form onSubmit={onSave}>
              <p className="text-base text-[#000000] text-opacity-[70%]">
                The selling price will be calculated by adding the markup
                percentage to the cost price of the diamond provider.
              </p>

              <div className="mt-[1.5rem]">
                <InputComponent
                  type="number"
                  className={`bg-customer-background py-[10px] pl-[14px] placeholder:font-poppins placeholder:text-sm placeholder:leading-5 placeholder:font-normal placeholder:text-primary/70  w-full ${markupError ? "border-[1px] border-red-600" :""}`}
                  placeholder="Enter Markup Percentage"
                  name="markup"
                  value={markup}
                  handleChange={inputChangeHandler}
                />
                <p className="text-sm !font-roboto text-red-600 ml-2 mt-1">
                  {markupError}
                </p>
              </div>

              <div className="flex justify-end items-center my-[1.5rem]">
                <button className="rounded-md font-poppins font-semibold text-sm leading-6 uppercase bg-tertiary text-white py-[7px] px-[22px]">
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMarkupDialog;
