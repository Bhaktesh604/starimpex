"use client";
import React, { useCallback, useEffect, useState } from "react";
import MotBanner from "../ui/MotBanner";
import MotButtonComponent from "../ui/MotButtonComponent";
import { MotTableMenu } from "@/utils/MotTableConstant";
import CartTable from "../ui/Cart";
import useApiRequest from "@/hooks/useApi";
import { getCartList, removeFromCartApi } from "../api/cart.api";
import { PAGE_LIMIT, TOKEN_KEY, USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";
import { links } from "@/utils/links";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/interfaces/response.interface";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import cartIcon from "@/public/assets/customer-dashboard/MotTableImages/cartIcon.svg";
import closeIcon from "@/public/assets/customer-dashboard/MotTableImages/closeIcon.svg";
import { toast } from "react-toastify";
import ConfirmOrder from "../ui/ConfirmOrder";
import { TETooltip } from "tw-elements-react";
import DiamondNotes from "../ui/DiamondNotes";
import { EShowSelectedBtnStatus } from "@/utils/content.util";
import { exportStonesDetailsToExcel } from "../api/diamond.api";
import EmailBox from "../ui/EmailBox";
import { ResponseMessages } from "@/utils/response.messages";
import { useDispatch } from "react-redux";
import { removeItem } from "@/store/cartSlice";
const Carts = () => {
  const router = useRouter();
  const [diamondList, setDiamondList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalStone, setTotalStone] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCarat, setTotalCarat] = useState(0);
  const [averageRap, setAverageRap] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);
  const [pricePerCarat, setPricePerCarat] = useState(0);
  const [selectedRow, setSelectedRow] = useState<any>([]);
  const [isConfirmOrder, setIsConfirmOrder] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [singleRowNotes, setSingleRowNote] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleAction, setToggleAction] = useState<boolean>(false);
  const [showSelectedData, setShowSelectedData] = useState<any>([]);
  const [emailBox, setEmailBox] = useState(false);

  const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatch();

  const handleConfirmOrder = () => {
    if (selectedRow.length >= 1) {
      setIsConfirmOrder((prev) => !prev);
    } else {
      toast.error("Please select at least one diamond");
    }
  };

  const {
    loading: isGetCartDiamondListLoading,
    data: getCartDiamondListResponse,
    request: getCartDiamondListRequest,
  } = useApiRequest(getCartList);

  const {
    loading: isRemoveItemFromCartLoading,
    data: removeItemFromCartResponse,
    request: removeItemFromCartRequest,
  } = useApiRequest(removeFromCartApi);

  const getDiamondList = useCallback(async () => {
    if(localStorage.getItem(USER_TYPE_KEY) === EUserType.USER){
      setIsLoading(true);
      getCartDiamondListRequest(router, currentPage * PAGE_LIMIT, PAGE_LIMIT);
    }
  }, [currentPage, getCartDiamondListRequest, router]);

  useEffect(() => {
    const IS_USER =
      localStorage.getItem(TOKEN_KEY) &&
      localStorage.getItem(USER_TYPE_KEY) === EUserType.USER;
    if (!IS_USER) {
      router.push(links.LOGIN);
      return;
    }
    getDiamondList();
  }, [getDiamondList, router]);

  useEffect(() => {
    if (!isGetCartDiamondListLoading && getCartDiamondListResponse) {
      if (getCartDiamondListResponse.responseCode === ResponseCodes.SUCCESS) {
        setDiamondList(getCartDiamondListResponse.data.cart);
        setTotalPage(getCartDiamondListResponse.data.totalPages);
        setTotalStone(getCartDiamondListResponse.data.totalPieces);
      }
      setIsLoading(false);
    }
  }, [getCartDiamondListResponse, isGetCartDiamondListLoading]);

  useEffect(() => {
    if (removeItemFromCartResponse?.responseCode === ResponseCodes.SUCCESS) {
      toast.success("Item Deleted Successfully", { autoClose: 500 });
    }
    if (!isRemoveItemFromCartLoading && removeItemFromCartResponse) {
      if (removeItemFromCartResponse.responseCode === ResponseCodes.SUCCESS) {
        window.location.reload();
        dispatch(removeItem(selectedRow.length));
        setIsRemoving(false);
      }
    }
  }, [dispatch, isRemoveItemFromCartLoading, removeItemFromCartResponse]);

  const exportStonesDetails = async (selectedRows: any) => {
    let selectedRowData = [...selectedRows];
    let newData = selectedRowData.map((item) => item._id);

    if (newData.length >= 1) {
      try {
        const response = await exportStonesDetailsToExcel(newData);
        if (response.data) {
          const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "stones_details.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          toast.error(ResponseMessages.SOMETHING_WENT_WRONG, {
            autoClose: 2000,
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data.message, { autoClose: 2000 });
      }
    } else {
      // TODO :- Add Dynamic message

      toast.error(
        "One or more items are out of stock! Refresh and select only available items to export",
        {
          autoClose: 2000,
        }
      );
    }
  };

  const handleRemoveItem = async () => {
    if (selectedRow.length === 0) {
      return;
    }
    if (isRemoving) return;
    setIsRemoving(true);
    const removableIds = selectedRow.map((item: any) => item._id);
    removeItemFromCartRequest(router, removableIds);
  };

  const onClickMenu = (menu: any) => {
    if (menu === "notes") {
      if (selectedRow.length > 0) {
        setShowNotesModal(true);
      } else {
        toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
      }
    }
    if (menu === "exportExcel") {
      if (selectedRow.length >= 1) {
        exportStonesDetails(selectedRow);
      } else {
        toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
      }
    }
    if (menu === "sendMail") {
      if (selectedRow.length >= 1) {
        setEmailBox(true);
      } else {
        toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
      }
    }
  };

  const handleSelectedRowsChange = (
    selectedDiamonds: Array<any>,
    isChecked: boolean
  ) => {
    let updatedSelectedRows: Array<any> = [...showSelectedData];
    const newSelectedDiamondIds = selectedDiamonds.map(
      (diamond: any) => diamond.diamondSnapshot._id
    );
    updatedSelectedRows = updatedSelectedRows.filter(
      (data: any) => !newSelectedDiamondIds.includes(data.diamondSnapshot._id)
    );

    if (isChecked) {
      updatedSelectedRows.push(...selectedDiamonds);
    }
    let diamondSnapshotData = updatedSelectedRows.map(
      (diamond: any) => diamond.diamondSnapshot
    );

    setShowSelectedData(updatedSelectedRows);
    setSelectedRow(diamondSnapshotData);
  };

  useEffect(() => {
    let carat = 0;
    let totalRap = 0;
    let avgRap = 0;
    let avgDiscount = 0;
    let totalPricePerCarat = 0;
    let amount = 0;

    selectedRow.forEach((diamond: any) => {
      carat = carat + diamond.caratWeight;
      totalRap = totalRap + diamond.caratWeight * diamond.rap;
      amount = amount + diamond.ourPrice;
    });

    if (selectedRow.length) {
      avgRap = totalRap / carat;
      totalPricePerCarat = amount / carat;
      avgDiscount = (totalPricePerCarat * 100) / avgRap - 100;
    }

    setTotalCarat(carat);
    setAverageRap(avgRap);
    setAverageDiscount(avgDiscount);
    setPricePerCarat(totalPricePerCarat);
    setTotalAmount(amount);
  }, [selectedRow]);

  const hideDiamondNoteModal = (isSuccess: boolean = false) => {
    setShowNotesModal(false);
    if (isSuccess) {
      window.location.reload();
    }
    setSingleRowNote([]);
  };

  const onSingleNoteClickHandler = (diamond: any) => {
    const selectedSingleNote = [diamond];
    setSingleRowNote(selectedSingleNote);
    setShowNotesModal(true);
  };

  const handleShowOnlySelectedRow = () => {
    setToggleAction((prev) => !prev);
  };

  const showDiamonds: any = toggleAction ? showSelectedData : diamondList;

  return (
    <section className="relative p-3 lg:flex lg:flex-col  bg-[#f1f4f9] lg:overflow-hidden lg:h-[calc(100dvh-8.5rem)] w-full">
      <div className="flex md:flex-row-reverse md:flex-nowrap max-[768px]:flex-wrap max-[768px]:flex-row  justify-between items-start">
        <div className="flex flex-row justify-end md:max-w-[100%] lg:max-w-[32%] w-full max-[768px]:mb-3">
          <span className="font-poppins font-medium text-xs leading-4 text-red-600 ">
            All Prices are based on advance Payment Terms Only
          </span>
        </div>
        <div className="flex flex-row justify-start items-center flex-wrap gap-y-2 max-w-full w-full">
          <MotBanner
            bannerName="New Arrival"
            bannerValue={totalStone}
            className="md:mr-[0.5px] lg:mr-6"
          />
          <MotBanner
            bannerName="Selected Pcs."
            bannerValue={selectedRow.length}
          />
          <MotBanner
            bannerName="Total Carat."
            bannerValue={totalCarat.toFixed(2)}
          />
          <MotBanner
            bannerName="Avg Rap USD"
            bannerValue={averageRap.toFixed(2)}
          />
          <MotBanner
            bannerName="Discount %"
            bannerValue={averageDiscount.toFixed(4)}
          />
          <MotBanner
            bannerName="Price/Ct USD"
            bannerValue={pricePerCarat.toFixed(2)}
          />
          <MotBanner
            bannerName="Final Amt USD"
            bannerValue={totalAmount.toFixed(2)}
          />
        </div>
      </div>

      <div className="mt-4 mb-3 flex justify-between items-start">
        <div className="flex flex-row justify-start items-center flex-wrap gap-2">
          <div className="flex flex-row justify-start items-center gap-x-2 flex-wrap gap-2">
            {/* <MotButtonComponent buttonText="Make an Offer" /> */}
            <MotButtonComponent
              buttonText="Buy Now"
              handleButtonOnClick={handleConfirmOrder}
            />
            <MotButtonComponent
              buttonText={
                toggleAction
                  ? EShowSelectedBtnStatus.SHOW_All
                  : EShowSelectedBtnStatus.SHOW_SELECTED
              }
              handleButtonOnClick={handleShowOnlySelectedRow}
            />
          </div>
          <ul className="flex flex-row items-center justify-center gap-2 flex-wrap">
            {MotTableMenu.map((single) => {
              if (single.type.includes("cart")) {
                return (
                  <>
                    <li
                      className="bg-[#CFDBEB] rounded-full w-9 h-9 flex justify-center items-center mb-0 cursor-pointer group transform hover:scale-105"
                      onClick={() => onClickMenu(single.name)}
                    >
                      <TETooltip
                        trigger="hover click"
                        title={single.tooltipName || ""}
                      >
                        <Image
                          src={single.menuIconImg}
                          alt={single.tooltipName}
                          className="w-5 h-5 group-hover:scale-105"
                        />
                      </TETooltip>
                    </li>
                  </>
                );
              }
            })}
            <div>
              <li
                className="bg-[#CFDBEB] relative rounded-full w-9 h-9 flex justify-center items-center mb-0 cursor-pointer group transform hover:scale-105"
                onClick={() => handleRemoveItem()}
              >
                <TETooltip
                  trigger="hover click"
                  title={"Remove from cart" || ""}
                >
                  <Image
                    src={cartIcon}
                    alt="cart icon"
                    className="w-5 h-5 group-hover:scale-105"
                  />
                  <Image
                    src={closeIcon}
                    alt="close icon indicating clear from cart"
                    width={17}
                    height={17}
                    className="absolute -top-1 -right-1"
                  />
                </TETooltip>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <CartTable
        tableType="cart"
        diamonds={showDiamonds}
        onSelectedRowChange={handleSelectedRowsChange}
        isLoading={isLoading}
        handleSingleNote={(diamond: any) => onSingleNoteClickHandler(diamond)}
      />
      <Pagination
        totalPage={totalPage}
        onPageChangeHandler={(page) => {
          setCurrentPage(page);
        }}
      />
      {isConfirmOrder ? (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 flex justify-center items-center z-[31]">
          <ConfirmOrder
            handleOpenClose={setIsConfirmOrder}
            orderData={selectedRow}
          />
        </div>
      ) : (
        ""
      )}
      {showNotesModal ? (
        <DiamondNotes
          hideDiamondNotesModal={hideDiamondNoteModal}
          diamondList={singleRowNotes.length ? singleRowNotes : selectedRow}
        />
      ) : null}
      {emailBox ? (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 flex justify-center h-full items-center z-[31]">
          <EmailBox exportRowData={selectedRow} handleOpenClose={setEmailBox} />
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Carts;
