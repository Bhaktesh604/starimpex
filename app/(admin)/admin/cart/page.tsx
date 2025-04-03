"use client";
import React, { useEffect, useState } from "react";
import MotTable from "../ui/MotTable";
import MotTableHead from "../ui/MotTableHead";
import MotTableHeadCell from "../ui/MotTableHeadCell";
import MotTableBody from "../ui/MotTableBody";
import MotTableRow from "../ui/MotTableRow";
import MotTableRowCell from "../ui/MotTableRowCell";
import { adminCartTableHeaders } from "@/utils/MotTableConstant";
import useApiRequest from "@/hooks/useApi";
import { getUserCartHistoryApi } from "../api/user.api";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/interfaces/response.interface";
import InputComponent from "@/components/InputComponent";
import MotButtonComponent from "../ui/MotButtonComponent";
import { adminDateFormat } from "@/utils/helper";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import Pagination from "@/components/Pagination";
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
  const [cartHistory, setCartHistory] = useState([]);

  const {
    loading: isCartListLoading,
    data: getCartListResponse,
    request: getCartListRequest,
  } = useApiRequest(getUserCartHistoryApi);

  useEffect(() => {
   
if( localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN)  {
  getCartListRequest(router, currentPage * PAGE_LIMIT, PAGE_LIMIT);
} 

  
  }, [currentPage, getCartListRequest, router]);

  useEffect(() => {
    if (!isCartListLoading && getCartListResponse) {
      if (getCartListResponse.responseCode === ResponseCodes.SUCCESS) {
        setTotalPage(getCartListResponse.data.totalPages);
        setCartHistory(getCartListResponse.data.cartHistory);
      }
      setLoading(false);
    }
  }, [isCartListLoading, getCartListResponse]);

  const onSearch = (e: any) => {
    e.preventDefault();
    setCurrentPage(0);
    getCartListRequest(router, 0, PAGE_LIMIT, fromDate, toDate);
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
    getCartListRequest(router);
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
          isCartListLoading || !cartHistory.length
            ? "overflow-hidden"
            : "overflow-auto"
        }`}
      >
        <MotTable>
          <MotTableHead styles="!cursor-default">
            {adminCartTableHeaders.map((single: any, index: any) => {
              return (
                <MotTableHeadCell
                  key={`Cart-List-headers-${index}`}
                  styles={single?.customStyle || ""}
                >
                  {single.headerName}
                </MotTableHeadCell>
              );
            })}
          </MotTableHead>
          <MotTableBody>
            {cartHistory.map((item: any) => {
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
        ) : cartHistory.length === 0 ? (
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
