"use client";
import React, { useCallback, useEffect, useState } from "react";
import RightArrowIcon from "../../../public/assets/images/ic-right-arrow.svg";
import Image from "next/image";
import useApiRequest from "@/hooks/useApi";
import { getDashboardData } from "../api/dashboard.api";
import { useRouter } from "next/navigation";
import { ResponseCodes } from "@/interfaces/response.interface";
import Link from "next/link";
import { links } from "@/utils/links";
import { diamondQueryParams } from "@/utils/diamondConstant";
import { EDiamondType, EUserType } from "@/interfaces/common.interface";
import Spinner from "@/components/Spinner";
import dataNotFoundImage from "@/public/assets/images/data-not-found-image.svg";
import { USER_TYPE_KEY } from "@/utils/constants";

function Page() {
  const router = useRouter();
  const [labGrownDiamonds, setLabGrownDiamonds] = useState(0);
  const [naturalDiamonds, setNaturalDiamonds] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [priceTrack, setPriceTrack] = useState(0);
  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    loading: isGetDashboardDataLoading,
    data: getDashboardDataResponse,
    request: getDashboardDataRequest,
  } = useApiRequest(getDashboardData);

  const getDashboard = useCallback(() => {
    getDashboardDataRequest(router);
  }, [getDashboardDataRequest, router]);

  useEffect(() => {
    if(localStorage.getItem(USER_TYPE_KEY) === EUserType.USER){
      getDashboard();
    }
  }, [getDashboard]);

  useEffect(() => {
    if (!isGetDashboardDataLoading && getDashboardDataResponse) {
      if (getDashboardDataResponse.responseCode === ResponseCodes.SUCCESS) {
        setLabGrownDiamonds(
          getDashboardDataResponse.data.totalLabGrownDiamonds
        );
        setNaturalDiamonds(getDashboardDataResponse.data.totalNaturalDiamonds);
        setTotalOrder(getDashboardDataResponse.data.totalOrdersPlaced);
        setPriceTrack(getDashboardDataResponse.data.totalPriceTrack);
        setSearch(
          getDashboardDataResponse?.data.searchHistory.map((item: any) => item)
        );
      }
      setIsLoading(false);
    }
  }, [getDashboardDataResponse, isGetDashboardDataLoading]);

  const formatDateString = (isoDateString: string | number | Date) => {
    const date = new Date(isoDateString);

    const options: any = { year: "numeric", month: "long", day: "numeric" };

    const formattedDate = date.toLocaleDateString("en-GB", options);

    const [day, month, year] = formattedDate.split(" ");
    return `${parseInt(day)} ${month} ${year}`;
  };

  const handleRow = (filters: any) => {
    let searchLink = `${links.SEARCH_RESULT}?${diamondQueryParams.DIAMOND_TYPE}=${filters.diamondType}`;
    if (filters.noBGM) {
      searchLink = `${searchLink}&${
        diamondQueryParams.NO_BGM
      }=${encodeURIComponent(JSON.stringify(filters.noBGM))}`;
    }

    if (filters.caratWeightList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CARAT
      }=${encodeURIComponent(JSON.stringify(filters.caratWeightList))}`;
    }
    if (filters.colorList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.COLOR
      }=${encodeURIComponent(JSON.stringify(filters.colorList))}`;
    }
    if (filters.clarityList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CLARITY
      }=${encodeURIComponent(JSON.stringify(filters.clarityList))}`;
    }
    if (filters.symmetryList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.SYMMETRY
      }=${encodeURIComponent(JSON.stringify(filters.symmetryList))}`;
    }
    if (filters.shapeList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.SHAPE
      }=${encodeURIComponent(JSON.stringify(filters.shapeList))}`;
    }

    if (filters.countryList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.COUNTRY
      }=${encodeURIComponent(JSON.stringify(filters.countryList))}`;
    }
    if (
      filters.crownAngleRange.from !== "" ||
      filters.crownAngleRange.to !== ""
    ) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CROWN_ANGLE
      }=${encodeURIComponent(JSON.stringify(filters.crownAngleRange))}`;
    }
    if (
      filters.crownHeightRange.from !== "" ||
      filters.crownHeightRange.to !== ""
    ) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CROWN_HEIGHT
      }=${encodeURIComponent(JSON.stringify(filters.crownHeightRange))}`;
    }

    if (filters.culetSizeList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CULET
      }=${encodeURIComponent(JSON.stringify(filters.culetSizeList))}`;
    }
    if (filters.cutList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CUT
      }=${encodeURIComponent(JSON.stringify(filters.cutList))}`;
    }
    if (
      filters.depthPercentageRange.from !== "" ||
      filters.depthPercentageRange.to !== ""
    ) {
      searchLink = `${searchLink}&${
        diamondQueryParams.DEPTH_PERCENTAGE
      }=${encodeURIComponent(JSON.stringify(filters.depthPercentageRange))}`;
    }
    if (filters.discountRange.from !== "" || filters.discountRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.DISCOUNT
      }=${encodeURIComponent(JSON.stringify(filters.discountRange))}`;
    }

    if (filters.eyeCleanList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.EYE_CLEAN
      }=${encodeURIComponent(JSON.stringify(filters.eyeCleanList))}`;
    }

    if (filters.fancyIntensityList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.FANCY_INTENSITY
      }=${encodeURIComponent(JSON.stringify(filters.fancyIntensityList))}`;
    }
    if (filters.fancyOvertoneList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.FANCY_OVERTONE
      }=${encodeURIComponent(JSON.stringify(filters.fancyOvertoneList))}`;
    }
    if (filters.fancyColorList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.FANCY_COLOR
      }=${encodeURIComponent(JSON.stringify(filters.fancyColorList))}`;
    }

    if (filters.florescenceList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.FLORESCENCE
      }=${encodeURIComponent(JSON.stringify(filters.florescenceList))}`;
    }
    if (
      filters.girdlePercentageRange.from !== "" ||
      filters.girdlePercentageRange.to !== ""
    ) {
      searchLink = `${searchLink}&${
        diamondQueryParams.GIRDLE_PERCENTAGE
      }=${encodeURIComponent(JSON.stringify(filters.girdlePercentageRange))}`;
    }

    if (filters.keyToSymbolIncludeList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CONTAIN_KEY_TO_SYMBOL
      }=${encodeURIComponent(JSON.stringify(filters.keyToSymbolIncludeList))}`;
    }
    if (filters.keyToSymbolExcludeList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.DO_NOT_CONTAIN_KEY_TO_SYMBOL
      }=${encodeURIComponent(JSON.stringify(filters.keyToSymbolExcludeList))}`;
    }

    if (filters.labList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.LAB
      }=${encodeURIComponent(JSON.stringify(filters.labList))}`;
    }
    if (filters.lengthRange.from !== "" || filters.lengthRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.LENGTH
      }=${encodeURIComponent(JSON.stringify(filters.lengthRange))}`;
    }
    if (
      filters.pavilionAngleRange.from !== "" ||
      filters.pavilionAngleRange.to !== ""
    ) {
      searchLink = `${searchLink}&${
        diamondQueryParams.PAVILION_ANGLE
      }=${encodeURIComponent(JSON.stringify(filters.pavilionAngleRange))}`;
    }
    if (
      filters.pavilionHeightRange.from !== "" ||
      filters.pavilionHeightRange.to !== ""
    ) {
      searchLink = `${searchLink}&${
        diamondQueryParams.PAVILION_HEIGHT
      }=${encodeURIComponent(JSON.stringify(filters.pavilionHeightRange))}`;
    }
    if (filters.polishList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.POLISH
      }=${encodeURIComponent(JSON.stringify(filters.polishList))}`;
    }
    if (
      filters.pricePerCaratRange.from !== "" ||
      filters.pricePerCaratRange.to !== ""
    ) {
      searchLink = `${searchLink}&${
        diamondQueryParams.PRICE_PER_CARAT
      }=${encodeURIComponent(JSON.stringify(filters.pricePerCaratRange))}`;
    }
    if (filters.ratioRange.from !== "" || filters.ratioRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.RATIO
      }=${encodeURIComponent(JSON.stringify(filters.ratioRange))}`;
    }
    if (
      filters.tablePercentageRange.from !== "" ||
      filters.tablePercentageRange.to !== ""
    ) {
      searchLink = `${searchLink}&${
        diamondQueryParams.TABLE_PERCENTAGE
      }=${encodeURIComponent(JSON.stringify(filters.tablePercentageRange))}`;
    }
    if (
      filters.totalPriceRange.from !== "" ||
      filters.totalPriceRange.to !== ""
    ) {
      searchLink = `${searchLink}&${
        diamondQueryParams.TOTAL_PRICE
      }=${encodeURIComponent(JSON.stringify(filters.totalPriceRange))}`;
    }

    if (filters.typeList) {
      searchLink = `${searchLink}&${
        diamondQueryParams.LAB_GROWN_TYPE
      }=${encodeURIComponent(JSON.stringify(filters.typeList))}`;
    }

    if (filters.widthRange.from !== "" || filters.widthRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.WIDTH
      }=${encodeURIComponent(JSON.stringify(filters.widthRange))}`;
    }
    router.push(encodeURI(searchLink));
  };

  return (
    <div className="pt-5">
      <div className="z-[4]">
        <div className="pl-[2rem] pr-[2rem] xl:pr-[10rem]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold capitalize">Lab grown diamonds</p>
                <Link
                  href={`${links.SEARCH_RESULT}?${diamondQueryParams.DIAMOND_TYPE}=${EDiamondType.LAB_GROWN_DIAMONDS}`}
                >
                  <Image src={RightArrowIcon} alt="arrow" />
                </Link>
              </div>
              <div className="mt-[0.6rem] mb-[1rem]">
                <p className="title text-2xl">{labGrownDiamonds}</p>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold capitalize">Natural diamonds</p>
                <Link
                  href={`${links.SEARCH_RESULT}?${diamondQueryParams.DIAMOND_TYPE}=${EDiamondType.NATURAL_DIAMONDS}`}
                >
                  <Image src={RightArrowIcon} alt="arrow" />
                </Link>
              </div>
              <div className="mt-[0.6rem] mb-[1rem]">
                <p className="title text-2xl">{naturalDiamonds}</p>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4 ">
              <div className="flex items-center justify-between">
                <p className="font-semibold capitalize">Price Track</p>
                <Link href={links.PRICE_TRACK}>
                  <Image src={RightArrowIcon} alt="arrow" />
                </Link>
              </div>
              <div className="mt-[0.6rem] mb-[1rem]">
                <p className="title text-2xl">{priceTrack}</p>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold capitalize">Total orders</p>
                <Link href={links.HISTORY}>
                  <Image src={RightArrowIcon} alt="arrow" />
                </Link>
              </div>
              <div className="mt-[0.6rem] mb-[1rem]">
                <p className="title text-2xl">{totalOrder}</p>
              </div>
            </div>

            {/* <div className="bg-secondary rounded-xl p-4 hidden">
              <div className="flex items-center justify-between">
                <p className="font-semibold capitalize">My offers</p>
                <Link href={"#"}>
                  <Image src={RightArrowIcon} alt="arrow" />
                </Link>
              </div>
              <div className="mt-[0.6rem] mb-[1rem]">
                <p className="title text-2xl">0</p>
              </div>
            </div> */}
          </div>

          <div className="bg-secondary mt-[2rem] rounded-xl">
            <div className="pl-6 py-6">
              <p className="title text-lg">Recent search</p>
            </div>
            <hr></hr>
            <div className="overflow-x-auto mb-6  rounded-xl">
              <table className="min-w-full">
                <thead>
                  <tr className="text-primary text-opacity-[80%] title text-sm">
                    <th className="text-left py-5">
                      <span className="px-20 w-full block">Search</span>
                    </th>
                    <th>
                      <span className="px-10 w-full block">Date</span>
                    </th>
                    <th>
                      <span className="px-10 w-full block">Carat</span>
                    </th>
                    <th>
                      <span className="px-10 w-full block">Color</span>
                    </th>
                    <th>
                      <span className="px-10 w-full block">Clarity</span>
                    </th>
                  </tr>
                  <tr className="border-b"></tr>
                </thead>

                <tbody>
                  {search && search.length > 0
                    ? search.map((obj: any, index: number) => (
                        <tr
                          className="text-center text-primary cursor-pointer hover:bg-[#EDF0F5] [&:not(:last-child)]:border-b"
                          onClick={() => handleRow(obj.filters)}
                          key={`search-list-${index}`}
                        >
                          <td className="pl-10 py-6 text-left uppercase">
                            {obj.filters.diamondType.replaceAll("_", " ")}
                          </td>
                          <td>{formatDateString(obj.createdAt)}</td>
                          <td>
                            {obj.filters?.caratWeightList &&
                            obj.filters.caratWeightList.length
                              ? obj.filters.caratWeightList.map(
                                  (caratRange: any, index: number) => {
                                    if (
                                      caratRange.from === "" &&
                                      caratRange.to === ""
                                    ) {
                                      return (
                                        <span key={`carat-list-${index}`}>
                                          -<br />
                                        </span>
                                      );
                                    }
                                    if (
                                      caratRange.from !== "" &&
                                      !caratRange.to
                                    ) {
                                      return (
                                        <span key={`carat-list-${index}`}>
                                          From {caratRange.from}
                                          <br />
                                        </span>
                                      );
                                    }
                                    if (
                                      !caratRange.from &&
                                      caratRange.to !== ""
                                    ) {
                                      return (
                                        <span key={`carat-list-${index}`}>
                                          To {caratRange.to}
                                          <br />
                                        </span>
                                      );
                                    }
                                    return (
                                      <span key={`carat-list-${index}`}>
                                        From {caratRange.from} To{" "}
                                        {caratRange.to}
                                        <br />
                                      </span>
                                    );
                                  }
                                )
                              : "-"}
                          </td>
                          <td className="uppercase">
                            {obj.filters?.colorList &&
                            obj.filters.colorList.length
                              ? obj.filters.colorList
                                  .map((i: any) => i)
                                  .join(",")
                              : "-"}
                          </td>
                          <td className="uppercase">
                            {obj.filters?.clarityList &&
                            obj.filters.clarityList.length
                              ? obj.filters.clarityList
                                  .map((i: any) => i)
                                  .join(",")
                              : "-"}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
              {isLoading ? (
                <div className="flex justify-center items-center h-[90dvh]">
                  <Spinner />
                </div>
              ) : search.length === 0 ? (
                <div className="grid place-content-center gap-5 h-[90dvh]">
                  <Image src={dataNotFoundImage} alt="data not found" />
                  <p className="font-poppins text-3xl text-tertiary text-center font-medium">
                    DATA NOT FOUND
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
