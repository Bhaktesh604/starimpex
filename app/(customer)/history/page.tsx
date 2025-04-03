"use client";
import InputComponent from "@/components/InputComponent";
import React, { useCallback, useEffect, useState } from "react";
import MotButtonComponent from "../ui/MotButtonComponent";
import MotBanner from "../ui/MotBanner";
import History from "../ui/History";
import useApiRequest from "@/hooks/useApi";
import {
  exportOrderStonesDetailsToExcel,
  getMyOrderList,
} from "../api/order.api";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";
import { ResponseMessages } from "@/utils/response.messages";
import { PAGE_LIMIT, USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";

const HistoryPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [orderItemNumber, setOrderItemNumber] = useState("");
  const [fromOrderDate, setFromOrderDate] = useState("");
  const [toOrderDate, setToOrderDate] = useState("");
  const [fromTotalAmount, setFromTotalAmount] = useState("");
  const [toTotalAmount, setToTotalAmount] = useState("");
  const [fromItems, setFromItems] = useState("");
  const [toItems, setToItems] = useState("");
  const [fromTotalCarats, setFromTotalCarats] = useState("");
  const [toTotalCarats, setToTotalCarats] = useState("");
  const [totalOrders, setTotalOrders] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<any>([]);
  const [totalCarat, setTotalCarat] = useState(0);
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);
  const [totalShippingCharges, setTotalShippingCharges] = useState(0);
  const [totalAdditionalCharges, setTotalAdditionalCharges] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total_carat = 0;
    let total_order_amount = 0;
    let total_shipping_charges = 0;
    let total_add_less_amount = 0;
    let total_amount = 0;

    selectedData.forEach((data: any) => {
      total_carat = total_carat + data.totalCarats;
      total_order_amount = total_order_amount + data.grossAmount;
      total_shipping_charges = total_shipping_charges + data.shippingCharge;
      total_add_less_amount =
        total_add_less_amount + data.totalAdditionalCharges;
      total_amount = total_amount + data.totalAmount;
    });

    setTotalCarat(total_carat);
    setTotalOrderAmount(total_order_amount);
    setTotalShippingCharges(total_shipping_charges);
    setTotalAdditionalCharges(total_add_less_amount);
    setTotalAmount(total_amount);
  }, [selectedData]);

  const {
    loading: isGetOrderListLoading,
    data: getOrderListResponse,
    request: getOrderListRequest,
  } = useApiRequest(getMyOrderList);

  const getOrderListData = useCallback(() => {
    setIsLoading(true);
    getOrderListRequest(
      router,
      currentPage * PAGE_LIMIT,
      PAGE_LIMIT,
      orderItemNumber,
      fromOrderDate,
      toOrderDate,
      fromTotalAmount,
      toTotalAmount,
      fromItems,
      toItems,
      fromTotalCarats,
      toTotalCarats
    );
  }, [
    currentPage,
    fromItems,
    fromOrderDate,
    fromTotalAmount,
    fromTotalCarats,
    getOrderListRequest,
    orderItemNumber,
    router,
    toItems,
    toOrderDate,
    toTotalAmount,
    toTotalCarats,
  ]);

  useEffect(() => {
    if(localStorage.getItem(USER_TYPE_KEY) === EUserType.USER){
      getOrderListData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (!isGetOrderListLoading && getOrderListResponse) {
      if (getOrderListResponse.responseCode === ResponseCodes.SUCCESS) {
        setOrderList(getOrderListResponse.data.orders);
        setTotalPage(getOrderListResponse.data.totalPages);
        setTotalOrders(getOrderListResponse.data.totalOrders);
      }
      setIsLoading(false);
    }
  }, [isGetOrderListLoading, getOrderListResponse]);

  const handleSelectedRowsChange = (
    selectedOrders: Array<any>,
    isChecked: boolean
  ) => {
    let updatedSelectedRows: Array<any> = [...selectedData];
    const newSelectedOrderIds = selectedOrders.map((order: any) => order._id);
    updatedSelectedRows = updatedSelectedRows.filter(
      (order: any) => !newSelectedOrderIds.includes(order._id)
    );

    if (isChecked) {
      updatedSelectedRows.push(...selectedOrders);
    }
    let diamondOrderData: any = updatedSelectedRows.map(
      (order: any) => order._id
    );

    setSelectedData(updatedSelectedRows);

    setSelectedRow(diamondOrderData);
  };

  const onSearchOrder = (event: any) => {
    event.preventDefault();
    getOrderListRequest(
      router,
      currentPage * PAGE_LIMIT,
      PAGE_LIMIT,
      orderItemNumber,
      fromOrderDate,
      toOrderDate,
      fromTotalAmount,
      toTotalAmount,
      fromItems,
      toItems,
      fromTotalCarats,
      toTotalCarats
    );
  };

  const onSearchClear = () => {
    window.location.reload();
  };

  const inputChangeHandler = (e: any) => {
    const { value, name } = e.target;
    if (name === "orderItemNumber") {
      setOrderItemNumber(value);
    }
    if (name === "fromItems") {
      setFromItems(value);
    }
    if (name === "toItems") {
      setToItems(value);
    }
    if (name === "fromOrderDate") {
      setFromOrderDate(value);
    }
    if (name === "toOrderDate") {
      setToOrderDate(value);
    }
    if (name === "fromTotalCarats") {
      setFromTotalCarats(value);
    }
    if (name === "toTotalCarats") {
      setToTotalCarats(value);
    }
    if (name === "fromTotalAmount") {
      setFromTotalAmount(value);
    }
    if (name === "toTotalAmount") {
      setToTotalAmount(value);
    }
  };

  const exportOrderStonesDetails = async (selectedRows: any) => {
    let selectedRowData = [...selectedRows];

    if (selectedRowData.length >= 1) {
      try {
        const response = await exportOrderStonesDetailsToExcel(selectedRowData);
        if (response.data) {
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "orders_details.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          toast.error(ResponseMessages.SOMETHING_WENT_WRONG, {
            autoClose: 2000,
          });
        }
      } catch (error: any) {
        // TODO :- Add Dynamic message

        toast.error("Something went wrong ! Please try again", {
          autoClose: 2000,
        });
      }
    } else {
      toast.error("Please select at least one Order.", { autoClose: 2000 });
    }
  };

  const exportOrderDetails = () => {
    if (selectedRow.length >= 1) {
      exportOrderStonesDetails(selectedRow);
    } else {
      toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
    }
  };

  return (
    <section className="p-5 lg:flex lg:flex-col  bg-[#f1f4f9] lg:overflow-hidden lg:h-[calc(100dvh-8.5rem)] w-full">
      <form
        className="font-poppins font-medium text-sm leading-4"
        onSubmit={onSearchOrder}
      >
        <div className="flex flex-row flex-wrap justify-start gap-x-7 gap-y-3">
          <div className="max-w-[333px] w-full  flex flex-col gap-y-3 max-[936px]:max-w-full max-[936px]:mr-0">
            <div className="flex flex-row justify-between items-center max-[600px]:flex-wrap ">
              <label
                htmlFor="Order Number"
                className="mr-4 max-[440px]:mb-1 max-[936px]:mr-0 max-[936px]:max-w-[122px] max-[936px]:w-full "
              >
                Order Number
              </label>
              <InputComponent
                type="text"
                className="bg-history_primary max-w-[200px] w-full max-[936px]:max-w-full"
                placeholder=""
                name="orderItemNumber"
                value={orderItemNumber}
                handleChange={inputChangeHandler}
              />
            </div>
            <div className="flex flex-row justify-between items-center max-[936px]:max-w-full max-[600px]:flex-wrap">
              <label
                htmlFor="Total Stones"
                className="mr-4 max-[440px]:mb-1 max-[936px]:mr-0 max-[936px]:max-w-[122px] max-[936px]:w-full"
              >
                Total Stones
              </label>
              <div className="flex flex-row items-baseline justify-end max-[420px]:flex-wrap max-[420px]:justify-start max-[420px]:gap-x-1 max-[936px]:max-w-full max-[936px]:w-full">
                <InputComponent
                  type="text"
                  className="bg-history_primary max-w-[90px] w-full max-[936px]:max-w-full placeholder:text-gray-500"
                  placeholder="From"
                  name="fromItems"
                  value={fromItems}
                  handleChange={inputChangeHandler}
                />
                <label htmlFor="To" className="mr-[5px] ml-[7px]">
                  -
                </label>
                <InputComponent
                  type="text"
                  className="bg-history_primary max-w-[90px] w-full max-[936px]:max-w-full placeholder:text-gray-500"
                  placeholder="To"
                  name="toItems"
                  handleChange={inputChangeHandler}
                  value={toItems}
                />
              </div>
            </div>
          </div>
          <div className="max-w-[510px] w-full flex flex-col gap-y-3 max-[936px]:max-w-full max-[936px]:mr-0 max-[600px]:flex-wrap">
            <div className="flex flex-row justify-start items-center max-[600px]:flex-wrap max-[936px]:justify-start ">
              <label
                htmlFor="Order Date"
                className="mr-5 max-[936px]:mr-3 max-[936px]:max-w-[110px] max-[936px]:w-full max-[440px]:mb-1"
              >
                Order Date
              </label>
              <div className="flex flex-row items-baseline justify-end max-[420px]:flex-wrap max-[420px]:justify-start max-[420px]:gap-x-1 max-[936px]:max-w-full max-[936px]:w-full">
                <div className="relative max-w-[185px] w-full max-[936px]:max-w-full">
                  <InputComponent
                    type="date"
                    className="bg-history_primary min-w-[185px] w-full max-[936px]:max-w-full  "
                    placeholder="From"
                    name="fromOrderDate"
                    value={fromOrderDate}
                    handleChange={inputChangeHandler}
                  />
                </div>

                <label htmlFor="To" className="mr-[5px] ml-[7px]">
                  -
                </label>
                <div className="relative max-w-[185px] w-full  max-[936px]:max-w-full">
                  <InputComponent
                    type="date"
                    className="bg-history_primary min-w-[185px] w-full max-[936px]:max-w-full"
                    placeholder="To"
                    name="toOrderDate"
                    value={toOrderDate}
                    handleChange={inputChangeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-start items-center max-[936px]:max-w-full max-[600px]:flex-wrap ">
              <label
                htmlFor="Total Carat"
                className="mr-4 max-[936px]:mr-3 max-[936px]:max-w-[110px] max-[936px]:w-full max-[440px]:mb-1"
              >
                Total Carat
              </label>
              <div className="flex flex-row items-baseline justify-end max-[420px]:flex-wrap max-[420px]:justify-start max-[420px]:gap-x-1 max-[936px]:max-w-full max-[936px]:w-full">
                <InputComponent
                  type="text"
                  className="bg-history_primary max-w-[185px] w-full max-[936px]:max-w-full placeholder:text-gray-500"
                  placeholder="From"
                  name="fromTotalCarats"
                  value={fromTotalCarats}
                  handleChange={inputChangeHandler}
                />
                <label htmlFor="To" className="mr-[5px] ml-[7px]">
                  -
                </label>
                <InputComponent
                  type="text"
                  className="bg-history_primary max-w-[185px] w-full max-[936px]:max-w-full placeholder:text-gray-500"
                  placeholder="To"
                  name="toTotalCarats"
                  value={toTotalCarats}
                  handleChange={inputChangeHandler}
                />
              </div>
            </div>
          </div>

          <div className="max-w-[425px] w-full mr-[15px] flex flex-col gap-y-3 max-[936px]:max-w-full max-[936px]:mr-0">
            <div className="mr-[35px] max-[936px]:max-w-full max-[936px]:w-full max-[936px]:mr-0">
              <div className="flex flex-row justify-start items-center max-[600px]:flex-wrap">
                <label
                  htmlFor="Total Amount"
                  className="mr-5 max-[936px]:mr-3 max-[936px]:max-w-[110px] max-[936px]:w-full max-[440px]:mb-1"
                >
                  Total Amount
                </label>
                <div className="flex flex-row items-baseline justify-end max-[420px]:flex-wrap max-[420px]:justify-start max-[420px]:gap-x-1 max-[936px]:max-w-full max-[936px]:w-full">
                  <InputComponent
                    type="text"
                    className="bg-history_primary max-w-[85px] w-full max-[936px]:max-w-full placeholder:text-gray-500"
                    placeholder="From"
                    name="fromTotalAmount"
                    value={fromTotalAmount}
                    handleChange={inputChangeHandler}
                  />
                  <label htmlFor="To" className="mr-[5px] ml-[7px]">
                    -
                  </label>
                  <InputComponent
                    type="text"
                    className="bg-history_primary max-w-[85px] w-full max-[936px]:max-w-full placeholder:text-gray-500"
                    placeholder="To"
                    name="toTotalAmount"
                    value={toTotalAmount}
                    handleChange={inputChangeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-start items-baseline gap-x-[11px] flex-wrap gap-y-2">
              <MotButtonComponent buttonText="Search" buttonType="submit" />
              <MotButtonComponent
                buttonText="Clear"
                buttonType="button"
                handleButtonOnClick={onSearchClear}
              />
              <MotButtonComponent
                buttonText="Export to Excel"
                handleButtonOnClick={exportOrderDetails}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-row justify-start items-center flex-wrap gap-y-2 pt-5 pb-3">
        <MotBanner
          bannerName=""
          bannerValue="Summary"
          bodyStyle="!rounded-md !bg-tertiary !text-white mt-0.5 !py-1.5 px-5"
        />
        <MotBanner
          bannerName="No. of Order"
          bannerValue={totalOrders}
          bodyStyle="!py-1.5"
        />
        <MotBanner
          bannerName="Selected Orders"
          bannerValue={selectedRow.length}
          bodyStyle="!py-1.5"
        />
        <MotBanner
          bannerName="Total Carat"
          bannerValue={totalCarat.toFixed(2)}
          bodyStyle="!py-1.5"
        />
        <MotBanner
          bannerName="Order Amt (USD)"
          bannerValue={totalOrderAmount.toFixed(2)}
          bodyStyle="!py-1.5"
        />
        <MotBanner
          bannerName="Shipping Charges (USD)"
          bannerValue={totalShippingCharges.toFixed(2)}
          bodyStyle="!py-1.5"
        />
        <MotBanner
          bannerName="Add/Less (USD)"
          bannerValue={totalAdditionalCharges.toFixed(2)}
          bodyStyle="!py-1.5"
        />
        <MotBanner
          bannerName="Net Amount (USD)"
          bannerValue={totalAmount.toFixed(2)}
          bodyStyle="!py-1.5"
        />
      </div>
      <History
        tableType="history"
        orderData={orderList}
        isLoading={isLoading}
        onSelectedRowChange={handleSelectedRowsChange}
      />
      <Pagination
        totalPage={totalPage}
        onPageChangeHandler={(page) => {
          setCurrentPage(page);
        }}
      />
    </section>
  );
};

export default HistoryPage;
