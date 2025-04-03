import React, { useEffect, useState } from "react";
import CancelIcon from "@/public/assets/admin-dashboard/ic-cancel.svg";
import PendingIcon from "@/public/assets/admin-dashboard/ic-pending.svg";
import ConfirmIcon from "@/public/assets/admin-dashboard/ic-confirm.svg";
import PartiallyConfirm from "@/public/assets/admin-dashboard/ic-partially-confirm.svg";
import CancelledIcon from "@/public/assets/admin-dashboard/ic-cancelled.svg";
import Image from "next/image";
import MotTable from "../app/(customer)/ui/MotTable";
import MotTableHead from "../app/(customer)/ui/MotTableHead";
import MotTableHeadCell from "../app/(customer)/ui/MotTableHeadCell";
import MotTableBody from "../app/(customer)/ui/MotTableBody";
import MotTableRow from "../app/(customer)/ui/MotTableRow";
import {
  MotTableDiamondConfirmationHeaders,
  MotTableHistoryHeaders,
} from "@/utils/MotTableConstant";
import MotTableRowCell from "@/app/(customer)/ui/MotTableRowCell";
import { toast } from "react-toastify";

function DiamondConfirmationDialog({
  hideDiamondConfirmModal = () => {},
  tableType,
  diamondData,
  onConfirmationDiamond,
}: {
  hideDiamondConfirmModal: () => void;
  tableType: string;
  diamondData: Array<any>;
  onConfirmationDiamond: (data: any[]) => void;
}) {
  const [selectedRow, setSelectedRow] = useState<any>([]);

  const handleAllRowOnClick = () => {
    const allRows = diamondData.map((item: any) => item._id);
    setSelectedRow(allRows);
    if (selectedRow.length === diamondData.length) {
      setSelectedRow([]);
    }
  };

  useEffect(() => {
    if (diamondData.length > 0) {
      const newarray: any = diamondData
        .filter((diamond: any) => diamond.confirmationStatus === "confirm")
        .map((obj: any) => obj._id);
      setSelectedRow(newarray);
    }
  }, [diamondData]);

  const handleSingleRow = (clickedRowId: number) => {
    if (selectedRow.includes(clickedRowId)) {
      const fileteredArray = selectedRow.filter(
        (rowId: any) => rowId != clickedRowId
      );
      setSelectedRow(fileteredArray);
    } else {
      const newArray = [...selectedRow];
      newArray.push(clickedRowId);
      setSelectedRow(newArray);
    }
  };

  const onConfirmDiamonds = () => {
    if (selectedRow.length === 0) {
      toast.error("Please Select Diamond");
    } else if (selectedRow.length === diamondData.length) {
      toast.error("You can't select all Diamonds");
    } else {
      const updatedFilterData = diamondData.map((diamond: any) => {
        const isConfirmed = selectedRow.includes(diamond._id);
        return {
          itemId: diamond._id,
          isConfirmed: isConfirmed,
        };
      });
      onConfirmationDiamond(updatedFilterData);
      hideDiamondConfirmModal();
    }
  };

  return (
    <div>
      <div className="relative w-full max-w-[19.3rem] md:max-w-3xl mx-auto bg-white rounded-[11px] shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 justify-center mt-[0.5rem] p-4">
          <p className="hidden md:block"></p>
          <p className="text-tertiary text-xl font-poppins font-semibold text-center ">
            DIAMOND CONFIRMATION
          </p>
          <div className="flex justify-end">
            <Image
              src={CancelIcon}
              width={20}
              height={20}
              className="cursor-pointer"
              alt="image"
              onClick={hideDiamondConfirmModal}
            />
          </div>
        </div>
        <hr className="border-primary border-opacity-[50%]"></hr>
        <div className="overflow-y-auto w-full h-[40dvh]">
          <div className="mx-[2rem] my-[1rem]">
            <p className="text-base text-[#000000] text-opacity-[70%]">
              Select the diamonds to confirm for changing order status
            </p>
          </div>
          <div className="rounded-md bg-white pb-4 overflow-x-scroll mx-[1.5rem]">
            <MotTable>
              <MotTableHead>
                <MotTableHeadCell styles="!w-[46px]">
                  <input
                    type="checkbox"
                    className="accent-tertiary w-[16px] h-[14px] "
                    onClick={handleAllRowOnClick}
                    checked={
                      diamondData.length === selectedRow.length ? true : false
                    }
                  />
                </MotTableHeadCell>
                {MotTableDiamondConfirmationHeaders.map(
                  (single: any, index: any) => {
                    return (
                      <MotTableHeadCell
                        key={`Mot-Diamond-headers-${index}`}
                        styles={single?.customStyle || ""}
                      >
                        {single.headerName}
                      </MotTableHeadCell>
                    );
                  }
                )}
              </MotTableHead>
              <MotTableBody>
                {diamondData.map((diamond: any) => {
                  return (
                    <MotTableRow
                      key={diamond._id}
                      isSelected={selectedRow.includes(diamond._id)}
                    >
                      <MotTableRowCell>
                        <input
                          type="checkbox"
                          className="accent-tertiary  w-[16px] h-[14px] rounded-[4px] "
                          checked={selectedRow.includes(diamond._id)}
                          onClick={() => handleSingleRow(diamond._id)}
                        />
                      </MotTableRowCell>
                      <MotTableRowCell>
                        <div className="capitalize">{diamond.status}</div>
                      </MotTableRowCell>
                      <MotTableRowCell>{diamond.stoneNo}</MotTableRowCell>
                      <MotTableRowCell>
                        <div className="uppercase">{diamond.lab}</div>
                      </MotTableRowCell>
                      <MotTableRowCell>
                        <div className="capitalize">{diamond.shape}</div>
                      </MotTableRowCell>
                      <MotTableRowCell>
                        {diamond.caratWeight.toFixed(2)}
                      </MotTableRowCell>
                      <MotTableRowCell>
                        <div className="uppercase">
                          {diamond.color
                            ? diamond.color
                            : diamond.fancyColor
                            ? diamond.fancyColor
                            : "-"}
                        </div>
                      </MotTableRowCell>
                      <MotTableRowCell>
                        <div className="uppercase">{diamond.clarity}</div>
                      </MotTableRowCell>
                    </MotTableRow>
                  );
                })}
              </MotTableBody>
            </MotTable>
          </div>
          <div className="flex justify-end mx-[2rem] pt-[2rem] pb-[1.5rem]">
            <button
              className="rounded-md font-poppins font-semibold text-sm leading-6 uppercase bg-tertiary text-white py-[10px] px-[12px] max-[480px]:ml-4 max-[480px]:mb-4 cursor-pointer"
              onClick={onConfirmDiamonds}
            >
              confirm diamonds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiamondConfirmationDialog;
