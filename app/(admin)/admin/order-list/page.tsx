"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  exportOrderStonesDetailsToExcel,
  getOrderListApi,
} from "../api/order.api";
import useApi from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import Pagination from "@/components/Pagination";
import { PAGE_LIMIT, USER_TYPE_KEY } from "@/utils/constants";
import InputComponent from "@/components/InputComponent";
import MotButtonComponent from "../ui/MotButtonComponent";
import { toast } from "react-toastify";
import OrderListTable from "../ui/OrderListTable";
import { ResponseMessages } from "@/utils/response.messages";
import ManualOrder from "../ui/ManualOrder";
import { EUserType } from "@/interfaces/common.interface";

const Page = () => {
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [orderItemNumber, setOrderItemNumber] = useState("");
  const [fromOrderDate, setFromOrderDate] = useState("");
  const [toOrderDate, setToOrderDate] = useState("");
  const [fromTotalAmount, setFromTotalAmount] = useState("");
  const [toTotalAmount, setToTotalAmount] = useState("");
  const [fromItems, setFromItems] = useState("");
  const [toItems, setToItems] = useState("");
  const [fromTotalCarats, setFromTotalCarats] = useState("");
  const [toTotalCarats, setToTotalCarats] = useState("");
  const [selectedRow, setSelectedRow] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<any>([]);
  const [manualOrder, setManualOrder] = useState(false);
  const [editOrder, setEditOrder] = useState<any>(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleManualOrder = () => {
    setManualOrder(true);
  };

  const handleEditClick = (data: any) => {
    setEditOrder(data);
    setEditDialogOpen(true);
  };
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditOrder(null);
  };

  const {
    loading: isGetOrderRequestLoading,
    data: getOrderListResponse,
    request: getOrderListRequest,
  } = useApi(getOrderListApi);

  useEffect(() => {
    if (!isGetOrderRequestLoading && getOrderListResponse) {
      if (getOrderListResponse.responseCode === ResponseCodes.SUCCESS) {
        setOrderList(getOrderListResponse.data.orders);
        setTotalPages(getOrderListResponse.data.totalPages);
        setIsLoading(false);
      }
    }
  }, [isGetOrderRequestLoading, getOrderListResponse]);

  useEffect(() => {
    if(localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN){
      getOrderListRequest(router, currentPage * PAGE_LIMIT, PAGE_LIMIT);
    }
  }, [currentPage, router, getOrderListRequest]);

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
    setOrderItemNumber("");
    setFromOrderDate("");
    setToOrderDate("");
    setFromTotalAmount("");
    setToTotalAmount("");
    setFromTotalCarats("");
    setToTotalCarats("");
    setFromItems("");
    setToItems("");
  };

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

  const closeManualPopup = () => {
    setManualOrder(false);
  };

  return (
    <div className="bg-customer-background lg:flex lg:flex-col w-full h-full lg:overflow-hidden lg:h-[calc(100dvh-8.5rem)] p-3">
      <form
        className="font-poppins font-medium text-sm leading-4 py-7 flex justify-between items-start"
        onSubmit={onSearchOrder}
      >
        <div className="flex flex-row flex-wrap justify-start gap-x-7 w-full gap-y-3">
          <div className="md:max-w-[20.813rem] w-full  flex flex-col gap-y-3 max-w-full">
            <div className="flex flex-row justify-between items-center  max-sm:flex-wrap max-sm:gap-y-2">
              <label htmlFor="Order Number" className="mr-4    max-w-28 w-full">
                Order Number
              </label>
              <InputComponent
                type="text"
                className="bg-history_primary md:max-w-[12.5rem] max-w-full w-full "
                placeholder=""
                name="orderItemNumber"
                value={orderItemNumber}
                handleChange={inputChangeHandler}
              />
            </div>
            <div className="flex flex-row justify-between items-center  max-sm:flex-wrap max-sm:gap-y-2">
              <label htmlFor="Total Stones" className="mr-4    max-w-28 w-full">
                Total Stones
              </label>
              <div className="flex flex-row items-baseline justify-end max-w-full w-full">
                <InputComponent
                  type="text"
                  className="bg-history_primary max-w-full md:max-w-[5.625rem] w-full  placeholder:text-gray-500"
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
                  className="bg-history_primary max-w-full md:max-w-[5.625rem] w-full  placeholder:text-gray-500"
                  placeholder="To"
                  name="toItems"
                  handleChange={inputChangeHandler}
                  value={toItems}
                />
              </div>
            </div>
          </div>
          <div className="md:max-w-[31.875rem] w-full flex flex-col gap-y-3 max-w-full">
            <div className="flex flex-row justify-start items-center  max-sm:flex-wrap max-sm:gap-y-2">
              <label htmlFor="Order Date" className=" mr-4 max-w-28 w-full">
                Order Date
              </label>
              <div className="flex flex-row items-baseline justify-end max-w-full w-full">
                <div className="relative max-w-full md:max-w-[11.563rem] w-full ">
                  <InputComponent
                    type="date"
                    className="bg-history_primary sm:min-w-[11.563rem] w-full "
                    placeholder="From"
                    name="fromOrderDate"
                    value={fromOrderDate}
                    handleChange={inputChangeHandler}
                  />
                </div>

                <label htmlFor="To" className="mr-1 ml-2">
                  -
                </label>
                <div className="relative max-w-full md:max-w-[11.563rem] w-full  ">
                  <InputComponent
                    type="date"
                    className="bg-history_primary sm:min-w-[11.563rem] w-full "
                    placeholder="To"
                    name="toOrderDate"
                    value={toOrderDate}
                    handleChange={inputChangeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-start items-center  max-sm:flex-wrap max-sm:gap-y-2">
              <label
                htmlFor="Total Carat"
                className="md:mr-2 mr-4 max-w-28 w-full"
              >
                Total Carat
              </label>
              <div className="flex flex-row items-baseline justify-end max-w-full w-full">
                <InputComponent
                  type="text"
                  className="bg-history_primary max-w-full md:max-w-[11.563rem] w-full  placeholder:text-gray-500"
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
                  className="bg-history_primary max-w-full md:max-w-[11.563rem] w-full  placeholder:text-gray-500"
                  placeholder="To"
                  name="toTotalCarats"
                  value={toTotalCarats}
                  handleChange={inputChangeHandler}
                />
              </div>
            </div>
          </div>

          <div className="md:max-w-[26.563rem] w-full md:mr-[1rem] mr-0 flex flex-col gap-y-3 max-w-full">
            <div className="md:mr-9 mr-0">
              <div className="flex flex-row justify-start items-center  max-sm:flex-wrap max-sm:gap-y-2">
                <label htmlFor="Total Amount" className="mr-4 max-w-28 w-full">
                  Total Amount
                </label>
                <div className="flex flex-row items-baseline justify-start max-w-full w-full">
                  <InputComponent
                    type="text"
                    className="bg-history_primary max-w-full md:max-w-[5.313rem] w-full  placeholder:text-gray-500"
                    placeholder="From"
                    name="fromTotalAmount"
                    value={fromTotalAmount}
                    handleChange={inputChangeHandler}
                  />
                  <label htmlFor="To" className="mr-1 ml-2">
                    -
                  </label>
                  <InputComponent
                    type="text"
                    className="bg-history_primary max-w-full md:max-w-[5.313rem] w-full  placeholder:text-gray-500"
                    placeholder="To"
                    name="toTotalAmount"
                    value={toTotalAmount}
                    handleChange={inputChangeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-start items-baseline gap-x-3 flex-wrap gap-y-2">
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
              <MotButtonComponent
                buttonText="Add"
                className="block lg:hidden"
                handleButtonOnClick={handleManualOrder}
              />
            </div>
          </div>
        </div>
        <div className="max-w-[160px] w-full  hidden lg:block ">
          <MotButtonComponent
            buttonText="Add"
            handleButtonOnClick={handleManualOrder}
          />
        </div>
      </form>
      {manualOrder || editOrder ? (
        <ManualOrder handleClose={closeManualPopup} />
      ) : (
        ""
      )}
      {isEditDialogOpen && (
        <ManualOrder handleClose={closeEditDialog} orderData={editOrder} />
      )}

      <OrderListTable
        orderData={orderList}
        isLoading={isLoading}
        onSelectedRowChange={handleSelectedRowsChange}
        handleEditOrder={handleEditClick}
      />
      <Pagination
        totalPage={totalPages}
        onPageChangeHandler={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default Page;
