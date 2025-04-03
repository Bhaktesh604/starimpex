"use client";
import MotTable from "@/app/(customer)/ui/MotTable";
import MotTableBody from "@/app/(customer)/ui/MotTableBody";
import MotTableHead from "@/app/(customer)/ui/MotTableHead";
import MotTableHeadCell from "@/app/(customer)/ui/MotTableHeadCell";
import MotTableRow from "@/app/(customer)/ui/MotTableRow";
import MotTableRowCell from "@/app/(customer)/ui/MotTableRowCell";
import InputComponent from "@/components/InputComponent";
import { AdminSearchAnalyticsHeaders } from "@/utils/MotTableConstant";
import React, { useCallback, useEffect, useState } from "react";
import MotButtonComponent from "../ui/MotButtonComponent";
import { useRouter } from "next/navigation";
import useApiRequest from "@/hooks/useApi";
import { getDiamondSearchStatsApi } from "../api/stats.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import { adminDateFormat } from "@/utils/helper";
import Pagination from "@/components/Pagination";
import { PAGE_LIMIT, USER_TYPE_KEY } from "@/utils/constants";
import MotTableWrapper from "../ui/MotTableWrapper";
import { EUserType } from "@/interfaces/common.interface";

const Page = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [totalPage, setTotalPage] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [diamondSearchList, setDiamondSearchList] = useState<any>([]);

  const {
    loading: isDiamondSearchLoading,
    data: getDiamondSearchResponse,
    request: getDiamondSearchRequest,
  } = useApiRequest(getDiamondSearchStatsApi);

  const getDiamondSearchList = useCallback(() => {
    getDiamondSearchRequest(
      router,
      currentPage * PAGE_LIMIT,
      PAGE_LIMIT,
      fromDate,
      toDate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, getDiamondSearchRequest, router]);

  useEffect(() => {
    if(localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN){
      getDiamondSearchList();
    }
  }, [currentPage, getDiamondSearchList]);

  useEffect(() => {
    getDiamondSearchResponse;
    if (!isDiamondSearchLoading && getDiamondSearchResponse) {
      if (getDiamondSearchResponse.responseCode === ResponseCodes.SUCCESS) {
        setDiamondSearchList(getDiamondSearchResponse.data.searchList);
        setTotalPage(getDiamondSearchResponse.data.totalPages);
      }
      setIsLoading(false);
    }
  }, [diamondSearchList, getDiamondSearchResponse, isDiamondSearchLoading]);

  const inputChangeHandler = (e: any) => {
    const { value, name } = e.target;
    if (name === "fromDate") {
      setFromDate(value);
    }
    if (name === "toDate") {
      setToDate(value);
    }
  };

  const onSearch = (e: any) => {
    e.preventDefault();
    setCurrentPage(0);
    getDiamondSearchRequest(router, 0, PAGE_LIMIT, fromDate, toDate);
  };

  const onSearchClear = () => {
    setFromDate("");
    setToDate("");
    getDiamondSearchList();
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
          isLoading || !diamondSearchList.length
            ? "overflow-hidden"
            : "overflow-auto"
        }`}
      >
        <MotTable>
          <MotTableHead>
            {AdminSearchAnalyticsHeaders.map((single: any, index: any) => {
              return (
                <MotTableHeadCell
                  key={`Admin-Diamond-Search-headers-${index}`}
                  styles={single?.customStyle || ""}
                >
                  {single.headerName}
                </MotTableHeadCell>
              );
            })}
          </MotTableHead>
          <MotTableBody>
            {diamondSearchList.map((single: any, index: any) => {
              return (
                <MotTableRow key={single.id}>
                  <React.Fragment key={`Admin-Diamond-Search-rows-${index}`}>
                    <MotTableRowCell styles="capitalize">
                      {single.user.fullName}
                    </MotTableRowCell>
                    <MotTableRowCell styles="uppercase">
                      {adminDateFormat(single.createdAt)}
                    </MotTableRowCell>
                    <MotTableRowCell styles="capitalize">
                      {single.filters
                        ? single.filters.diamondType.replaceAll("_", " ")
                        : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="uppercase">
                      {single.filters?.labList && single.filters.labList.length
                        ? single.filters.labList.map((i: any) => i).join(",")
                        : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="capitalize">
                      {single.filters?.shapeList &&
                      single.filters.shapeList.length
                        ? single.filters.shapeList.map((i: any) => i).join(",")
                        : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell>
                      {single.filters?.caratWeightList &&
                      single.filters.caratWeightList.length
                        ? single.filters.caratWeightList.map(
                            (caratRange: any) => {
                              if (
                                caratRange.from === "" &&
                                caratRange.to === ""
                              ) {
                                return "-";
                              }
                              if (caratRange.from !== "" && !caratRange.to) {
                                return `From ${caratRange.from} `;
                              }
                              if (!caratRange.from && caratRange.to !== "") {
                                return `To ${caratRange.to}`;
                              }
                              return `From ${caratRange.from} To ${caratRange.to}`;
                            }
                          )
                        : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="uppercase">
                      {single.filters?.cutList && single.filters.cutList.length
                        ? single.filters.cutList.map((i: any) => i).join(",")
                        : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="uppercase">
                      {single.filters?.polishList &&
                      single.filters.polishList.length
                        ? single.filters.polishList.map((i: any) => i).join(",")
                        : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="uppercase">
                      {single.filters?.symmetryList &&
                      single.filters.symmetryList.length
                        ? single.filters.symmetryList
                            .map((i: any) => i)
                            .join(",")
                        : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="capitalize">
                      {single.filters?.florescenceList &&
                      single.filters.florescenceList.length
                        ? single.filters.florescenceList
                            .map((i: any) => i)
                            .join(",")
                        : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="uppercase">
                      {single.filters?.clarityList &&
                      single.filters.clarityList.length
                        ? single.filters.clarityList
                            .map((i: any) => i)
                            .join(",")
                        : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell>
                      {single.totalStones ? single.totalStones : "-"}
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
        ) : diamondSearchList.length === 0 ? (
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
