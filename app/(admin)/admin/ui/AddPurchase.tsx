"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import close_icon from "@/public/assets/images/ic-cancel.svg";
import delete_icon from "@/public/assets/admin-dashboard/ic-delete-icon.svg";
import MotButtonComponent from "./MotButtonComponent";
import plus_icon from "@/public/assets/admin-dashboard/ic_add_plus.svg";
import { createPurchaseApi, updatePurchaseApi } from "../api/purchase.api";
import { useRouter } from "next/navigation";
import { REQUIRED_ERROR } from "@/utils/validationError";
import useApi from "@/hooks/useApi";
import { getOrderItemsByOrderNumberApi } from "../api/order.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";
import edit_icon from "@/public/assets/admin-dashboard/ic_edit_purchase.svg";
import InputComponent from "@/components/InputComponent";
import { DECIMAL_REGEX } from "@/utils/regex";

interface AddPurchaseProps {
  closeAddPurchase: any;
  editData?: any;
}

interface DiamondDetail {
  id: number;
  stoneId?: string | null;
  lab?: string | null;
  shape?: string | null;
  type?: string | null;
  finalRap?: number;
  finalDiscount?: number;
  finalPrice?: number;
  finalTotalPrice?: number;
  stoneNo?: any | null;
}

const AddPurchase = ({ closeAddPurchase, editData }: AddPurchaseProps) => {
  const router = useRouter();

  const [diamondDetails, setDiamondDetails] = useState<DiamondDetail[]>([
    { id: Date.now(), stoneId: "", lab: "", shape: "", type: "" },
  ]);

  const [orderId, setOrderId] = useState("");
  const [orderIdError, setOrderIdError] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>([]);
  const [orderDate, setOrderDate] = useState("");
  const [orderDateError, setOrderDateError] = useState("");
  const [supplierName, setSupplierName] = useState<any>("");
  const [supplierAddress, setSupplierAddress] = useState<any>("");
  const [description, setDescription] = useState<any>("");

  const {
    loading: isOrderDetailRequestLoading,
    data: getOrderDetailResponse,
    request: getOrderDetailRequest,
  } = useApi(getOrderItemsByOrderNumberApi);

  const {
    loading: isCreatePurchaseRequestLoading,
    data: getCreatePurchaseResponse,
    request: getCreatePurchaseRequest,
  } = useApi(createPurchaseApi);

  const {
    loading: isPurchaseUpdateRequestLoading,
    data: getPurchaseUpdateResponse,
    request: getPurchaseUpdateRequest,
  } = useApi(updatePurchaseApi);

  useEffect(() => {
    if (editData) {
      setOrderId(editData.orderId);
      setSupplierName(editData.supplierName);
      setSupplierAddress(editData.supplierAddress);
      setDescription(editData.description);

      const formattedDate = new Date(editData.date).toISOString().slice(0, 10);
      setOrderDate(formattedDate);

      setDiamondDetails(
        editData.items.map((detail: any) => ({
          id: Date.now() + Math.random(),
          stoneId: detail.stoneNo,
          lab: detail.lab,
          shape: detail.shape,
          type: detail.type,
          finalRap: detail.finalRap,
          finalDiscount: detail.finalDiscount,
          finalPrice: detail.finalPrice,
          finalTotalPrice: detail.finalTotalPrice,
        }))
      );
    }
  }, []);

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

  const handleOrderIdInput = () => {
    if (orderId.trim() && !orderIdError) {
      getOrderDetailRequest(router, orderId);
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

    if (name === "suppliername") {
      setSupplierName(value);
    }

    if (name === "supplieraddress") {
      setSupplierAddress(value);
    }

    if (name === "description") {
      setDescription(value);
    }
    return;
  };

  useEffect(() => {
    if (!isOrderDetailRequestLoading && getOrderDetailResponse) {
      if (getOrderDetailResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(getOrderDetailResponse.message);
        setOrderDetails(getOrderDetailResponse.data.orderItems);
      }
    }
  }, [isOrderDetailRequestLoading, getOrderDetailResponse]);

  const handleStoneIdChange = (id: number, stoneId: string) => {
    const selectedOrder = orderDetails.find(
      (item: any) => item.stoneNo === stoneId
    );

    setDiamondDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.id === id
          ? {
              ...detail,
              stoneId: selectedOrder?.stoneNo || "",
              lab: selectedOrder?.lab || "",
              shape: selectedOrder?.shape || "",
              type: selectedOrder?.type || "",
            }
          : detail
      )
    );
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

        if (!detail.stoneId) {
          errors.stoneIdError = REQUIRED_ERROR;
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
      .filter((detail) => detail.stoneId)
      .map((detail) => ({
        stoneId: detail.stoneId!,
        finalRap: detail.finalRap!,
        finalDiscount: detail.finalDiscount!,
        finalPrice: detail.finalPrice!,
        finalTotalPrice: detail.finalTotalPrice!,
      }));

    if (!orderId) {
      setOrderIdError(REQUIRED_ERROR);
      return;
    } else setOrderIdError("");

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

    let supplier = !supplierName ? null : supplierName;
    let supplieradd = !supplierAddress ? null : supplierAddress;
    let desc = !description ? null : description;

    if (!editData) {
      getCreatePurchaseRequest(
        router,
        orderId,
        isoDate,
        supplier,
        supplieradd,
        desc,
        items
      );
    } else {
      getPurchaseUpdateRequest(
        router,
        editData._id,
        orderId,
        isoDate,
        supplierName,
        supplierAddress,
        description,
        items
      );
    }
  };

  useEffect(() => {
    if (!isCreatePurchaseRequestLoading && getCreatePurchaseResponse) {
      if (getCreatePurchaseResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(getCreatePurchaseResponse.message);
        window.location.reload();
      }
    }
  }, [isCreatePurchaseRequestLoading, getCreatePurchaseResponse]);

  useEffect(() => {
    if (!isPurchaseUpdateRequestLoading && getPurchaseUpdateResponse) {
      if (getPurchaseUpdateResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(getPurchaseUpdateResponse.message);
        window.location.reload();
      }
    }
  }, [getPurchaseUpdateResponse, isPurchaseUpdateRequestLoading]);

  const handleClose = () => {
    closeAddPurchase(false);
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 flex z-[31] justify-center items-center p-3">
      <form
        className="max-w-[43.75rem] w-full bg-white rounded-xl mx-5 "
        onSubmit={handleSubmit}
      >
        <div className="relative flex justify-center items-center py-3 border-b border-primary/50">
          <span className="font-semibold text-xl text-tertiary uppercase">
            {editData ? "Edit Purchase" : "Add Purchase"}
          </span>
          <Image
            src={close_icon}
            alt=""
            width={35}
            height={35}
            className="absolute top-2 right-8 cursor-pointer"
            onClick={handleClose}
          />
          {editData && (
            <Image
              src={edit_icon}
              alt=""
              width={25}
              height={25}
              className="absolute top-3 left-8 cursor-pointer"
              onClick={handleClose}
            />
          )}
        </div>
        <div className="p-4">
          <div className="max-h-[50rem]  overflow-scroll   h-[calc(100dvh-8.5rem)]">
            <div>
              <span className="font-semibold text-lg capitalize text-tertiary">
                Purchase Details
              </span>
              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="flex flex-col justify-start gap-1 max-[30rem]:col-span-2">
                  <label htmlFor="Order ID" className="add-purchase-label">
                    Order ID*
                  </label>

                  <input
                    type="text"
                    className={`add-purchase-input ${
                      editData ? "opacity-50" : "opacity-100"
                    }`}
                    placeholder="Enter Order ID"
                    name="orderId"
                    onChange={handleInputChange}
                    onBlur={handleOrderIdInput}
                    disabled={!!editData}
                    value={orderId}
                  />
                  <p className="text-red-500 ml-1 text-sm">{orderIdError}</p>
                </div>
                <div className="flex flex-col justify-start gap-1 max-[30rem]:col-span-2">
                  <label htmlFor="Date" className="add-purchase-label">
                    Date
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
                      defaultValue={editData ? editData.date : ""}
                      onclick={(e: any) => e.target.showPicker()}
                    />
                  </div>
                  <p className="text-red-500 ml-1 text-sm">{orderDateError}</p>
                </div>
                <div className="flex flex-col justify-start gap-1 max-[30rem]:col-span-2">
                  <label htmlFor="Supplier Name" className="add-purchase-label">
                    Supplier Name
                  </label>

                  <input
                    type="text"
                    className="add-purchase-input"
                    placeholder="Enter supplier name"
                    value={supplierName}
                    onChange={handleInputChange}
                    name="suppliername"
                  />
                </div>
                <div className="flex flex-col justify-start gap-1 max-[30rem]:col-span-2">
                  <label
                    htmlFor="Supplier Address"
                    className="add-purchase-label"
                  >
                    Supplier Address
                  </label>

                  <input
                    type="text"
                    className="add-purchase-input"
                    placeholder="Enter supplier address"
                    value={supplierAddress}
                    onChange={handleInputChange}
                    name="supplieraddress"
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

              {diamondDetails?.map((detail: any) => (
                <div className="py-3" key={detail.id}>
                  <div className="p-6 border border-tertiary/15 rounded-xl relative">
                    <div className="grid md:grid-cols-4 gap-y-3 gap-x-5 grid-cols-2">
                      <div className="flex flex-col justify-start gap-1">
                        <label
                          htmlFor="Stone ID"
                          className="add-purchase-label"
                        >
                          Stone ID*
                        </label>
                        <select
                          id="select-stone-id"
                          className="rounded-lg bg-[#EDF0F5] py-2 px-3 outline-none"
                          value={detail.stoneId}
                          onChange={(e) =>
                            handleStoneIdChange(detail.id, e.target.value)
                          }
                        >
                          <option value={editData ? detail.stoneId : ""}>
                            {editData ? detail.stoneId : "Stone ID"}
                          </option>
                          {orderDetails.map((item: any) => (
                            <option key={item._id} value={item.stoneNo}>
                              {item.stoneNo}
                            </option>
                          ))}
                        </select>
                        {detail.stoneIdError && (
                          <div className="error-message">
                            {detail.stoneIdError}
                          </div>
                        )}
                      </div>
                      <div
                        className={`flex flex-col justify-start gap-1 opacity-50`}
                      >
                        <label htmlFor="Lab" className="add-purchase-label">
                          Lab
                        </label>
                        <input
                          type="text"
                          className="add-purchase-input"
                          placeholder="Lab"
                          disabled={detail.stoneId === ""}
                          value={detail.lab || ""}
                        />
                      </div>
                      <div
                        className={`flex flex-col justify-start gap-1 opacity-50`}
                      >
                        <label htmlFor="Shape" className="add-purchase-label">
                          Shape
                        </label>
                        <input
                          type="text"
                          className="add-purchase-input"
                          placeholder="Shape"
                          disabled={detail.stoneId === ""}
                          value={detail.shape || ""}
                        />
                      </div>
                      <div
                        className={`flex flex-col justify-start gap-1 opacity-50`}
                      >
                        <label htmlFor="Type" className="add-purchase-label">
                          Type
                        </label>
                        <input
                          type="text"
                          className="add-purchase-input"
                          placeholder="Type"
                          disabled={detail.stoneId === ""}
                          value={detail.type || ""}
                        />
                      </div>
                      <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="Rap USD" className="add-purchase-label">
                          Rap USD
                        </label>
                        <input
                          type="number"
                          className="add-purchase-input"
                          placeholder="Rap USD"
                          value={
                            detail.finalRap !== undefined &&
                            !isNaN(detail.finalRap)
                              ? parseFloat(detail.finalRap)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (DECIMAL_REGEX.test(value)) {
                              handleDiamondDetailChange(
                                detail.id,
                                "finalRap",
                                value === "" ? "" : parseFloat(value)
                              );
                            }
                          }}
                          step="any"
                          name={`finalRap-${detail.id}`}
                        />
                      </div>
                      <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="Disc%" className="add-purchase-label">
                          Disc%
                        </label>
                        <input
                          type="number"
                          className="add-purchase-input"
                          placeholder="Disc%"
                          value={
                            detail.finalDiscount !== undefined &&
                            !isNaN(detail.finalDiscount)
                              ? parseFloat(detail.finalDiscount)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (DECIMAL_REGEX.test(value)) {
                              handleDiamondDetailChange(
                                detail.id,
                                "finalDiscount",
                                value === "" ? "" : parseFloat(value)
                              );
                            }
                          }}
                          step="any"
                          name={`finalDiscount-${detail.id}`}
                        />
                      </div>
                      <div className="flex flex-col justify-start gap-1">
                        <label htmlFor="Price" className="add-purchase-label">
                          Price/Carat
                        </label>
                        <input
                          type="number"
                          className="add-purchase-input"
                          placeholder="Price/Carat"
                          value={
                            detail.finalPrice !== undefined &&
                            !isNaN(detail.finalPrice)
                              ? parseFloat(detail.finalPrice)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (DECIMAL_REGEX.test(value)) {
                              handleDiamondDetailChange(
                                detail.id,
                                "finalPrice",
                                value === "" ? "" : parseFloat(value)
                              );
                            }
                          }}
                          step="any"
                          name={`finalPrice-${detail.id}`}
                        />
                      </div>
                      <div className="flex flex-col justify-start gap-1">
                        <label
                          htmlFor="Total Price"
                          className="add-purchase-label"
                        >
                          Total Price
                        </label>
                        <input
                          type="number"
                          className="add-purchase-input"
                          placeholder="Total Price"
                          value={
                            detail.finalTotalPrice !== undefined &&
                            !isNaN(detail.finalTotalPrice)
                              ? parseFloat(detail.finalTotalPrice)
                              : ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (DECIMAL_REGEX.test(value)) {
                              handleDiamondDetailChange(
                                detail.id,
                                "finalTotalPrice",
                                value === "" ? "" : parseFloat(value)
                              );
                            }
                          }}
                          step="any"
                          name={`finalTotalPrice-${detail.id}`}
                        />
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

export default AddPurchase;
