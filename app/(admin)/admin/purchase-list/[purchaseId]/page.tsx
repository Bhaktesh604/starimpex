"use client";
import { links } from "@/utils/links";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import arrow_icon from "@/public/assets/admin-dashboard/arrow_view_page.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/interfaces/response.interface";
import { getPurchaseDetailsApi } from "../../api/purchase.api";
import useApiRequest from "@/hooks/useApi";
import formatDate from "@/utils/helper";
import { USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";

const Page = ({ params }: any) => {
  const [purchaseDetails, setPurchaseDetails] = useState<any>();
  const router = useRouter();

  const {
    loading: isGetPurchaseDetailsRequestLoading,
    data: getPurchaseDetailsResponse,
    request: getPurchaseDetailsRequest,
  } = useApiRequest(getPurchaseDetailsApi);

  useEffect(() => {
    if(localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN){
      if (params.purchaseId) {
        getPurchaseDetailsRequest(router, params.purchaseId);
      }
    }
  }, [getPurchaseDetailsRequest, params.purchaseId, router]);

  useEffect(() => {
    if (!isGetPurchaseDetailsRequestLoading && getPurchaseDetailsResponse) {
      if (getPurchaseDetailsResponse.responseCode === ResponseCodes.SUCCESS) {
        setPurchaseDetails(getPurchaseDetailsResponse.data.purchase);
      }
    }
  }, [getPurchaseDetailsResponse, isGetPurchaseDetailsRequestLoading]);

  return (
    <div className="py-10 px-3 bg-customer-background flex justify-center h-full items-center">
      <div className="w-full">
        <div className="max-w-full w-full">
          <div className="bg-white max-w-full w-full rounded-lg mb-7 pb-20">
            <div className="border-b-[1px] border-primary/20 flex flex-row justify-between items-center pr-7 max-sm:flex-wrap">
              <Link
                href={links.ADMIN_PURCHASE_LIST}
                className="text-lg font-bold leading-7 flex flex-row ju items-center gap-x-2 pt-6 pl-4 pb-4  max-w-[14.063rem] w-full group"
              >
                <Image
                  src={arrow_icon}
                  alt=""
                  className="group-hover:-translate-x-1 transition-all duration-300"
                />
                <span>View Purchase</span>
              </Link>
            </div>
            <div className="flex flex-row justify-start items-start gap-x-[5.813rem] max-lg:gap-x-0 pt-5 px-7 pb-14 max-lg:flex-wrap ">
              <div className="max-w-[34.375rem] sm:min-w-[31.875rem] w-full min-w-0 ">
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    ORDER ID:
                  </span>
                  <span className="user-list-sub-title">
                    {purchaseDetails?.orderId ? purchaseDetails.orderId : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    purchase date:
                  </span>
                  <span className="user-list-sub-title">
                    {purchaseDetails?.date
                      ? formatDate(purchaseDetails?.date)
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    supplier Name:
                  </span>
                  <span className="user-list-sub-title text-base capitalize">
                    {purchaseDetails?.supplierName
                      ? purchaseDetails?.supplierName
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-0">
                    supplier&nbsp;address:
                  </span>
                  <span className="user-list-sub-title text-base">
                    {purchaseDetails?.supplierAddress
                      ? purchaseDetails?.supplierAddress
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    total stones:
                  </span>
                  <span className="user-list-sub-title">
                    {purchaseDetails?.totalStones
                      ? purchaseDetails.totalStones
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    total carats:
                  </span>
                  <span className="user-list-sub-title">
                    {purchaseDetails?.totalCarats
                      ? purchaseDetails.totalCarats
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-4 max-sm:flex-wrap max-sm:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    Total Amount USD:
                  </span>
                  <span className="user-list-sub-title">
                    {purchaseDetails?.totalAmount
                      ? purchaseDetails.totalAmount
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
