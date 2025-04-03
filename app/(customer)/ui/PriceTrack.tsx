"use client";
import React, { useState } from "react";
import MotTable from "./MotTable";
import MotTableHead from "./MotTableHead";
import MotTableHeadCell from "./MotTableHeadCell";
import MotTableRow from "./MotTableRow";
import MotTableRowCell from "./MotTableRowCell";
import MotTableBody from "./MotTableBody";
import { MotTablePriceTrackHeaders } from "@/utils/MotTableConstant";
import Link from "next/link";
import Image from "next/image";
import viewProductIcon from "@/public/assets/images/ic-view-details.svg";
import viewVideoIcon from "@/public/assets/images/ic-video-blue.svg";
import viewVideoDisabledIcon from "@/public/assets/images/ic-video-grey.svg";
import note_icon from "@/public/assets/customer-dashboard/MotTableImages/noteicon.svg";
import Spinner from "@/components/Spinner";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import { links } from "@/utils/links";
import MotTableWrapper from "./MotTableWrapper";
import { EDiamondStatus } from "@/utils/content.util";
import { Tooltip } from "@material-tailwind/react";
import { getEyeCleanValue } from "@/utils/diamond.util";

interface PriceTrackProps {
  tableType: string;
  priceTrack: Array<any>;
  onSelectedRowChange?: (selectedRows: Array<any>, isChecked: boolean) => void;
  isLoading: boolean;
  handleSingleNote: Function;
}

const PriceTrackTable = ({
  handleSingleNote = () => {},
  isLoading = true,
  tableType,
  priceTrack = [],
  onSelectedRowChange = () => {},
}: PriceTrackProps) => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);

  const handleAllRowOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    let allSelectedIds = [...selectedRow];
    const currentPageDiamondIds = priceTrack.map(
      (diamond: any) => diamond.diamondSnapshot._id
    );

    allSelectedIds = allSelectedIds.filter(
      (id: any) => !currentPageDiamondIds.includes(id)
    );

    if (e.target.checked) {
      allSelectedIds.push(...currentPageDiamondIds);
    }

    setSelectedRow([...allSelectedIds]);
    onSelectedRowChange(priceTrack, e.target.checked);
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
        isLoading || !priceTrack.length
          ? "overflow-hidden"
          : "overflow-x-scroll"
      }`}
    >
      <MotTable>
        <MotTableHead>
          <MotTableHeadCell styles="!w-[46px] sticky left-0 z-[4] !border-r-0 !box_shadow">
            <input
              type="checkbox"
              className="accent-tertiary w-[16px] h-[14px] cursor-pointer"
              onChange={handleAllRowOnClick}
              checked={
                selectedRow.length &&
                priceTrack.every((diamond) =>
                  selectedRow.includes(diamond.diamondSnapshot._id)
                )
                  ? true
                  : false
              }
            />
          </MotTableHeadCell>
          {MotTablePriceTrackHeaders.map((single: any, index: any) => {
            if (single.tableType.includes(`${tableType}`)) {
              return (
                <MotTableHeadCell
                  key={`Mot-Price-Table-headers-${index}`}
                  styles={single?.customStyle || ""}
                >
                  {single.headerName}
                </MotTableHeadCell>
              );
            }
          })}
        </MotTableHead>
        <MotTableBody>
          {priceTrack.map((single: any, index: any) => {
            return (
              <MotTableRow
                key={`price-track-${index}`}
                isSelected={selectedRow.includes(single.diamondSnapshot._id)}
              >
                <MotTableRowCell
                  styles={`sticky left-0  !border-r-0 !box_shadow  ${
                    selectedRow.includes(single.diamondSnapshot._id)
                      ? "bg-[#CFDBEB]"
                      : "bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-tertiary  w-[16px] h-[14px] rounded-[4px] cursor-pointer"
                    checked={selectedRow.includes(single.diamondSnapshot._id)}
                    onChange={(e) => handleSingleRow(e, single)}
                  />
                </MotTableRowCell>

                <MotTableRowCell
                  styles={`capitalize ${
                    single.status === EDiamondStatus.AVAILABLE
                      ? "text-green_color"
                      : "text-red_color"
                  }`}
                >
                  {single?.status ? single?.status.replaceAll("_", " ") : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {single?.diamondSnapshot
                    ? single?.diamondSnapshot.stoneNo
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  <div className="flex flex-row items-center justify-center">
                    <div className="flex flex-row items-center justify-center cursor-pointer">
                      <Image
                        src={note_icon}
                        alt="note icon"
                        width={14}
                        height={12}
                        onClick={(e) => {
                          if (single.status === "sold") {
                            return;
                          }
                          handleDiamondnotes(e, {
                            ...single.diamond,
                            userNotes: single.diamondSnapshot.userNotes,
                          });
                        }}
                      />
                    </div>
                  </div>
                </MotTableRowCell>
                <MotTableRowCell>
                  <div className="flex flex-row gap-x-2 justify-center items-center">
                    <Link
                      href={`${links.VIEW_PRODUCT}?id=${
                        single.status === "sold"
                          ? single?.diamondSnapshot?._id
                          : single?.diamond
                          ? single?.diamond?._id
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
                        single?.diamondSnapshot?.videoLink
                          ? single?.diamondSnapshot.videoLink
                          : ""
                      }
                      aria-disabled={!single?.diamondSnapshot.videoLink}
                      target="_blank"
                    >
                      <button
                        disabled={!single?.diamondSnapshot.videoLink}
                        onClick={() => {
                          if (!single?.diamondSnapshot.videoLink) {
                            return;
                          }
                        }}
                      >
                        <Image
                          src={
                            single?.diamondSnapshot.videoLink
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
                  {single?.diamondSnapshot?.lab
                    ? single?.diamondSnapshot.lab
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {single?.diamondSnapshot?.shape
                    ? single?.diamondSnapshot.shape
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {single?.diamondSnapshot?.type
                    ? single?.diamondSnapshot.type
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.caratWeight &&
                    single?.diamondSnapshot?.caratWeight > 0) ||
                  single?.diamondSnapshot?.caratWeight === 0
                    ? single?.diamondSnapshot.caratWeight.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {single?.diamondSnapshot?.color
                    ? single.diamondSnapshot.color
                    : single?.diamondSnapshot?.fancyColor
                    ? single.diamondSnapshot.fancyColor
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {single?.diamondSnapshot?.clarity
                    ? single?.diamondSnapshot.clarity
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {single?.diamondSnapshot?.cut &&
                  single.diamondSnapshot.cut.toLowerCase() !== "n/a"
                    ? single.diamondSnapshot.cut
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {single?.diamondSnapshot?.polish
                    ? single?.diamondSnapshot.polish
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {single?.diamondSnapshot?.symmetry
                    ? single?.diamondSnapshot.symmetry
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {single?.diamondSnapshot?.florescence
                    ? single?.diamondSnapshot.florescence
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.rap &&
                    single?.diamondSnapshot?.rap > 0) ||
                  single?.diamondSnapshot?.rap === 0
                    ? single?.diamondSnapshot?.rap?.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.ourDiscount &&
                    single.diamondSnapshot.ourDiscount < 0) ||
                  single.diamondSnapshot.ourDiscount === 0
                    ? single?.diamondSnapshot?.ourDiscount?.toFixed(4)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.pricePerCarat &&
                    single.diamondSnapshot.pricePerCarat > 0) ||
                  single.diamondSnapshot.pricePerCarat === 0
                    ? single?.diamondSnapshot?.pricePerCarat?.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.ourPrice &&
                    single.diamondSnapshot.ourPrice > 0) ||
                  single.diamondSnapshot.ourPrice === 0
                    ? single?.diamondSnapshot?.ourPrice?.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamond?.rap && single.diamond.rap > 0) ||
                  single?.diamond?.rap === 0
                    ? single?.diamond?.rap?.toFixed(2)
                    : "-"}
                </MotTableRowCell>

                <MotTableRowCell>
                  {(single?.diamond?.ourDiscount &&
                    single.diamond.ourDiscount < 0) ||
                  single?.diamond?.ourDiscount === 0
                    ? single?.diamond?.ourDiscount?.toFixed(4)
                    : "-"}
                </MotTableRowCell>

                <MotTableRowCell>
                  {(single?.diamond?.pricePerCarat &&
                    single.diamond.pricePerCarat > 0) ||
                  single?.diamond?.pricePerCarat === 0
                    ? single?.diamond?.pricePerCarat?.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamond?.ourPrice && single.diamond.ourPrice > 0) ||
                  single?.diamond?.ourPrice === 0
                    ? single?.diamond?.ourPrice?.toFixed(2)
                    : "-"}
                </MotTableRowCell>

                <MotTableRowCell styles="capitalize">
                  {single?.diamondSnapshot?.country
                    ? single?.diamondSnapshot.country
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {single?.diamondSnapshot?.measurement
                    ? single?.diamondSnapshot.measurement
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.tablePercentage &&
                    single.diamondSnapshot.tablePercentage > 0) ||
                  single.diamondSnapshot.tablePercentage === 0
                    ? single?.diamondSnapshot.tablePercentage.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.depthPercentage &&
                    single.diamondSnapshot.depthPercentage > 0) ||
                  single.diamondSnapshot.depthPercentage === 0
                    ? single?.diamondSnapshot.depthPercentage.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {single?.diamondSnapshot?.heartsAndArrows === true
                    ? "YES"
                    : single?.diamondSnapshot?.heartsAndArrows === null
                    ? "N/A"
                    : "NO"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {single?.diamondSnapshot?.inclusion
                    ? single?.diamondSnapshot.inclusion
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {single?.diamondSnapshot?.shade
                    ? single?.diamondSnapshot.shade
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {single?.diamondSnapshot?.milky
                    ? single?.diamondSnapshot.milky
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {single?.diamondSnapshot?.luster
                    ? single?.diamondSnapshot.luster
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="uppercase">
                  {getEyeCleanValue(single?.diamondSnapshot?.eyeClean)}
                </MotTableRowCell>
                <MotTableRowCell styles="px-2">
                  {(single?.diamondSnapshot?.ratio &&
                    single.diamondSnapshot.ratio > 0) ||
                  single.diamondSnapshot.ratio === 0
                    ? single?.diamondSnapshot.ratio.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.crownAngle &&
                    single.diamondSnapshot.crownAngle > 0) ||
                  single.diamondSnapshot.crownAngle === 0
                    ? single?.diamondSnapshot.crownAngle.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.crownHeight &&
                    single.diamondSnapshot.crownHeight > 0) ||
                  single.diamondSnapshot.crownHeight === 0
                    ? single?.diamondSnapshot.crownHeight.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.pavilionAngle &&
                    single.diamondSnapshot.pavilionAngle > 0) ||
                  single.diamondSnapshot.pavilionAngle === 0
                    ? single?.diamondSnapshot.pavilionAngle.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {(single?.diamondSnapshot?.pavilionHeight &&
                    single.diamondSnapshot.pavilionHeight > 0) ||
                  single.diamondSnapshot.pavilionHeight === 0
                    ? single?.diamondSnapshot.pavilionHeight.toFixed(2)
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {single?.diamondSnapshot?.culetSize
                    ? single?.diamondSnapshot.culetSize
                    : "-"}
                </MotTableRowCell>
                <MotTableRowCell styles="capitalize">
                  {single?.diamondSnapshot?.keyToSymbol !== null ? (
                    <Tooltip
                      content={
                        Array.isArray(single?.diamondSnapshot?.keyToSymbol)
                          ? single?.diamondSnapshot?.keyToSymbol.join(", ")
                          : single?.diamondSnapshot?.keyToSymbol || ""
                      }
                      placement="bottom"
                      className="text-primary-text-color text-sm bg-white shadow-md w-[18.75rem] font-roboto text-center capitalize"
                    >
                      <span className="font-text-medium text-primary-text-color">
                        {Array.isArray(single?.diamondSnapshot?.keyToSymbol)
                          ? single?.diamondSnapshot?.keyToSymbol.join(", ")
                              .length > 10
                            ? single?.diamondSnapshot?.keyToSymbol
                                .join(", ")
                                .slice(0, 10) + "..."
                            : single?.diamondSnapshot?.keyToSymbol.join(", ")
                          : single?.diamondSnapshot?.keyToSymbol.length > 10
                          ? single?.diamondSnapshot?.keyToSymbol.slice(0, 10) +
                            "..."
                          : single?.diamondSnapshot?.keyToSymbol}
                      </span>
                    </Tooltip>
                  ) : (
                    "N/A"
                  )}
                </MotTableRowCell>
                <MotTableRowCell>
                  {single?.diamondSnapshot?.motibaGemsComment
                    ? single?.diamondSnapshot.motibaGemsComment
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
      ) : priceTrack.length === 0 ? (
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

export default PriceTrackTable;
