"use client";
import React, { useState } from "react";
import MotTable from "./MotTable";
import MotTableHead from "./MotTableHead";
import MotTableHeadCell from "./MotTableHeadCell";
import MotTableRow from "./MotTableRow";
import MotTableRowCell from "./MotTableRowCell";
import MotTableBody from "./MotTableBody";
import { MotTableCartHeaders } from "@/utils/MotTableConstant";
import Link from "next/link";
import Image from "next/image";
import note_icon from "@/public/assets/customer-dashboard/MotTableImages/noteicon.svg";
import { links } from "@/utils/links";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import Spinner from "@/components/Spinner";
import viewProductIcon from "@/public/assets/images/ic-view-details.svg";
import viewVideoIcon from "@/public/assets/images/ic-video-blue.svg";
import viewVideoDisabledIcon from "@/public/assets/images/ic-video-grey.svg";
import MotTableWrapper from "./MotTableWrapper";
import { EDiamondStatus } from "@/utils/content.util";
import { Tooltip } from "@material-tailwind/react";
import { getEyeCleanValue } from "@/utils/diamond.util";

interface CartProps {
  onSelectedRowChange?: (selectedRows: Array<any>, isChecked: boolean) => void;
  tableType: string;
  diamonds: Array<any>;
  handleSingleNote: Function;
  isLoading: boolean;
}

const CartTable = ({
  handleSingleNote = () => {},
  tableType,
  onSelectedRowChange = () => {},
  diamonds = [],
  isLoading = true,
}: CartProps) => {
  const [selectedRow, setSelectedRow] = useState<string[]>([]);

  const handleAllRowOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    let allSelectedIds = [...selectedRow];

    const currentPageDiamondIds = diamonds.map(
      (diamond: any) => diamond.diamondSnapshot._id
    );

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

    if (e.target.checked) {
      allSelectedIds.push(diamond.diamondSnapshot._id);
    } else {
      allSelectedIds = allSelectedIds.filter(
        (i) => i !== diamond.diamondSnapshot._id
      );
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
                  selectedRow.includes(diamond.diamondSnapshot._id)
                )
                  ? true
                  : false
              }
            />
          </MotTableHeadCell>
          {MotTableCartHeaders.map((single: any, index: any) => {
            if (single.tableType.includes(`${tableType}`)) {
              return (
                <MotTableHeadCell
                  key={`Mot-Table-headers-${index}`}
                  styles={single?.customStyle || ""}
                >
                  {single.headerName}
                </MotTableHeadCell>
              );
            }
          })}
        </MotTableHead>
        <MotTableBody>
          {diamonds.map((diamond: any) => {
            return (
              <MotTableRow
                key={diamond._id}
                isSelected={selectedRow.includes(diamond.diamondSnapshot._id)}
              >
                <MotTableRowCell
                  styles={`sticky left-0  !border-r-0 !box_shadow  ${
                    selectedRow.includes(diamond.diamondSnapshot._id)
                      ? "bg-[#CFDBEB]"
                      : "bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-tertiary  w-[16px] h-[14px] rounded-[4px] cursor-pointer"
                    checked={selectedRow.includes(diamond.diamondSnapshot._id)}
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
                  {diamond?.status ? diamond.status.replaceAll("_", " ") : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {diamond?.diamondSnapshot
                    ? diamond?.diamondSnapshot.stoneNo
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  <div className="flex flex-row items-center justify-center cursor-pointer">
                    <Image
                      src={note_icon}
                      alt="note icon"
                      width={14}
                      height={12}
                      onClick={(e) =>
                        handleDiamondnotes(e, diamond.diamondSnapshot)
                      }
                    />
                  </div>
                </MotTableRowCell>
                <MotTableRowCell>
                  <div className="flex flex-row gap-x-2 justify-center items-center">
                    <Link
                      href={`${links.VIEW_PRODUCT}?id=${
                        diamond?.diamondSnapshot?._id
                          ? diamond?.diamondSnapshot._id
                          : ""
                      }`}
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
                      href={
                        diamond?.diamondSnapshot?.videoLink
                          ? diamond.diamondSnapshot.videoLink
                          : ""
                      }
                      aria-disabled={!diamond.diamondSnapshot.videoLink}
                      target="_blank"
                    >
                      <button
                        disabled={!diamond.diamondSnapshot.videoLink}
                        onClick={() => {
                          if (!diamond.diamondSnapshot.videoLink) {
                            return;
                          }
                        }}
                      >
                        <Image
                          src={
                            diamond.diamondSnapshot.videoLink
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
                  {diamond?.diamondSnapshot?.lab
                    ? diamond.diamondSnapshot.lab
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {diamond?.diamondSnapshot?.shape
                    ? diamond.diamondSnapshot.shape
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {diamond?.diamondSnapshot?.type
                    ? diamond.diamondSnapshot.type
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.caratWeight &&
                    diamond?.diamondSnapshot?.caratWeight > 0) ||
                  diamond?.diamondSnapshot?.caratWeight === 0
                    ? diamond.diamondSnapshot.caratWeight.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {diamond?.diamondSnapshot?.color
                    ? diamond.diamondSnapshot.color
                    : diamond?.diamondSnapshot?.fancyColor
                    ? diamond.diamondSnapshot.fancyColor
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {diamond?.diamondSnapshot.clarity
                    ? diamond.diamondSnapshot.clarity
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {diamond?.diamondSnapshot?.cut &&
                  diamond.diamondSnapshot.cut.toLowerCase() !== "n/a"
                    ? diamond.diamondSnapshot.cut
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {diamond?.diamondSnapshot?.polish
                    ? diamond.diamondSnapshot.polish
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {diamond?.diamondSnapshot?.symmetry
                    ? diamond.diamondSnapshot.symmetry
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {diamond?.diamondSnapshot?.florescence
                    ? diamond.diamondSnapshot.florescence
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.rap &&
                    diamond?.diamondSnapshot?.rap > 0) ||
                  diamond?.diamondSnapshot?.rap === 0
                    ? diamond.diamondSnapshot.rap.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.ourDiscount &&
                    diamond?.diamondSnapshot?.ourDiscount < 0) ||
                  diamond?.diamondSnapshot?.ourDiscount === 0
                    ? diamond.diamondSnapshot.ourDiscount.toFixed(4)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.pricePerCarat &&
                    diamond?.diamondSnapshot?.pricePerCarat > 0) ||
                  diamond?.diamondSnapshot?.pricePerCarat === 0
                    ? diamond.diamondSnapshot.pricePerCarat.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.ourPrice &&
                    diamond?.diamondSnapshot?.ourPrice > 0) ||
                  diamond?.diamondSnapshot?.ourPrice === 0
                    ? diamond.diamondSnapshot.ourPrice.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {diamond?.diamondSnapshot?.country
                    ? diamond.diamondSnapshot.country
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {diamond?.diamondSnapshot?.measurement
                    ? diamond.diamondSnapshot.measurement
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.tablePercentage &&
                    diamond?.diamondSnapshot?.tablePercentage > 0) ||
                  diamond?.diamondSnapshot?.tablePercentage === 0
                    ? diamond.diamondSnapshot.tablePercentage.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.depthPercentage &&
                    diamond?.diamondSnapshot?.depthPercentage > 0) ||
                  diamond?.diamondSnapshot?.depthPercentage === 0
                    ? diamond.diamondSnapshot.depthPercentage.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {diamond.diamondSnapshot.heartsAndArrows === true
                    ? "YES"
                    : diamond.diamondSnapshot.heartsAndArrows === null
                    ? "N/A"
                    : "NO"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {diamond?.diamondSnapshot?.inclusion
                    ? diamond.diamondSnapshot.inclusion
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {diamond?.diamondSnapshot?.shade
                    ? diamond.diamondSnapshot.shade
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {diamond?.diamondSnapshot?.milky
                    ? diamond.diamondSnapshot.milky
                    : "-"}
                </MotTableRowCell>

                <MotTableRowCell>
                  {diamond?.diamondSnapshot?.luster
                    ? diamond.diamondSnapshot.luster
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {getEyeCleanValue(diamond?.diamondSnapshot?.eyeClean)}
                </MotTableRowCell>
                <MotTableRowCell styles="px-2">
                  {(diamond?.diamondSnapshot?.ratio &&
                    diamond?.diamondSnapshot?.ratio > 0) ||
                  diamond?.diamondSnapshot?.ratio === 0
                    ? diamond.diamondSnapshot.ratio.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.crownAngle &&
                    diamond?.diamondSnapshot?.crownAngle > 0) ||
                  diamond?.diamondSnapshot?.crownAngle === 0
                    ? diamond.diamondSnapshot.crownAngle.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.crownHeight &&
                    diamond?.diamondSnapshot?.crownHeight > 0) ||
                  diamond?.diamondSnapshot?.crownHeight === 0
                    ? diamond.diamondSnapshot.crownHeight.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.pavilionAngle &&
                    diamond?.diamondSnapshot?.pavilionAngle > 0) ||
                  diamond?.diamondSnapshot?.pavilionAngle === 0
                    ? diamond.diamondSnapshot.pavilionAngle.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(diamond?.diamondSnapshot?.pavilionHeight &&
                    diamond?.diamondSnapshot?.pavilionHeight > 0) ||
                  diamond?.diamondSnapshot?.pavilionHeight === 0
                    ? diamond.diamondSnapshot.pavilionHeight.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {diamond?.diamondSnapshot?.culetSize
                    ? diamond.diamondSnapshot.culetSize
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {diamond?.diamondSnapshot?.keyToSymbol !== null ? (
                    <Tooltip
                      content={
                        Array.isArray(diamond?.diamondSnapshot?.keyToSymbol)
                          ? diamond?.diamondSnapshot?.keyToSymbol.join(", ")
                          : diamond?.diamondSnapshot?.keyToSymbol || ""
                      }
                      placement="bottom"
                      className="text-primary-text-color text-sm bg-white shadow-md w-[18.75rem] font-roboto text-center capitalize"
                    >
                      <span className="font-text-medium text-primary-text-color">
                        {Array.isArray(diamond?.diamondSnapshot?.keyToSymbol)
                          ? diamond?.diamondSnapshot?.keyToSymbol.join(", ")
                              .length > 10
                            ? diamond?.diamondSnapshot?.keyToSymbol
                                .join(", ")
                                .slice(0, 10) + "..."
                            : diamond?.diamondSnapshot?.keyToSymbol.join(", ")
                          : diamond?.diamondSnapshot?.keyToSymbol.length > 10
                          ? diamond?.diamondSnapshot?.keyToSymbol.slice(0, 10) +
                            "..."
                          : diamond?.diamondSnapshot?.keyToSymbol}
                      </span>
                    </Tooltip>
                  ) : (
                    "N/A"
                  )}
                </MotTableRowCell>
                <MotTableRowCell>
                  {diamond?.diamondSnapshot?.motibaGemsComment
                    ? diamond.diamondSnapshot.motibaGemsComment
                    : "-"}
                </MotTableRowCell>
              </MotTableRow>
            );
          })}
        </MotTableBody>
      </MotTable>
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

export default CartTable;
