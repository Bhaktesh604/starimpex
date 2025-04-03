"use client";
import useApiRequest from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getDiamondCertificateApi } from "../../api/diamond.api";
import { ResponseCodes } from "@/interfaces/response.interface";
import { isValidObjectId } from "@/utils/validation";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { IMAGE_CHECK_REGEX } from "@/utils/regex";
import { links } from "@/utils/links";

const Page = ({ params }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [certificate, setCertificate] = useState("");

  const router = useRouter();
  const {
    loading: isGetDiamondCertificateLoading,
    data: getDiamondCertificateResponse,
    request: getDiamondCertificateRequest,
  } = useApiRequest(getDiamondCertificateApi);

  useEffect(() => {
    if (!isGetDiamondCertificateLoading && getDiamondCertificateResponse) {
      if (
        getDiamondCertificateResponse.responseCode === ResponseCodes.SUCCESS
      ) {
        setCertificate(getDiamondCertificateResponse?.data.certificateLink);
      }
      setIsLoading(false);
    }
  }, [isGetDiamondCertificateLoading, getDiamondCertificateResponse]);

  useEffect(() => {
    if (
      !params.productId ||
      !isValidObjectId(params.productId || "")
    ) {
      router.replace(links.DATA_NOT_FOUND);
    } else {
      getDiamondCertificateRequest(router, params.productId);
    }
  }, [router, params.productId, getDiamondCertificateRequest]);

  return (
    <div className="p-5 max-w-[100%] h-auto w-full mx-auto">
      <div className="mx-[2rem]">
        <div className="bg-tertiary py-3 px-4 rounded-xl text-secondary font-semibold text-xl text-center mb-[-0.5rem] z-[4]">
          Certificate
        </div>
        <div className="py-4 w-full h-auto flex justify-center">
          {isLoading ? (
            <div className="h-[10rem] flex items-center">
              <Spinner />
            </div>
          ) : certificate ? (
            IMAGE_CHECK_REGEX.test(certificate) ? (
              <Image
                src={certificate}
                alt="certificate"
                width={1278}
                height={776}
                className="object-contain"
              />
            ) : (
              <iframe
                src={certificate}
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
  );
};

export default Page;
