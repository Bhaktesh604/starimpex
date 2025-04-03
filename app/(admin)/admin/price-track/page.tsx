"use client";
import React, { useEffect, useState } from "react";
import MotTable from "../ui/MotTable";
import MotTableHead from "../ui/MotTableHead";
import MotTableHeadCell from "../ui/MotTableHeadCell";
import MotTableBody from "../ui/MotTableBody";
import MotTableRow from "../ui/MotTableRow";
import MotTableRowCell from "../ui/MotTableRowCell";
import { adminPriceTrackTableHeaders } from "@/utils/MotTableConstant";
import { useRouter } from "next/navigation";
import useApiRequest from "@/hooks/useApi";
import { getUserPriceTrackHistoryApi } from "../api/user.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import MotButtonComponent from "../ui/MotButtonComponent";
import InputComponent from "@/components/InputComponent";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import Pagination from "@/components/Pagination";
import { adminDateFormat } from "@/utils/helper";
import { Tooltip } from "@material-tailwind/react";
import { PAGE_LIMIT, USER_TYPE_KEY } from "@/utils/constants";
import MotTableWrapper from "../ui/MotTableWrapper";
import { EUserType } from "@/interfaces/common.interface";

const Page = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [priceTrackHistory, setPriceTrackHistory] = useState([]);

  const {
    loading: isPriceTrackListLoading,
    data: getPriceTrackListResponse,
    request: getPriceTrackListRequest,
  } = useApiRequest(getUserPriceTrackHistoryApi);

  useEffect(() => {
    if( localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN){
      getPriceTrackListRequest(router, currentPage * PAGE_LIMIT, PAGE_LIMIT);
    }
  }, [currentPage, getPriceTrackListRequest, router]);

  useEffect(() => {
    if (!isPriceTrackListLoading && getPriceTrackListResponse) {
      if (getPriceTrackListResponse.responseCode === ResponseCodes.SUCCESS) {
        setTotalPage(getPriceTrackListResponse.data.totalPages);
        setPriceTrackHistory(getPriceTrackListResponse.data.priceTrackHistory);
      }
      setLoading(false);
    }
  }, [isPriceTrackListLoading, getPriceTrackListResponse]);

  const onSearch = (e: any) => {
    e.preventDefault();
    setCurrentPage(0);
    getPriceTrackListRequest(router, 0, PAGE_LIMIT, fromDate, toDate);
  };

  const inputChangeHandler = (e: any) => {
    const { value, name } = e.target;
    if (name === "fromDate") {
      setFromDate(value);
    }
    if (name === "toDate") {
      setToDate(value);
    }
  };

  const onSearchClear = () => {
    setFromDate("");
    setToDate("");
    getPriceTrackListRequest(router);
  };

  return (
    <div className="bg-customer-background lg:flex lg:flex-col w-full h-full  lg:h-[calc(100dvh-8.5rem)] lg:overflow-hidden p-3">
      <form className="flex gap-2 flex-wrap" onSubmit={onSearch}>
        <div className="flex items-center flex-wrap gap-1">
          <div className="relative">
            <InputComponent
              type="date"
              className="bg-history_primary"
              placeholder="From"
              name="fromDate"
              value={fromDate}
              handleChange={inputChangeHandler}
            />
          </div>
          <span>-</span>
          <div className="relative">
            <InputComponent
              type="date"
              className="bg-history_primary max-w-full w-full "
              placeholder="To"
              name="toDate"
              value={toDate}
              handleChange={inputChangeHandler}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <MotButtonComponent buttonText="Search" buttonType="submit" />
          <MotButtonComponent
            buttonText="Clear"
            buttonType="button"
            handleButtonOnClick={onSearchClear}
          />
        </div>
      </form>
      <MotTableWrapper
        styles={`mt-3 ${
          isPriceTrackListLoading || !priceTrackHistory.length
            ? "overflow-hidden"
            : "overflow-auto"
        }`}
      >
        <MotTable>
          <MotTableHead styles="!cursor-default">
            {adminPriceTrackTableHeaders.map((single: any, index: any) => {
              return (
                <MotTableHeadCell
                  key={`Price-Track-List-headers-${index}`}
                  styles={single?.customStyle || ""}
                >
                  {single.headerName}
                </MotTableHeadCell>
              );
            })}
          </MotTableHead>
          <MotTableBody>
            {priceTrackHistory.map((item: any) => {
              return (
                <MotTableRow key={item._id}>
                  <MotTableRowCell styles="capitalize cursor-default">
                    {item.user ? item.user.fullName : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {item.stoneNos ? (
                      <Tooltip
                        content={item?.stoneNos || ""}
                        placement="bottom"
                        className="text-primary-text-color text-sm bg-white shadow-md w-[18.75rem] font-roboto text-center"
                      >
                        <span className="font-text-medium text-primary-text-color">
                          {item?.stoneNos
                            ? item.stoneNos.length > 40
                              ? item.stoneNos.slice(0, 40) + "..."
                              : item.stoneNos
                            : null}
                        </span>
                      </Tooltip>
                    ) : (
                      "-"
                    )}
                  </MotTableRowCell>
                  <MotTableRowCell styles="cursor-default">
                    {item.createdAt ? adminDateFormat(item.createdAt) : "-"}
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
        ) : priceTrackHistory.length === 0 ? (
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
