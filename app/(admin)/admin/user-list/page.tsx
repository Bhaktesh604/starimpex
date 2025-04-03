"use client";
import MotTable from "../ui/MotTable";
import MotTableBody from "../ui/MotTableBody";
import MotTableHead from "../ui/MotTableHead";
import MotTableHeadCell from "../ui/MotTableHeadCell";
import MotTableRow from "../ui/MotTableRow";
import MotTableRowCell from "../ui/MotTableRowCell";
import { UserListHeaders } from "@/utils/MotTableConstant";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { links } from "@/utils/links";
import useApi from "@/hooks/useApi";
import { changeUserStatusApi, getUserListApi } from "../api/user.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { IUser, EUserStatus } from "@/interfaces/user/user.interface";
import { useDispatch } from "react-redux";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import Pagination from "@/components/Pagination";
import { PAGE_LIMIT, USER_TYPE_KEY } from "@/utils/constants";
import MotTableWrapper from "../ui/MotTableWrapper";
import { EUserType } from "@/interfaces/common.interface";
import EditIcon from "@/public/assets/admin-dashboard/ic-edit.svg";
import Image from "next/image";
import ChangePasswordDialog from "../ui/ChangePasswordDialog";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const [userId, setUserId] = useState<any>("");

  const {
    loading: isGetUserRequestLoading,
    data: getUserListResponse,
    request: getUserListRequest,
  } = useApi(getUserListApi);

  useEffect(() => {
    if (!isGetUserRequestLoading && getUserListResponse) {
      if (getUserListResponse.responseCode === ResponseCodes.SUCCESS) {
        setUserList(getUserListResponse.data.users);
        setTotalPages(getUserListResponse.data.totalPage);
      }
    }
  }, [isGetUserRequestLoading, getUserListResponse]);

  const {
    loading: isChangeStatusRequestLoading,
    data: changeStatusResponse,
    request: changeStatusRequest,
  } = useApi(changeUserStatusApi);

  useEffect(() => {
    if (!isChangeStatusRequestLoading && changeStatusResponse) {
      if (changeStatusResponse.responseCode === ResponseCodes.SUCCESS) {
        dispatch(
          showAlert({
            message: changeStatusResponse.message,
            variant: EVariant.SUCCESS,
          })
        );
        getUserListRequest(router, 0, PAGE_LIMIT);
      }
    }
  }, [
    isChangeStatusRequestLoading,
    changeStatusResponse,
    dispatch,
    router,
    getUserListRequest,
  ]);

  useEffect(() => {
    if (localStorage.getItem(USER_TYPE_KEY) === EUserType.ADMIN) {
      getUserListRequest(router, currentPage * PAGE_LIMIT, PAGE_LIMIT);
    }
  }, [currentPage, getUserListRequest, router]);

  const handleRowOnClick = (id: any) => {
    router.push(`${links.USER_LIST}/${id}`);
  };

  const handleStatusChange = async (event: any, userId: string) => {
    const status = event.target.value;

    if (status) {
      changeStatusRequest(router, userId, status);
    }
  };

  const handleChangePasswordClick = async (event: any, userId: string) => {
    event.stopPropagation();
    setUserId(userId);
    setIsChangePasswordDialogOpen(true);
  };

  const handleCloseChangePasswordDialog = () => {
    setIsChangePasswordDialogOpen(false);
    setUserId(null);
  };

  return (
    <div className="bg-customer-background p-3 lg:flex lg:flex-col h-full  lg:h-[calc(100dvh-8.5rem)] lg:overflow-hidden">
      <MotTableWrapper
        styles={`${
          isGetUserRequestLoading || !userList.length
            ? "overflow-hidden"
            : "overflow-auto"
        }`}
      >
        <MotTable>
          <MotTableHead>
            {UserListHeaders.map((single: any, index: any) => {
              return (
                <MotTableHeadCell
                  key={`User-Table-headers-${index}`}
                  styles={single?.customStyle || ""}
                >
                  {single.headerName}
                </MotTableHeadCell>
              );
            })}
          </MotTableHead>
          <MotTableBody>
            {userList.map((single: IUser, index: any) => {
              return (
                <MotTableRow
                  key={single._id}
                  onClick={() => handleRowOnClick(single._id)}
                >
                  <React.Fragment key={`User-Table-rows-${index}`}>
                    <MotTableRowCell styles="capitalize">
                      {single.fullName ? single.fullName : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell>
                      {single.companyName ? single.companyName : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="capitalize">
                      {single.country ? single.country : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell>
                      {single.mobileNumber ? single.mobileNumber : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell>
                      {single.email ? single.email : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell styles="pl-2">
                      <div className="flex justify-center items-center">
                        <div
                          className="flex flex-row gap-x-2 justify-center items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <select
                            className="bg-tertiary text-white py-1 px-5 rounded-md capitalize cursor-pointer"
                            onChange={(e) => handleStatusChange(e, single._id)}
                            value={single.status ? single.status : ""}
                          >
                            <option value="">Select</option>
                            <option
                              value={EUserStatus.PENDING}
                              className="capitalize cursor-pointer"
                            >
                              {EUserStatus.PENDING}
                            </option>
                            <option
                              value={EUserStatus.APPROVED}
                              className="capitalize cursor-pointer"
                            >
                              {EUserStatus.APPROVED}
                            </option>
                            <option
                              value={EUserStatus.DISAPPROVED}
                              className="capitalize cursor-pointer"
                            >
                              {EUserStatus.DISAPPROVED}
                            </option>
                          </select>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="flex items-center py-2 text-white rounded-md capitalize"
                            onClick={(e) =>
                              handleChangePasswordClick(e, single._id)
                            }
                          >
                            <div className="flex items-center justify-center px-3 lg:px-4">
                              <Image
                                src={EditIcon}
                                alt="image"
                                className="w-6 h-6 object-contain max-w-none"
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                    </MotTableRowCell>
                  </React.Fragment>
                </MotTableRow>
              );
            })}
          </MotTableBody>
        </MotTable>
      </MotTableWrapper>
      <Pagination
        totalPage={totalPages}
        onPageChangeHandler={(page) => {
          setCurrentPage(page);
        }}
      />
      {isChangePasswordDialogOpen && (
        <ChangePasswordDialog
          handleCloseChangePasswordDialog={handleCloseChangePasswordDialog}
          userId={userId}
        />
      )}
    </div>
  );
};

export default Page;
