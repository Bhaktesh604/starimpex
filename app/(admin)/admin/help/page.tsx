"use client";
import React, { useEffect, useState } from "react";
import MotTable from "../ui/MotTable";
import MotTableHead from "../ui/MotTableHead";
import { AdminHelpListHeaders } from "@/utils/MotTableConstant";
import MotTableHeadCell from "../ui/MotTableHeadCell";
import MotTableBody from "../ui/MotTableBody";
import MotTableRow from "../ui/MotTableRow";
import MotTableRowCell from "../ui/MotTableRowCell";
import { useRouter } from "next/navigation";
import useApiRequest from "@/hooks/useApi";
import {
  changeCustomerQueryRequestStatusApi,
  getCustomerQueryListApi,
} from "../api/support.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import FilterIcon from "@/public/assets/admin-dashboard/filter_icon.svg";
import ClearFilterIcon from "@/public/assets/admin-dashboard/clear_filter_icon.svg";
import Pagination from "@/components/Pagination";
import { ESupportRequestStatus } from "@/interfaces/user/user.interface";
import { PAGE_LIMIT, USER_TYPE_KEY } from "@/utils/constants";
import MotTableWrapper from "../ui/MotTableWrapper";
import { EUserType } from "@/interfaces/common.interface";

const Page = () => {
  const [customerQuery, setCustomerQuery] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const {
    loading: isCustomerQueryListLoading,
    data: getCustomerQueryListResponse,
    request: getCustomerQueryListRequest,
  } = useApiRequest(getCustomerQueryListApi);

  const {
    loading: isChangeCustomerQueryStatusLoading,
    data: getChangeCustomerQueryStatusResponse,
    request: getChangeCustomerQueryStatusRequest,
  } = useApiRequest(changeCustomerQueryRequestStatusApi);

  useEffect(() => {
    if( localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN){
      getCustomerQueryListRequest(router, currentPage * PAGE_LIMIT, PAGE_LIMIT);
    }
  }, [currentPage, getCustomerQueryListRequest, router]);

  useEffect(() => {
    if (!isCustomerQueryListLoading && getCustomerQueryListResponse) {
      if (getCustomerQueryListResponse.responseCode === ResponseCodes.SUCCESS) {
        setCustomerQuery(getCustomerQueryListResponse.data.queries);
        setTotalPage(getCustomerQueryListResponse.data.totalPages);
      }
      setLoading(false);
    }
  }, [isCustomerQueryListLoading, getCustomerQueryListResponse]);

  const handleStatusChangeApi = async (inquiryId: string, status: any) => {
    try {
      setCustomerQuery((prev: any) =>
        prev.map((inquiry: any) =>
          inquiry._id === inquiryId ? { ...inquiry, status } : inquiry
        )
      );
      await getChangeCustomerQueryStatusRequest(router, inquiryId, status);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  useEffect(() => {
    if (
      !isChangeCustomerQueryStatusLoading &&
      getChangeCustomerQueryStatusResponse
    ) {
      if (
        getChangeCustomerQueryStatusResponse?.responseCode ===
        ResponseCodes.SUCCESS
      ) {
        toast.success(getChangeCustomerQueryStatusResponse.message);
      }
    }
  }, [
    getChangeCustomerQueryStatusResponse,
    isChangeCustomerQueryStatusLoading,
  ]);

  const handleSelectChange = (inquiryId: string, status: any) => {
    handleStatusChangeApi(inquiryId, status);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleInsideDropdown = (event: any) => {
    event.stopPropagation();
  };

  const handleStatusChange = (status: string, e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const newStatus = e.target.checked === true ? e.target.value : "";
    getCustomerQueryListRequest(
      router,
      currentPage * PAGE_LIMIT,
      PAGE_LIMIT,
      null,
      status
    );
    setSelectedStatus(newStatus);
  };

  const handleClearFilter = () => {
    setSelectedStatus("");
    getCustomerQueryListRequest(
      router,
      currentPage * PAGE_LIMIT,
      PAGE_LIMIT,
      null,
      null
    );
  };

  return (
    <div className="bg-customer-background lg:flex lg:flex-col w-full h-full  lg:h-[calc(100dvh-8.5rem)] lg:overflow-hidden p-3">
      <form className="flex items-center justify-end gap-x-2 pb-3">
        <div
          className="relative cursor-pointer flex justify-center items-center p-3 bg-tertiary/10 rounded-xl gap-x-2 text-sm font-normal"
          onClick={toggleMenu}
        >
          <Image alt="image" src={FilterIcon} className="w-5 h-5" />

          <span>Filter</span>
          <div
            className={`absolute z-[18] top-[115%] right-0 cursor-default  w-[11rem] ${
              isMenuOpen ? "flex flex-col" : "hidden"
            }  transition-all duration-300 ease-in-out origin-top`}
          >
            <div
              className="rounded-lg font-normal text-sm leading-5  bg-white flex flex-col  items-start shadow-[0_3px_10px_rgb(0,0,0,0.2)] gap-y-1  pb-1"
              onClick={handleInsideDropdown}
            >
              <div className="flex justify-between gap-x-3 px-5 w-full items-center py-2 border-b-[0.7px] border-black/30">
                <span>Filter Contact</span>
                <Image
                  alt="image"
                  src={ClearFilterIcon}
                  className="w-5 h-5 cursor-pointer"
                  onClick={handleClearFilter}
                />
              </div>

              {Object.values(ESupportRequestStatus).map((status) => (
                <>
                  <div
                    key={status}
                    className="flex justify-start items-center w-full gap-x-2 py-1 px-5 hover:bg-[#0000000d]"
                  >
                    <input
                      type="checkbox"
                      className="accent-tertiary border-[0.63px] border-black w-3 h-3 cursor-pointer"
                      checked={selectedStatus === status}
                      onChange={(e: any) => handleStatusChange(status, e)}
                      value={status}
                    />
                    <div
                      className={`w-2 h-2 rounded-full ${
                        status === ESupportRequestStatus.PENDING
                          ? "bg-filter_yellow_color"
                          : status === ESupportRequestStatus.RESOLVED
                          ? "bg-filter_green_color"
                          : "bg-filter_red_color"
                      }`}
                    ></div>
                    <span className="capitalize">{status}</span>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </form>
      <MotTableWrapper
        styles={`${
          isChangeCustomerQueryStatusLoading || !customerQuery.length
            ? "overflow-hidden"
            : "overflow-auto"
        }`}
      >
        <MotTable>
          <MotTableHead>
            {AdminHelpListHeaders.map((single: any, index: any) => {
              return (
                <MotTableHeadCell
                  key={`Contact-List-headers-${index}`}
                  styles={single?.customStyle || ""}
                >
                  {single.headerName}
                </MotTableHeadCell>
              );
            })}
          </MotTableHead>
          <MotTableBody>
            {customerQuery.map((query: any) => {
              return (
                <MotTableRow key={query._id}>
                  <MotTableRowCell styles="capitalize">
                    {query.user.firstName ? query.user.firstName : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {query.user.lastName ? query.user.lastName : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>{query.message}</MotTableRowCell>
                  <MotTableRowCell>
                    <div className="flex flex-row gap-x-2 justify-center items-center">
                      <select
                        className="bg-tertiary text-white py-1 px-5 rounded-md capitalize cursor-pointer"
                        value={query.status}
                        onChange={(e) =>
                          handleSelectChange(query._id, e.target.value)
                        }
                      >
                        <option
                          value={ESupportRequestStatus.PENDING}
                          className="capitalize cursor-pointer"
                        >
                          {ESupportRequestStatus.PENDING}
                        </option>
                        <option
                          value={ESupportRequestStatus.RESOLVED}
                          className="capitalize cursor-pointer"
                        >
                          {ESupportRequestStatus.RESOLVED}
                        </option>
                        <option
                          value={ESupportRequestStatus.CLOSED}
                          className="capitalize cursor-pointer"
                        >
                          {ESupportRequestStatus.CLOSED}
                        </option>
                      </select>
                    </div>
                  </MotTableRowCell>
                </MotTableRow>
              );
            })}
          </MotTableBody>
        </MotTable>
        {loading ? (
          <div className="flex justify-center items-center h-[90dvh]">
            <Spinner />
          </div>
        ) : customerQuery.length === 0 ? (
          <div className="grid place-content-center gap-5 h-[90dvh]">
            <Image src={dataNotFoundImage} alt="data not found" />
            <p className="text-3xl text-tertiary text-center font-medium">
              DATA NOT FOUND
            </p>
          </div>
        ) : null}
      </MotTableWrapper>
      <Pagination
        totalPage={totalPage}
        onPageChangeHandler={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default Page;
