"use client";
import useApiRequest from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { getDiamondVideoApi } from "../../api/diamond.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { isValidObjectId } from "@/utils/validation";
import doubleLeftArrow from "@/public/assets/images/ic-double-left-arrow.svg";
import doubleRightArrow from "@/public/assets/images/ic-double-right-arrow.svg";
import pauseIcon from "@/public/assets/images/ic-pause.svg";
import playIcon from "@/public/assets/images/ic-play.svg";
import restartIcon from "@/public/assets/images/ic-refresh.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { EVariant, showAlert } from "@/store/reducers/alert.reducer";
import { ResponseMessages } from "@/utils/response.messages";
import { links } from "@/utils/links";

const Page = ({ params }: any) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLink, setVideoLink] = useState("");
  const [videoError, setVideoError] = useState(false);
  const dispatch = useDispatch();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const {
    loading: isGetDiamondVideoLoading,
    data: getDiamondVideoResponse,
    request: getDiamondVideoRequest,
  } = useApiRequest(getDiamondVideoApi);

  useEffect(() => {
    if (!isGetDiamondVideoLoading && getDiamondVideoResponse) {
      if (getDiamondVideoResponse.responseCode === ResponseCodes.SUCCESS) {
        setVideoLink(getDiamondVideoResponse.data.videoLink);
      }
    }
  }, [isGetDiamondVideoLoading, getDiamondVideoResponse]);

  useEffect(() => {
    if (
      !params.productId ||
      !isValidObjectId(params.productId || "")
    ) {
      router.replace(links.DATA_NOT_FOUND);
    } else {
      getDiamondVideoRequest(router, params.productId);
    }
  }, [router, params.productId, getDiamondVideoRequest]);

  const downloadVideo = async () => {
    if (!videoLink) {
      return;
    }

    try {
      const response = await fetch(videoLink);
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

  return (
    <div>
      <div className="p-7 max-w-[1000px] h-auto w-full mx-auto">
        <div className="w-full bg-[#CFDBEB] rounded-lg overflow-hidden border-2 border-tertiary">
          {videoLink && !videoError ? (
            <iframe
              className="aspect-video w-full"
              src={videoLink}
              onLoad={() => setVideoError(false)}
              onError={() => setVideoError(true)}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <div className="h-full aspect-video bg-gray-400 rounded-lg grid place-content-center">
              <p className="text-white uppercase text-lg">Video not found</p>
            </div>
          )}
        </div>

        <div className="xl:flex xl:justify-between items-center pt-4">
          <div>
            <button
              className={`bg-tertiary py-3 px-4 rounded-xl text-secondary font-semibold text-sm w-full transition-transform hover:-translate-y-1 hover:scale-105 duration-500 ${!videoLink ? "bg-gray-300 pointer-events-none opacity-50" : ""}`}
              disabled={videoError}
              onClick={downloadVideo}
            >
              Download Video
            </button>
          </div>
          <div className="flex gap-4 items-center justify-center mt-[1rem] xl:mt-[0rem]">
            <button className={videoControlButtonStyle} disabled={true}>
              <Image
                src={doubleLeftArrow}
                alt="image"
                className={videoControlIconStyle}
              />
            </button>
            <button disabled={true} className={videoControlButtonStyle}>
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
      </div>
    </div>
  );
};

export default Page;
