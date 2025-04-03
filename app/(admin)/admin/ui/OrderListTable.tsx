"use client";
import React, { useState } from "react";
import MotTable from "../ui/MotTable";
import MotTableBody from "../ui/MotTableBody";
import MotTableHead from "../ui/MotTableHead";
import MotTableHeadCell from "../ui/MotTableHeadCell";
import MotTableRow from "../ui/MotTableRow";
import MotTableRowCell from "../ui/MotTableRowCell";
import { AdminOrderListHeaders } from "@/utils/MotTableConstant";
import MotTableWrapper from "../ui/MotTableWrapper";
import { EOrderStatus } from "@/utils/content.util";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import ViewIcon from "@/public/assets/images/ic-eye.svg";
import { links } from "@/utils/links";
import edit_icon from "@/public/assets/admin-dashboard/ic_edit_purchase.svg";

interface OrderListTableProps {
  onSelectedRowChange?: (selectedRows: Array<any>, isChecked: boolean) => void;
  handleEditOrder: any;
  orderData: Array<any>;
  isLoading: boolean;
}

const OrderListTable = ({
  onSelectedRowChange = () => {},
  orderData,
  handleEditOrder,
  isLoading = true,
}: OrderListTableProps) => {
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
          <MotTableHeadCell styles="!w-[2.875rem] sticky left-0 z-[4] !border-r-0 !box_shadow">
            <input
              type="checkbox"
              className="accent-tertiary w-4 h-[0.875rem] cursor-pointer"
              onChange={handleAllRowOnClick}
              checked={
                selectedRow.length &&
                orderData.every((order) => selectedRow.includes(order._id))
                  ? true
                  : false
              }
            />
          </MotTableHeadCell>
          {AdminOrderListHeaders.map((single: any, index: any) => {
            return (
              <MotTableHeadCell
                key={`Admin-Order-Table-headers-${index}`}
                styles={single?.customStyle || ""}
              >
                {single.headerName}
              </MotTableHeadCell>
            );
          })}
        </MotTableHead>
        <MotTableBody>
          {orderData.map((single: any, index: any) => {
            return (
              <MotTableRow
                key={single._id}
                isSelected={selectedRow.includes(single._id)}
              >
                <React.Fragment key={`Admin-Order-Table-rows-${index}`}>
                  <MotTableRowCell
                    styles={`sticky left-0  !border-r-0 !box_shadow  ${
                      selectedRow.includes(single._id)
                        ? "bg-[#CFDBEB]"
                        : "bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-tertiary  w-4 h-[0.875rem] rounded-[0.25rem] cursor-pointer"
                      checked={selectedRow.includes(single._id)}
                      onClick={(e: any) =>
                        handleSingleRow(e, single._id, single)
                      }
                    />
                  </MotTableRowCell>
                  <MotTableRowCell>{single.orderNumber}</MotTableRowCell>
                  <MotTableRowCell>
                    {single.orderDate
                      ? moment(single.orderDate).format("DD-MM-YYYY")
                      : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.user ? single.user.companyName : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell styles="px-3">
                    {single.user ? single.user.email : "-"}
                    {single?.user?.email === null && "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.totalStones ? single.totalStones : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.totalCarats ? single.totalCarats.toFixed(2) : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.grossAmount ? single.grossAmount.toFixed(2) : "-"}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.shippingCharge
                      ? single.shippingCharge.toFixed(2)
                      : 0.0}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.totalAdditionalCharges
                      ? single.totalAdditionalCharges.toFixed(2)
                      : 0.0}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    {single.totalAmount ? single.totalAmount.toFixed(2) : 0.0}
                  </MotTableRowCell>
                  <MotTableRowCell>
                    <div
                      className={`capitalize ${
                        single?.status === EOrderStatus.PENDING
                          ? "  text-gray_color"
                          : single?.status === EOrderStatus.CANCELED
                          ? " text-red_color"
                          : single?.status === EOrderStatus.CONFIRM
                          ? " text-green_color"
                          : " text-yellow_color"
                      }`}
                    >
                      {single.status.replace(/_/g, " ")}
                    </div>
                  </MotTableRowCell>
                  <MotTableRowCell styles="flex justify-center item-center gap-2">
                    <Link
                      className="flex justify-center items-center cursor-pointer"
                      href={`${links.ORDER_LIST}/${single._id}`}
                      target="_blank"
                    >
                      <Image src={ViewIcon} alt="" width={15} height={15} />
                    </Link>
                    {single.isManualOrder && (
                      <Image
                        src={edit_icon}
                        alt=""
                        width={14}
                        height={14}
                        onClick={() => handleEditOrder(single)}
                      />
                    )}
                  </MotTableRowCell>
                </React.Fragment>
              </MotTableRow>
            );
          })}
        </MotTableBody>
      </MotTable>
    </MotTableWrapper>
  );
};

export default OrderListTable;
