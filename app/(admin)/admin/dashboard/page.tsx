"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import RightArrowIcon from "@/public/assets/images/ic-right-arrow.svg";
import { useRouter } from "next/navigation";
import useApiRequest from "@/hooks/useApi";
import { getAdminDashboardData } from "../api/dashboard.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import Link from "next/link";
import { links } from "@/utils/links";
import { diamondQueryParams } from "@/utils/diamondConstant";
import { EDiamondType, EUserType } from "@/interfaces/common.interface";
import { USER_TYPE_KEY } from "@/utils/constants";

const Page = () => {
  const router = useRouter();
  const [labGrownDiamonds, setLabGrownDiamonds] = useState(0);
  const [naturalDiamonds, setNaturalDiamonds] = useState(0);
  const [user, setUser] = useState(0);
  const [inquiry, setInquiry] = useState(0);
  const [search, setSearch] = useState(0);

  const {
    loading: isGetAdminDashboardDataLoading,
    data: getAdminDashboardDataResponse,
    request: getAdminDashboardDataRequest,
  } = useApiRequest(getAdminDashboardData);

  const getAdminDashboard = useCallback(() => {
    if (localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN) {
      getAdminDashboardDataRequest(router);
    }
  }, [getAdminDashboardDataRequest, router]);

  useEffect(() => {
    getAdminDashboard();
  }, [getAdminDashboard]);

  useEffect(() => {
    if (!isGetAdminDashboardDataLoading && getAdminDashboardDataResponse) {
      if (
        getAdminDashboardDataResponse.responseCode === ResponseCodes.SUCCESS
      ) {
        setUser(getAdminDashboardDataResponse.data.totalApprovedUser);
        setInquiry(getAdminDashboardDataResponse.data.totalInquiries);
        setSearch(getAdminDashboardDataResponse.data.totalSearches);
        setLabGrownDiamonds(
          getAdminDashboardDataResponse.data.totalLabGrownDiamonds
        );
        setNaturalDiamonds(
          getAdminDashboardDataResponse.data.totalNaturalDiamonds
        );
      }
    }
  }, [getAdminDashboardDataResponse, isGetAdminDashboardDataLoading]);

  return (
    <div className="bg-customer-background h-[calc(100dvh-5rem)]">
      <div className="z-[4] pt-5 px-4 md:px-8 h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Users</p>
                <Link href={`${links.USER_LIST}`}>
                  <Image src={RightArrowIcon} alt="arrow" />
                </Link>
              </div>
              <div className="mt-[0.6rem] mb-[1rem]">
                <p className="title text-2xl">{user}</p>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Inquiries </p>
                <Link href={links.ADMIN_INQUIRY}>
                  <Image src={RightArrowIcon} alt="arrow" />
                </Link>
              </div>
              <div className="mt-[0.6rem] mb-[1rem]">
                <p className="title text-2xl">{inquiry}</p>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Total searches</p>
                <Link href={links.SEARCH_ANALYTICS}>
                  <Image src={RightArrowIcon} alt="arrow" />
                </Link>
              </div>
              <div className="mt-[0.6rem] mb-[1rem]">
                <p className="title text-2xl">{search}</p>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Natural diamond stock</p>
                <Link
                  href={`${links.ADMIN_SEARCH_RESULT}?${diamondQueryParams.DIAMOND_TYPE}=${EDiamondType.NATURAL_DIAMONDS}`}
                >
                  <Image src={RightArrowIcon} alt="arrow" />
                </Link>
              </div>
              <div className="mt-[0.6rem] mb-[1rem]">
                <p className="title text-2xl">{naturalDiamonds}</p>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Lab grown diamond stock</p>
                <Link
                  href={`${links.ADMIN_SEARCH_RESULT}?${diamondQueryParams.DIAMOND_TYPE}=${EDiamondType.LAB_GROWN_DIAMONDS}`}
                >
                  <Image src={RightArrowIcon} alt="arrow" />
                </Link>
              </div>
              <div className="mt-[0.6rem] mb-[1rem]">
                <p className="title text-2xl">{labGrownDiamonds}</p>
              </div>
            </div>
        </div>
        <div className="bg-secondary mt-[2rem] rounded-xl">
            <div className="pl-6 py-6">
              <p className="title font-bold text-lg">Recent search</p>
            </div>
            <hr></hr>
        </div>
      </div>
    </div>
  );
};

export default Page;
