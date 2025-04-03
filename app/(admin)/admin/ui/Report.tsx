"use client";
import Image from "next/image";
import React, { useState } from "react";
import close_icon from "@/public/assets/images/ic-cancel.svg";
import InputComponent from "@/components/InputComponent";
import MotButtonComponent from "./MotButtonComponent";
import { REQUIRED_ERROR } from "@/utils/validationError";
import { exportReportToExcel } from "../api/report.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { EReportTypes } from "@/utils/content.util";
import { toast } from "react-toastify";

interface ReportProps {
  handleCloseReport: any;
}

const Report = ({ handleCloseReport }: ReportProps) => {
  const [reportType, setReportType] = useState("");
  const [reportTypeError, setReportTypeError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [fromDateError, setFromDateError] = useState("");
  const [toDate, setToDate] = useState("");
  const [toDateError, setToDateError] = useState("");

  const handleDownload = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!reportType) {
      setReportTypeError(REQUIRED_ERROR);
      return;
    } else {
      setReportTypeError("");
    }
    if (!fromDate) {
      setFromDateError(REQUIRED_ERROR);
      return;
    } else {
      setFromDateError("");
    }
    if (!toDate) {
      setToDateError(REQUIRED_ERROR);
      return;
    } else {
      setToDateError("");
    }

    try {
      const response: any = await exportReportToExcel(
        reportType,
        new Date(fromDate).toISOString(),
        new Date(toDate).toISOString()
      );

      if (response.status === ResponseCodes.SUCCESS) {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${reportType}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        return;
      }
    } catch (error) {
      toast.error("No records found, Cannot export");
    }
  };

  const handleInsideDropdown = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 bottom-0 right-0 left-0 h-dvh w-full z-50 bg-black/15 p-5 md:p-0  flex justify-center items-center"
      onClick={handleInsideDropdown}
    >
      <div className="bg-white max-w-[37.5rem] w-full rounded-lg md:mx-3 ">
        <div className="relative flex justify-center items-center py-3 border-b border-primary/50">
          <span className="font-semibold text-xl text-tertiary uppercase">
            REPORTS
          </span>
          <Image
            src={close_icon}
            alt=""
            width={35}
            height={35}
            className="absolute top-2 right-8 cursor-pointer"
            onClick={handleCloseReport}
          />
        </div>
        <form
          action=""
          className="py-5 px-8 flex flex-col  gap-4"
          onSubmit={handleDownload}
        >
          <div className="flex flex-col justify-start gap-1">
            <label htmlFor="Report" className="add-purchase-label">
              Type
            </label>
            <select
              id="select-report-type"
              className="rounded-lg bg-[#EDF0F5] py-2 px-3 outline-none"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="">Select report</option>
              <option value={EReportTypes.SALES}>Sales report</option>
              <option value={EReportTypes.PURCHASE}>Purchase report</option>
              <option value={EReportTypes.PROFIT}>Profit report</option>
            </select>
            <p className="text-red-500 ml-1 text-sm">{reportTypeError}</p>
          </div>
          <div className="flex flex-col justify-start gap-1">
            <label htmlFor="Report" className="add-purchase-label">
              Date
            </label>
            <div className="flex justify-start items-center max-sm:flex-col max-sm:items-start">
              <div className="relative max-sm:w-full max-sm:max-w-full">
                <InputComponent
                  type="date"
                  className="add-purchase-input "
                  placeholder="From"
                  name="fromReportDate"
                  value={fromDate}
                  handleChange={(e: any) => setFromDate(e.target.value)}
                  onclick={(e: any) => e.target.showPicker()}
                />
              </div>

              <label htmlFor="To" className="mr-1 ml-2">
                -
              </label>
              <div className="relative max-sm:w-full max-sm:max-w-full">
                <InputComponent
                  type="date"
                  className="add-purchase-input"
                  placeholder="To"
                  name="toReportDate"
                  value={toDate}
                  handleChange={(e: any) => setToDate(e.target.value)}
                  onclick={(e: any) => e.target.showPicker()}
                />
              </div>
            </div>
          </div>
          <p className="text-red-500 ml-1 text-xs">
            {fromDateError || toDateError}
          </p>
          <div className="flex justify-end items-center">
            <MotButtonComponent buttonText="DOWNLOAD" buttonType="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Report;
