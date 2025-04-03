"use client";
import React, { useState } from "react";
import MotTable from "./MotTable";
import MotTableHead from "./MotTableHead";
import MotTableHeadCell from "./MotTableHeadCell";
import MotTableRow from "./MotTableRow";
import MotTableRowCell from "./MotTableRowCell";
import MotTableBody from "./MotTableBody";
import { MotTableSearchResultHeaders } from "@/utils/MotTableConstant";
import Link from "next/link";
import Image from "next/image";
import viewProductIcon from "@/public/assets/images/ic-view-details.svg";
import viewVideoIcon from "@/public/assets/images/ic-video-blue.svg";
import viewVideoDisabledIcon from "@/public/assets/images/ic-video-grey.svg";
import note_icon from "@/public/assets/customer-dashboard/MotTableImages/noteicon.svg";
import { links } from "@/utils/links";
import Spinner from "@/components/Spinner";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import { EDiamondType } from "@/interfaces/common.interface";
import DiamondsGridView from "./DiamondsGridView";
import { useRouter, useSearchParams } from "next/navigation";
import { diamondQueryParams } from "@/utils/diamondConstant";
import up_arrow_icon from "@/public/assets/Up_arrow.svg";
import down_arrow_icon from "@/public/assets/Down_arrow.svg";
import MotTableWrapper from "./MotTableWrapper";
import { EDiamondStatus } from "@/utils/content.util";
import { Tooltip } from "@material-tailwind/react";
import { getEyeCleanValue } from "@/utils/diamond.util";

interface SearchResultProps {
  onSelectedRowChange?: (selectedRows: Array<any>, isChecked: boolean) => void;
  tableType: string;
  diamonds: Array<any>;
  isLoading: boolean;
  handleSingleNote: Function;
  isGridView: Boolean;
}

const SearchResult = ({
  handleSingleNote = () => {},
  tableType,
  onSelectedRowChange = () => {},
  diamonds = [],
  isLoading = true,
  isGridView = false,
}: SearchResultProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [sortedField, setSortedField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>(0);

  const fetchSortedData = (field: string, order: number) => {
    let sortObject = { [field]: order };

    const params = new URLSearchParams(searchParams.toString());

    if (order === 0) {
      params.delete(diamondQueryParams.SORT_ORDER);
    } else {
      params.set(
        diamondQueryParams.SORT_ORDER,
        encodeURIComponent(JSON.stringify(sortObject))
      );
    }

    router.push(`/search-result?${params}`);
  };

  const toggleSortOrder = (field: string) => {
    if (!field) {
      return;
    }
    let currentSortOrder: number;
    if (field === sortedField) {
      currentSortOrder = sortOrder === 1 ? -1 : sortOrder === -1 ? 0 : 1;
    } else {
      currentSortOrder = 1;
    }

    setSortedField(field);
    setSortOrder(currentSortOrder);

    fetchSortedData(field, currentSortOrder);
  };

  const handleAllRowOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    let allSelectedIds = [...selectedRow];

    const currentPageDiamondIds = diamonds.map((diamond: any) => diamond._id);
    allSelectedIds = allSelectedIds.filter(
      (id: any) => !currentPageDiamondIds.includes(id)
    );

    if (e.target.checked) {
      allSelectedIds.push(...currentPageDiamondIds);
    }

    setSelectedRow([...allSelectedIds]);
    onSelectedRowChange(diamonds, e.target.checked);
  };

  const handleSingleRow = (
    e: React.ChangeEvent<HTMLInputElement>,
    diamond: any
  ) => {
    if (!diamond) {
      return;
    }
    let allSelectedIds = [...selectedRow];

    if (!e.target.checked) {
      allSelectedIds = allSelectedIds.filter((id) => id !== diamond._id);
    } else {
      allSelectedIds.push(diamond._id);
    }

    setSelectedRow([...allSelectedIds]);
    onSelectedRowChange([diamond], e.target.checked);
  };

  const handleDiamondnotes = (e: any, item: any) => {
    handleSingleNote(item);
  };

  return (
    <MotTableWrapper
      styles={`${
        isLoading || !diamonds.length ? "overflow-hidden" : "overflow-x-scroll"
      }`}
    >
      {isGridView ? (
        !isLoading && diamonds.length > 0 ? (
          <>
            <div className="flex justify-end items-center mx-3 py-2">
              <input
                type="checkbox"
                checked={selectedRow.length === diamonds.length}
                className="accent-tertiary border-[0.63px] border-black w-4 h-4 mr-1 cursor-pointer"
                onChange={handleAllRowOnClick}
                id="check-select-all"
              />
              <label
                className="text-sm cursor-pointer"
                htmlFor="check-select-all"
              >
                Select All
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-3">
              {diamonds.map((diamond: any) => (
                <>
                  <DiamondsGridView
                    diamond={diamond}
                    isChecked={selectedRow.includes(diamond._id)}
                    onSelect={(e: any) => handleSingleRow(e, diamond)}
                  />
                </>
              ))}
            </div>
          </>
        ) : null
      ) : (
        <>
          <MotTable>
            <MotTableHead>
              <MotTableHeadCell styles="!w-[46px] sticky left-0 z-[4] !border-r-0 !box_shadow">
                <input
                  type="checkbox"
                  className="accent-tertiary w-[16px] h-[14px] cursor-pointer "
                  onChange={handleAllRowOnClick}
                  checked={
                    selectedRow.length &&
                    diamonds.every((diamond) =>
                      selectedRow.includes(diamond._id)
                    )
                      ? true
                      : false
                  }
                />
              </MotTableHeadCell>
              {MotTableSearchResultHeaders.map((single: any, index: any) => {
                if (single.tableType.includes(`${tableType}`)) {
                  return (
                    <MotTableHeadCell
                      key={`Mot-Table-headers-${index}`}
                      styles={single?.customStyle || ""}
                      onClick={() => toggleSortOrder(single.fieldName)}
                    >
                      {single.headerName}
                      {sortedField === single.fieldName && (
                        <span className="ml-[3px] absolute top-[14px]">
                          {sortOrder === 1 ? (
                            <Image
                              src={up_arrow_icon}
                              alt="Sort Ascending"
                              width={11}
                            />
                          ) : sortOrder === -1 ? (
                            <Image
                              src={down_arrow_icon}
                              alt="Sort Descending"
                              width={11}
                            />
                          ) : (
                            ""
                          )}
                        </span>
                      )}
                    </MotTableHeadCell>
                  );
                }
              })}
            </MotTableHead>
            {!isLoading && diamonds.length > 0 ? (
              <MotTableBody>
                {diamonds.map((diamond: any) => {
                  return (
                    <MotTableRow
                      key={diamond._id}
                      isSelected={selectedRow.includes(diamond._id)}
                    >
                      <MotTableRowCell
                        styles={`sticky left-0  !border-r-0 !box_shadow  ${
                          selectedRow.includes(diamond._id)
                            ? "bg-[#CFDBEB]"
                            : "bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="accent-tertiary w-[16px] h-[14px] rounded-[4px] cursor-pointer "
                          checked={selectedRow.includes(diamond._id)}
                          onChange={(e) => handleSingleRow(e, diamond)}
                        />
                      </MotTableRowCell>
                      <MotTableRowCell
                        styles={`capitalize px-4 ${
                          diamond.status === EDiamondStatus.AVAILABLE
                            ? "text-green_color"
                            : "text-red_color"
                        }`}
                      >
                        {diamond.status ? diamond.status : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {diamond?.stoneNo ? diamond?.stoneNo : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        <div className="flex flex-row items-center justify-center cursor-pointer">
                          <Image
                            src={note_icon}
                            alt="note icon"
                            width={14}
                            height={12}
                            onClick={(e) => handleDiamondnotes(e, diamond)}
                          />
                        </div>
                      </MotTableRowCell>
                      <MotTableRowCell>
                        <div className="flex flex-row gap-x-2 justify-center items-center">
                          <Link
                            href={`${links.VIEW_PRODUCT}?id=${diamond._id}`}
                            target="_blank"
                            prefetch={false}
                          >
                            <Image
                              src={viewProductIcon}
                              alt="view product icon"
                              width={16}
                              height={14}
                              className="mx-auto"
                            />
                          </Link>
                          <Link
                            href={diamond.videoLink ? diamond.videoLink : "-"}
                            aria-disabled={!diamond.videoLink}
                            target="_blank"
                          >
                            <button
                              disabled={!diamond.videoLink}
                              onClick={() => {
                                if (!diamond.videoLink) {
                                  return;
                                }
                              }}
                            >
                              <Image
                                src={
                                  diamond.videoLink
                                    ? viewVideoIcon
                                    : viewVideoDisabledIcon
                                }
                                alt="view video icon"
                                width={16}
                                height={14}
                                className="mx-auto"
                              />
                            </button>
                          </Link>
                        </div>
                      </MotTableRowCell>
                      <MotTableRowCell styles="uppercase">
                        {diamond.lab ? diamond.lab : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="capitalize">
                        {diamond.shape ? diamond.shape : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="uppercase">
                        {diamond.diamondType === EDiamondType.LAB_GROWN_DIAMONDS
                          ? diamond.type
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.caratWeight && diamond.caratWeight > 0) ||
                        diamond.caratWeight === 0
                          ? diamond.caratWeight.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="uppercase">
                        {diamond.color
                          ? diamond.color
                          : diamond.fancyColor
                          ? diamond.fancyColor
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="uppercase">
                        {diamond.clarity ? diamond.clarity : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="uppercase">
                        {diamond.cut && diamond.cut.toLowerCase() !== "n/a"
                          ? diamond.cut
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="uppercase">
                        {diamond.polish ? diamond.polish : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="uppercase">
                        {diamond.symmetry ? diamond.symmetry : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="capitalize">
                        {diamond.florescence ? diamond.florescence : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.rap && diamond.rap > 0) || diamond.rap === 0
                          ? diamond.rap.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.ourDiscount && diamond.ourDiscount < 0) ||
                        diamond.ourDiscount === 0
                          ? diamond.ourDiscount.toFixed(4)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.pricePerCarat && diamond.pricePerCarat > 0) ||
                        diamond.pricePerCarat === 0
                          ? diamond.pricePerCarat.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.ourPrice && diamond.ourPrice > 0) ||
                        diamond.ourPrice === 0
                          ? diamond.ourPrice.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="capitalize">
                        {diamond.country ? diamond.country : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {diamond.measurement ? diamond.measurement : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.tablePercentage &&
                          diamond.tablePercentage > 0) ||
                        diamond.tablePercentage === 0
                          ? diamond.tablePercentage.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.depthPercentage &&
                          diamond.depthPercentage > 0) ||
                        diamond.depthPercentage === 0
                          ? diamond.depthPercentage.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {diamond.heartsAndArrows === true
                          ? "YES"
                          : diamond.heartsAndArrows === null
                          ? "N/A"
                          : "NO"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {diamond.inclusion ? diamond.inclusion : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="capitalize">
                        {diamond.shade ? diamond.shade : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="capitalize">
                        {diamond.milky ? diamond.milky : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {diamond.luster ? diamond.luster : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="uppercase">
                        {getEyeCleanValue(diamond?.eyeClean)}
                      </MotTableRowCell>
                      <MotTableRowCell styles="px-2">
                        {(diamond.ratio && diamond.ratio > 0) ||
                        diamond.ratio === 0
                          ? diamond.ratio.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.crownAngle && diamond.crownAngle > 0) ||
                        diamond.crownAngle === 0
                          ? diamond.crownAngle.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.crownHeight && diamond.crownHeight > 0) ||
                        diamond.crownHeight === 0
                          ? diamond.crownHeight.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.pavilionAngle && diamond.pavilionAngle > 0) ||
                        diamond.pavilionAngle === 0
                          ? diamond.pavilionAngle.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {(diamond.pavilionHeight &&
                          diamond.pavilionHeight > 0) ||
                        diamond.pavilionHeight === 0
                          ? diamond.pavilionHeight.toFixed(2)
                          : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="capitalize">
                        {diamond.culetSize ? diamond.culetSize : "-"}
                      </MotTableRowCell>
                      <MotTableRowCell styles="capitalize">
                        {diamond.keyToSymbol !== null ? (
                          <Tooltip
                            content={
                              Array.isArray(diamond.keyToSymbol)
                                ? diamond.keyToSymbol.join(", ")
                                : diamond.keyToSymbol || ""
                            }
                            placement="bottom"
                            className="text-primary-text-color text-sm bg-white shadow-md w-[18.75rem] font-roboto text-center capitalize"
                          >
                            <span className="font-text-medium text-primary-text-color">
                              {Array.isArray(diamond.keyToSymbol)
                                ? diamond.keyToSymbol.join(", ").length > 10
                                  ? diamond.keyToSymbol
                                      .join(", ")
                                      .slice(0, 10) + "..."
                                  : diamond.keyToSymbol.join(", ")
                                : diamond.keyToSymbol.length > 10
                                ? diamond.keyToSymbol.slice(0, 10) + "..."
                                : diamond.keyToSymbol}
                            </span>
                          </Tooltip>
                        ) : (
                          "N/A"
                        )}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {diamond.motibaGemsComment
                          ? diamond.motibaGemsComment
                          : "-"}
                      </MotTableRowCell>
                    </MotTableRow>
                  );
                })}
              </MotTableBody>
            ) : null}
          </MotTable>
        </>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-[90dvh]">
          <Spinner />
        </div>
      ) : diamonds.length === 0 ? (
        <div className="grid place-content-center gap-5 h-[90dvh]">
          <Image src={dataNotFoundImage} alt="data not found" />
          <p className="font-poppins text-3xl text-tertiary text-center font-medium">
            DATA NOT FOUND
          </p>
        </div>
      ) : null}
    </MotTableWrapper>
  );
};

export default SearchResult;
