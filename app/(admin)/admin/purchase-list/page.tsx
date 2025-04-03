"use client";
import React, { useCallback, useEffect, useState } from "react";
import MotTable from "../ui/MotTable";
import MotTableBody from "../ui/MotTableBody";
import MotTableHead from "../ui/MotTableHead";
import MotTableHeadCell from "../ui/MotTableHeadCell";
import MotTableRow from "../ui/MotTableRow";
import MotTableRowCell from "../ui/MotTableRowCell";
import InputComponent from "@/components/InputComponent";
import MotButtonComponent from "../ui/MotButtonComponent";
import { useRouter } from "next/navigation";
import MotTableWrapper from "../ui/MotTableWrapper";
import Pagination from "@/components/Pagination";
import {
  AdminPurchaseListHeaders,
  MotAdminTableMenu,
} from "@/utils/MotTableConstant";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import AddPurchase from "../ui/AddPurchase";
import {
  deletePurchaseApi,
  exportPurchaseStonesDetailsToExcel,
  getPurchaseListApi,
} from "../api/purchase.api";
import useApiRequest from "@/hooks/useApi";
import { PAGE_LIMIT, USER_TYPE_KEY } from "@/utils/constants";
import { ResponseCodes } from "@/interfaces/response.interface";
import viewProductIcon from "@/public/assets/images/ic-view-details.svg";
import delete_icon from "@/public/assets/admin-dashboard/ic-delete-icon.svg";
import formatDate from "@/utils/helper";
import { toast } from "react-toastify";
import ViewIcon from "@/public/assets/images/ic-eye.svg";
import Link from "next/link";
import { links } from "@/utils/links";
import { TETooltip } from "tw-elements-react";
import { ResponseMessages } from "@/utils/response.messages";
import { EUserType } from "@/interfaces/common.interface";

const Page = () => {
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(0);
  const [purchaseData, setPurchaseData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [fromOrderDate, setFromOrderDate] = useState("");
  const [toOrderDate, setToOrderDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [addPurchase, setAddPurchase] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);

  const handleEditClick = (data: any) => {
    setEditData(data);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditData(null);
  };

  const {
    loading: isGetPurchaseListRequestLoading,
    data: getPurchaseListResponse,
    request: getPurchaseListRequest,
  } = useApiRequest(getPurchaseListApi);

  const {
    loading: isDeletePurchaseRequestLoading,
    data: getDeletePurchaseResponse,
    request: getDeletePurchaseRequest,
  } = useApiRequest(deletePurchaseApi);

  const getPurchaseList = useCallback(() => {
    if( localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN){
    getPurchaseListRequest(router, currentPage * PAGE_LIMIT, PAGE_LIMIT);
    }
  }, [currentPage, getPurchaseListRequest, router]);

  useEffect(() => {
    getPurchaseList();
  }, [currentPage]);

  useEffect(() => {
    if (!isGetPurchaseListRequestLoading && getPurchaseListResponse) {
      if (getPurchaseListResponse.responseCode === ResponseCodes.SUCCESS) {
        setPurchaseData(getPurchaseListResponse.data.purchases);
        setTotalPages(getPurchaseListResponse.data.totalPages);
        setIsLoading(false);
      }
    }
  }, [isGetPurchaseListRequestLoading, getPurchaseListResponse]);

  const inputChangeHandler = (e: any) => {
    const { value, name } = e.target;
    if (name === "orderId") {
      setOrderId(value);
    }
    if (name === "fromOrderDate") {
      setFromOrderDate(value);
    }
    if (name === "toOrderDate") {
      setToOrderDate(value);
    }
  };

  const onSearchOrder = (event: any) => {
    event.preventDefault();
    getPurchaseListRequest(
      router,
      currentPage * PAGE_LIMIT,
      PAGE_LIMIT,
      orderId,
      fromOrderDate,
      toOrderDate
    );
  };

  const onSearchClear = () => {
    window.location.reload();
  };

  const handleAddPurchase = () => {
    setAddPurchase(true);
  };

  const handleDelete = (item: any) => {
    getDeletePurchaseRequest(router, item._id);
  };

  useEffect(() => {
    if (!isDeletePurchaseRequestLoading && getDeletePurchaseResponse) {
      if (getDeletePurchaseResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(getDeletePurchaseResponse.message);
        window.location.reload();
      }
    }
  }, [getDeletePurchaseResponse, isDeletePurchaseRequestLoading]);

  const handleAllRowOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    let allSelectedIds = [];
    if (e.target.checked) {
      allSelectedIds = purchaseData.map((item: any) => item._id);
    }

    setSelectedRow([...allSelectedIds]);
  };

  const handleSingleRow = (
    e: React.ChangeEvent<HTMLInputElement>,
    purchaseItem: any
  ) => {
    if (!purchaseItem) {
      return;
    }
    let allSelectedIds = [...selectedRow];

    if (!e.target.checked) {
      allSelectedIds = allSelectedIds.filter((id) => id !== purchaseItem._id);
    } else {
      allSelectedIds.push(purchaseItem._id);
    }

    setSelectedRow([...allSelectedIds]);
  };

  const onClickMenu = (menu: any) => {
    if (menu === "exportExcel") {
      if (selectedRow.length >= 1) {
        exportStonesDetails(selectedRow);
      } else {
        toast.error("Please select at least one purchase", { autoClose: 2000 });
      }
    }
  };

  const exportStonesDetails = async (selectedRows: any) => {
    let selectedRowData = [...selectedRows];

    if (selectedRowData.length >= 1) {
      try {
        const response = await exportPurchaseStonesDetailsToExcel(
          selectedRowData
        );
        if (response.data) {
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Order_details.xlsx");
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
        toast.error("Something went wrong", { autoClose: 2000 });
        return;
      }
    } else {
      toast.error("Please select at least one purchase.", { autoClose: 2000 });
    }
  };

  return (
    <div className="bg-customer-background lg:flex lg:flex-col w-full h-full lg:overflow-hidden lg:h-[calc(100dvh-8.5rem)] p-3">
      <form
        className="font-poppins font-medium text-sm leading-4 py-7 flex justify-between items-start"
        onSubmit={onSearchOrder}
      >
        <div className="flex flex-row flex-wrap justify-start gap-x-7 gap-y-3 max-w-full w-full">
          <div className="md:max-w-[20.813rem] w-full  flex flex-col gap-y-3 max-w-full ">
            <div className="flex flex-row justify-between items-center max-sm:flex-wrap max-sm:gap-2">
              <label htmlFor="Order Number" className="mr-4 max-w-28 w-full">
                Order Number
              </label>
              <InputComponent
                type="text"
                className="bg-history_primary md:max-w-[12.5rem] max-w-full w-full "
                placeholder=""
                name="orderId"
                value={orderId}
                handleChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className="md:max-w-[31.875rem] max-w-full w-full flex flex-col gap-y-3 ">
            <div className="flex flex-row justify-start items-center  max-sm:flex-wrap max-sm:gap-2">
              <label htmlFor="Order Date" className="mr-4 max-w-28 w-full">
                Order Date
              </label>
              <div className="flex flex-row items-baseline justify-end max-md:max-w-full w-full">
                <div className="relative md:max-w-[11.563rem] max-w-full w-full ">
                  <InputComponent
                    type="date"
                    className="bg-history_primary md:min-w-[11.563rem] w-full max-w-full"
                    placeholder="From"
                    name="fromOrderDate"
                    value={fromOrderDate}
                    handleChange={inputChangeHandler}
                    onclick={(e: any) => e.target.showPicker()}
                  />
                </div>

                <label htmlFor="To" className="mr-1 ml-2">
                  -
                </label>
                <div className="relative md:max-w-[11.563rem] max-w-full w-full  ">
                  <InputComponent
                    type="date"
                    className="bg-history_primary md:min-w-[11.563rem] max-w-full w-full "
                    placeholder="To"
                    name="toOrderDate"
                    value={toOrderDate}
                    handleChange={inputChangeHandler}
                    onclick={(e: any) => e.target.showPicker()}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[26.563rem] w-full mr-4 flex flex-col gap-y-3 ">
            <div className="flex   items-baseline ">
              <div className="flex flex-row justify-start items-baseline gap-x-3 flex-wrap gap-y-2">
                <MotButtonComponent buttonText="Search" buttonType="submit" />
                <MotButtonComponent
                  buttonText="Clear"
                  buttonType="button"
                  handleButtonOnClick={onSearchClear}
                />
                <ul className="flex flex-row items-center justify-center gap-2 flex-wrap mx-2">
                  {MotAdminTableMenu.map((single, index) => {
                    if (single.type.includes("purchase-list")) {
                      return (
                        <li
                          key={`Mot-Table-${index}`}
                          className="bg-[#CFDBEB] rounded-full w-9 h-9 flex justify-center items-center mb-0 group cursor-pointer transition-transform"
                          onClick={() => onClickMenu(single.name)}
                        >
                          <TETooltip
                            trigger="hover click"
                            title={single.tooltipName || ""}
                          >
                            <Image
                              src={single.menuIconImg}
                              alt={`${single.tooltipName} icon`}
                              className="w-5 h-5 group-hover:scale-105"
                            />
                          </TETooltip>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <MotButtonComponent
                buttonText="Add"
                className="hidden mx-2 max-lg:block"
                handleButtonOnClick={handleAddPurchase}
              />
            </div>
          </div>
        </div>
        <div>
          <MotButtonComponent
            buttonText="Add"
            className="max-lg:hidden"
            handleButtonOnClick={handleAddPurchase}
          />
        </div>
      </form>
      <MotTableWrapper
        styles={`${
          isGetPurchaseListRequestLoading || !purchaseData.length
            ? "overflow-hidden"
            : "overflow-x-auto"
        }`}
      >
        <MotTable>
          <MotTableHead>
            <MotTableHeadCell styles="!w-[2.875rem] sticky left-0 z-[4] !border-r-0 !box_shadow">
              <input
                type="checkbox"
                className="accent-tertiary w-4 h-[0.875rem] cursor-pointer"
                onChange={handleAllRowOnClick}
                checked={
                  selectedRow.length &&
                  purchaseData.every((item: any) =>
                    selectedRow.includes(item._id)
                  )
                    ? true
                    : false
                }
              />
            </MotTableHeadCell>
            {AdminPurchaseListHeaders.map((single: any, index: any) => {
              return (
                <MotTableHeadCell
                  key={`Admin-Order-Table-headers-${index}`}
                  styles={single?.customStyle || ""}
                >
                  {single.headerName}
                </MotTableHeadCell>
              );
            })}
          </MotTableHead>
          <MotTableBody>
            {purchaseData?.map((single: any, index: any) => {
              return (
                <MotTableRow
                  key={single.id}
                  isSelected={selectedRow.includes(single._id)}
                >
                  <React.Fragment key={`Admin-Order-Table-rows-${index}`}>
                    <MotTableRowCell
                      styles={`sticky left-0  !border-r-0 !box_shadow  ${
                        selectedRow.includes(single._id)
                          ? "bg-[#CFDBEB]"
                          : "bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="accent-tertiary w-4 h-[0.875rem] rounded-[4px] cursor-pointer"
                        checked={selectedRow.includes(single._id)}
                        onChange={(e) => handleSingleRow(e, single)}
                      />
                    </MotTableRowCell>
                    <MotTableRowCell>{single.orderId}</MotTableRowCell>
                    <MotTableRowCell>
                      {single.date ? formatDate(single.date) : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="capitalize">
                      {single.supplierName ? single.supplierName : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="px-3 capitalize">
                      {single.supplierAddress ? single.supplierAddress : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell>
                      {single.description ? single.description : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell>
                      {single.items ? single.items.length : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell>
                      <div className="flex flex-row gap-x-2 justify-center items-center">
                        <Link
                          className="flex justify-center items-center cursor-pointer"
                          href={`${links.ADMIN_PURCHASE_LIST}/${single._id}`}
                          target="_blank"
                        >
                          <Image src={ViewIcon} alt="" width={15} height={15} />
                        </Link>
                        <div>
                          <Image
                            src={viewProductIcon}
                            alt="view product icon"
                            width={16}
                            height={14}
                            className="mx-auto"
                            onClick={() => handleEditClick(single)}
                          />
                        </div>
                        <div>
                          <Image
                            src={delete_icon}
                            alt="delete icon"
                            width={16}
                            height={14}
                            className="mx-auto"
                            onClick={() => handleDelete(single)}
                          />
                        </div>
                      </div>
                    </MotTableRowCell>
                  </React.Fragment>
                </MotTableRow>
              );
            })}
          </MotTableBody>
        </MotTable>
        {isLoading ? (
          <div className="flex justify-center items-center h-[90dvh]">
            <Spinner />
          </div>
        ) : purchaseData.length === 0 ? (
          <div className="grid place-content-center gap-5 h-[90dvh]">
            <Image src={dataNotFoundImage} alt="data not found" />
            <p className="text-3xl text-tertiary text-center font-medium">
              DATA NOT FOUND
            </p>
          </div>
        ) : null}
      </MotTableWrapper>
      <Pagination
        totalPage={totalPages}
        onPageChangeHandler={(page) => {
          setCurrentPage(page);
        }}
      />
      {addPurchase && <AddPurchase closeAddPurchase={setAddPurchase} />}
      {isEditDialogOpen && (
        <AddPurchase closeAddPurchase={closeEditDialog} editData={editData} />
      )}
    </div>
  );
};

export default Page;
