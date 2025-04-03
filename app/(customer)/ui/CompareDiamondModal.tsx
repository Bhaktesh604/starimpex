"use client";
import React, { useState } from "react";
import CancelIcon from "../../../public/assets/images/ic-cancel.svg";
import Image from "next/image";
import viewProductIcon from "@/public/assets/images/ic-view-details.svg";
import viewVideoIcon from "@/public/assets/images/ic-video-blue.svg";
import viewVideoDisabledIcon from "@/public/assets/images/ic-video-grey.svg";

import Link from "next/link";
import { diamondCompareProperty } from "@/utils/diamondConstant";
import { links } from "@/utils/links";

function CompareDiamondModal({
  selectedDiamonds,
  hideCompareDiamondModal = () => {},
}: {
  selectedDiamonds: Array<any>;
  hideCompareDiamondModal: () => void;
}) {
  const [isFirstDiamondLoadError, setIsFirstDiamondLoadError] = useState(false);
  const [isSecondDiamondLoadError, setIsSecondDiamondLoadError] =
    useState(false);
  const [isThirdDiamondLoadError, setIsThirdDiamondLoadError] = useState(false);
  const [isFourthDiamondLoadError, setIsFourthDiamondLoadError] =
    useState(false);

  const gridStyle = ["", "", "grid-cols-3", "grid-cols-4", "grid-cols-5"];

  const gridColClass = gridStyle[selectedDiamonds.length];

  return (
    <div className="relative w-full max-w-3xl p-4 mx-auto bg-white rounded-md shadow-lg">
      <div>
        <div className="flex items-center justify-between mb-[0.5rem] ">
          <p className="font-semibold text-base">Compare Diamonds</p>
          <Image
            src={CancelIcon}
            width={30}
            height={30}
            className="cursor-pointer"
            alt="image"
            onClick={hideCompareDiamondModal}
          />
        </div>
        <hr></hr>
      </div>
      <div className="overflow-x-auto ">
        <div className=" overflow-auto max-w-4xl h-[30rem] px-2">
          <div className={`grid ${gridColClass} gap-3 mt-[1rem]`}>
            <div></div>
            {selectedDiamonds && selectedDiamonds.length > 0
              ? selectedDiamonds.map((diamond: any, index: number) => {
                  let showNotFound = false;
                  if (index === 0 && isFirstDiamondLoadError) {
                    showNotFound = true;
                  }
                  if (index === 1 && isSecondDiamondLoadError) {
                    showNotFound = true;
                  }
                  if (index === 2 && isThirdDiamondLoadError) {
                    showNotFound = true;
                  }
                  if (index === 3 && isFourthDiamondLoadError) {
                    showNotFound = true;
                  }
                  return (
                    <div key={`diamond-image-${index}`}>
                      {diamond.imageLink && !showNotFound ? (
                        <Image
                          src={diamond.imageLink}
                          alt="image"
                          className="rounded-lg w-full  aspect-square object-contain"
                          width={200}
                          height={80}
                          onError={(e) => {
                            if (index === 0) {
                              setIsFirstDiamondLoadError(true);
                            }
                            if (index === 1) {
                              setIsSecondDiamondLoadError(true);
                            }
                            if (index === 2) {
                              setIsThirdDiamondLoadError(true);
                            }
                            if (index === 3) {
                              setIsFourthDiamondLoadError(true);
                            }
                          }}
                        />
                      ) : (
                        <div className="bg-gray-400 w-full aspect-square rounded-lg flex justify-center items-center">
                          <p className="text-white font-poppins text-lg uppercase font-medium text-center">
                            Image Not Found
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              : null}
          </div>

          <div className={`grid ${gridColClass} gap-3 mt-[0.5rem]`}>
            <div className="bg-customer-background pl-4 py-2 rounded-md flex items-center">
              <p className="font-semibold text-primary">Link</p>
            </div>
            {selectedDiamonds && selectedDiamonds.length > 0
              ? selectedDiamonds.map((diamond: any, index: number) => (
                  <div key={`diamond-actions-${index}`}>
                    <div className="flex flex-row gap-x-2 justify-center items-center py-3 border border-solid border-primary border-opacity-[15%] rounded-md">
                      <Link
                        href={`${links.VIEW_PRODUCT}?id=${diamond._id}`}
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
                        href={diamond.videoLink}
                        aria-disabled={!diamond.videoLink}
                        target="_blank"
                      >
                        <button
                          disabled={!diamond.videoLink}
                          onClick={() => {
                            if (!diamond.videoLink) {
                              return;
                            }
                          }}
                        >
                          <Image
                            src={
                              diamond.videoLink
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
                  </div>
                ))
              : null}
          </div>

          {diamondCompareProperty.map((property) => (
            <div
              className={`grid ${gridColClass} gap-3 my-5`}
              key={`diamond-property-${property.key}`}
            >
              <div className="bg-customer-background pl-4 py-2 rounded-md flex items-center">
                <p className="font-semibold text-primary">{property.label}</p>
              </div>
              {selectedDiamonds && selectedDiamonds.length > 0
                ? selectedDiamonds.map((diamond: any, index: number) => (
                    <div
                      key={`property-${property.key}-${index}`}
                      className="py-2 border border-solid border-primary border-opacity-[15%] rounded-md"
                    >
                      <p
                        className={`font-medium text-primary text-center ${property.customStyles}`}
                      >
                        {diamond[property.key] !== null
                          ? property.isDigit
                            ? diamond[property.key].toFixed(2)
                            : diamond[property.key]
                          : diamond.fancyColor !== null
                          ? diamond.fancyColor
                          : "-"}
                      </p>
                    </div>
                  ))
                : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompareDiamondModal;
