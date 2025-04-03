"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import close_icon from "@/public/assets/images/ic-cancel.svg";
import delete_icon from "@/public/assets/admin-dashboard/ic-delete-icon.svg";
import MotButtonComponent from "./MotButtonComponent";
import plus_icon from "@/public/assets/admin-dashboard/ic_add_plus.svg";
import { useRouter } from "next/navigation";
import { REQUIRED_ERROR } from "@/utils/validationError";
import useApi from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";
import InputComponent from "@/components/InputComponent";
import { DECIMAL_REGEX } from "@/utils/regex";
import {
  createManualOrderApi,
  editManualOrderApi,
  getOrderDetailsApi,
} from "../api/order.api";

interface ManualOrderProps {
  handleClose?: any;
  orderData?: any;
}

interface DiamondDetail {
  id: number;
  stoneId?: string | null;
  lab?: string | null;
  shape?: string | null;
  type?: string | null;
  rap?: number;
  ourDiscount?: number;
  pricePerCarat?: number;
  ourPrice?: number;
  caratWeight?: number;
  stoneNo?: any | null;
}

const ManualOrder = ({ handleClose, orderData }: ManualOrderProps) => {
  const router = useRouter();

  const [diamondDetails, setDiamondDetails] = useState<DiamondDetail[]>([
    { id: Date.now(), stoneNo: "", lab: "", shape: "", type: "" },
  ]);

  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderDateError, setOrderDateError] = useState("");
  const [companyName, setCompanyName] = useState<any>("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [companyEmail, setCompanyEmail] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [editId, setEditId] = useState("");

  const {
    loading: isCreateManualOrderRequestLoading,
    data: createManualOrderResponse,
    request: createManualOrderRequest,
  } = useApi(createManualOrderApi);

  const {
    loading: isGetOrderDetailsRequestLoading,
    data: getOrderDetailsResponse,
    request: getOrderDetailsRequest,
  } = useApi(getOrderDetailsApi);

  const {
    loading: isOrderUpdateRequestLoading,
    data: getOrderUpdateResponse,
    request: getOrderUpdateRequest,
  } = useApi(editManualOrderApi);

  useEffect(() => {
    if (orderData?.isManualOrder) {
      getOrderDetailsRequest(router, orderData._id);
    }
  }, [getOrderDetailsRequest, router]);

  useEffect(() => {
    if (!isGetOrderDetailsRequestLoading && getOrderDetailsResponse) {
      if (getOrderDetailsResponse.responseCode === ResponseCodes.SUCCESS) {
        setEditId(getOrderDetailsResponse?.data?._id);
        setOrderId(getOrderDetailsResponse?.data?.orderNumber);
        setCompanyName(getOrderDetailsResponse?.data?.companyName);
        setCompanyEmail(getOrderDetailsResponse?.data?.companyEmail);
        setDescription(getOrderDetailsResponse?.data?.description);

        const formattedDate = new Date(getOrderDetailsResponse?.data?.createdAt)
          .toISOString()
          .slice(0, 10);
        setOrderDate(formattedDate);
        setDiamondDetails(
          getOrderDetailsResponse?.data?.items.map((detail: any) => ({
            id: Date.now() + Math.random(),
            stoneNo: detail.stoneNo,
            lab: detail.lab,
            shape: detail.shape,
            type: detail.type,
            rap: detail.rap,
            ourDiscount: detail.ourDiscount,
            pricePerCarat: detail.pricePerCarat,
            ourPrice: detail.ourPrice,
            caratWeight: detail.caratWeight,
          }))
        );
      }
    }
  }, [getOrderDetailsResponse, isGetOrderDetailsRequestLoading]);

  const handleAddDiamondDetail = () => {
    setDiamondDetails([
      ...diamondDetails,
      {
        id: Date.now() + Math.random(),
        stoneId: "",
        lab: "",
        shape: "",
        type: "",
      },
    ]);
  };
  const handleRemoveDiamondDetail = (id: number) => {
    if (diamondDetails.length > 1) {
      setDiamondDetails(diamondDetails.filter((detail) => detail.id !== id));
    } else {
      return;
    }
  };

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    if (name === "orderId") {
      setOrderId(value);
    }

    if (name === "orderDate") {
      setOrderDate(value);
    }

    if (name === "companyname") {
      setCompanyName(value);
    }

    if (name === "companyemail") {
      setCompanyEmail(value);
    }

    if (name === "description") {
      setDescription(value);
    }
    return;
  };

  const handleDiamondDetailChange = (
    id: number,
    name: string,
    value: string | number
  ) => {
    setDiamondDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.id === id ? { ...detail, [name]: value } : detail
      )
    );
  };

  const validateForm = () => {
    let isValid = true;

    setDiamondDetails((prevDetails) =>
      prevDetails.map((detail) => {
        const errors: any = {};

        if (!detail.stoneNo) {
          errors.stoneNoError = REQUIRED_ERROR;
          isValid = false;
        }
        if (!detail.rap) {
          errors.rapError = REQUIRED_ERROR;
          isValid = false;
        }
        if (!detail.ourDiscount) {
          errors.ourDiscountError = REQUIRED_ERROR;
          isValid = false;
        }
        if (!detail.pricePerCarat) {
          errors.pricePerCaratError = REQUIRED_ERROR;
          isValid = false;
        }
        if (!detail.ourPrice) {
          errors.ourPriceError = REQUIRED_ERROR;
          isValid = false;
        }
        if (!detail.caratWeight) {
          errors.caratWeightError = REQUIRED_ERROR;
          isValid = false;
        }

        return { ...detail, ...errors };
      })
    );

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const items = diamondDetails
      .filter((detail) => detail.stoneNo)
      .map((detail) => ({
        stoneNo: detail.stoneNo!,
        lab: detail.lab!,
        shape: detail.shape!,
        type: detail.type!,
        rap: detail.rap!,
        ourDiscount: detail.ourDiscount!,
        pricePerCarat: detail.pricePerCarat!,
        ourPrice: detail.ourPrice!,
        caratWeight: detail.caratWeight!,
      }));

    const isoDate: any =
      orderDate !== ""
        ? new Date(orderDate).toISOString()
        : new Date().toISOString();

    if (!validateForm()) {
      return;
    }
    if (!isoDate) {
      setOrderDateError(REQUIRED_ERROR);
      return;
    } else setOrderDateError("");

    if (!companyName) {
      setCompanyNameError(REQUIRED_ERROR);
      return;
    } else {
      setCompanyNameError("");
    }

    if (!orderData) {
      createManualOrderRequest(
        router,
        isoDate,
        companyName,
        companyEmail ? companyEmail : null,
        description ? description : null,
        items
      );
    }

    if (orderData) {
      getOrderUpdateRequest(
        router,
        editId,
        isoDate,
        companyName,
        companyEmail,
        description,
        items
      );
    }
  };

  useEffect(() => {
    if (!isCreateManualOrderRequestLoading && createManualOrderResponse) {
      if (createManualOrderResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(createManualOrderResponse.message);
        window.location.reload();
      }
    }
  }, [isCreateManualOrderRequestLoading, createManualOrderResponse]);

  useEffect(() => {
    if (!isOrderUpdateRequestLoading && getOrderUpdateResponse) {
      if (getOrderUpdateResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(getOrderUpdateResponse.message);
        window.location.reload();
      }
    }
  }, [getOrderUpdateResponse, isOrderUpdateRequestLoading]);

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 flex z-[31] justify-center items-center p-3">
      <form
        className="max-w-[43.75rem] w-full bg-white rounded-xl mx-5 "
        onSubmit={handleSubmit}
      >
        <div className="relative flex justify-center items-center py-3 border-b border-primary/50">
          <span className="font-semibold text-xl text-tertiary uppercase">
            {orderData !== undefined ? "Edit Manual Order" : "Add Manual Order"}
          </span>
          <Image
            src={close_icon}
            alt=""
            width={35}
            height={35}
            className="absolute top-2 right-8 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="p-4">
          <div className="max-h-[50rem]  overflow-scroll   h-[calc(100dvh-8.5rem)]">
            <div>
              <span className="font-semibold text-lg capitalize text-tertiary">
                Purchase Details
              </span>
              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="flex flex-col justify-start gap-1 max-sm:col-span-2">
                  <label
                    htmlFor="Order ID"
                    className="add-purchase-label opacity-50 "
                  >
                    Order ID*
                  </label>

                  <input
                    type="text"
                    className={`add-purchase-input  opacity-50 `}
                    placeholder="Enter Order ID"
                    name="orderId"
                    onChange={handleInputChange}
                    disabled={true}
                    value={orderId}
                  />
                  {/* <p className="text-red-500 ml-1 text-sm">{orderIdError}</p> */}
                </div>
                <div className="flex flex-col justify-start gap-1 max-sm:col-span-2">
                  <label htmlFor="Date" className="add-purchase-label">
                    Date*
                  </label>
                  <div className="relative w-full ">
                    <InputComponent
                      type="date"
                      className="add-purchase-input "
                      name="orderDate"
                      value={
                        orderDate
                          ? orderDate
                          : new Date().toISOString().slice(0, 10)
                      }
                      handleChange={handleInputChange}
                      defaultValue={""}
                      onclick={(e: any) => e.target.showPicker()}
                    />
                  </div>
                  <p className="text-red-500 ml-1 text-sm">{orderDateError}</p>
                </div>
                <div className="flex flex-col justify-start gap-1 max-sm:col-span-2">
                  <label htmlFor="Company Name" className="add-purchase-label">
                    Company Name*
                  </label>

                  <input
                    type="text"
                    className="add-purchase-input"
                    placeholder="Enter Company Name"
                    value={companyName}
                    onChange={handleInputChange}
                    name="companyname"
                  />
                  <p className="text-red-500 ml-1 text-sm">
                    {companyNameError}
                  </p>
                </div>
                <div className="flex flex-col justify-start gap-1 max-sm:col-span-2">
                  <label htmlFor="Company Email" className="add-purchase-label">
                    Company Email
                  </label>

                  <input
                    type="email"
                    className="add-purchase-input"
                    placeholder="Enter Company Email"
                    value={companyEmail}
                    onChange={handleInputChange}
                    name="companyemail"
                  />
                </div>
                <div className="flex flex-col justify-start gap-1 col-span-2">
                  <label htmlFor="Description" className="add-purchase-label">
                    Description
                  </label>
                  <textarea
                    className="rounded-xl bg-[#EDF0F5] px-5 py-2 placeholder:font-poppins placeholder:text-sm leading-5 placeholder:text-black/85   outline-none h-auto  w-full "
                    name="description"
                    placeholder="Enter description"
                    rows={3}
                    value={description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="py-5">
              <span className="font-semibold text-lg capitalize text-tertiary">
                Diamond Details
              </span>

              {diamondDetails.map((detail: any, index: any) => (
                <div className="py-3" key={detail.id}>
                  <div className="p-6 border border-tertiary/15 rounded-xl relative">
                    <div className="grid md:grid-cols-4 gap-y-3 gap-x-5 grid-cols-2">
                      <div className="flex flex-col justify-start gap-1 max-sm:col-span-2">
                        <label
                          htmlFor="Stone ID"
                          className="add-purchase-label"
                        >
                          Stone ID/Name*
                        </label>
                        <input
                          type="text"
                          className="add-purchase-input"
                          placeholder=" Stone ID/Name"
                          value={detail.stoneNo || ""}
                          onChange={(e) =>
                            handleDiamondDetailChange(
                              detail.id,
                              e.target.name,
                              e.target.value
                            )
                          }
                          name="stoneNo"
                        />

                        {detail.stoneNoError && (
                          <div className="error-message">
                            {detail.stoneNoError}
                          </div>
                        )}
                      </div>
                      <div
                        className={`flex flex-col justify-start gap-1 max-sm:col-span-2`}
                      >
                        <label htmlFor="Lab" className="add-purchase-label">
                          Lab
                        </label>
                        <input
                          type="text"
                          className="add-purchase-input"
                          placeholder="Lab"
                          name="lab"
                          value={detail.lab || ""}
                          onChange={(e) =>
                            handleDiamondDetailChange(
                              detail.id,
                              e.target.name,
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div
                        className={`flex flex-col justify-start gap-1 max-sm:col-span-2`}
                      >
                        <label htmlFor="Shape" className="add-purchase-label">
                          Shape
                        </label>
                        <input
                          type="text"
                          className="add-purchase-input"
                          placeholder="Shape"
                          name="shape"
                          value={detail.shape || ""}
                          onChange={(e) =>
                            handleDiamondDetailChange(
                              detail.id,
                              e.target.name,
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div
                        className={`flex flex-col justify-start gap-1 max-sm:col-span-2`}
                      >
                        <label htmlFor="Type" className="add-purchase-label">
                          Type
                        </label>
                        <input
                          type="text"
                          className="add-purchase-input"
                          placeholder="Type"
                          name="type"
                          value={detail.type || ""}
                          onChange={(e) =>
                            handleDiamondDetailChange(
                              detail.id,
                              e.target.name,
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col justify-start gap-1 max-sm:col-span-2">
                        <label htmlFor="Rap USD" className="add-purchase-label">
                          Rap USD*
                        </label>
                        <input
                          type="number"
                          className="add-purchase-input"
                          placeholder="Rap USD"
                          value={
                            detail.rap !== undefined && !isNaN(detail.rap)
                              ? parseFloat(detail.rap)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (DECIMAL_REGEX.test(value)) {
                              handleDiamondDetailChange(
                                detail.id,
                                "rap",
                                value === "" ? "" : parseFloat(value)
                              );
                            }
                          }}
                          step="any"
                          name={`rap-${detail.id}`}
                        />
                        {detail.rapError && (
                          <div className="error-message">{detail.rapError}</div>
                        )}
                      </div>
                      <div className="flex flex-col justify-start gap-1 max-sm:col-span-2">
                        <label htmlFor="Rap USD" className="add-purchase-label">
                          Carat*
                        </label>
                        <input
                          type="number"
                          className="add-purchase-input"
                          placeholder="Carat"
                          value={
                            detail.caratWeight !== undefined &&
                            !isNaN(detail.caratWeight)
                              ? parseFloat(detail.caratWeight)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (DECIMAL_REGEX.test(value)) {
                              handleDiamondDetailChange(
                                detail.id,
                                "caratWeight",
                                value === "" ? "" : parseFloat(value)
                              );
                            }
                          }}
                          step="any"
                          name={`caratWeight-${detail.id}`}
                        />
                        {detail.caratWeightError && (
                          <div className="error-message">
                            {detail.caratWeightError}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-start gap-1 max-sm:col-span-2">
                        <label htmlFor="Disc%" className="add-purchase-label">
                          Disc%*
                        </label>
                        <input
                          type="number"
                          className="add-purchase-input"
                          placeholder="Disc%"
                          value={
                            detail.ourDiscount !== undefined &&
                            !isNaN(detail.ourDiscount)
                              ? parseFloat(detail.ourDiscount)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (DECIMAL_REGEX.test(value)) {
                              handleDiamondDetailChange(
                                detail.id,
                                "ourDiscount",
                                value === "" ? "" : parseFloat(value)
                              );
                            }
                          }}
                          step="any"
                          name={`ourDiscount-${detail.id}`}
                        />
                        {detail.ourDiscountError && (
                          <div className="error-message">
                            {detail.ourDiscountError}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-start gap-1 max-sm:col-span-2">
                        <label htmlFor="Price" className="add-purchase-label">
                          Price/ Carat*
                        </label>
                        <input
                          type="number"
                          className="add-purchase-input"
                          placeholder="Price/Carat"
                          value={
                            detail.pricePerCarat !== undefined &&
                            !isNaN(detail.pricePerCarat)
                              ? parseFloat(detail.pricePerCarat)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (DECIMAL_REGEX.test(value)) {
                              handleDiamondDetailChange(
                                detail.id,
                                "pricePerCarat",
                                value === "" ? "" : parseFloat(value)
                              );
                            }
                          }}
                          step="any"
                          name={`pricePerCarat-${detail.id}`}
                        />
                        {detail.pricePerCaratError && (
                          <div className="error-message">
                            {detail.pricePerCaratError}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-start gap-1 max-sm:col-span-2">
                        <label
                          htmlFor="Total Price"
                          className="add-purchase-label"
                        >
                          Total Price*
                        </label>
                        <input
                          type="number"
                          className="add-purchase-input"
                          placeholder="Total Price"
                          value={
                            detail.ourPrice !== undefined &&
                            !isNaN(detail.ourPrice)
                              ? parseFloat(detail.ourPrice)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (DECIMAL_REGEX.test(value)) {
                              handleDiamondDetailChange(
                                detail.id,
                                "ourPrice",
                                value === "" ? "" : parseFloat(value)
                              );
                            }
                          }}
                          step="any"
                          name={`ourPrice-${detail.id}`}
                        />
                        {detail.ourPriceError && (
                          <div className="error-message">
                            {detail.ourPriceError}
                          </div>
                        )}
                      </div>
                    </div>
                    <Image
                      src={delete_icon}
                      alt=""
                      className="absolute top-2 right-5 cursor-pointer"
                      onClick={() => handleRemoveDiamondDetail(detail.id)}
                    />
                  </div>
                </div>
              ))}

              <div
                className="flex justify-end items-center gap-1 px-2 cursor-pointer"
                onClick={handleAddDiamondDetail}
              >
                <Image src={plus_icon} alt="" />
                <span className="font-semibold text-lg uppercase text-tertiary">
                  Add
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <MotButtonComponent buttonText="Save" buttonType="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManualOrder;
