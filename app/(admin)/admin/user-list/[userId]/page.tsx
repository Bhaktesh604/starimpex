"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import arrow_icon from "@/public/assets/admin-dashboard/arrow_view_page.svg";
import Link from "next/link";
import { links } from "@/utils/links";
import useApi from "@/hooks/useApi";
import { getUserDetailsApi } from "../../api/user.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { useRouter } from "next/navigation";
import { isValidObjectId } from "@/utils/validation";
import { EUserStatus } from "@/interfaces/user/user.interface";
import { USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";

const Page = ({ params }: any) => {
  const [userDetails, setUserDetails] = useState<any>();
  const router = useRouter();
  const {
    loading: isGetUserDetailsRequestLoading,
    data: getUserDetailsResponse,
    request: getUserDetailsRequest,
  } = useApi(getUserDetailsApi);

  useEffect(() => {
    if (!isGetUserDetailsRequestLoading && getUserDetailsResponse) {
      if (getUserDetailsResponse.responseCode === ResponseCodes.SUCCESS) {
        setUserDetails(getUserDetailsResponse.data);
      }
    }
  }, [isGetUserDetailsRequestLoading, getUserDetailsResponse]);

  useEffect(() => {
    if(localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN){
      if (params.userId && isValidObjectId(params.userId)) {
        getUserDetailsRequest(router, params.userId);
      }
    }
  }, []);

  return (
    <div className="p-10 bg-customer-background">
      <div className="bg-white w-full rounded-lg shadow-md">
        <div className="border-b-[1px] border-primary/20">
          <Link
            href={links.USER_LIST}
            className="text-xl font-bold leading-7 flex flex-row ju items-center gap-x-2 pt-6 pl-4 pb-4  max-w-[12.5rem] w-full group"
          >
            <Image
              src={arrow_icon}
              alt=""
              className="group-hover:-translate-x-1 transition-all duration-300"
            />
            <span>View User</span>
          </Link>
        </div>
        {userDetails ? (
          <>
            <div className="pt-5 pl-7 pb-[4.375rem]">
              <div className="flex flex-row items-center mb-4 ">
                <span className="user-list-title sm:mr-12 mr-1">
                  full name:
                </span>
                <span className="user-list-sub-title">
                  {userDetails.fullName ? userDetails.fullName : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">
                  Company Name:
                </span>
                <span className="user-list-sub-title">
                  {userDetails.companyName ? userDetails.companyName : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">Country:</span>
                <span className="user-list-sub-title">
                  {userDetails.country ? userDetails.country : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">Mobile:</span>
                <span className="user-list-sub-title">
                  {userDetails.mobileNumber ? userDetails.mobileNumber : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">Email:</span>
                <span className="user-list-sub-title">{userDetails.email}</span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">Address:</span>
                <span className="user-list-sub-title">
                  {userDetails.address ? userDetails.address : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">
                  State /Province:
                </span>
                <span className="user-list-sub-title">
                  {userDetails.state ? userDetails.state : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">City:</span>
                <span className="user-list-sub-title">
                  {userDetails.city ? userDetails.city : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">
                  Telephone:
                </span>
                <span className="user-list-sub-title">
                  {userDetails.telephone ? userDetails.telephone : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">
                  Messenger:
                </span>
                <span className="user-list-sub-title">
                  {userDetails.messenger ? userDetails.messenger : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">
                  ID/Number:
                </span>
                <span className="user-list-sub-title">
                  {userDetails.id ? userDetails.id : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">Website:</span>
                <span className="user-list-sub-title">
                  {userDetails.website ? userDetails.website : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">Notes:</span>
                <span className="user-list-sub-title">
                  {userDetails.notes ? userDetails.notes : "-"}
                </span>
              </div>
              <div className="flex flex-row items-center mb-4">
                <span className="user-list-title sm:mr-12 mr-1">Status:</span>
                <span
                  className={`user-list-sub-title capitalize border rounded-[4.375rem]  ${
                    userDetails?.status === EUserStatus.DISAPPROVED
                      ? "w-[6.875rem]"
                      : "w-20"
                  } px-1 flex justify-center ${
                    userDetails?.status === EUserStatus.APPROVED
                      ? " border-green_color text-green_color"
                      : userDetails?.status === EUserStatus.PENDING
                      ? "border-gray_color text-gray_color"
                      : "border-red_color text-red_color"
                  }`}
                >
                  {userDetails.status ? userDetails.status : "-"}
                </span>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Page;
