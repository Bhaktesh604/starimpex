"use client";
import React, { useState } from "react";
import MotTableRowCell from "./MotTableRowCell";
import Image from "next/image";
import Link from "next/link";
import MotTable from "./MotTable";
import MotTableHead from "./MotTableHead";
import MotTableHeadCell from "./MotTableHeadCell";
import { MotTableHistoryHeaders } from "@/utils/MotTableConstant";
import MotTableBody from "./MotTableBody";
import MotTableRow from "./MotTableRow";
import orderProductIcon from "@/public/assets/images/ic-view-details.svg";
import { format } from "date-fns";
import { links } from "@/utils/links";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import Spinner from "@/components/Spinner";
import MotTableWrapper from "./MotTableWrapper";
import { EOrderStatus } from "@/utils/content.util";
interface HistoryProps {
  onSelectedRowChange?: (selectedRows: Array<any>, isChecked: boolean) => void;
  tableType: string;
  orderData: Array<any>;
  isLoading: boolean;
}

const History = ({
  tableType,
  onSelectedRowChange = () => {},
  orderData,
  isLoading = true,
}: HistoryProps) => {
  const [selectedRow, setSelectedRow] = useState<number[]>([]);

  const handleAllRowOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    let allRows = [...selectedRow];
    const currentPageOrderIds = orderData.map((order: any) => order._id);

    allRows = allRows.filter((id: any) => !currentPageOrderIds.includes(id));

    if (e.target.checked) {
      allRows.push(...currentPageOrderIds);
    }

    setSelectedRow(allRows);
    onSelectedRowChange(orderData, e.target.checked);
  };

  const handleSingleRow = (
    e: React.ChangeEvent<HTMLInputElement>,
    clickedRowId: any,
    item: any
  ) => {
    if (selectedRow.includes(clickedRowId)) {
      const fileteredArray = selectedRow.filter(
        (rowId) => rowId != clickedRowId
      );
      setSelectedRow(fileteredArray);
    } else {
      const newArray = [...selectedRow];
      newArray.push(clickedRowId);
      setSelectedRow(newArray);
    }

    onSelectedRowChange([item], e.target.checked);
  };

  return (
    <MotTableWrapper
      styles={`${
        isLoading || !orderData.length ? "overflow-hidden" : "overflow-x-auto"
      }`}
    >
      <MotTable>
        <MotTableHead>
          <MotTableHeadCell styles="!w-[46px] sticky left-0">
            <input
              type="checkbox"
              className="accent-tertiary w-[16px] h-[14px] cursor-pointer"
              onChange={handleAllRowOnClick}
              checked={
                selectedRow.length &&
                orderData.every((order) => selectedRow.includes(order._id))
                  ? true
                  : false
              }
            />
          </MotTableHeadCell>
          {MotTableHistoryHeaders.map((single: any, index: any) => {
            if (single.tableType.includes(`${tableType}`)) {
              return (
                <MotTableHeadCell
                  key={`Mot-History-headers-${index}`}
                  styles={single?.customStyle || ""}
                >
                  {single.headerName}
                </MotTableHeadCell>
              );
            }
          })}
        </MotTableHead>
        <MotTableBody>
          {orderData.map((order: any) => {
            return (
              <MotTableRow
                key={order._id}
                isSelected={selectedRow.includes(order._id)}
              >
                <MotTableRowCell
                  styles={`sticky left-0  !border-r-0 !box_shadow  ${
                    selectedRow.includes(order._id)
                      ? "bg-[#CFDBEB]"
                      : "bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-tertiary  w-[16px] h-[14px] rounded-[4px] cursor-pointer"
                    checked={selectedRow.includes(order._id)}
                    onClick={(e: any) => handleSingleRow(e, order._id, order)}
                  />
                </MotTableRowCell>
                <MotTableRowCell>
                  <div className="flex flex-row gap-x-2 justify-center items-center">
                    <Link
                      href={`${links.ORDER_DETAIL}?id=${order._id}`}
                      target="_blank"
                    >
                      <Image
                        src={orderProductIcon}
                        alt="order product icon"
                        width={16}
                        height={14}
                        className="mx-auto"
                      />
                    </Link>
                  </div>
                </MotTableRowCell>
                <MotTableRowCell>{order.orderNumber}</MotTableRowCell>
                <MotTableRowCell>
                  {format(order.orderDate, "dd/MM/yyyy")}
                </MotTableRowCell>
                <MotTableRowCell>{order.totalStones}</MotTableRowCell>
                <MotTableRowCell>
                  {order.totalCarats ? order.totalCarats.toFixed(2) : "0.00"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {order.grossAmount ? order.grossAmount.toFixed(2) : "0.00"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {order.shippingCharge
                    ? order.shippingCharge.toFixed(2)
                    : "0.00"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {order.totalAdditionalCharges
                    ? order.totalAdditionalCharges.toFixed(2)
                    : "0.00"}
                </MotTableRowCell>
                <MotTableRowCell>
                  {order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                </MotTableRowCell>
                <MotTableRowCell
                  styles={`capitalize ${
                    order.status === EOrderStatus.PENDING
                      ? "  text-gray_color"
                      : order.status === EOrderStatus.CANCELED
                      ? "text-red_color"
                      : order.status === EOrderStatus.CONFIRM
                      ? " text-green_color"
                      : "text-yellow_color"
                  }`}
                >
                  {order.status.replaceAll("_", " ")}
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
      ) : orderData.length === 0 ? (
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

export default History;
