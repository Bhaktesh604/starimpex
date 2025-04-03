"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import MotBanner from "../ui/MotBanner";
import MotButtonComponent from "../ui/MotButtonComponent";
import { MotTableMenu } from "@/utils/MotTableConstant";
import Image from "next/image";
import PriceTrackTable from "../ui/PriceTrack";
import useApiRequest from "@/hooks/useApi";
import {
  getPriceTrackList,
  removeFromPriceTrackApi,
} from "../api/price_track.api";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/interfaces/response.interface";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import { addToCartApi } from "../api/cart.api";
import ConfirmOrder from "../ui/ConfirmOrder";
import { TETooltip } from "tw-elements-react";
import DiamondNotes from "../ui/DiamondNotes";
import { EShowSelectedBtnStatus } from "@/utils/content.util";
import { exportStonesDetailsToExcel } from "../api/diamond.api";
import EmailBox from "../ui/EmailBox";
import { ResponseMessages } from "@/utils/response.messages";
import { useDispatch } from "react-redux";
import { setItems } from "@/store/cartSlice";
import { PAGE_LIMIT, USER_TYPE_KEY } from "@/utils/constants";
import { EUserType } from "@/interfaces/common.interface";

const PriceTrack = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [PriceTrackList, setPriceTrackList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalTrackItems, setTotalTrackItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCarat, setTotalCarat] = useState(0);
  const [averageRap, setAverageRap] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);
  const [pricePerCarat, setPricePerCarat] = useState(0);
  const [isConfirmOrder, setIsConfirmOrder] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [singleRowNotes, setSingleRowNote] = useState<any>([]);
  const [toggleAction, setToggleAction] = useState<boolean>(false); // State to track toggle
  const [showSelectedData, setShowSelectedData] = useState<any>([]);
  const [emailBox, setEmailBox] = useState(false);

  const {
    loading: isGetPriceTrackListLoading,
    data: getPriceTrackListResponse,
    request: getPriceTrackListRequest,
  } = useApiRequest(getPriceTrackList);

  const {
    loading: isRemoveItemFromPriceTrackLoading,
    data: removeItemFromPriceTrackResponse,
    request: removeItemFromPriceTrackRequest,
  } = useApiRequest(removeFromPriceTrackApi);

  const {
    loading: isAddToCartLoading,
    data: addToCartResponse,
    request: addToCartRequest,
  } = useApiRequest(addToCartApi);

  const getPriceTrack = useCallback(async () => {
    setIsLoading(true);
    getPriceTrackListRequest(router, currentPage * PAGE_LIMIT, PAGE_LIMIT);
  }, [currentPage, getPriceTrackListRequest, router]);

  useEffect(() => {
    if(localStorage.getItem(USER_TYPE_KEY) === EUserType.USER){
      getPriceTrack();
    }
  }, [getPriceTrack]);

  useEffect(() => {
    if (!isGetPriceTrackListLoading && getPriceTrackListResponse) {
      if (getPriceTrackListResponse.responseCode === ResponseCodes.SUCCESS) {
        setPriceTrackList(getPriceTrackListResponse.data.priceTrackList);
        setTotalPage(getPriceTrackListResponse.data.totalPages);
        setTotalTrackItems(getPriceTrackListResponse.data.totalTrackItems);
      }
      setIsLoading(false);
    }
  }, [getPriceTrackListResponse, isGetPriceTrackListLoading]);

  useEffect(() => {
    if (
      removeItemFromPriceTrackResponse?.responseCode === ResponseCodes.SUCCESS
    ) {
      toast.success("Item Deleted Successfully", { autoClose: 500 });
    }
    if (
      !isRemoveItemFromPriceTrackLoading &&
      removeItemFromPriceTrackResponse
    ) {
      if (
        removeItemFromPriceTrackResponse.responseCode === ResponseCodes.SUCCESS
      ) {
        window.location.reload();
      }
    }
  }, [
    getPriceTrack,
    isRemoveItemFromPriceTrackLoading,
    removeItemFromPriceTrackResponse,
  ]);

  useEffect(() => {
    if (!isAddToCartLoading && addToCartResponse) {
      if (addToCartResponse.responseCode === ResponseCodes.SUCCESS) {
        dispatch(setItems(addToCartResponse.data.totalCount));
        toast.success(addToCartResponse.message);
      }
    }
  }, [isAddToCartLoading, addToCartResponse, dispatch]);

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
        // TODO :- Add Dynamic message

        toast.error(
          "One or more items are out of stock! Refresh and select only available items to export",
          {
            autoClose: 2000,
          }
        );
      }
    } else {
      toast.error("Please select at least one diamond.", { autoClose: 2000 });
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
    let diamondSnapshotData: any = updatedSelectedRows.map((diamond: any) => {
      return {
        ...diamond.diamond,
        userNotes: diamond.diamondSnapshot.userNotes,
        diamondStatus: diamond.status,
      };
    });

    setShowSelectedData(updatedSelectedRows);
    setSelectedRow(diamondSnapshotData);
  };

  const addItemToCart = async () => {
    let selectedRowData: Array<any> = [...selectedRow];
    let newData: any = selectedRowData.map((item) => item._id);
    addToCartRequest(router, newData);
  };

  const onClickMenu = (menu: any) => {
    const allSelectedAvailable = selectedRow.every(
      (diamond: any) => diamond && diamond.status === "available"
    );

    if (menu === "addToCart") {
      if (selectedRow.length >= 1 && allSelectedAvailable) {
        addItemToCart();
      } else {
        toast.error("Please Select Atleast One Available Diamond", {
          autoClose: 2000,
        });
      }
    }

    if (menu === "copyToClipboard") {
      if (selectedRow.length >= 1) {
        onCopyToClipboard();
      } else {
        toast.error("Please Select Atleast One  Diamond", { autoClose: 2000 });
      }
    }

    if (menu === "notes") {
      if (selectedRow.length > 0 && allSelectedAvailable) {
        setShowNotesModal(true);
      } else {
        toast.error("Please Select Atleast One Available Diamond", {
          autoClose: 2000,
        });
      }
    }
    if (menu === "exportExcel") {
      if (selectedRow.length >= 1 && allSelectedAvailable) {
        exportStonesDetails(selectedRow);
      } else {
        toast.error("Please Select Atleast One Available Diamond", {
          autoClose: 2000,
        });
      }
    }
    if (menu === "sendMail") {
      if (selectedRow.length >= 1 && allSelectedAvailable) {
        setEmailBox(true);
      } else {
        toast.error("Please Select Atleast One Available Diamond", {
          autoClose: 2000,
        });
      }
    }
  };

  const onCopyToClipboard = () => {
    const stoneIds = selectedRow.map((row: any) => row.stoneNo).join(",");
    navigator.clipboard
      .writeText(stoneIds)
      .then(() => {
        toast.success("Copied to Clipboard", { autoClose: 2000 });
      })
      .catch((err) => {
        toast.error("Could not copy text: ", err);
      });
  };

  useEffect(() => {
    let carat = 0;
    let totalRap = 0;
    let avgRap = 0;
    let avgDiscount = 0;
    let totalPricePerCarat = 0;
    let amount = 0;

    selectedRow.forEach((diamond: any) => {
      carat = carat + (diamond.caratWeight || 0);
      totalRap = totalRap + (diamond.caratWeight || 0) * (diamond.rap || 0);
      amount = amount + (diamond.ourPrice || 0);
    });

    if (selectedRow.length) {
      avgRap = totalRap && carat ? totalRap / carat : 0;
      totalPricePerCarat = amount && carat ? amount / carat : 0;
      avgDiscount =
        totalPricePerCarat && avgRap
          ? (totalPricePerCarat * 100) / avgRap - 100
          : 0;
    }

    setTotalCarat(carat);
    setAverageRap(avgRap);
    setAverageDiscount(avgDiscount);
    setPricePerCarat(totalPricePerCarat);
    setTotalAmount(amount);
  }, [selectedRow]);

  const handleRemoveItem = async () => {
    const removableIds = showSelectedData.map(
      (item: any) => item.diamondSnapshot._id
    );
    removeItemFromPriceTrackRequest(router, removableIds);
  };

  const handleConfirmOrder = () => {
    const allSelectedAvailable = selectedRow.every(
      (diamond: any) => diamond && diamond.status === "available"
    );
    if (!allSelectedAvailable) {
      toast.error("Please Select Only Available Diamond", {
        autoClose: 2000,
      });
      return;
    }
    if (selectedRow.length >= 1) {
      setIsConfirmOrder((prev) => !prev);
    } else {
      toast.error("Please select at least one diamond");
    }
  };

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

  const showDiamonds: any = toggleAction ? showSelectedData : PriceTrackList;

  return (
    <section className="relative p-3 bg-[#f1f4f9] lg:overflow-hidden lg:h-[calc(100dvh-8.5rem)] w-full lg:flex lg:flex-col">
      <div className="flex md:flex-row-reverse md:flex-nowrap max-[768px]:flex-wrap max-[768px]:flex-row  justify-between items-start">
        <div className="flex flex-row justify-end md:max-w-[100%] lg:max-w-[32%] w-full max-[768px]:mb-3">
          <span className="font-poppins font-medium text-xs leading-4 text-red-600 ">
            All Prices are based on advance Payment Terms Only
          </span>
        </div>
        <div className="flex flex-row justify-start items-center flex-wrap gap-y-2">
          <MotBanner
            bannerName="New Arrival"
            bannerValue={totalTrackItems}
            className="md:mr-0.5 lg:mr-6"
          />
          <MotBanner
            bannerName="Selected Pcs."
            bannerValue={selectedRow.length}
          />
          <MotBanner
            bannerName="Total Carat"
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

      <div className="my-4 flex justify-between items-center">
        <div className="flex justify-start items-center flex-wrap gap-2">
          <div className="flex justify-start items-center gap-2 flex-wrap">
            {/* <MotButtonComponent buttonText="Make an Offer" /> */}
            <MotButtonComponent
              buttonText="Buy Now"
              handleButtonOnClick={handleConfirmOrder}
            />
            <MotButtonComponent
              buttonText="Remove"
              handleButtonOnClick={() => handleRemoveItem()}
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
          <ul className="flex items-center justify-center gap-2 flex-wrap">
            {MotTableMenu.map((single) => {
              if (single.type.includes("price-track")) {
                return (
                  <li
                    key={`price-track-actions-${single.name}`}
                    className="cursor-pointer bg-[#CFDBEB] rounded-full w-9 h-9 flex justify-center items-center group transform hover:scale-105 mb-0"
                    onClick={() => onClickMenu(single.name)}
                  >
                    <TETooltip
                      trigger="hover click"
                      title={single.tooltipName || ""}
                    >
                      <Image
                        src={single.menuIconImg}
                        alt={single.tooltipName}
                        className="w-5 h-5 group-hover:scale-105 object-contain"
                      />
                    </TETooltip>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
      <PriceTrackTable
        tableType="price"
        priceTrack={showDiamonds}
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
        <div className="fixed top-0 right-0 left-0 bottom-0  bg-black/40 z-[31] flex justify-center items-center ">
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
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 h-full z-[31] flex justify-center items-center ">
          <EmailBox exportRowData={selectedRow} handleOpenClose={setEmailBox} />
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default PriceTrack;
