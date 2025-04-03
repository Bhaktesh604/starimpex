"use client";
import React, { useEffect, useState } from "react";
import MotTable from "../ui/MotTable";
import MotTableHead from "../ui/MotTableHead";
import { AdminFeedbackListHeaders } from "@/utils/MotTableConstant";
import MotTableHeadCell from "../ui/MotTableHeadCell";
import MotTableBody from "../ui/MotTableBody";
import MotTableRow from "../ui/MotTableRow";
import MotTableRowCell from "../ui/MotTableRowCell";
import useApiRequest from "@/hooks/useApi";
import { getFeedbackListApi } from "../api/support.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import Pagination from "@/components/Pagination";
import { PAGE_LIMIT, USER_TYPE_KEY } from "@/utils/constants";
import MotTableWrapper from "../ui/MotTableWrapper";
import { EUserType } from "@/interfaces/common.interface";

const Page = () => {
  const [feedbackList, setFeedbackList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const router = useRouter();

  const {
    loading: isFeedbackListLoading,
    data: getFeedbackListResponse,
    request: getFeedbackListRequest,
  } = useApiRequest(getFeedbackListApi);

  useEffect(() => {
    if( localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN){
      getFeedbackListRequest(router, currentPage * PAGE_LIMIT, PAGE_LIMIT);
    }
  }, [currentPage, getFeedbackListRequest, router]);

  useEffect(() => {
    if (!isFeedbackListLoading && getFeedbackListResponse) {
      if (getFeedbackListResponse.responseCode === ResponseCodes.SUCCESS) {
        setFeedbackList(getFeedbackListResponse.data.feedbacks);
        setTotalPage(getFeedbackListResponse.data.totalPages);
      }
      setLoading(false);
    }
  }, [isFeedbackListLoading, getFeedbackListResponse]);

  return (
    <div className="bg-customer-background lg:flex lg:flex-col w-full h-full  lg:h-[calc(100dvh-8.5rem)] lg:overflow-hidden p-3">
      <MotTableWrapper
        styles={`${
          isFeedbackListLoading || !feedbackList.length
            ? "overflow-hidden"
            : "overflow-auto"
        }`}
      >
        <MotTable>
          <MotTableHead>
            {AdminFeedbackListHeaders.map((single: any, index: any) => {
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
            {feedbackList.map((feedback: any) => {
              return (
                <MotTableRow key={feedback._id}>
                  <MotTableRowCell styles="capitalize">
                    {feedback.user.firstName ? feedback.user.firstName : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {feedback.user.lastName ? feedback.user.lastName : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>{feedback.rating}</MotTableRowCell>
                  <MotTableRowCell>{feedback.comment}</MotTableRowCell>
                </MotTableRow>
              );
            })}
          </MotTableBody>
        </MotTable>
        {loading ? (
          <div className="flex justify-center items-center h-[90dvh]">
            <Spinner />
          </div>
        ) : feedbackList.length === 0 ? (
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
