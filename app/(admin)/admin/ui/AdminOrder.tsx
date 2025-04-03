import React from "react";

import { AdminOrderTableHeaders } from "@/utils/MotTableConstant";
import MotTable from "@/app/(customer)/ui/MotTable";
import MotTableHead from "@/app/(customer)/ui/MotTableHead";
import MotTableHeadCell from "@/app/(customer)/ui/MotTableHeadCell";
import MotTableBody from "@/app/(customer)/ui/MotTableBody";
import MotTableRow from "@/app/(customer)/ui/MotTableRow";
import MotTableRowCell from "@/app/(customer)/ui/MotTableRowCell";
import { EOrderStatus } from "@/utils/content.util";

interface AdminOrderProps {
  tableType: string;
  Stones: any;
}

const AdminOrder = ({ tableType, Stones }: AdminOrderProps) => {
  return (
    <div className="overflow-x-scroll mx-6">
      <MotTable>
        <MotTableHead>
          {AdminOrderTableHeaders.map((single: any, index: any) => {
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
          {Stones &&
            Stones.map((single: any, index: number) => {
              return (
                <MotTableRow key={single.id}>
                  <React.Fragment key={`Mot-Table-rows-${index}`}>
                    <MotTableRowCell>
                      <div
                        className={`capitalize ${
                          single.status === "sold"
                            ? "text-red_color"
                            : "text-green_color"
                        }`}
                      >
                        {single.status.replace(/_/g, " ")}
                      </div>
                    </MotTableRowCell>
                    <MotTableRowCell>
                      <div
                        className={`capitalize ${
                          single.confirmationStatus === EOrderStatus.PENDING
                            ? "  text-gray_color"
                            : single.confirmationStatus ===
                              EOrderStatus.CANCELED
                            ? "text-red_color"
                            : single.confirmationStatus === EOrderStatus.CONFIRM
                            ? " text-green_color"
                            : "text-yellow_color"
                        }`}
                      >
                        {single.confirmationStatus
                          ? single.confirmationStatus.replace(/_/g, " ")
                          : "-"}
                      </div>
                    </MotTableRowCell>
                    <MotTableRowCell>
                      {single.stoneNo ? single.stoneNo : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell>
                      <div className="uppercase">
                        {single.lab ? single.lab : "-"}
                      </div>
                    </MotTableRowCell>
                    <MotTableRowCell>
                      <div className="capitalize">
                        {single.shape ? single.shape : "-"}
                      </div>
                    </MotTableRowCell>
                    <MotTableRowCell>
                      {(single.caratWeight && single.caratWeight > 0) ||
                      single.caratWeight === 0
                        ? single.caratWeight.toFixed(2)
                        : "-"}
                    </MotTableRowCell>
                    <MotTableRowCell>
                      <div className="uppercase">
                        {single.color ? single.color : "-"}
                      </div>
                    </MotTableRowCell>
                    <MotTableRowCell>
                      <div className="uppercase">
                        {single.clarity ? single.clarity : "-"}
                      </div>
                    </MotTableRowCell>
                    <MotTableRowCell>
                      <div className="uppercase">
                        {single.cut && single.cut.toLowerCase() !== "n/a"
                          ? single.cut
                          : "-"}
                      </div>
                    </MotTableRowCell>
                    <MotTableRowCell>
                      <div className="uppercase">
                        {single.polish ? single.polish : "-"}
                      </div>
                    </MotTableRowCell>
                    <MotTableRowCell>
                      <div className="uppercase">
                        {single.symmetry ? single.symmetry : "-"}
                      </div>
                    </MotTableRowCell>
                    <MotTableRowCell>
                      <div className="capitalize">
                        {single.florescence ? single.florescence : "-"}
                      </div>
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
                    <MotTableRowCell>
                      <div className="capitalize">
                        {single.country ? single.country : "-"}
                      </div>
                    </MotTableRowCell>
                    <MotTableRowCell>
                      {single.measurement ? single.measurement : "-"}
                    </MotTableRowCell>
                  </React.Fragment>
                </MotTableRow>
              );
            })}
        </MotTableBody>
      </MotTable>
    </div>
  );
};

export default AdminOrder;
