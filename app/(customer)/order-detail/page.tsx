"use client";
import { links } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import arrow_icon from "@/public/assets/admin-dashboard/arrow_view_page.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { getOrderDetail } from "../api/order.api";
import useApiRequest from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import OrderDetail from "../ui/OrderDetail";
import { isValidObjectId } from "@/utils/validation";
import { EOrderStatus } from "@/utils/content.util";
import formatDate from "@/utils/helper";
import { USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";

const Page = () => {
  const router = useRouter();
  const [orderDetail, setOrderDetail] = useState<any>({});
  const [diamondDetail, setDiamondDetail] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  const {
    loading: isGetOrderDetailLoading,
    data: getOrderDetailResponse,
    request: getOrderDetailRequest,
  } = useApiRequest(getOrderDetail);

  const getOrder = useCallback(() => {
    setIsLoading(true);
    if (
      !searchParams.get("id") ||
      !isValidObjectId(searchParams.get("id") || "")
    ) {
      router.push(links.HISTORY);
    } else {
      const id: string = searchParams.get("id") || "";
      getOrderDetailRequest(router, id);
    }
  }, [getOrderDetailRequest, router, searchParams]);

  useEffect(() => {
    if(localStorage.getItem(USER_TYPE_KEY) === EUserType.USER){
      getOrder();
    }
  }, [getOrder]);

  useEffect(() => {
    if (!isGetOrderDetailLoading && getOrderDetailResponse) {
      if (getOrderDetailResponse.responseCode === ResponseCodes.SUCCESS) {
        setOrderDetail(getOrderDetailResponse.data);
        setDiamondDetail(getOrderDetailResponse.data.items);
      }
      setIsLoading(false);
    }
  }, [isGetOrderDetailLoading, getOrderDetailResponse]);

  const statusToColorClass: any = {
    [EOrderStatus.PENDING]: "text-gray_color",
    [EOrderStatus.CONFIRM]: "text-green_color",
    [EOrderStatus.PARTIALLY_CONFIRM]: "text-yellow_color",
    [EOrderStatus.CANCELED]: "text-red_color",
  };

  return (
    <div className="bg-customer-background flex justify-center items-center">
      <div className="max-w-[1474px] w-full px-[30px]">
        <div className="max-w-full w-full">
          <div className="bg-white max-w-full w-full rounded-[10px] mb-[30px] my-5 py-2">
            <div className="border-b-[1px] border-primary/20 flex flex-row justify-between items-center pr-7 max-[480px]:flex-wrap">
              <Link
                href={links.HISTORY}
                className="text-2xl font-bold font-libre-barskerville leading-7 flex flex-row ju items-center gap-x-2 pt-6 pl-4 pb-4  max-w-[225px] w-full group"
              >
                <Image
                  src={arrow_icon}
                  alt=""
                  className="group-hover:-translate-x-1 transition-all duration-300"
                />
                <span>View Orders</span>
              </Link>
            </div>
            <div className="flex flex-row justify-start items-start gap-3 px-6 py-3">
              <div className="w-full">
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    ORDER ID:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetail.orderNumber}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    order date:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetail.createdAt
                      ? formatDate(orderDetail.createdAt)
                      : null}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    company name:
                  </span>
                  <span className="user-list-sub-title flex flex-row">
                    {orderDetail.user?.companyName}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    company email:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetail.user?.email}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    total stones:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetail.totalStones ? orderDetail.totalStones : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    total carats:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetail.totalCarats
                      ? orderDetail.totalCarats.toFixed(2)
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    gross amount:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetail.grossAmount
                      ? orderDetail.grossAmount.toFixed(2)
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    shipping charge:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetail.shippingCharge
                      ? orderDetail.shippingCharge.toFixed(2)
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    addLess usd:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetail.totalAdditionalCharges
                      ? orderDetail.totalAdditionalCharges.toFixed(2)
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">
                    net amount usd:
                  </span>
                  <span className="user-list-sub-title">
                    {orderDetail.totalAmount
                      ? orderDetail.totalAmount.toFixed(2)
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-row items-center mb-2 max-[570px]:flex-wrap max-[570px]:gap-y-1">
                  <span className="user-list-title sm:mr-12 mr-1">status:</span>
                  <span
                    className={`user-list-sub-title uppercase ${
                      statusToColorClass[orderDetail.status] || ""
                    }`}
                  >
                    {orderDetail.status
                      ? orderDetail.status.replaceAll("_", " ")
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 mb-6">
              <OrderDetail
                tableType="order"
                orderDiamonds={diamondDetail}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
