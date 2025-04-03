"use client";
import React, { useCallback, useEffect, useState } from "react";
import MotTable from "../ui/MotTable";
import MotTableHead from "../ui/MotTableHead";
import { AdminInquiryListHeaders } from "@/utils/MotTableConstant";
import MotTableHeadCell from "../ui/MotTableHeadCell";
import MotTableBody from "../ui/MotTableBody";
import MotTableRow from "../ui/MotTableRow";
import MotTableRowCell from "../ui/MotTableRowCell";
import {
  changeInquiryRequestStatusApi,
  getInquiryListApi,
} from "../api/support.api";
import useApiRequest from "@/hooks/useApi";
import Image from "next/image";
import SearchIcon from "@/public/assets/customer-dashboard/ic-search.svg";
import FilterIcon from "@/public/assets/admin-dashboard/filter_icon.svg";
import ClearFilterIcon from "@/public/assets/admin-dashboard/clear_filter_icon.svg";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import { ESupportRequestStatus } from "@/interfaces/user/user.interface";
import { PAGE_LIMIT, USER_TYPE_KEY } from "@/utils/constants";
import MotTableWrapper from "../ui/MotTableWrapper";
import { EUserType } from "@/interfaces/common.interface";

const Page = () => {
  const [inquiryList, setInquiryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [expandSearch, setExpandSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("");

  const router = useRouter();

  const {
    loading: isInquiryListLoading,
    data: getInquiryListResponse,
    request: getInquiryListRequest,
  } = useApiRequest(getInquiryListApi);

  const {
    loading: isChangeInquiryStatusLoading,
    data: getChangeInquiryStatusResponse,
    request: getChangeInquiryStatusRequest,
  } = useApiRequest(changeInquiryRequestStatusApi);

  useEffect(() => {
    if( localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN){
      getInquiryListRequest(
        router,
        currentPage * PAGE_LIMIT,
        PAGE_LIMIT,
        null,
        null
      );
    }
  }, [currentPage, getInquiryListRequest, router]);

  const onSearch = useCallback(
    (e: any) => {
      e.preventDefault();
      const status = selectedStatus;
      getInquiryListRequest(
        router,
        currentPage * PAGE_LIMIT,
        PAGE_LIMIT,
        status,
        searchValue
      );
    },
    [currentPage, getInquiryListRequest, router, searchValue, selectedStatus]
  );

  useEffect(() => {
    if (!isInquiryListLoading && getInquiryListResponse) {
      if (getInquiryListResponse.responseCode === ResponseCodes.SUCCESS) {
        setInquiryList(getInquiryListResponse.data.inquires);
        setTotalPage(getInquiryListResponse.data.totalPages);
      }
      setLoading(false);
    }
  }, [isInquiryListLoading, getInquiryListResponse]);

  const inputChangedHandler = (e: any) => {
    const { value, id } = e.target;

    if (id === "search") {
      setSearchValue(value);
      return;
    }
  };

  const onExpandSearch = () => {
    setExpandSearch((prev) => !prev);
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
    getInquiryListRequest(
      router,
      currentPage * PAGE_LIMIT,
      PAGE_LIMIT,
      status,
      searchValue
    );
    setSelectedStatus(newStatus);
  };

  const handleStatusChangeApi = async (inquiryId: string, status: any) => {
    try {
      setInquiryList((prev: any) =>
        prev.map((inquiry: any) =>
          inquiry._id === inquiryId ? { ...inquiry, status } : inquiry
        )
      );
      await getChangeInquiryStatusRequest(router, inquiryId, status);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  useEffect(() => {
    if (!isChangeInquiryStatusLoading && getChangeInquiryStatusResponse) {
      if (
        getChangeInquiryStatusResponse?.responseCode === ResponseCodes.SUCCESS
      ) {
        toast.success(getChangeInquiryStatusResponse.message);
      }
    }
  }, [getChangeInquiryStatusResponse, isChangeInquiryStatusLoading]);

  const handleSelectChange = (inquiryId: string, status: any) => {
    handleStatusChangeApi(inquiryId, status);
  };

  const handleClearFilter = () => {
    setSelectedStatus("");
    getInquiryListRequest(
      router,
      currentPage * PAGE_LIMIT,
      PAGE_LIMIT,
      null,
      searchValue
    );
  };

  return (
    <div className="bg-customer-background lg:flex lg:flex-col w-full  lg:h-[calc(100dvh-8.5rem)] lg:overflow-hidden p-3">
      <form
        className="flex items-center justify-end gap-x-2"
        onSubmit={onSearch}
      >
        <div className="flex items-center bg-tertiary/10 py-3 px-4 rounded-xl cursor-pointer">
          <Image
            alt="image"
            src={SearchIcon}
            className="w-5 h-5"
            onClick={() => onExpandSearch()}
          />
          {expandSearch ? (
            <>
              <div>
                <input
                  type="text"
                  className="mx-2 bg-tertiary/5 font-normal text-sm outline-none"
                  placeholder="Search.."
                  value={searchValue}
                  id="search"
                  onChange={inputChangedHandler}
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
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
              className="rounded-lg font-normal text-sm leading-5  bg-white flex flex-col  items-start shadow-[0_3px_10px_rgb(0,0,0,0.2)] gap-y-[5px]  pb-1"
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
                      onChange={(e: any) =>
                        handleStatusChange(status.toLowerCase(), e)
                      }
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
        styles={`mt-3 ${
          isChangeInquiryStatusLoading || !inquiryList.length
            ? "overflow-hidden"
            : "overflow-auto"
        }`}
      >
        <MotTable>
          <MotTableHead>
            {AdminInquiryListHeaders.map((single: any, index: any) => {
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
            {inquiryList.map((inquiry: any) => {
              return (
                <MotTableRow key={inquiry._id}>
                  <MotTableRowCell styles="capitalize">
                    {inquiry.firstName ? inquiry.firstName : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {inquiry.lastName ? inquiry.lastName : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {inquiry.phone ? inquiry.phone : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {inquiry.email ? inquiry.email : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {inquiry.companyName ? inquiry.companyName : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {inquiry.diamondType
                      ? inquiry.diamondType.replaceAll("_", " ")
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {inquiry.country ? inquiry.country : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {inquiry.message ? inquiry.message : "-"}
                  </MotTableRowCell>

                  <MotTableRowCell>
                    <div className="flex flex-row gap-x-2 justify-center items-center">
                      <select
                        className="bg-tertiary text-white py-1 px-5 rounded-md capitalize cursor-pointer"
                        value={inquiry.status}
                        onChange={(e) =>
                          handleSelectChange(inquiry._id, e.target.value)
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
        ) : inquiryList.length === 0 ? (
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
