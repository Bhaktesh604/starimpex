"use client";
import React, { useCallback, useEffect, useState } from "react";
import SearchResult from "../ui/SearchResult";
import MotBanner from "../ui/MotBanner";
import MotButtonComponent from "../ui/MotButtonComponent";
import { MotTableMenu } from "@/utils/MotTableConstant";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import CompareDiamondModal from "../ui/CompareDiamondModal";
import { toast } from "react-toastify";
import Pagination from "@/components/Pagination";
import useApiRequest from "@/hooks/useApi";
import {
  exportStonesDetailsToExcel,
  getDiamondListApi,
} from "../api/diamond.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { diamondQueryParams } from "@/utils/diamondConstant";
import { links } from "@/utils/links";
import { EDiamondType, EUserType } from "@/interfaces/common.interface";
import { PAGE_LIMIT, TOKEN_KEY, USER_TYPE_KEY } from "@/utils/constants";
import { addToCartApi } from "../api/cart.api";
import ConfirmOrder from "../ui/ConfirmOrder";
import DiamondNotes from "../ui/DiamondNotes";
import { addToPriceTrackApi } from "../api/price_track.api";
import EmailBox from "../ui/EmailBox";
import { ResponseMessages } from "@/utils/response.messages";
import { TETooltip } from "tw-elements-react";
import GridViewIcon from "@/public/assets/customer-dashboard/MotTableImages/search_page_05.svg";
import ListViewIcon from "@/public/assets/customer-dashboard/ic-list-view.svg";
import { EShowSelectedBtnStatus } from "@/utils/content.util";
import { useDispatch } from "react-redux";
import { setItems } from "@/store/cartSlice";

function Page() {
  const [selectedRows, setSelectedRows] = useState<Array<any>>([]);
  const [showCompareDiamondModal, setCompareDiamondModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [totalPage, setTotalPage] = useState(0);
  const [diamondList, setDiamondList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalStone, setTotalStone] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCarat, setTotalCarat] = useState(0);
  const [averageRap, setAverageRap] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);
  const [pricePerCarat, setPricePerCarat] = useState(0);
  const [isConfirmOrder, setIsConfirmOrder] = useState(false);
  const [emailBox, setEmailBox] = useState(false);

  const [pageType, setPageType] = useState("");
  const [singleRowNotes, setSingleRowNote] = useState<any>([]);
  const [isGridView, setGridView] = useState(false);
  const [toggleAction, setToggleAction] = useState<boolean>(false);

  const {
    loading: isGetDiamondListLoading,
    data: getDiamondListResponse,
    request: getDiamondListRequest,
  } = useApiRequest(getDiamondListApi);
  const [isLoading, setIsLoading] = useState(true);

  const {
    loading: isAddToCartLoading,
    data: addToCartResponse,
    request: addToCartRequest,
  } = useApiRequest(addToCartApi);

  const {
    loading: isAddToPriceTrackLoading,
    data: addPriceTrackResponse,
    request: addPriceTrackRequest,
  } = useApiRequest(addToPriceTrackApi);

  const getDiamonds = useCallback(() => {
    setIsLoading(true);
    if (!searchParams.size) {
      router.push(
        `${links.ADVANCE_SEARCH}?${diamondQueryParams.DIAMOND_TYPE}=${EDiamondType.NATURAL_DIAMONDS}`
      );
      return;
    }
    const diamondType: any = searchParams.get(diamondQueryParams.DIAMOND_TYPE);
    setPageType(diamondType);

    const no_bgm = searchParams.get(diamondQueryParams.NO_BGM);
    const is_fancy_color = searchParams.get(diamondQueryParams.IS_FANCY_COLOR);
    const shape = searchParams.get(diamondQueryParams.SHAPE);
    const lab = searchParams.get(diamondQueryParams.LAB);
    const carat = searchParams.get(diamondQueryParams.CARAT);
    const fancy_intensity = searchParams.get(
      diamondQueryParams.FANCY_INTENSITY
    );
    const fancy_overtone = searchParams.get(diamondQueryParams.FANCY_OVERTONE);
    const fancy_color = searchParams.get(diamondQueryParams.FANCY_COLOR);
    const color = searchParams.get(diamondQueryParams.COLOR);
    const clarity = searchParams.get(diamondQueryParams.CLARITY);
    const florescence = searchParams.get(diamondQueryParams.FLORESCENCE);
    const cut = searchParams.get(diamondQueryParams.CUT);
    const polish = searchParams.get(diamondQueryParams.POLISH);
    const symmetry = searchParams.get(diamondQueryParams.SYMMETRY);
    const country = searchParams.get(diamondQueryParams.COUNTRY);
    const eye_clean = searchParams.get(diamondQueryParams.EYE_CLEAN);
    const discount = searchParams.get(diamondQueryParams.DISCOUNT);
    const stoneIds = searchParams.get(diamondQueryParams.STONE_IDS);
    const price_per_carat = searchParams.get(
      diamondQueryParams.PRICE_PER_CARAT
    );
    const total_price = searchParams.get(diamondQueryParams.TOTAL_PRICE);
    const lab_grown_type = searchParams.get(diamondQueryParams.LAB_GROWN_TYPE);
    const table_percentage = searchParams.get(
      diamondQueryParams.TABLE_PERCENTAGE
    );
    const depth_percentage = searchParams.get(
      diamondQueryParams.DEPTH_PERCENTAGE
    );
    const length = searchParams.get(diamondQueryParams.LENGTH);
    const width = searchParams.get(diamondQueryParams.WIDTH);
    const ratio = searchParams.get(diamondQueryParams.RATIO);
    const crown_height = searchParams.get(diamondQueryParams.CROWN_HEIGHT);
    const crown_angle = searchParams.get(diamondQueryParams.CROWN_ANGLE);
    const pavilion_height = searchParams.get(
      diamondQueryParams.PAVILION_HEIGHT
    );
    const pavilion_angle = searchParams.get(diamondQueryParams.PAVILION_ANGLE);
    const girdle_percentage = searchParams.get(
      diamondQueryParams.GIRDLE_PERCENTAGE
    );
    const culet = searchParams.get(diamondQueryParams.CULET);
    const contain_key_to_symbol = searchParams.get(
      diamondQueryParams.CONTAIN_KEY_TO_SYMBOL
    );
    const do_not_contain_key_to_symbol = searchParams.get(
      diamondQueryParams.DO_NOT_CONTAIN_KEY_TO_SYMBOL
    );
    const sort_order = searchParams.get(diamondQueryParams.SORT_ORDER);
    getDiamondListRequest(
      router,
      currentPage * PAGE_LIMIT,
      PAGE_LIMIT,
      diamondType,
      no_bgm,
      is_fancy_color,
      shape,
      lab,
      carat,
      fancy_intensity,
      fancy_overtone,
      fancy_color,
      color,
      clarity,
      florescence,
      cut,
      polish,
      symmetry,
      country,
      eye_clean,
      discount,
      price_per_carat,
      total_price,
      lab_grown_type,
      table_percentage,
      depth_percentage,
      length,
      width,
      ratio,
      crown_height,
      crown_angle,
      pavilion_height,
      pavilion_angle,
      girdle_percentage,
      culet,
      contain_key_to_symbol,
      do_not_contain_key_to_symbol,
      stoneIds,
      sort_order
    );
  }, [currentPage, router, searchParams, getDiamondListRequest]);

  useEffect(() => {
    const IS_USER =
      localStorage.getItem(TOKEN_KEY) &&
      localStorage.getItem(USER_TYPE_KEY) === EUserType.USER;
    if (!IS_USER) {
      router.push(links.LOGIN);
      return;
    }
      getDiamonds();
  }, [router, getDiamonds]);

  useEffect(() => {
    if (!isGetDiamondListLoading && getDiamondListResponse) {
      if (getDiamondListResponse.responseCode === ResponseCodes.SUCCESS) {
        setDiamondList(getDiamondListResponse.data.diamonds);
        setTotalPage(getDiamondListResponse.data.totalPages);
        setTotalStone(getDiamondListResponse.data.totalCount);
      }
      setIsLoading(false);
    }
  }, [isGetDiamondListLoading, getDiamondListResponse]);

  useEffect(() => {
    if (!isAddToCartLoading && addToCartResponse) {
      if (addToCartResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(addToCartResponse.message);

        dispatch(setItems(addToCartResponse.data.totalCount));
      }
    }
  }, [isAddToCartLoading, addToCartResponse, dispatch]);

  useEffect(() => {
    if (!isAddToPriceTrackLoading && addPriceTrackResponse) {
      if (addPriceTrackResponse.responseCode === ResponseCodes.SUCCESS) {
        toast.success(addPriceTrackResponse.message);
      }
    }
  }, [isAddToPriceTrackLoading, addPriceTrackResponse]);

  const handleSelectedRowsChange = (
    selectedDiamonds: Array<any>,
    isChecked: boolean
  ) => {
    let updatedSelectedRows: Array<any> = [...selectedRows];

    const newSelectedDiamondIds = selectedDiamonds.map(
      (diamond: any) => diamond._id
    );
    updatedSelectedRows = updatedSelectedRows.filter(
      (diamond: any) => !newSelectedDiamondIds.includes(diamond._id)
    );

    if (isChecked) {
      updatedSelectedRows.push(...selectedDiamonds);
    }

    setSelectedRows(updatedSelectedRows);
  };

  const hideCompareDiamondModal = () => {
    setCompareDiamondModal(false);
  };

  const addItemToCart = async () => {
    let selectedRowData: Array<any> = [...selectedRows];
    let newData: any = selectedRowData.map((item) => item._id);
    addToCartRequest(router, newData);
  };

  const addItemToPriceTrack = () => {
    let selectedRowData: Array<any> = [...selectedRows];
    let newData: any = selectedRowData.map((item) => item._id);
    if (newData.length >= 1) {
      addPriceTrackRequest(router, newData);
    } else {
      toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
    }
  };

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

  const onClickMenu = (menu: any) => {
    if (menu === "compareDiamond") {
      if (selectedRows.length >= 2 && selectedRows.length <= 4) {
        setCompareDiamondModal(true);
      } else {
        toast.error("Please Select Diamond Between 2 to 4", {
          autoClose: 2000,
        });
      }
    }

    if (menu === "addToCart") {
      if (selectedRows.length >= 1) {
        addItemToCart();
      } else {
        toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
      }
    }
    if (menu === "exportExcel") {
      if (selectedRows.length >= 1) {
        exportStonesDetails(selectedRows);
      } else {
        toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
      }
    }
    if (menu === "copyToClipboard") {
      if (selectedRows.length >= 1) {
        onCopyToClipboard();
      } else {
        toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
      }
    }
    if (menu === "sendMail") {
      if (selectedRows.length >= 1) {
        setEmailBox(true);
      } else {
        toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
      }
    }

    if (menu === "notes") {
      if (selectedRows.length > 0) {
        setShowNotesModal(true);
      } else {
        toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
      }
    }

    if (menu === "copyToClipboard") {
      if (selectedRows.length >= 1) {
        onCopyToClipboard();
      } else {
        toast.error("Please Select Atleast One Diamond", { autoClose: 2000 });
      }
    }

    if (menu === "gridView") {
      setGridView((prev) => !prev);
    }
  };

  const onCopyToClipboard = () => {
    const stoneIds = selectedRows.map((row) => row.stoneNo).join(",");
    navigator.clipboard
      .writeText(stoneIds)
      .then(() => {
        toast.success("Copied to Clipboard", { autoClose: 2000 });
      })
      .catch((err) => {
        toast.error("Could not copy text: ", err);
      });
  };

  const handleModifyButton = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/advance-search?${params}`);
  };

  useEffect(() => {
    let carat = 0;
    let totalRap = 0;
    let avgRap = 0;
    let avgDiscount = 0;
    let totalPricePerCarat = 0;
    let amount = 0;

    selectedRows.forEach((diamond) => {
      carat = carat + diamond.caratWeight;
      totalRap = totalRap + diamond.caratWeight * diamond.rap;
      amount = amount + diamond.ourPrice;
    });

    if (selectedRows.length) {
      avgRap = totalRap / carat;
      totalPricePerCarat = amount / carat;
      avgDiscount = (totalPricePerCarat * 100) / avgRap - 100;
    }

    setTotalCarat(carat);
    setAverageRap(avgRap);
    setAverageDiscount(avgDiscount);
    setPricePerCarat(totalPricePerCarat);
    setTotalAmount(amount);
  }, [selectedRows]);

  const handleConfirmOrder = () => {
    if (selectedRows.length >= 1) {
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

  const showDiamonds = toggleAction ? selectedRows : diamondList;

  return (
    <section className="relative p-3  lg:flex lg:flex-col  bg-[#f1f4f9] lg:overflow-hidden lg:h-[calc(100dvh-8rem)] w-full">
      <div className="flex  max-lg:flex-wrap-reverse gap-y-3 justify-between items-start">
        <div className="flex flex-row justify-start items-center flex-wrap gap-y-2 max-w-full lg:w-[70%]">
          <MotBanner
            bannerName="Total Result"
            bannerValue={totalStone}
            className="md:mr-1 lg:mr-6"
          />
          <MotBanner
            bannerName="Selected Pcs."
            bannerValue={selectedRows.length}
          />
          <MotBanner
            bannerName="Total Carat"
            bannerValue={totalCarat ? totalCarat.toFixed(2) : 0}
          />
          <MotBanner
            bannerName="Avg Rap USD"
            bannerValue={averageRap ? averageRap.toFixed(2) : 0}
          />
          <MotBanner
            bannerName="Discount %"
            bannerValue={averageDiscount ? averageDiscount.toFixed(4) : 0}
          />
          <MotBanner
            bannerName="Price/Ct USD"
            bannerValue={pricePerCarat ? pricePerCarat.toFixed(2) : 0}
          />
          <MotBanner
            bannerName="Final Amount USD"
            bannerValue={totalAmount.toFixed(2)}
          />
        </div>
        <p className="font-poppins font-medium text-xs leading-4 text-red-600 ">
          All Prices are based on advance Payment Terms Only
        </p>
      </div>

      <div className="mt-4 mb-3 flex justify-between items-center max-xl:items-start">
        <div className="flex flex-row justify-start items-center flex-wrap gap-2 max-w-full w-full">
          <div className="flex flex-row justify-start items-center gap-2 flex-wrap">
            <MotButtonComponent
              buttonText="Price Track"
              handleButtonOnClick={addItemToPriceTrack}
            />
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
            <MotButtonComponent
              buttonText="Modify Search"
              className="min-[768px]:hidden"
              handleButtonOnClick={handleModifyButton}
            />
          </div>
          <ul className="flex flex-row items-center sm:justify-center gap-2 flex-wrap pr-3">
            {MotTableMenu.map((single, index) => {
              if (single.type.includes("search")) {
                return (
                  <li
                    key={`Mot-Table-${index}`}
                    className="cursor-pointer bg-history_primary rounded-full w-9 h-9 flex justify-center items-center mb-0 group transform hover:scale-105"
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
            <li
              className="bg-history_primary rounded-full w-9 h-9 flex justify-center items-center mb-0 cursor-pointer group transform hover:scale-105"
              onClick={() => onClickMenu("gridView")}
            >
              <TETooltip
                trigger="hover click"
                title={isGridView ? "List View" : "Grid View"}
              >
                <Image
                  src={isGridView ? ListViewIcon : GridViewIcon}
                  alt="toggle list or grid view"
                  className="w-5 h-5 group-hover:scale-105"
                />
              </TETooltip>
            </li>
          </ul>
          <div className="max-w-full max-md:flex-grow min-[1200px]:flex-grow">
            <p className="font-semibold text-lg sm:text-end lg:text-center">
              {pageType === EDiamondType.NATURAL_DIAMONDS
                ? "Natural Diamond Search"
                : pageType === EDiamondType.LAB_GROWN_DIAMONDS
                ? "Lab Grown Diamond Search"
                : ""}
            </p>
          </div>
        </div>
        <div>
          <MotButtonComponent
            buttonText="Modify Search"
            className="min-w-[160px] max-[768px]:hidden"
            handleButtonOnClick={handleModifyButton}
          />
        </div>
      </div>
      <SearchResult
        tableType="search"
        onSelectedRowChange={handleSelectedRowsChange}
        diamonds={showDiamonds}
        isLoading={isLoading}
        handleSingleNote={(diamond: any) => onSingleNoteClickHandler(diamond)}
        isGridView={isGridView}
      />
      <Pagination
        totalPage={totalPage}
        onPageChangeHandler={(page) => {
          setCurrentPage(page);
        }}
      />
      {showCompareDiamondModal ? (
        <>
          <div className="fixed inset-0 z-[8]">
            <div className="fixed w-full h-screen bg-black opacity-40"></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <CompareDiamondModal
                selectedDiamonds={selectedRows}
                hideCompareDiamondModal={hideCompareDiamondModal}
              />
            </div>
          </div>
        </>
      ) : null}
      {isConfirmOrder ? (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black/40 flex z-[31] justify-center items-center ">
          <ConfirmOrder
            handleOpenClose={setIsConfirmOrder}
            orderData={selectedRows}
          />
        </div>
      ) : (
        ""
      )}
      {emailBox ? (
        <div className="fixed top-0 right-0 left-0 bottom-0 h-full bg-black/40 z-[31] flex justify-center items-center ">
          <EmailBox
            exportRowData={selectedRows}
            handleOpenClose={setEmailBox}
          />
        </div>
      ) : (
        ""
      )}
      {showNotesModal ? (
        <DiamondNotes
          hideDiamondNotesModal={hideDiamondNoteModal}
          diamondList={singleRowNotes.length ? singleRowNotes : selectedRows}
        />
      ) : null}
    </section>
  );
}

export default Page;
