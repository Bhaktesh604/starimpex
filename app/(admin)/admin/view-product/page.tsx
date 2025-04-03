"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import doubleLeftArrow from "@/public/assets/images/ic-double-left-arrow.svg";
import doubleRightArrow from "@/public/assets/images/ic-double-right-arrow.svg";
import pauseIcon from "@/public/assets/images/ic-pause.svg";
import playIcon from "@/public/assets/images/ic-play.svg";
import restartIcon from "@/public/assets/images/ic-refresh.svg";
import videoIcon from "@/public/assets/images/ic-video.svg";
import imagesIcon from "@/public/assets/images/ic-images.svg";
import idealScopeIcon from "@/public/assets/images/ic-ideal-scope.svg";
import upArrowIcon from "@/public/assets/images/ic-up-arrow.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { isValidObjectId } from "@/utils/validation";
import { links } from "@/utils/links";
import { ResponseCodes } from "@/interfaces/response.interface";
import useApiRequest from "@/hooks/useApi";
import { getDiamondApi } from "../api/diamond.api";
import { getEyeCleanValue } from "@/utils/diamond.util";
import { useDispatch } from "react-redux";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { ResponseMessages } from "@/utils/response.messages";
import Spinner from "@/components/Spinner";
import { EDiamondStatus } from "@/utils/content.util";
import { Tooltip } from "@material-tailwind/react";
import { IMAGE_CHECK_REGEX } from "@/utils/regex";

function Page() {
  const [selectedOption, setSelectedOption] = useState("video");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [diamond, setDiamond] = useState<any>();
  const {
    loading: isGetDiamondLoading,
    data: getDiamondResponse,
    request: getDiamondRequest,
  } = useApiRequest(getDiamondApi);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isGetDiamondLoading && getDiamondResponse) {
      if (getDiamondResponse.responseCode === ResponseCodes.SUCCESS) {
        setDiamond(getDiamondResponse.data);
        videoRef.current?.play();
        setIsVideoPlaying(true);
      }
      setIsLoading(false);
    }
  }, [isGetDiamondLoading, getDiamondResponse]);

  useEffect(() => {
    if (
      !searchParams.get("id") ||
      !isValidObjectId(searchParams.get("id") || "")
    ) {
      router.push(links.ADMIN_ADVANCE_SEARCH);
    } else {
      getDiamondRequest(router, String(searchParams.get("id")));
    }
  }, [searchParams, router, getDiamondRequest]);

  const handlePlay = () => {
    if (!videoRef?.current) {
      return;
    }
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      return;
    }

    videoRef.current.play();
    setIsVideoPlaying(true);
  };

  const videoPlayAgainHandler = () => {
    if (!videoRef?.current) {
      return;
    }

    videoRef.current.load();
    videoRef.current.play();
    setIsVideoPlaying(true);
  };

  const downloadVideo = async () => {
    if (!diamond.videoLink) {
      return;
    }

    try {
      const response = await fetch(diamond.videoLink);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `video.mp4`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        dispatch(
          showAlert({
            variant: EVariant.SUCCESS,
            message: ResponseMessages.DOWNLOAD_SUCCESS,
          })
        );

        return;
      }
      dispatch(
        showAlert({
          variant: EVariant.ERROR,
          message: ResponseMessages.DOWNLOAD_FAILED_ERROR,
        })
      );
    } catch (error) {
      dispatch(
        showAlert({
          variant: EVariant.ERROR,
          message: ResponseMessages.DOWNLOAD_FAILED_ERROR,
        })
      );
    }
  };

  const videoControlButtonStyle =
    "disabled:pointer-events-none w-10 h-10 bg-[#CFDBEB] flex justify-center items-center rounded-full group hover:-translate-y-1 hover:scale-105 transition-transform duration-500";
  const videoControlIconStyle =
    "w-4 h-4 transition-transform group-hover:scale-110 duration-500 opacity-50";

  return (
    <div className="z-[4] w-full bg-customer-background p-5">
      <div className="bg-secondary rounded-lg shadow-md">
        <div className="px-[1.5rem] py-[0.8rem] flex justify-between items-center">
          <div>
            <p className="font-semibold text-md md:text-lg">Diamond Details</p>
          </div>
        </div>
        <hr></hr>
        <div className="ml-[2rem] mr-[2rem] lg:mr-[6rem]">
          <div className="py-[1rem] grid grid-cols-1 lg:grid-cols-[30%_50%_20%] gap-8 h-full ">
            <div>
              <div className="bg-tertiary py-3 px-4 rounded-xl text-secondary font-semibold text-sm text-center mb-[-0.5rem] z-[4]">
                Diamond Details
              </div>
              <div className="z-[1]">
                <div className="pt-[0.5rem] grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Stone No</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.stoneNo || null}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Lab</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary uppercase">
                      {diamond?.lab || "-"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Type</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary uppercase">
                      {diamond?.type || "-"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Inscription</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary capitalize">
                      {diamond?.inscription || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Shape</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary capitalize">
                      {diamond?.shape || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Carat Weight</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {(diamond?.caratWeight && diamond?.caratWeight > 0) ||
                      diamond?.caratWeight === 0
                        ? diamond.caratWeight.toFixed(2)
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Color</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary uppercase">
                      {diamond?.color
                        ? diamond.color
                        : diamond?.fancyColor
                        ? diamond.fancyColor
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Clarity</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary uppercase">
                      {diamond?.clarity || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Cut</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary uppercase">
                      {diamond?.cut && diamond?.cut.toLowerCase() !== "n/a"
                        ? diamond.cut
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Polish</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary uppercase">
                      {diamond?.polish || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Symmetry</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary uppercase">
                      {diamond?.symmetry || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Florescence</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary uppercase">
                      {diamond?.florescence || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Availability</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p
                      className={`font-semibold  uppercase ${
                        diamond?.status === EDiamondStatus.AVAILABLE
                          ? "text-green_color"
                          : "text-red_color"
                      }`}
                    >
                      {diamond?.status || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid  rounded-b-xl border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Location</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary capitalize">
                      {diamond?.country || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {selectedOption === "video" ? (
                <>
                  <div className="w-full bg-[#CFDBEB] rounded-lg overflow-hidden border-2 border-tertiary">
                    {diamond?.videoLink && !videoError ? (
                      <iframe
                        src={diamond.videoLink}
                        onLoad={() => setVideoError(false)}
                        onError={() => {
                          setVideoError(true);
                        }}
                        className="aspect-video w-full"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    ) : (
                      <div className="h-full aspect-video bg-gray-400 rounded-lg grid place-content-center">
                        <p className="text-white uppercase text-lg">
                          Video not found
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="xl:flex xl:justify-between items-center pt-4">
                    <div>
                      <button
                        disabled={videoError}
                        className={`bg-tertiary py-3 px-4 rounded-xl text-secondary font-semibold text-sm w-full transition-transform hover:-translate-y-1 hover:scale-105 duration-500 ${!diamond?.videoLink ? "bg-gray-300 pointer-events-none opacity-50" : ""}`}
                        onClick={downloadVideo}
                      >
                        Download Video
                      </button>
                    </div>
                    <div className="flex gap-4 items-center justify-center mt-[1rem] xl:mt-[0rem]">
                      <button
                        disabled={true}
                        className={videoControlButtonStyle}
                      >
                        <Image
                          src={doubleLeftArrow}
                          alt="image"
                          className={videoControlIconStyle}
                        />
                      </button>
                      <button
                        disabled={true}
                        className={videoControlButtonStyle}
                      >
                        <Image
                          src={doubleRightArrow}
                          alt="image"
                          className={videoControlIconStyle}
                        />
                      </button>
                      <button
                        disabled={true}
                        className={videoControlButtonStyle}
                        onClick={handlePlay}
                      >
                        <Image
                          src={isVideoPlaying ? pauseIcon : playIcon}
                          alt="play/pause icon"
                          className={videoControlIconStyle}
                        />
                      </button>
                      <button
                        disabled={true}
                        className={videoControlButtonStyle}
                        onClick={videoPlayAgainHandler}
                      >
                        <Image
                          src={restartIcon}
                          alt="play again icon"
                          className={videoControlIconStyle}
                        />
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
              {selectedOption === "asset" ||
              selectedOption === "idealScope" ||
              selectedOption === "heart" ||
              selectedOption === "arrow" ? (
                <div className="h-full w-full bg-gray-400 grid place-content-center rounded-lg">
                  <p className="text-white uppercase text-lg">
                    Images not found
                  </p>
                </div>
              ) : null}
              {selectedOption === "images" ? (
                diamond?.imageLink && !imageError ? (
                  <div className="border-2 border-tertiary rounded-lg ">
                    <Image
                      src={diamond.imageLink}
                      alt="diamond"
                      onError={() => {
                        setImageError(true);
                      }}
                      height={180}
                      width={240}
                      className="w-full aspect-[3/2] object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-full w-full bg-gray-400 rounded-lg grid place-content-center">
                    <p className="text-white uppercase text-lg">
                      Image not found
                    </p>
                  </div>
                )
              ) : null}
            </div>
            <div>
              <div className="bg-tertiary-light rounded-xl">
                <div
                  className={`cursor-pointer flex items-center px-[2rem] py-4 ${
                    selectedOption === "video"
                      ? "bg-view_option_color rounded-xl"
                      : ""
                  }`}
                  onClick={() => setSelectedOption("video")}
                >
                  <Image src={videoIcon} alt="images" />
                  <p className="font-semibold text-primary text-base pl-3">
                    Video
                  </p>
                </div>
                <div
                  className={`cursor-pointer flex items-center px-[2rem] py-4 ${
                    selectedOption === "images"
                      ? "bg-view_option_color rounded-xl"
                      : ""
                  }`}
                  onClick={() => setSelectedOption("images")}
                >
                  <Image src={imagesIcon} alt="images" />
                  <p className="font-semibold text-primary text-base pl-3">
                    Images
                  </p>
                </div>
                <div
                  className={`cursor-pointer flex items-center px-[2rem] py-4 ${
                    selectedOption === "heart"
                      ? "bg-view_option_color rounded-xl"
                      : ""
                  }`}
                  onClick={() => setSelectedOption("heart")}
                >
                  <Image src={imagesIcon} alt="images" />
                  <p className="font-semibold text-primary text-base pl-3">
                    Heart
                  </p>
                </div>
                <div
                  className={`cursor-pointer flex items-center px-[2rem] py-4 ${
                    selectedOption === "arrow"
                      ? "bg-view_option_color rounded-xl"
                      : ""
                  }`}
                  onClick={() => setSelectedOption("arrow")}
                >
                  <Image src={upArrowIcon} alt="images" />
                  <p className="font-semibold text-primary text-base pl-3">
                    Arrow
                  </p>
                </div>
                <div
                  className={`cursor-pointer flex items-center px-[2rem] py-4 ${
                    selectedOption === "idealScope"
                      ? "bg-view_option_color rounded-xl"
                      : ""
                  }`}
                  onClick={() => setSelectedOption("idealScope")}
                >
                  <Image src={idealScopeIcon} alt="images" />
                  <p className="font-semibold text-primary text-base pl-3">
                    Ideal Scope
                  </p>
                </div>
                <div
                  className={`cursor-pointer flex items-center px-[2rem] py-4 ${
                    selectedOption === "asset"
                      ? "bg-view_option_color rounded-xl"
                      : ""
                  }`}
                  onClick={() => setSelectedOption("asset")}
                >
                  <Image src={imagesIcon} alt="images" />
                  <p className="font-semibold text-primary text-base pl-3">
                    Asset
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="py-[1rem] grid grid-cols-1 lg:grid-cols-3 gap-8 h-full ">
            <div>
              <div className="bg-tertiary py-3 px-4 rounded-xl text-secondary font-semibold text-sm text-center mb-[-0.5rem] z-[4]">
                QC Details
              </div>
              <div className="z-[1]">
                <div className="pt-[0.5rem] grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Shade</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary capitalize">
                      {diamond?.shade || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Luster</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.luster || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Eye Clean</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary uppercase">
                      {getEyeCleanValue(diamond?.eyeClean)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Milky</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.milky || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Inclusion</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.inclusion || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Extra Facet</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.extraFacet || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">
                      Internal Graining
                    </p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.internalGraining || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">
                      Surface Graining
                    </p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.surfaceGraining || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid  rounded-b-xl border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">
                      Hearts And Arrow
                    </p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.heartsAndArrows === true
                        ? "YES"
                        : diamond?.heartsAndArrows === null
                        ? "N/A"
                        : "NO"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-tertiary py-3 px-4 rounded-xl text-secondary font-semibold text-sm text-center mb-[-0.5rem] z-[4]">
                Parameter Details
              </div>
              <div className="z-[1]">
                <div className="pt-[0.5rem] grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Measurement</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.measurement || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Total Depth %</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {(diamond?.depthPercentage &&
                        diamond?.depthPercentage > 0) ||
                      diamond?.depthPercentage === 0
                        ? `${diamond?.depthPercentage.toFixed(2)}%`
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Table %</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {(diamond?.depthPercentage &&
                        diamond?.depthPercentage > 0) ||
                      diamond?.depthPercentage === 0
                        ? `${diamond?.tablePercentage.toFixed(2)}%`
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">
                      Crown Angle/Height
                    </p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {(diamond?.crownAngle && diamond?.crownAngle > 0) ||
                      diamond?.crownAngle === 0
                        ? diamond.crownAngle.toFixed(2)
                        : "-"}{" "}
                      /{" "}
                      {(diamond?.crownHeight && diamond?.crownHeight > 0) ||
                      diamond?.crownHeight === 0
                        ? diamond.crownHeight.toFixed(2)
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">
                      Pavilion Angle/Height
                    </p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {(diamond?.pavilionAngle && diamond?.pavilionAngle > 0) ||
                      diamond?.pavilionAngle === 0
                        ? diamond.pavilionAngle.toFixed(2)
                        : "-"}{" "}
                      /{" "}
                      {(diamond?.pavilionHeight &&
                        diamond?.pavilionHeight > 0) ||
                      diamond?.pavilionHeight === 0
                        ? diamond.pavilionHeight.toFixed(2)
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Star Length</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.starLength || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Lower Halves</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.lowerHalves || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Girdle</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {diamond?.girdleType || "-"}
                      {(diamond?.girdlePercentage &&
                        diamond?.girdlePercentage > 0) ||
                      diamond?.girdlePercentage === 0
                        ? `, ${diamond?.girdlePercentage.toFixed(2)}%`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Culet</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary uppercase">
                      {diamond?.culetSize || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid  rounded-b-xl border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">Ratio</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-primary">
                      {(diamond?.ratio && diamond?.ratio > 0) ||
                      diamond?.ratio === 0
                        ? diamond.ratio.toFixed(2)
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:mr-[-4rem]">
              <div className="bg-tertiary py-3 px-4 rounded-xl text-secondary font-semibold text-sm text-center mb-[-0.5rem] z-[4]">
                Information
              </div>
              <div className="z-[1]">
                <div className="pt-[0.5rem] grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%] flex items-center">
                    <p className="font-semibold text-primary">Notes</p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    <p className="font-semibold text-[#C21D1D]">
                      {diamond?.notes || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">
                      Stone Video Link
                    </p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    {diamond?.videoLink ? (
                      <a
                        target="_blank"
                        href={diamond?.videoLink}
                        className="font-semibold text-[#C21D1D]"
                      >
                        Click Here...
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid  rounded-b-xl border-b-solid border-x-silver_color border-b-silver_color">
                  <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                    <p className="font-semibold text-primary">
                      Stone Image Link
                    </p>
                  </div>
                  <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                    {diamond?.imageLink ? (
                      <a
                        target="_blank"
                        href={diamond?.imageLink}
                        className="font-semibold text-[#C21D1D]"
                      >
                        Click Here...
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-[3rem]">
                <div className="bg-tertiary py-3 px-4 rounded-xl text-secondary font-semibold text-sm text-center mb-[-0.5rem] z-[4]">
                  Comments
                </div>
                <div className="z-[1]">
                  <div className="pt-[0.5rem] grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                    <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%] flex items-center">
                      <p className="font-semibold text-primary">
                        Cert. Comment
                      </p>
                    </div>
                    <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                      <p className="font-semibold text-primary">
                        {diamond?.certificateComment || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid border-b-solid border-x-silver_color border-b-silver_color">
                    <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                      <p className="font-semibold text-primary">
                        Key To Symbols
                      </p>
                    </div>
                    <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                      <p className="font-semibold text-primary capitalize">
                        {diamond?.keyToSymbol !== null ? (
                          <Tooltip
                            content={
                              Array.isArray(diamond?.keyToSymbol)
                                ? diamond?.keyToSymbol.join(", ")
                                : diamond?.keyToSymbol || ""
                            }
                            placement="bottom"
                            className="text-primary-text-color text-sm bg-white shadow-md w-[18.75rem] font-roboto text-center capitalize"
                          >
                            <span className="font-text-medium text-primary-text-color">
                              {Array.isArray(diamond?.keyToSymbol)
                                ? diamond?.keyToSymbol.join(", ").length > 20
                                  ? diamond?.keyToSymbol
                                      .join(", ")
                                      .slice(0, 20) + "..."
                                  : diamond?.keyToSymbol.join(", ")
                                : diamond?.keyToSymbol.length > 20
                                ? diamond?.keyToSymbol.slice(0, 20) + "..."
                                : diamond?.keyToSymbol}
                            </span>
                          </Tooltip>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-x border-b-[1px] border-x-solid  rounded-b-xl border-b-solid border-x-silver_color border-b-silver_color">
                    <div className="pl-4 py-[0.4rem] bg-tertiary bg-opacity-[7%]">
                      <p className="font-semibold text-primary">
                        Motiba Gems Comment
                      </p>
                    </div>
                    <div className="pl-4 py-[0.4rem] border-l-[1px] border-solid border-silver_color">
                      <p className="font-semibold text-primary">
                        {" "}
                        {diamond?.motibaGemsComment || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[3rem] mx-[2rem]">
          <div className="bg-tertiary py-3 px-4 rounded-xl text-secondary font-semibold text-xl text-center mb-[-0.5rem] z-[4]">
            Certificate
          </div>
          <div className="p-4 w-full h-auto flex justify-center">
            {isLoading ? (
              <div className="h-[10rem] flex items-center">
                <Spinner />
              </div>
            ) : diamond?.certificateLink ? (
              IMAGE_CHECK_REGEX.test(diamond.certificateLink) ? (
                <Image
                  src={diamond.certificateLink}
                  alt="certificate"
                  width={1278}
                  height={776}
                  className="object-contain"
                />
              ) : (
                <iframe
                  src={diamond.certificateLink}
                  width="100%"
                  height="776px"
                  className="rounded-md"
                  title="Certificate"
                />
              )
            ) : (
              <div className="h-[10rem] sm:h-[20rem] w-full flex justify-center items-center rounded-md bg-gray-400">
                <p className="capitalize text-center font-medium text-white sm:text-2xl">
                  Certificate not found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
