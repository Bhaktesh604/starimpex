import React from "react";
import MotTable from "./MotTable";
import MotTableHead from "./MotTableHead";
import { CustomerOrderTableHeader } from "@/utils/MotTableConstant";
import MotTableHeadCell from "./MotTableHeadCell";
import MotTableBody from "./MotTableBody";
import MotTableRow from "./MotTableRow";
import MotTableRowCell from "./MotTableRowCell";
import Image from "next/image";
import Link from "next/link";
import { TETooltip } from "tw-elements-react";
import note_icon from "@/public/assets/customer-dashboard/MotTableImages/noteicon.svg";
import { links } from "@/utils/links";

import viewProductIcon from "@/public/assets/images/ic-view-details.svg";
import viewVideoIcon from "@/public/assets/images/ic-video-blue.svg";
import viewVideoDisabledIcon from "@/public/assets/images/ic-video-grey.svg";
import Spinner from "@/components/Spinner";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import MotTableWrapper from "./MotTableWrapper";
import { EDiamondStatus, EOrderStatus } from "@/utils/content.util";
import { Tooltip } from "@material-tailwind/react";
import { getEyeCleanValue } from "@/utils/diamond.util";

interface OrderDetailsProps {
  tableType: string;
  orderDiamonds: Array<any>[];
  isLoading: boolean;
}

const OrderDetail = ({
  tableType,
  orderDiamonds,
  isLoading = true,
}: OrderDetailsProps) => {
  return (
    <MotTableWrapper
      styles={`${
        isLoading || !orderDiamonds.length
          ? "overflow-hidden"
          : "overflow-x-scroll"
      }`}
    >
      <MotTable>
        <MotTableHead>
          {CustomerOrderTableHeader.map((single: any, index: any) => {
            if (single.tableType.includes(`${tableType}`)) {
              return (
                <MotTableHeadCell
                  key={`Mot-Order-headers-${index}`}
                  styles={single?.customStyle || ""}
                >
                  {single.headerName}
                </MotTableHeadCell>
              );
            }
          })}
        </MotTableHead>
        <MotTableBody>
          {orderDiamonds.map((single: any, index: number) => {
            return (
              <MotTableRow key={single._id}>
                <React.Fragment key={`Mot-Order-rows-${index}`}>
                  <MotTableRowCell
                    styles={`capitalize ${
                      single.status === EDiamondStatus.AVAILABLE
                        ? "text-green_color"
                        : "text-red_color"
                    }`}
                  >
                    {single.status}
                  </MotTableRowCell>
                  <MotTableRowCell>{single.stoneNo}</MotTableRowCell>
                  <MotTableRowCell>
                    <div className="flex flex-row items-center justify-center cursor-pointer">
                      <TETooltip
                        trigger="hover click"
                        title={single?.notes || "-"}
                      >
                        <Image
                          src={note_icon}
                          alt="note icon"
                          width={14}
                          height={12}
                        />
                      </TETooltip>
                    </div>
                  </MotTableRowCell>
                  <MotTableRowCell>
                    <div className="flex flex-row gap-x-2 justify-center items-center cursor-pointer">
                      <Link
                        href={`${links.VIEW_PRODUCT}?id=${single._id}`}
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
                        href={single.videoLink}
                        aria-disabled={!single.videoLink}
                        target="_blank"
                      >
                        <button
                          disabled={!single.videoLink}
                          onClick={() => {
                            if (!single.videoLink) {
                              return;
                            }
                          }}
                        >
                          <Image
                            src={
                              single.videoLink
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
                    {single.lab ? single.lab : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {single.shape ? single.shape : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="uppercase">
                    {single.type ? single.type : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.caratWeight && single.caratWeight > 0) ||
                    single.caratWeight === 0
                      ? single.caratWeight.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="uppercase">
                    {single.color ? single.color : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="uppercase">
                    {single.clarity ? single.clarity : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="uppercase">
                    {single.cut && single.cut.toLowerCase() !== "n/a"
                      ? single.cut
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="uppercase">
                    {single.polish ? single.polish : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="uppercase">
                    {single.symmetry ? single.symmetry : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {single.florescence ? single.florescence : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.rap && single.rap > 0) || single.rap === 0
                      ? single.rap.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.ourDiscount && single.ourDiscount < 0) ||
                    single.ourDiscount === 0
                      ? single.ourDiscount.toFixed(4)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.pricePerCarat && single.pricePerCarat > 0) ||
                    single.pricePerCarat === 0
                      ? single.pricePerCarat.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.ourPrice && single.ourPrice > 0) ||
                    single.ourPrice === 0
                      ? single.ourPrice.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {single.country}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.measurement ? single.measurement : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.tablePercentage && single.tablePercentage > 0) ||
                    single.tablePercentage === 0
                      ? single.tablePercentage.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.depthPercentage && single.depthPercentage > 0) ||
                    single.depthPercentage === 0
                      ? single.depthPercentage.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.heartsAndArrows === true
                      ? "YES"
                      : single.heartsAndArrows === null
                      ? "N/A"
                      : "NO"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.inclusion ? single.inclusion : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {single.shade ? single.shade : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {single.milky ? single.milky : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.luster ? single.luster : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="uppercase">
                    {getEyeCleanValue(single?.eyeClean)}
                  </MotTableRowCell>
                  <MotTableRowCell styles="px-2">
                    {(single.ratio && single.ratio > 0) || single.ratio === 0
                      ? single.ratio.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.crownAngle && single.crownAngle > 0) ||
                    single.crownAngle === 0
                      ? single.crownAngle.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.crownHeight && single.crownHeight > 0) ||
                    single.crownHeight === 0
                      ? single.crownHeight.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.pavilionAngle && single.pavilionAngle > 0) ||
                    single.pavilionAngle === 0
                      ? single.pavilionAngle.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {(single.pavilionHeight && single.pavilionHeight > 0) ||
                    single.pavilionHeight === 0
                      ? single.pavilionHeight.toFixed(2)
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {single.culetSize ? single.culetSize : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="capitalize">
                    {single.keyToSymbol !== null ? (
                      <Tooltip
                        content={
                          Array.isArray(single.keyToSymbol)
                            ? single.keyToSymbol.join(", ")
                            : single.keyToSymbol || ""
                        }
                        placement="bottom"
                        className="text-primary-text-color text-sm bg-white shadow-md w-[18.75rem] font-roboto text-center capitalize"
                      >
                        <span className="font-text-medium text-primary-text-color">
                          {Array.isArray(single.keyToSymbol)
                            ? single.keyToSymbol.join(", ").length > 10
                              ? single.keyToSymbol.join(", ").slice(0, 10) +
                                "..."
                              : single.keyToSymbol.join(", ")
                            : single.keyToSymbol.length > 10
                            ? single.keyToSymbol.slice(0, 10) + "..."
                            : single.keyToSymbol}
                        </span>
                      </Tooltip>
                    ) : (
                      "N/A"
                    )}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.motibaGemsComment ? single.motibaGemsComment : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell
                    styles={`capitalize ${
                      single.confirmationStatus === EOrderStatus.PENDING
                        ? "  text-gray_color"
                        : single.confirmationStatus === EOrderStatus.CANCELED
                        ? "text-red_color"
                        : single.confirmationStatus === EOrderStatus.CONFIRM
                        ? " text-green_color"
                        : "text-yellow_color"
                    }`}
                  >
                    {single.confirmationStatus
                      ? single.confirmationStatus.replaceAll("_", " ")
                      : "-"}
                  </MotTableRowCell>
                </React.Fragment>
              </MotTableRow>
            );
          })}
        </MotTableBody>
      </MotTable>
      {isLoading ? (
        <div className="flex justify-center items-center h-[20dvh]">
          <Spinner />
        </div>
      ) : orderDiamonds.length === 0 ? (
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

export default OrderDetail;
