import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { links } from "@/utils/links";
import RightArrowIcon from "@/public/assets/customer-dashboard/ic-white-right-arrow.svg";

function DiamondsGridView({
  diamond,
  isChecked,
  onSelect,
}: {
  diamond: any;
  isChecked: any;
  onSelect: any;
}) {
  const [isDiamondLoadError, setIsDiamondLoadError] = useState(false);
  return (
    <div>
      <div key={diamond._id}>
        <div className="rounded-[10px] border-[1px] w-full">
          <div className="relative">
            <div className="imageContainer relative aspect-square h-auto">
              {diamond.imageLink && !isDiamondLoadError ? (
                <Image
                  src={diamond.imageLink}
                  alt="image"
                  className="image rounded-[10px] object-contain aspect-square "
                  layout="fill"
                  onError={() => setIsDiamondLoadError(true)}
                />
              ) : (
                <div className="bg-gray-400 rounded-lg h-full flex justify-center items-center">
                  <p className="text-white uppercase">Image not found</p>
                </div>
              )}
              <input
                type="checkbox"
                className="accent-tertiary w-4 h-4 rounded-[4px] cursor-pointer absolute top-2 right-2"
                checked={isChecked}
                onChange={(e) => onSelect(e, diamond)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3  place-items-start py-2 px-[15px]">
            <p
              className="text-sm text-tertiary font-normal text-center flex flex-col 
             items-start"
            >
              <span className="grid_label">Stone ID</span>
              {diamond.stoneNo ? diamond.stoneNo : "-"}
            </p>
            <p
              className="text-sm font-normal text-center mx-4  capitalize flex flex-col 
             items-start"
            >
              <span className="grid_label">Shape</span>
              {diamond.shape ? diamond.shape : "-"}
            </p>
            <div
              className="flex flex-col 
             items-start"
            >
              <span className="grid_label">Weight</span>
              <p className="text-sm font-normal text-center">
                {(diamond.caratWeight && diamond.caratWeight > 0) ||
                diamond.caratWeight === 0
                  ? diamond.caratWeight
                  : "-"}{" "}
                CTS
              </p>
            </div>
          </div>
          <hr></hr>
          <div className="grid grid-cols-3 place-items-start py-2 px-[15px]">
            <p
              className="text-sm font-normal  uppercase flex flex-col 
             items-start"
            >
              <span className="grid_label">lab</span>

              {diamond.lab ? diamond.lab : "-"}
            </p>
            <p
              className="text-sm font-normal text-center mx-4 uppercase flex flex-col 
             items-start"
            >
              <span className="grid_label">Clarity</span>

              {diamond.clarity ? diamond.clarity : "-"}
            </p>
            <p
              className="text-sm font-normal text-center uppercase flex flex-col 
             items-start"
            >
              <span className="grid_label">color</span>

              {diamond.color
                ? diamond.color
                : diamond.fancyColor
                ? diamond.fancyColor
                : "-"}
            </p>
          </div>
          <hr></hr>
          <div className="grid grid-cols-3  place-items-start py-2 px-[15px]">
            <p
              className="text-sm font-normal text-center uppercase flex flex-col 
             items-start"
            >
              <span className="grid_label">polish</span>
              {diamond.polish ? diamond.polish : "-"}
            </p>
            <p
              className="text-sm font-normal text-center mx-4 uppercase flex flex-col 
             items-start"
            >
              <span className="grid_label">symmetry</span>
              {diamond.symmetry ? diamond.symmetry : "-"}
            </p>
            <p
              className="text-sm font-normal text-center uppercase flex flex-col 
             items-start"
            >
              <span className="grid_label">Cut</span>
              {diamond.cut && diamond.cut.toLowerCase() !== "n/a"
                ? diamond.cut
                : "-"}
            </p>
          </div>
          <hr></hr>
          <div className="grid grid-cols-3 place-items-start py-2 px-[15px]">
            <p
              className="text-sm font-normal text-center capitalize flex flex-col 
             items-start"
            >
              <span className="grid_label">Location</span>
              {diamond.country ? diamond.country : "-"}
            </p>
            <p
              className="text-sm font-normal text-center mx-4 flex flex-col 
             items-start"
            >
              <span className="grid_label">Discount%</span>
              {(diamond.ourDiscount && diamond.ourDiscount < 0) ||
              diamond.ourDiscount === 0
                ? diamond.ourDiscount.toFixed(4)
                : 0}
            </p>
            <p
              className="text-sm font-normal text-center uppercase flex flex-col 
             items-start"
            >
              <span className="grid_label">florescence</span>
              {diamond.florescence ? diamond.florescence : "-"}
            </p>
          </div>
          <hr></hr>
          <div className="grid grid-cols-3  place-items-start py-2 px-[15px]">
            <div
              className="flex flex-col 
             items-start"
            >
              <span className="grid_label">Price/Carat $</span>
              <p className="text-sm font-normal text-center">
                $
                {(diamond.pricePerCarat && diamond.pricePerCarat > 0) ||
                diamond.pricePerCarat === 0
                  ? diamond.pricePerCarat.toFixed(2)
                  : 0}
              </p>
            </div>
            <div
              className="flex flex-col mx-4
             items-start"
            >
              <span className="grid_label">Total amount</span>
              <p className="text-sm font-normal text-center">
                $
                {(diamond.ourPrice && diamond.ourPrice > 0) ||
                diamond.ourPrice === 0
                  ? diamond.ourPrice.toFixed(2)
                  : 0}
              </p>
            </div>
            <div
              className="flex flex-col 
             items-start"
            >
              <span className="grid_label">Rap USD</span>
              <p className="text-sm font-normal text-center ">
                $
                {(diamond.rap && diamond.rap > 0) || diamond.rap === 0
                  ? diamond.rap.toFixed(2)
                  : 0}
              </p>
            </div>
          </div>
          <Link
            href={`${links.VIEW_PRODUCT}?id=${diamond._id}`}
            target="_blank"
            prefetch={false}
          >
            <div className="bg-tertiary flex justify-center items-center rounded-b-[10px]">
              <p className="uppercase py-2 text-secondary text-sm">
                show details
              </p>
              <Image
                src={RightArrowIcon}
                width={15}
                height={15}
                alt="image"
                className="ml-[0.5rem]"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DiamondsGridView;
