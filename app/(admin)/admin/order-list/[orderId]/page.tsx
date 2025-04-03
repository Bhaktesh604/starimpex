"use client";
import { links } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import arrow_icon from "@/public/assets/admin-dashboard/arrow_view_page.svg";
import InputComponent from "@/components/InputComponent";
import user_icon from "@/public/assets/admin-dashboard/admin-order-list-user-icon.svg";
import AdminOrder from "../../ui/AdminOrder";
import { useRouter } from "next/navigation";
import {
  addOrderAdditionalChargesApi,
  getOrderDetailsApi,
} from "../../api/order.api";
import useApi from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import moment from "moment";
import ChangeStatusDialog from "@/components/ChangeStatusDialog";
import { REQUIRED_ERROR } from "@/utils/validationError";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { useDispatch } from "react-redux";
import { EOrderStatus } from "@/utils/content.util";

const Page = ({ params }: any) => {
  const [inputs, setInputs] = useState([{ amount: "", description: "" }]);
  const [inputErrors, setInputErrors] = useState([
    { amountError: "", descriptionError: "" },
  ]);
  const [orderDetails, setOrderDetails] = useState<any>();
  const [showChangeStatusModal, setChangeStatusModal] = useState(false);
  const [shippingCharge, setShippingCharge] = useState<any>();
  const [shippingChargeError, setShippingChargeError] = useState<any>();
  const router = useRouter();
  const dispatch = useDispatch();

  const hideChangeStatusModal = () => {
    setChangeStatusModal(false);
  };

  const {
    loading: isGetOrderDetailsRequestLoading,
    data: getOrderDetailsResponse,
    request: getOrderDetailsRequest,
  } = useApi(getOrderDetailsApi);

  useEffect(() => {
    if (!isGetOrderDetailsRequestLoading && getOrderDetailsResponse) {
      if (getOrderDetailsResponse.responseCode === ResponseCodes.SUCCESS) {
        setOrderDetails(getOrderDetailsResponse.data);
        if (getOrderDetailsResponse.data.additionalCharges.length > 0) {
          setInputs(getOrderDetailsResponse.data.additionalCharges);
        }
        if (getOrderDetailsResponse.data.shippingCharge) {
          setShippingCharge(getOrderDetailsResponse.data.shippingCharge);
        }
      }
    }
  }, [isGetOrderDetailsRequestLoading, getOrderDetailsResponse]);

  const {
    loading: additionalChargeRequestLoading,
    data: additionalChargeResponse,
    request: additionalChargeRequest,
  } = useApi(addOrderAdditionalChargesApi);

  useEffect(() => {
    if (!additionalChargeRequestLoading && additionalChargeResponse) {
      if (additionalChargeResponse.responseCode === ResponseCodes.SUCCESS) {
        dispatch(
          showAlert({
            message: additionalChargeResponse.message,
            variant: EVariant.SUCCESS,
          })
        );
        setInputErrors([{ amountError: "", descriptionError: "" }]);
        setShippingCharge("");
        getOrderDetailsRequest(router, params.orderId);
      }
    }
  }, [additionalChargeRequestLoading, additionalChargeResponse]);

  useEffect(() => {
    if (params.orderId) {
      getOrderDetailsRequest(router, params.orderId);
    }
  }, []);

  const handleAddInput = () => {
    let hasError = false;
    const newErrors = inputs.map((input, index) => {
      const amountError =
        input.amount.toString().trim() === "" ? REQUIRED_ERROR : "";
      const descriptionError =
        input.description.trim() === "" ? REQUIRED_ERROR : "";
      if (amountError || descriptionError) {
        hasError = true;
      }
      return { amountError, descriptionError };
    });

    setInputErrors(newErrors);

    if (!hasError) {
      setInputs([{ amount: "", description: "" }, ...inputs]);
      setInputErrors([
        { amountError: "", descriptionError: "" },
        ...inputErrors,
      ]);
    }
  };

  const handleChange = (event: any, index: number) => {
    let { name, value } = event.target;
    let onChangeValue: any = [...inputs];
    onChangeValue[index][name] = value;
    setInputs(onChangeValue);

    let newErrors = [...inputErrors];
    newErrors[index] = {
      ...newErrors[index],
      [`${name}Error`]: value.trim() === "" ? REQUIRED_ERROR : "",
    };
    setInputErrors(newErrors);
  };

  const handleDeleteInput = (index: any) => {
    const newArray = [...inputs];
    const newErrorsArray = [...inputErrors];
    newArray.splice(index, 1);
    newErrorsArray.splice(index, 1);
    setInputs(newArray);
    setInputErrors(newErrorsArray);
  };

  const inputChangeHandler = (e: any) => {
    const { value, name } = e.target;
    let requiredError = value.trim() === "" ? REQUIRED_ERROR : "";
    if (name === "shippingCharge") {
      setShippingCharge(value);
      if (requiredError) {
        setShippingChargeError(requiredError);
      } else {
        setShippingChargeError("");
      }
      return;
    }
  };

  const onSave = (e: any) => {
    e.preventDefault();
    if (shippingChargeError) {
      return;
    }

    if (!shippingCharge) {
      setShippingChargeError(REQUIRED_ERROR);

      return;
    }
    const additionalCharges: any = [];
    inputs.forEach((obj: any) => {
      if (obj.amount !== "" && obj.description !== "") {
        additionalCharges.push({
          amount: parseFloat(obj.amount),
          description: obj.description,
        });
      }
    });

    if (additionalCharges.length === 0) {
      setInputErrors([{ amountError: "", descriptionError: "" }]);
    }

    additionalChargeRequest(
      router,
      params.orderId,
      parseFloat(shippingCharge),
      additionalCharges
    );
  };

  return (
    <div className="p-3 bg-customer-background flex justify-center items-center">
      <div className="w-full">
        <div className="max-w-full w-full">
          <div className="bg-white max-w-full w-full rounded-2 mb-7 pb-20">
            <div className="border-b-[1px] border-primary/20 flex flex-row justify-between items-center pr-7 max-sm:flex-wrap">
              <Link
                href={links.ORDER_LIST}
                className="text-lg font-bold leading-7 flex flex-row ju items-center gap-x-2 pt-6 pl-4 pb-4  max-w-[14.063rem] w-full group"
              >
                <Image
                  src={arrow_icon}
                  alt=""
                  className="group-hover:-translate-x-1 transition-all duration-300"
                />
                <span>View Orders</span>
              </Link>
              <button
                className="rounded-md font-semibold text-sm leading-6 uppercase bg-tertiary text-white py-2 px-3 max-sm:ml-4 max-sm:mb-4 cursor-pointer"
                onClick={() => setChangeStatusModal(true)}
              >
                change status
              </button>
            </div>
            <div className="flex flex-row justify-start items-start gap-x-[5.813rem] max-lg:gap-x-0 pt-5 px-7 pb-14 max-lg:flex-wrap ">
              <div className="max-w-[34.375rem] sm:min-w-[31.875rem] w-full min-w-0 ">
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    ORDER ID:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetails?.orderNumber ? orderDetails.orderNumber : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    order date:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetails?.createdAt
                      ? moment(orderDetails?.createdAt).format("DD-MM-YYYY")
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    company name:
                  </span>
                  <span className="user-list-sub-title flex flex-row items-center">
                    {orderDetails?.user
                      ? orderDetails.user.companyName
                      : orderDetails?.isManualOrder
                      ? ""
                      : "-"}
                    {orderDetails?.companyName
                      ? orderDetails.companyName
                      : orderDetails?.isManualOrder
                      ? "-"
                      : ""}
                    {orderDetails?.isManualOrder ? (
                      ""
                    ) : (
                      <Link
                        href={links.USER_LIST + "/" + orderDetails?.user?._id}
                        className="flex flex-row justify-start items-center font-normal text-sm leading-6 text-tertiary ml-[0.875rem]"
                      >
                        <Image src={user_icon} alt="" width={15} height={15} />
                        View User
                      </Link>
                    )}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-0">
                    company&nbsp;email:
                  </span>
                  <span className="user-list-sub-title text-base">
                    {orderDetails?.user
                      ? orderDetails.user.email
                      : orderDetails?.isManualOrder
                      ? ""
                      : "-"}
                    {orderDetails?.companyEmail
                      ? orderDetails?.companyEmail
                      : orderDetails?.isManualOrder
                      ? "-"
                      : ""}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    total stones:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetails?.totalStones ? orderDetails.totalStones : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    total carats:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetails?.totalCarats
                      ? orderDetails.totalCarats.toFixed(2)
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    Gross Amount USD:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetails?.grossAmount
                      ? orderDetails.grossAmount.toFixed(2)
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    Shipping Charge USD:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetails?.shippingCharge
                      ? orderDetails.shippingCharge.toFixed(2)
                      : 0}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    addLess usd:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetails?.totalAdditionalCharges
                      ? orderDetails.totalAdditionalCharges.toFixed(2)
                      : 0}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    net amount usd:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetails?.totalAmount
                      ? orderDetails.totalAmount.toFixed(2)
                      : 0}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    change status:
                  </span>
                  <span
                    className={`user-list-sub-title border rounded-[4.375rem]  ${
                      orderDetails?.status === EOrderStatus.PARTIALLY_CONFIRM
                        ? "w-[9.375rem]"
                        : "w-20"
                    } px-1 flex justify-center ${
                      orderDetails?.status === EOrderStatus.PENDING
                        ? " border-gray_color text-gray_color"
                        : orderDetails?.status === EOrderStatus.CANCELED
                        ? "border-red_color text-red_color"
                        : orderDetails?.status === EOrderStatus.CONFIRM
                        ? "border-green_color text-green_color"
                        : "border-yellow_color text-yellow_color"
                    } capitalize`}
                  >
                    {orderDetails?.status
                      ? orderDetails.status.replace(/_/g, " ")
                      : "-"}
                  </span>
                </div>
              </div>
              <div className="border-[0.5px] border-black/30 rounded-lg p-4 max-w-[45.313rem] w-full ">
                <form onSubmit={onSave}>
                  <div className="flex flex-row justify-between items-start mb-7">
                    <div className="lg:max-w-[31.25rem] w-full flex flex-col justify-start ">
                      <label
                        htmlFor=""
                        className="font-medium text-lg leading-9 mb-2"
                      >
                        Shipping Charge
                      </label>
                      <InputComponent
                        type="text"
                        className="bg-customer-background max-w-[31.375rem] w-full py-2 pl-3 placeholder:text-sm placeholder:leading-5 placeholder:font-normal placeholder:text-primary/70"
                        placeholder="Enter Charge..."
                        value={shippingCharge}
                        handleChange={inputChangeHandler}
                        name="shippingCharge"
                      />
                      <p className="text-sm !font-roboto text-red-600 ml-2 mt-1">
                        {shippingChargeError}
                      </p>
                    </div>
                    <button className="rounded-md font-semibold text-sm leading-6 uppercase bg-tertiary text-white py-2 px-5">
                      SAVE
                    </button>
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="font-medium text-lg leading-8 "
                    >
                      Additional Charge
                    </label>
                    <div className="mt-2">
                      {inputs.map((item, index) => {
                        return (
                          <div
                            className="flex flex-row justify-start items-start gap-3 mb-3"
                            key={index}
                          >
                            <div className="flex flex-col">
                              <InputComponent
                                type="number"
                                className="bg-customer-background py-2 pl-3 placeholder:text-sm placeholder:leading-5 placeholder:font-normal placeholder:text-primary/70 max-w-[11.688rem] w-full"
                                placeholder="Enter Charge..."
                                value={item.amount}
                                handleChange={(event: any) =>
                                  handleChange(event, index)
                                }
                                name="amount"
                              />
                            </div>
                            <div className="flex flex-col ">
                              <InputComponent
                                type="text"
                                className="bg-customer-background py-2 pl-3 placeholder:text-sm placeholder:leading-5 placeholder:font-normal placeholder:text-primary/70 max-w-[19.063rem] w-full"
                                placeholder="Enter Description..."
                                value={item.description}
                                handleChange={(event: any) =>
                                  handleChange(event, index)
                                }
                                name="description"
                              />
                            </div>

                            {inputs.length <= 1 ? (
                              ""
                            ) : (
                              <button
                                className="rounded-md font-semibold text-base leading-6 uppercase bg-white text-tertiary border border-tertiary py-2 px-5"
                                type="button"
                                onClick={() => handleDeleteInput(index)}
                              >
                                Delete
                              </button>
                            )}
                            {index === 0 ? (
                              <>
                                <button
                                  className="rounded-md font-semibold text-sm leading-6 uppercase bg-tertiary text-white py-2 px-5"
                                  type="button"
                                  onClick={() => handleAddInput()}
                                >
                                  ADD
                                </button>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div>
              <AdminOrder
                tableType="admin-order"
                Stones={orderDetails?.items}
              />
            </div>
            {showChangeStatusModal ? (
              <>
                <div className="fixed inset-0 z-[8]">
                  <div className="fixed w-full h-screen bg-black opacity-40"></div>
                  <div className="flex items-center justify-center min-h-screen px-4 py-8">
                    <ChangeStatusDialog
                      hideChangeStatusModal={hideChangeStatusModal}
                      orderNumber={orderDetails?.orderNumber}
                      diamondData={orderDetails?.items}
                      orderId={orderDetails?._id}
                      status={orderDetails?.status}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
