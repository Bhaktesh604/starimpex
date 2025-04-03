import React, { useEffect, useState } from "react";
import CancelIcon from "@/public/assets/admin-dashboard/ic-cancel.svg";
import Image from "next/image";
import PendingIcon from "@/public/assets/admin-dashboard/ic-pending.svg";
import ConfirmIcon from "@/public/assets/admin-dashboard/ic-confirm.svg";
import PartiallyConfirm from "@/public/assets/admin-dashboard/ic-partially-confirm.svg";
import CancelledIcon from "@/public/assets/admin-dashboard/ic-cancelled.svg";
import DiamondConfirmationDialog from "./DiamondConfirmationDialog";
import { EOrderStatus } from "@/interfaces/admin/order.interface";
import { changeOrderStatusApi } from "@/app/(admin)/admin/api/order.api";
import useApi from "@/hooks/useApi";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { useDispatch } from "react-redux";

function ChangeStatusDialog({
  hideChangeStatusModal = () => {},
  orderNumber,
  diamondData,
  orderId,
  status
}: {
  hideChangeStatusModal: () => void;
  orderNumber: string;
  diamondData: Array<any>;
  orderId:string;
  status:string
}) {
  const {
    loading: ischangeStatusRequestLoading,
    data: changeStatusResponse,
    request: changeStatusRequest,
  } = useApi(changeOrderStatusApi);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ischangeStatusRequestLoading && changeStatusResponse) {
      if (changeStatusResponse.responseCode === ResponseCodes.SUCCESS) {
        dispatch(
          showAlert({
            message: changeStatusResponse.message,
            variant: EVariant.SUCCESS,
          })
        );
      }
    }
  }, [ischangeStatusRequestLoading, changeStatusResponse]);

  const [showDiamondConfirmModal, setDiamondConfirmModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState<string>(status);
  const [orderItems,setOrderItems] = useState<any>();
  const router = useRouter();

  const hideDiamondConfirmModal = () => {
    setDiamondConfirmModal(false);
  };

  const handleOrderStatus = (status: string) => {
    setOrderStatus(status);
    if(status === EOrderStatus.PARTIALLY_CONFIRM){
      setDiamondConfirmModal(true);
    }
  };
 
  const onChangeStatus = () => {
    if(!orderStatus){
      toast.error("Please Select Order Status");
    } else {
      changeStatusRequest(router,orderId,orderStatus,orderItems)
    }
  }

  const handleConfirmDiamonds = (updatedFilterData: any[]) => {
    setOrderItems(updatedFilterData);
  };

  return (
    <div>
      <div className="relative w-full max-w-3xl mx-auto bg-white rounded-[11px] shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center mt-[0.5rem] p-4">
          <p className="hidden md:block"></p>
          <p className="text-tertiary text-xl font-poppins font-semibold text-center ">
            CHANGE ORDER STATUS
          </p>
          <div className="flex justify-end">
            <Image
              src={CancelIcon}
              width={20}
              height={20}
              className="cursor-pointer"
              alt="image"
              onClick={hideChangeStatusModal}
            />
          </div>
        </div>
        <hr className="border-primary border-opacity-[50%]"></hr>
        <div className="overflow-y-auto w-full h-[45dvh]">
          <div className="mx-[2rem] my-[1rem]">
            <p className="text-base text-[#000000] text-opacity-[70%]">
              Select the order status for {orderNumber}
            </p>
          </div>
          <div>
            <form onSubmit={onChangeStatus}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-[2rem] pb-[2rem]">
                <div
                  className={`grid grid-cols-[10%_100%] pl-3 pr-12 py-6 rounded-[11px] cursor-pointer ${
                    orderStatus === EOrderStatus.PENDING
                      ? "bg-[#FFFFFF] border-[1px] border-tertiary shadow-tertiary shadow-sm"
                      : "bg-tertiary-light"
                  }`}
                  onClick={() => handleOrderStatus(EOrderStatus.PENDING)}
                >
                  <div className="pt-2">
                    <Image alt="image" src={PendingIcon} />
                  </div>

                  <div>
                    <p className="ml-[0.rem] md:ml-[-0.5rem] uppercase text-[#000000] text-lg font-poppins font-normal">
                      Pending
                    </p>
                    <p className="ml-[0.rem] md:ml-[-0.5rem] text-[#4D4D4D] text-sm font-poppins font-normal">
                      No action taken by admin
                    </p>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-[10%_100%] pl-3 pr-12 py-6 rounded-[11px] cursor-pointer ${
                    orderStatus === EOrderStatus.CONFIRM
                      ? "bg-[#FFFFFF] border-[1px] border-tertiary shadow-tertiary shadow-sm"
                      : "bg-tertiary-light"
                  }`}
                  onClick={() => handleOrderStatus(EOrderStatus.CONFIRM)}
                >
                  <div className="pt-2">
                    <Image alt="image" src={ConfirmIcon} />
                  </div>

                  <div>
                    <p className="ml-[0.rem] md:ml-[-0.5rem] uppercase text-[#000000] text-lg font-poppins font-normal">
                      confirm
                    </p>
                    <p className="ml-[0.rem] md:ml-[-0.5rem] text-[#4D4D4D] text-sm font-poppins font-normal">
                      Order is ready to dispatch/completed
                    </p>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-[10%_100%] pl-3 pr-12 py-6 rounded-[11px] cursor-pointer ${
                    orderStatus === EOrderStatus.PARTIALLY_CONFIRM
                      ? "bg-[#FFFFFF] border-[1px] border-tertiary shadow-tertiary shadow-sm"
                      : "bg-tertiary-light"
                  }`}
                  onClick={() =>
                    handleOrderStatus(EOrderStatus.PARTIALLY_CONFIRM)
                  }
                >
                  <div className="pt-2">
                    <Image alt="image" src={PartiallyConfirm} />
                  </div>

                  <div>
                    <p className="ml-[0.rem] md:ml-[-0.5rem] uppercase text-[#000000] text-lg font-poppins font-normal">
                      PARTIALLY CONFIRM
                    </p>
                    <p className="ml-[0.rem] md:ml-[-0.5rem] text-[#4D4D4D] text-sm font-poppins font-normal">
                      Some diamonds are confirmed
                    </p>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-[10%_100%] pl-3 pr-12 py-6 rounded-[11px] cursor-pointer ${
                    orderStatus === EOrderStatus.CANCELED
                      ? "bg-[#FFFFFF] border-[1px] border-tertiary shadow-tertiary shadow-sm"
                      : "bg-tertiary-light"
                  }`}
                  onClick={() => handleOrderStatus(EOrderStatus.CANCELED)}
                >
                  <div className="pt-2">
                    <Image alt="image" src={CancelledIcon} />
                  </div>

                  <div>
                    <p className="ml-[0.rem] md:ml-[-0.5rem] uppercase text-[#000000] text-lg font-poppins font-normal">
                      CANCELED
                    </p>
                    <p className="ml-[0.rem] md:ml-[-0.5rem] text-[#4D4D4D] text-sm font-poppins font-normal">
                      Order is canceled
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mx-[2rem] pb-[1rem]">
                <button
                  className="rounded-md font-poppins font-semibold text-sm leading-6 uppercase bg-tertiary text-white py-[10px] px-[12px] max-[480px]:ml-4 max-[480px]:mb-4 cursor-pointer"
                 
                >
                  change status
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showDiamondConfirmModal ? (
        <>
          <div className="fixed inset-0 z-[8]">
            <div className="fixed w-full h-screen bg-black opacity-40"></div>
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
              <DiamondConfirmationDialog
                tableType="diamondconfirmation"
                diamondData={diamondData}
                hideDiamondConfirmModal={hideDiamondConfirmModal}
                onConfirmationDiamond={handleConfirmDiamonds} 
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ChangeStatusDialog;
