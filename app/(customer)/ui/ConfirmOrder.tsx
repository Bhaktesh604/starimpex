"use client";
import React, { useEffect, useState } from "react";
import MotBanner from "./MotBanner";
import Link from "next/link";
import { links } from "@/utils/links";
import CompleteOrder from "./CompleteOrder";
import { USER_KEY } from "@/utils/constants";

interface ConfirmOrderProps {
  handleOpenClose: Function;
  orderData: Array<Object>;
}

const ConfirmOrder = ({ handleOpenClose, orderData }: ConfirmOrderProps) => {
  const [totalStone, setTotalStone] = useState(0);
  const [totalCarat, setTotalCarat] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [pricePerCarat, setPricePerCarat] = useState(0);
  const [avgDiscountAmt, setAvgDiscountAmt] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [remark, setRemark] = useState("");
  const [orderRowId, setOrderRowId] = useState<Array<string>>([]);
  const [completeOrder, setCompleteOrder] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let carat = 0;
    let discount = 0;
    let pricePerCarat = 0;
    let totalAmount = 0;
    let avgRap = 0;
    let totalRap = 0;

    orderData.forEach((diamond: any) => {
      carat = carat + diamond.caratWeight;
      totalRap = totalRap + diamond.caratWeight * diamond.rap;
      totalAmount = totalAmount + diamond.ourPrice;
    });

    if (orderData.length) {
      avgRap = totalRap / carat;
      pricePerCarat = totalAmount / carat;
      discount = (pricePerCarat * 100) / avgRap - 100;
    }

    setTotalStone(orderData.length);
    setTotalCarat(carat);
    setPricePerCarat(pricePerCarat);
    setAvgDiscountAmt(discount);
    setTotalAmt(totalAmount);
  }, [orderData, orderData.length]);

  useEffect(() => {
    const user = localStorage.getItem(USER_KEY)
      ? JSON.parse(localStorage.getItem(USER_KEY) || "")
      : null;
    if (typeof user === "object") {
      setUserName(user?.fullName);
    }
  }, []);

  const handleDialogBox = () => {
    handleOpenClose(false);
  };

  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
    if (isChecked === false) {
      const ids = orderData.map((i: any) => i._id);

      setOrderRowId(ids);
      return setIsDisabled(false);
    } else {
      return setIsDisabled(true);
    }
  };

  const handleRemark = (e: any) => {
    const { value, name } = e.target;
    if (name === "remark") {
      setRemark(value);
    }
  };

  const handleCompleteOrder = () => {
    setCompleteOrder(true);
  };

  return (
    <div className="max-w-[852px] w-full bg-white rounded-xl mx-5 mt-[-150px]">
      <div className="pt-[20px] pl-[15px] pb-[18px] border-b-[0.7px] border-black/10">
        <h1 className="font-libre-barskerville font-bold text-xl leading-6">
          Confirm Order
        </h1>
      </div>
      <div className="py-5 px-5">
        <div className="leading-4 font-poppins text-sm flex flex-row justify-start items-center gap-x-2">
          <p className="font-normal">Dear</p>
          <span className="font-semibold">{userName}</span>
        </div>
        <div className="mt-2">
          <p className="leading-4 font-poppins text-sm font-normal">
            Your Order Summary is as follows:
          </p>
          <div className="flex flex-row justify-start items-center pt-4 pb-5 max-[768px]:flex-wrap max-[768px]:gap-y-2">
            <MotBanner
              bannerName="Total Stone"
              bannerValue={totalStone}
              className="mr-[0.5px]"
            />
            <MotBanner
              bannerName="Total Carat"
              bannerValue={totalCarat.toFixed(2)}
              className="mr-[0.5px]"
            />
            <MotBanner
              bannerName="Avg Discount"
              bannerValue={avgDiscountAmt.toFixed(4)}
              className="mr-[0.5px]"
            />
            <MotBanner
              bannerName="Price/Carat $"
              bannerValue={pricePerCarat.toFixed(2)}
              className="mr-[0.5px] max-w-[131px]"
            />
            <MotBanner
              bannerName="Total amount $"
              bannerValue={totalAmt.toFixed(2)}
              className="mr-[0.5px] max-w-[156px]"
            />
          </div>
        </div>
        <div className="font-poppins font-medium text-sm leading-5 flex flex-row  gap-x-2 max-[520px]:items-start">
          <input
            type="checkbox"
            className="max-[520px]:mt-1"
            checked={isChecked}
            onChange={handleCheckbox}
          />
          <span className="flex flex-row flex-wrap justify-start items-center">
            I have read and accept
            <Link
              href={links.PRIVACY_POLICY}
              target="_blank"
              className="underline flex flex-nowrap mx-1 text-tertiary capitalize"
            >
              privacy policy
            </Link>
            and
            <Link
              href={links.TERMS}
              target="_blank"
              className="underline mx-1 flex flex-nowrap text-tertiary capitalize"
            >
              terms & conditions.
            </Link>
          </span>
        </div>
        <div className="font-poppins font-medium text-sm leading-5 max-w-[366px] w-full flex flex-col justify-start items-start py-[10px]">
          <span>Remark</span>
          <input
            type="text"
            placeholder="Write..."
            value={remark}
            name="remark"
            className="border border-black/40 rounded-md placeholder:text-black/30 py-1 px-3 max-w-full w-full"
            onChange={handleRemark}
          />
        </div>
        <div className="flex flex-row justify-end pr-[200px] max-[480px]:pr-[0px] items-center gap-x-3">
          <button
            className="font-poppins uppercase font-medium text-base leading-6 rounded-xl py-2 px-4 border border-black"
            onClick={handleDialogBox}
          >
            Cancel
          </button>

          <button
            className={`font-poppins uppercase font-medium text-base leading-6 bg-tertiary text-white rounded-xl py-2 px-4 ${
              isDisabled === true ? "opacity-50" : ""
            }`}
            disabled={isDisabled}
            onClick={handleCompleteOrder}
          >
            Confirm
          </button>
        </div>
      </div>

      {completeOrder ? (
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/40 flex justify-center items-center mt-[-50px]">
          <CompleteOrder
            handleRemark={remark}
            handleCheck={isChecked}
            handleRow={orderRowId}
            handleOpenClose={setCompleteOrder}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ConfirmOrder;
