"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import {
  diamondCutList,
  diamondFluorescence,
  diamondPolishList,
  diamondSymmetryList,
  diamondClarity,
  diamondColorList,
  diamondLabList,
  diamondShapes,
  diamondEyeCleanList,
  naturalCuletList,
  diamondKeyToSymbolList,
  labGrownCuletList,
  diamondFancyIntensityList,
  diamondFancyOvertoneList,
  diamondFancyColorList,
  diamondQueryParams,
} from "@/utils/diamondConstant";
import plus_sign_img from "@/public/assets/customer-dashboard/plus-sign.svg";
import delete_icon_img from "@/public/assets/customer-dashboard/delete_img_icon.svg";
import { countryListForSearch } from "@/utils/country.util";
import InputComponent from "../../../components/InputComponent";
import { useRouter, useSearchParams } from "next/navigation";
import arrow_icon from "@/public/assets/customer-dashboard/arrow_icon.png";
import { TECollapse } from "tw-elements-react";
import Select from "react-select";
import ButtonComponent from "@/components/ButtonComponent";
import { EDiamondType, ELabGrownType } from "@/interfaces/common.interface";
import { links } from "@/utils/links";
import { saveDiamondSearchApi } from "../api/diamond.api";

const DiamondSearch = () => {
  const router = useRouter();
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);
  const [caratRange, setCaratRange] = useState([{ from: "", to: "" }]);
  const [selectedShape, setSelectedShape] = useState<Array<string>>([]);
  const [selectedLab, setSelectedLab] = useState<Array<string>>([]);
  const [selectedColor, setSelectedColor] = useState<Array<string>>([]);
  const [selectedClarity, setSelectedClarity] = useState<Array<string>>([]);
  const [selectedCut, setSelectedCut] = useState<Array<string>>([]);
  const [selectedPolish, setSelectedPolish] = useState<Array<string>>([]);
  const [selectedSymmetry, setSelectedSymmetry] = useState<Array<string>>([]);
  const [selectedFluorescence, setSelectedFluorescence] = useState<
    Array<string>
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<
    Array<{ country: string }>
  >([]);
  const [selectedEyeClean, setSelectedEyeClean] = useState<
    Array<{ display: string; value: string }>
  >([]);
  const [selectedCulet, setSelectedCulet] = useState<
    Array<{ display: string; value: string }>
  >([]);
  const [selectedKeyToSymbolIncluded, setSelectedKeyToSymbolIncluded] =
    useState<Array<{ symbol: string }>>([]);
  const [selectedKeyToSymbolExcluded, setSelectedKeyToSymbolExcluded] =
    useState<Array<{ symbol: string }>>([]);
  const [isNoBGM, setIsNoBGM] = useState(false);
  const [diamondType, setDiamondType] = useState<string>(
    EDiamondType.NATURAL_DIAMONDS
  );
  const searchParams = useSearchParams();
  const [discountRange, setDiscountRange] = useState({ from: "", to: "" });
  const [pricePerCaratRange, setPricePerCaratRange] = useState({
    from: "",
    to: "",
  });
  const [totalPriceRange, setTotalPriceRange] = useState({ from: "", to: "" });
  const [tablePercentageRange, setTablePercentageRange] = useState({
    from: "",
    to: "",
  });
  const [depthPercentageRange, setDepthPercentageRange] = useState({
    from: "",
    to: "",
  });
  const [lengthRange, setLengthRange] = useState({ from: "", to: "" });
  const [widthRange, setWidthRange] = useState({ from: "", to: "" });
  const [ratioRange, setRatioRange] = useState({ from: "", to: "" });
  const [crownHeightRange, setCrownHeightRange] = useState({
    from: "",
    to: "",
  });
  const [crownAngleRange, setCrownAngleRange] = useState({ from: "", to: "" });
  const [pavilionHeightRange, setPavilionHeightRange] = useState({
    from: "",
    to: "",
  });
  const [pavilionAngleRange, setPavilionAngleRange] = useState({
    from: "",
    to: "",
  });
  const [girdlePercentageRange, setGirdlePercentageRange] = useState({
    from: "",
    to: "",
  });
  const [isDiscountRangeValid, setIsDiscountRangeValid] = useState(true);
  const [isPricePerCaratRangeValid, setIsPricePerCaratRangeValid] =
    useState(true);
  const [isTotalPriceRangeValid, setIsTotalPriceRangeValid] = useState(true);
  const [isTablePercentageRangeValid, setIsTablePercentageRangeValid] =
    useState(true);
  const [isDepthPercentageRangeValid, setIsDepthPercentageRangeValid] =
    useState(true);
  const [isLengthRangeValid, setIsLengthRangeValid] = useState(true);
  const [isWidthRangeValid, setIsWidthRangeValid] = useState(true);
  const [isRatioRangeValid, setIsRatioRangeValid] = useState(true);
  const [isCrownHeightRangeValid, setIsCrownHeightRangeValid] = useState(true);
  const [isCrownAngleRangeValid, setIsCrownAngleRangeValid] = useState(true);
  const [isPavilionHeightRangeValid, setIsPavilionHeightRangeValid] =
    useState(true);
  const [isPavilionAngleRangeValid, setIsPavilionAngleRangeValid] =
    useState(true);
  const [isGirdlePercentageRangeValid, setIsGirdlePercentageRangeValid] =
    useState(true);
  const [selectedLabGrownType, setSelectedLabGrownType] = useState<
    Array<string>
  >([]);
  const [isCaratRangeValid, setIsCaratRangeValid] = useState(true);
  const [isFancyColor, setIsFancyColor] = useState(false);
  const [selectedFancyColor, setSelectedFancyColor] = useState<string[]>([]);
  const [selectedFancyIntensity, setSelectedFancyIntensity] = useState<
    string[]
  >([]);
  const [selectedFancyOvertone, setSelectedFancyOvertone] = useState<string[]>(
    []
  );
  const [selectedCutCheckboxValue, setSelectedCutCheckboxValue] = useState("");
  const [isTypeNatural, setIsTypeNatural] = useState(true);

  const setFilters = useCallback(() => {
    if (!searchParams.size) {
      return;
    }
    const diamondType = searchParams.get(diamondQueryParams.DIAMOND_TYPE);
    const no_bgm = searchParams.get(diamondQueryParams.NO_BGM);
    const shape = searchParams.get(diamondQueryParams.SHAPE);
    const lab = searchParams.get(diamondQueryParams.LAB);
    const carat = searchParams.get(diamondQueryParams.CARAT);
    const fancy_intensity = searchParams.get(
      diamondQueryParams.FANCY_INTENSITY
    );
    const fancy_overtone = searchParams.get(diamondQueryParams.FANCY_OVERTONE);
    const fancy_color = searchParams.get(diamondQueryParams.FANCY_COLOR);
    const color = searchParams.get(diamondQueryParams.COLOR);
    const clarity = searchParams.get(diamondQueryParams.CLARITY);
    const florescence = searchParams.get(diamondQueryParams.FLORESCENCE);
    const cut = searchParams.get(diamondQueryParams.CUT);
    const polish = searchParams.get(diamondQueryParams.POLISH);
    const symmetry = searchParams.get(diamondQueryParams.SYMMETRY);
    const country = searchParams.get(diamondQueryParams.COUNTRY);
    const eye_clean = searchParams.get(diamondQueryParams.EYE_CLEAN);
    const discount = searchParams.get(diamondQueryParams.DISCOUNT);
    const price_per_carat = searchParams.get(
      diamondQueryParams.PRICE_PER_CARAT
    );
    const total_price = searchParams.get(diamondQueryParams.TOTAL_PRICE);
    const lab_grown_type = searchParams.get(diamondQueryParams.LAB_GROWN_TYPE);
    const table_percentage = searchParams.get(
      diamondQueryParams.TABLE_PERCENTAGE
    );
    const depth_percentage = searchParams.get(
      diamondQueryParams.DEPTH_PERCENTAGE
    );
    const length = searchParams.get(diamondQueryParams.LENGTH);
    const width = searchParams.get(diamondQueryParams.WIDTH);
    const ratio = searchParams.get(diamondQueryParams.RATIO);
    const crown_height = searchParams.get(diamondQueryParams.CROWN_HEIGHT);
    const crown_angle = searchParams.get(diamondQueryParams.CROWN_ANGLE);
    const pavilion_height = searchParams.get(
      diamondQueryParams.PAVILION_HEIGHT
    );
    const pavilion_angle = searchParams.get(diamondQueryParams.PAVILION_ANGLE);
    const girdle_percentage = searchParams.get(
      diamondQueryParams.GIRDLE_PERCENTAGE
    );
    const culet = searchParams.get(diamondQueryParams.CULET);
    const contain_key_to_symbol = searchParams.get(
      diamondQueryParams.CONTAIN_KEY_TO_SYMBOL
    );
    const do_not_contain_key_to_symbol = searchParams.get(
      diamondQueryParams.DO_NOT_CONTAIN_KEY_TO_SYMBOL
    );

    if (diamondType) {
      setDiamondType(diamondType);
      if (diamondType === EDiamondType.LAB_GROWN_DIAMONDS) {
        setIsTypeNatural(false);
      } else {
        setIsTypeNatural(true);
      }
    }
    if (no_bgm) {
      const bgmValue = no_bgm === "true";
      setIsNoBGM(bgmValue);
    }
    if (shape) {
      setSelectedShape([...JSON.parse(decodeURIComponent(shape))]);
    }
    if (lab) {
      setSelectedLab([...JSON.parse(decodeURIComponent(lab))]);
    }
    if (carat) {
      setCaratRange([...JSON.parse(decodeURIComponent(carat))]);
    }
    if (fancy_intensity || fancy_overtone || fancy_color) {
      setIsFancyColor(true);
    }
    if (fancy_intensity) {
      const newIntensityList = JSON.parse(
        decodeURIComponent(fancy_intensity)
      ) as string[];

      const filteredIntensity = diamondFancyIntensityList
        .filter((data) => newIntensityList.includes(data.value))
        .map((data) => data.value);

      setSelectedFancyIntensity(filteredIntensity);
    }
    if (fancy_overtone) {
      const newOvertoneList = JSON.parse(
        decodeURIComponent(fancy_overtone)
      ) as string[];

      const filteredOvertones = diamondFancyOvertoneList
        .filter((data) => newOvertoneList.includes(data.value))
        .map((data) => data.value);

      setSelectedFancyOvertone(filteredOvertones);
    }

    if (fancy_color) {
      const fancyColorList = JSON.parse(
        decodeURIComponent(fancy_color)
      ) as string[];

      const filteredColorList = diamondFancyColorList
        .filter((data) => fancyColorList.includes(data.value))
        .map((data) => data.value);

      setSelectedFancyColor(filteredColorList);
    }
    if (color) {
      setSelectedColor([...JSON.parse(decodeURIComponent(color))]);
    }
    if (clarity) {
      setSelectedClarity([...JSON.parse(decodeURIComponent(clarity))]);
    }
    if (florescence) {
      setSelectedFluorescence([...JSON.parse(decodeURIComponent(florescence))]);
    }
    if (cut) {
      setSelectedCut([...JSON.parse(decodeURIComponent(cut))]);
    }
    if (polish) {
      setSelectedPolish([...JSON.parse(decodeURIComponent(polish))]);
    }
    if (symmetry) {
      setSelectedSymmetry([...JSON.parse(decodeURIComponent(symmetry))]);
    }
    if (country) {
      const selected_countries = [...JSON.parse(decodeURIComponent(country))];
      setSelectedCountry([
        ...countryListForSearch.filter((data) =>
          selected_countries.includes(data.country)
        ),
      ]);
    }
    if (eye_clean) {
      const selected_eye_clean = [...JSON.parse(decodeURIComponent(eye_clean))];
      setSelectedEyeClean([
        ...diamondEyeCleanList.filter((data) =>
          selected_eye_clean.includes(data.value)
        ),
      ]);
    }
    if (discount) {
      setDiscountRange({ ...JSON.parse(decodeURIComponent(discount)) });
    }
    if (price_per_carat) {
      setPricePerCaratRange({
        ...JSON.parse(decodeURIComponent(price_per_carat)),
      });
    }
    if (total_price) {
      setTotalPriceRange({ ...JSON.parse(decodeURIComponent(total_price)) });
    }
    if (lab_grown_type) {
      setSelectedLabGrownType([
        ...JSON.parse(decodeURIComponent(lab_grown_type)),
      ]);
    }
    if (table_percentage) {
      setTablePercentageRange({
        ...JSON.parse(decodeURIComponent(table_percentage)),
      });
    }
    if (depth_percentage) {
      setDepthPercentageRange({
        ...JSON.parse(decodeURIComponent(depth_percentage)),
      });
    }
    if (length) {
      setLengthRange({ ...JSON.parse(decodeURIComponent(length)) });
    }
    if (width) {
      setWidthRange({ ...JSON.parse(decodeURIComponent(width)) });
    }
    if (ratio) {
      setRatioRange({ ...JSON.parse(decodeURIComponent(ratio)) });
    }
    if (crown_height) {
      setCrownHeightRange({ ...JSON.parse(decodeURIComponent(crown_height)) });
    }
    if (crown_angle) {
      setCrownAngleRange({ ...JSON.parse(decodeURIComponent(crown_angle)) });
    }
    if (pavilion_height) {
      setPavilionHeightRange({
        ...JSON.parse(decodeURIComponent(pavilion_height)),
      });
    }
    if (pavilion_angle) {
      setPavilionAngleRange({
        ...JSON.parse(decodeURIComponent(pavilion_angle)),
      });
    }
    if (girdle_percentage) {
      setGirdlePercentageRange({
        ...JSON.parse(decodeURIComponent(girdle_percentage)),
      });
    }
    if (culet) {
      const selected_culet = [...JSON.parse(decodeURIComponent(culet))];
      const culetOptions =
        diamondType === EDiamondType.NATURAL_DIAMONDS
          ? naturalCuletList
          : labGrownCuletList;
      setSelectedCulet([
        ...culetOptions.filter((data) => selected_culet.includes(data.value)),
      ]);
    }
    if (diamondType === EDiamondType.NATURAL_DIAMONDS) {
      if (contain_key_to_symbol) {
        const containKeyToSymbolList = [
          ...JSON.parse(decodeURIComponent(contain_key_to_symbol)),
        ];
        setSelectedKeyToSymbolIncluded([
          ...diamondKeyToSymbolList.filter((data) =>
            containKeyToSymbolList.includes(data.symbol)
          ),
        ]);
      }
      if (do_not_contain_key_to_symbol) {
        const containKeyToSymbolList = [
          ...JSON.parse(decodeURIComponent(do_not_contain_key_to_symbol)),
        ];
        setSelectedKeyToSymbolExcluded([
          ...diamondKeyToSymbolList.filter((data) =>
            containKeyToSymbolList.includes(data.symbol)
          ),
        ]);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setFilters();
  }, [setFilters]);

  const toggleAdvanceSearch = () => {
    setIsAdvanceSearchOpen((prev) => !prev);
  };

  const shapeSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    let updatedSelectedShapeList = [...selectedShape];
    if (checked) {
      updatedSelectedShapeList.push(value);
    } else {
      updatedSelectedShapeList = updatedSelectedShapeList.filter(
        (shape) => shape !== value
      );
    }

    setSelectedShape([...updatedSelectedShapeList]);
  };

  const labSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    let updatedSelectedLabList = [...selectedLab];
    if (checked) {
      updatedSelectedLabList.push(value);
    } else {
      updatedSelectedLabList = updatedSelectedLabList.filter(
        (lab) => lab !== value
      );
    }

    setSelectedLab([...updatedSelectedLabList]);
  };

  const colorSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    let updatedSelectedColorList = [...selectedColor];
    if (checked) {
      updatedSelectedColorList.push(value);
    } else {
      updatedSelectedColorList = updatedSelectedColorList.filter(
        (color) => color !== value
      );
    }

    setSelectedColor([...updatedSelectedColorList]);
  };

  const claritySelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    let updatedSelectedClarityList = [...selectedClarity];
    if (checked) {
      updatedSelectedClarityList.push(value);
    } else {
      updatedSelectedClarityList = updatedSelectedClarityList.filter(
        (clarity) => clarity !== value
      );
    }

    setSelectedClarity([...updatedSelectedClarityList]);
  };

  const cutSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    let updatedSelectedCutList = [...selectedCut];
    updatedSelectedCutList = updatedSelectedCutList.filter(
      (cut) => cut !== value
    );

    if (checked) {
      updatedSelectedCutList.push(value);
    }

    setSelectedCut([...updatedSelectedCutList]);
  };

  const polishSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    let updatedSelectedPolishList = [...selectedPolish];
    updatedSelectedPolishList = updatedSelectedPolishList.filter(
      (polish) => polish !== value
    );

    if (checked) {
      updatedSelectedPolishList.push(value);
    }
    setSelectedPolish([...updatedSelectedPolishList]);
  };

  const symmetrySelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    let updatedSelectedSymmetryList = [...selectedSymmetry];
    updatedSelectedSymmetryList = updatedSelectedSymmetryList.filter(
      (symmetry) => symmetry !== value
    );

    if (checked) {
      updatedSelectedSymmetryList.push(value);
    }

    setSelectedSymmetry([...updatedSelectedSymmetryList]);
  };

  const getCutCheckboxBasedList = (value: string) => {
    if (value === "gd") {
      return ["id", "ex", "vg", "gd"];
    }
    if (value === "vg") {
      return ["id", "ex", "vg"];
    }
    if (value === "ex") {
      return ["id", "ex"];
    }

    return [];
  };

  useEffect(() => {
    if (
      selectedCut.length ||
      selectedPolish.length ||
      selectedSymmetry.length
    ) {
      const gdFilters = getCutCheckboxBasedList("gd");
      const isAllGdFilterSelected = gdFilters.every(
        (value) =>
          selectedCut.includes(value) &&
          selectedPolish.includes(value) &&
          selectedSymmetry.includes(value)
      );
      if (isAllGdFilterSelected) {
        setSelectedCutCheckboxValue("gd");
        return;
      }

      const vgFilters = getCutCheckboxBasedList("vg");
      const includesGD =
        selectedCut.includes("gd") ||
        selectedPolish.includes("gd") ||
        selectedSymmetry.includes("gd");
      const isAllVgFilterSelected = vgFilters.every(
        (value) =>
          selectedCut.includes(value) &&
          selectedPolish.includes(value) &&
          selectedSymmetry.includes(value)
      );
      if (isAllVgFilterSelected && !includesGD) {
        setSelectedCutCheckboxValue("vg");
        return;
      }

      const exFilters = getCutCheckboxBasedList("ex");
      const includesVG =
        selectedCut.includes("vg") ||
        selectedPolish.includes("vg") ||
        selectedSymmetry.includes("vg");
      const isAllExFilterSelected = exFilters.every(
        (value) =>
          selectedCut.includes(value) &&
          selectedPolish.includes(value) &&
          selectedSymmetry.includes(value)
      );
      if (isAllExFilterSelected && !includesVG && !includesGD) {
        setSelectedCutCheckboxValue("ex");
        return;
      }

      setSelectedCutCheckboxValue("");
    }
  }, [selectedCut, selectedPolish, selectedSymmetry]);

  const checkCutPolishSymmetryHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = e.target;
    const filterValues = ["id", "ex", "vg", "gd"];
    let updatedSelectedSymmetryList = [
      ...selectedSymmetry.filter(
        (symmetry) => !filterValues.includes(symmetry)
      ),
    ];
    let updatedSelectedCutList = [
      ...selectedCut.filter((cut) => !filterValues.includes(cut)),
    ];
    let updatedSelectedPolishList = [
      ...selectedPolish.filter((polish) => !filterValues.includes(polish)),
    ];

    const valuesArray = getCutCheckboxBasedList(value);

    if (checked) {
      updatedSelectedSymmetryList.push(...valuesArray);
      updatedSelectedPolishList.push(...valuesArray);
      updatedSelectedCutList.push(...valuesArray);

      setSelectedCutCheckboxValue(value);
    } else {
      setSelectedCutCheckboxValue("");
    }

    setSelectedCut([...updatedSelectedCutList]);
    setSelectedPolish([...updatedSelectedPolishList]);
    setSelectedSymmetry([...updatedSelectedSymmetryList]);
  };

  const fluorescenceSelectHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = e.target;
    let updatedSelectedFluorescenceList = [...selectedFluorescence];
    updatedSelectedFluorescenceList = updatedSelectedFluorescenceList.filter(
      (fluorescence) => fluorescence !== value
    );

    if (checked) {
      updatedSelectedFluorescenceList.push(value);
    }

    setSelectedFluorescence([...updatedSelectedFluorescenceList]);
  };

  const onNoBGMChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsNoBGM(checked);
    setIsFancyColor(false);
    setSelectedFancyOvertone([]);
    setSelectedFancyColor([]);
    setSelectedFancyIntensity([]);
  };

  const onFancyCheckChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;
    setIsFancyColor(checked);
    setIsNoBGM(false);
    setSelectedColor([]);
  };

  const onCountrySelectChangeHandler = (selectedCountries: any) => {
    setSelectedCountry([...selectedCountries]);
  };

  const onEyeCleanSelectChangeHandler = (selectedEyeCleanList: any) => {
    setSelectedEyeClean([...selectedEyeCleanList]);
  };

  const onCuletSelectChangeHandler = (selectedCuletList: any) => {
    setSelectedCulet([...selectedCuletList]);
  };

  const onContainKeyToSymbolSelectChangeHandler = (
    selectedKeyToSymbolIncludedList: any
  ) => {
    setSelectedKeyToSymbolIncluded([...selectedKeyToSymbolIncludedList]);
  };

  const onNotContainKeyToSymbolChangeHandler = (
    selectedKeyToSymbolExcludedList: any
  ) => {
    setSelectedKeyToSymbolExcluded([...selectedKeyToSymbolExcludedList]);
  };

  const onDiamondTypeChangeHandler = (type: EDiamondType) => {
    router.push(
      `${links.ADVANCE_SEARCH}?${diamondQueryParams.DIAMOND_TYPE}=${type}`
    );
    setIsAdvanceSearchOpen(false);
    setSelectedCulet([]);
    if (type === EDiamondType.LAB_GROWN_DIAMONDS && selectedLab.length) {
      const labGrownLabList = diamondLabList
        .filter((data) => data.diamondType.includes(type))
        .map((lab) => lab.name);
      const newSelectedLabList = selectedLab.filter((labName) =>
        labGrownLabList.includes(labName)
      );

      setSelectedLab([...newSelectedLabList]);
    }
  };

  const handleCaratInput = (prevIndex: number) => {
    if (caratRange[prevIndex].from === "" && caratRange[prevIndex].to === "") {
      return;
    }
    setCaratRange([...caratRange, { from: "", to: "" }]);
  };

  const handleCaratChange = (event: any, index: number) => {
    const { name, value } = event.target;
    const updatedCaratRange: any = [...caratRange];
    updatedCaratRange[index][name] = value;

    let isValid = true;
    for (let index = 0; index < updatedCaratRange.length; index++) {
      const isFromToNotEmpty =
        updatedCaratRange[index].from !== "" &&
        updatedCaratRange[index].to !== "";
      const isFromToValid = isFromToNotEmpty
        ? Number(updatedCaratRange[index].to) >
          Number(updatedCaratRange[index].from)
        : true;
      if (!isFromToValid) {
        isValid = false;
        break;
      }
    }

    setIsCaratRangeValid(isValid);
    setCaratRange(updatedCaratRange);
  };

  const handleDeleteInput = (index: any) => {
    const newArray = [...caratRange];
    newArray.splice(index, 1);
    setCaratRange(newArray);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const isValid =
      isDiscountRangeValid ||
      isPricePerCaratRangeValid ||
      isTotalPriceRangeValid ||
      isTablePercentageRangeValid ||
      isDepthPercentageRangeValid ||
      isLengthRangeValid ||
      isWidthRangeValid ||
      isRatioRangeValid ||
      isCrownHeightRangeValid ||
      isCrownAngleRangeValid ||
      isPavilionHeightRangeValid ||
      isPavilionAngleRangeValid ||
      isGirdlePercentageRangeValid ||
      isCaratRangeValid;

    if (!isValid) {
      return;
    }

    const caratWeight = [];
    for (let index = 0; index < caratRange.length; index++) {
      if (caratRange[index].from !== "" || caratRange[index].to !== "") {
        const range: any = {};
        if (caratRange[index].from !== "") {
          range.from = caratRange[index].from;
        }
        if (caratRange[index].to !== "") {
          range.to = caratRange[index].to;
        }
        if (Object.keys(range).length) {
          caratWeight.push({ ...range });
        }
      }
    }

    const filters: any = {
      diamondType: diamondType,
      isFancyColor: isFancyColor,
      shapeList: selectedShape,
      labList: selectedLab,
      caratWeightList: caratWeight,
      clarityList: selectedClarity,
      florescenceList: selectedFluorescence,
      cutList: selectedCut,
      polishList: selectedPolish,
      symmetryList: selectedSymmetry,
      countryList: selectedCountry,
      eyeCleanList: selectedEyeClean,
      discountRange: discountRange,
      pricePerCaratRange: pricePerCaratRange,
      totalPriceRange: totalPriceRange,
      typeList: selectedLabGrownType,
      tablePercentageRange: tablePercentageRange,
      depthPercentageRange: depthPercentageRange,
      lengthRange: lengthRange,
      widthRange: widthRange,
      ratioRange: ratioRange,
      crownHeightRange: crownHeightRange,
      crownAngleRange: crownAngleRange,
      pavilionHeightRange: pavilionHeightRange,
      pavilionAngleRange: pavilionAngleRange,
      girdlePercentageRange: girdlePercentageRange,
      culetSizeList: selectedCulet,
      keyToSymbolIncludeList: selectedKeyToSymbolIncluded,
      keyToSymbolExcludeList: selectedKeyToSymbolExcluded,
    };

    if (isNoBGM === true) {
      filters.noBGM = isNoBGM;
    }

    if (selectedColor.length || isFancyColor === false) {
      filters.colorList = selectedColor;
      delete filters.fancyColorList;
      delete filters.fancyIntensityList;
      delete filters.fancyOvertoneList;
    } else if (isFancyColor) {
      filters.fancyIntensityList = selectedFancyIntensity.length
        ? selectedFancyIntensity
        : "";
      filters.fancyOvertoneList = selectedFancyOvertone.length
        ? selectedFancyOvertone
        : "";
      filters.fancyColorList = selectedFancyColor.length
        ? selectedFancyColor
        : "";
      delete filters.colorList;
    } else {
      filters.colorList = "";
      filters.fancyIntensityList = "";
      filters.fancyOvertoneList = "";
      filters.fancyColorList = "";
    }

    let searchLink = `${links.SEARCH_RESULT}?${diamondQueryParams.DIAMOND_TYPE}=${diamondType}`;
    searchLink = `${searchLink}&${diamondQueryParams.IS_FANCY_COLOR}=${isFancyColor}`;
    if (isNoBGM === true) {
      searchLink = `${searchLink}&${diamondQueryParams.NO_BGM}=${isNoBGM}`;
    }
    if (selectedShape.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.SHAPE
      }=${encodeURIComponent(JSON.stringify(selectedShape))}`;
      filters.shapeList = selectedShape;
    }
    if (selectedLab.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.LAB
      }=${encodeURIComponent(JSON.stringify(selectedLab))}`;
      filters.labList = selectedLab;
    }
    if (caratWeight.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CARAT
      }=${encodeURIComponent(JSON.stringify(caratWeight))}`;
      filters.caratWeightList = caratWeight;
    }
    if (isFancyColor) {
      if (selectedFancyIntensity) {
        searchLink = `${searchLink}&${
          diamondQueryParams.FANCY_INTENSITY
        }=${encodeURIComponent(
          JSON.stringify([
            ...selectedFancyIntensity.map((intensity) => intensity),
          ])
        )}`;
        filters.fancyIntensityList = selectedFancyIntensity;
      }
      if (selectedFancyOvertone) {
        searchLink = `${searchLink}&${
          diamondQueryParams.FANCY_OVERTONE
        }=${encodeURIComponent(
          JSON.stringify([...selectedFancyOvertone.map((overtone) => overtone)])
        )}`;
        filters.fancyOvertoneList = selectedFancyOvertone;
      }
      if (selectedFancyColor) {
        searchLink = `${searchLink}&${
          diamondQueryParams.FANCY_COLOR
        }=${encodeURIComponent(
          JSON.stringify([...selectedFancyColor.map((color) => color)])
        )}`;
        filters.fancyColorList = selectedFancyColor;
      }
    }

    if (selectedColor.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.COLOR
      }=${encodeURIComponent(JSON.stringify(selectedColor))}`;
      filters.colorList = selectedColor;
    }
    if (selectedClarity.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CLARITY
      }=${encodeURIComponent(JSON.stringify(selectedClarity))}`;
      filters.clarityList = selectedClarity;
    }
    if (selectedFluorescence.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.FLORESCENCE
      }=${encodeURIComponent(JSON.stringify(selectedFluorescence))}`;
      filters.florescenceList = selectedFluorescence;
    }
    if (selectedCut.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CUT
      }=${encodeURIComponent(JSON.stringify(selectedCut))}`;
      filters.cutList = selectedCut;
    }
    if (selectedPolish.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.POLISH
      }=${encodeURIComponent(JSON.stringify(selectedPolish))}`;
      filters.polishList = selectedPolish;
    }
    if (selectedSymmetry.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.SYMMETRY
      }=${encodeURIComponent(JSON.stringify(selectedSymmetry))}`;
      filters.symmetryList = selectedSymmetry;
    }
    if (selectedCountry.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.COUNTRY
      }=${encodeURIComponent(
        JSON.stringify([...selectedCountry.map((data) => data.country)])
      )}`;
      filters.countryList = selectedCountry;
    }
    if (selectedEyeClean.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.EYE_CLEAN
      }=${encodeURIComponent(
        JSON.stringify([...selectedEyeClean.map((data) => data.value)])
      )}`;
      filters.eyeCleanList = selectedEyeClean;
    }
    if (discountRange.from !== "" || discountRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.DISCOUNT
      }=${encodeURIComponent(JSON.stringify(discountRange))}`;
      filters.discountRange = discountRange;
    }
    if (pricePerCaratRange.from !== "" || pricePerCaratRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.PRICE_PER_CARAT
      }=${encodeURIComponent(JSON.stringify(pricePerCaratRange))}`;
      filters.pricePerCaratRange = pricePerCaratRange;
    }
    if (totalPriceRange.from !== "" || totalPriceRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.TOTAL_PRICE
      }=${encodeURIComponent(JSON.stringify(totalPriceRange))}`;
      filters.totalPriceRange = totalPriceRange;
    }
    if (diamondType === EDiamondType.LAB_GROWN_DIAMONDS) {
      if (selectedLabGrownType.length) {
        searchLink = `${searchLink}&${
          diamondQueryParams.LAB_GROWN_TYPE
        }=${encodeURIComponent(JSON.stringify(selectedLabGrownType))}`;
        filters.typeList = selectedLabGrownType;
      }
    }
    if (tablePercentageRange.from !== "" || tablePercentageRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.TABLE_PERCENTAGE
      }=${encodeURIComponent(JSON.stringify(tablePercentageRange))}`;
      filters.tablePercentageRange = tablePercentageRange;
    }
    if (depthPercentageRange.from !== "" || depthPercentageRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.DEPTH_PERCENTAGE
      }=${encodeURIComponent(JSON.stringify(depthPercentageRange))}`;
      filters.depthPercentageRange = depthPercentageRange;
    }
    if (lengthRange.from !== "" || lengthRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.LENGTH
      }=${encodeURIComponent(JSON.stringify(lengthRange))}`;
      filters.lengthRange = lengthRange;
    }
    if (widthRange.from !== "" || widthRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.WIDTH
      }=${encodeURIComponent(JSON.stringify(widthRange))}`;
      filters.widthRange = widthRange;
    }
    if (ratioRange.from !== "" || ratioRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.RATIO
      }=${encodeURIComponent(JSON.stringify(ratioRange))}`;
      filters.ratioRange = ratioRange;
    }
    if (crownHeightRange.from !== "" || crownHeightRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.CROWN_HEIGHT
      }=${encodeURIComponent(JSON.stringify(crownHeightRange))}`;
      filters.crownHeightRange = crownHeightRange;
    }
    if (crownAngleRange.from !== "" || crownAngleRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.CROWN_ANGLE
      }=${encodeURIComponent(JSON.stringify(crownAngleRange))}`;
      filters.crownAngleRange = crownAngleRange;
    }
    if (pavilionHeightRange.from !== "" || pavilionHeightRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.PAVILION_HEIGHT
      }=${encodeURIComponent(JSON.stringify(pavilionHeightRange))}`;
      filters.pavilionHeightRange = pavilionHeightRange;
    }
    if (pavilionAngleRange.from !== "" || pavilionAngleRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.PAVILION_ANGLE
      }=${encodeURIComponent(JSON.stringify(pavilionAngleRange))}`;
      filters.pavilionAngleRange = pavilionAngleRange;
    }
    if (girdlePercentageRange.from !== "" || girdlePercentageRange.to !== "") {
      searchLink = `${searchLink}&${
        diamondQueryParams.GIRDLE_PERCENTAGE
      }=${encodeURIComponent(JSON.stringify(girdlePercentageRange))}`;
      filters.girdlePercentageRange = girdlePercentageRange;
    }
    if (selectedCulet.length) {
      searchLink = `${searchLink}&${
        diamondQueryParams.CULET
      }=${encodeURIComponent(
        JSON.stringify([...selectedCulet.map((data) => data.value)])
      )}`;
      filters.culetSizeList = selectedCulet;
    }
    if (diamondType === EDiamondType.NATURAL_DIAMONDS) {
      if (selectedKeyToSymbolIncluded.length) {
        searchLink = `${searchLink}&${
          diamondQueryParams.CONTAIN_KEY_TO_SYMBOL
        }=${encodeURIComponent(
          JSON.stringify([
            ...selectedKeyToSymbolIncluded.map((data) => data.symbol),
          ])
        )}`;
        filters.keyToSymbolIncludeList = selectedKeyToSymbolIncluded;
      }
      if (selectedKeyToSymbolExcluded.length) {
        searchLink = `${searchLink}&${
          diamondQueryParams.DO_NOT_CONTAIN_KEY_TO_SYMBOL
        }=${encodeURIComponent(
          JSON.stringify([
            ...selectedKeyToSymbolExcluded.map((data) => data.symbol),
          ])
        )}`;
        filters.keyToSymbolExcludeList = selectedKeyToSymbolExcluded;
      }
    }

    saveDiamondSearchApi(filters);
    router.push(encodeURI(searchLink), { scroll: false });
  };

  const handleOnKeyDown = (e: any) => {
    if (e.keyCode === 69) {
      e.preventDefault();
    }
  };

  const handleRangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    property = ""
  ) => {
    const { value, name } = e.target;

    if (property === "discountRange") {
      const updatedDiscountRange: any = { ...discountRange };
      updatedDiscountRange[name] = value;

      const isValid =
        updatedDiscountRange.from !== "" && updatedDiscountRange.to !== ""
          ? Number(updatedDiscountRange.to) > Number(updatedDiscountRange.from)
          : true;

      setIsDiscountRangeValid(isValid);
      setDiscountRange(updatedDiscountRange);

      return;
    }
    if (property === "pricePerCaratRange") {
      const updatedPricePerCaratRange: any = { ...pricePerCaratRange };
      updatedPricePerCaratRange[name] = value;

      const isValid =
        updatedPricePerCaratRange.from !== "" &&
        updatedPricePerCaratRange.to !== ""
          ? Number(updatedPricePerCaratRange.to) >
            Number(updatedPricePerCaratRange.from)
          : true;

      setIsPricePerCaratRangeValid(isValid);
      setPricePerCaratRange(updatedPricePerCaratRange);

      return;
    }
    if (property === "totalPriceRange") {
      const updatedTotalPriceRange: any = { ...totalPriceRange };
      updatedTotalPriceRange[name] = value;

      const isValid =
        updatedTotalPriceRange.from !== "" && updatedTotalPriceRange.to !== ""
          ? Number(updatedTotalPriceRange.to) >
            Number(updatedTotalPriceRange.from)
          : true;

      setIsTotalPriceRangeValid(isValid);
      setTotalPriceRange(updatedTotalPriceRange);

      return;
    }
    if (property === "tablePercentageRange") {
      const updatedTablePercentageRange: any = { ...tablePercentageRange };
      updatedTablePercentageRange[name] = value;

      const isValid =
        updatedTablePercentageRange.from !== "" &&
        updatedTablePercentageRange.to !== ""
          ? Number(updatedTablePercentageRange.to) >
            Number(updatedTablePercentageRange.from)
          : true;

      setIsTablePercentageRangeValid(isValid);
      setTablePercentageRange(updatedTablePercentageRange);

      return;
    }
    if (property === "depthPercentageRange") {
      const updatedDepthPercentageRange: any = { ...depthPercentageRange };
      updatedDepthPercentageRange[name] = value;

      const isValid =
        updatedDepthPercentageRange.from !== "" &&
        updatedDepthPercentageRange.to !== ""
          ? Number(updatedDepthPercentageRange.to) >
            Number(updatedDepthPercentageRange.from)
          : true;

      setIsDepthPercentageRangeValid(isValid);
      setDepthPercentageRange(updatedDepthPercentageRange);

      return;
    }
    if (property === "lengthRange") {
      const updatedLengthRange: any = { ...lengthRange };
      updatedLengthRange[name] = value;

      const isValid =
        updatedLengthRange.from !== "" && updatedLengthRange.to !== ""
          ? Number(updatedLengthRange.to) > Number(updatedLengthRange.from)
          : true;

      setIsLengthRangeValid(isValid);
      setLengthRange(updatedLengthRange);

      return;
    }
    if (property === "widthRange") {
      const updatedWidthRange: any = { ...widthRange };
      updatedWidthRange[name] = value;

      const isValid =
        updatedWidthRange.from !== "" && updatedWidthRange.to !== ""
          ? Number(updatedWidthRange.to) > Number(updatedWidthRange.from)
          : true;

      setIsWidthRangeValid(isValid);
      setWidthRange(updatedWidthRange);

      return;
    }
    if (property === "ratioRange") {
      const updatedRatioRange: any = { ...ratioRange };
      updatedRatioRange[name] = value;

      const isValid =
        updatedRatioRange.from !== "" && updatedRatioRange.to !== ""
          ? Number(updatedRatioRange.to) > Number(updatedRatioRange.from)
          : true;

      setIsRatioRangeValid(isValid);
      setRatioRange(updatedRatioRange);

      return;
    }
    if (property === "crownHeightRange") {
      const updatedCrownHeightRange: any = { ...crownHeightRange };
      updatedCrownHeightRange[name] = value;

      const isValid =
        updatedCrownHeightRange.from !== "" && updatedCrownHeightRange.to !== ""
          ? Number(updatedCrownHeightRange.to) >
            Number(updatedCrownHeightRange.from)
          : true;

      setIsCrownHeightRangeValid(isValid);
      setCrownHeightRange(updatedCrownHeightRange);

      return;
    }
    if (property === "crownAngleRange") {
      const updatedCrownAngleRange: any = { ...crownAngleRange };
      updatedCrownAngleRange[name] = value;

      const isValid =
        updatedCrownAngleRange.from !== "" && updatedCrownAngleRange.to !== ""
          ? Number(updatedCrownAngleRange.to) >
            Number(updatedCrownAngleRange.from)
          : true;

      setIsCrownAngleRangeValid(isValid);
      setCrownAngleRange(updatedCrownAngleRange);

      return;
    }
    if (property === "pavilionHeightRange") {
      const updatedPavilionHeightRange: any = { ...pavilionHeightRange };
      updatedPavilionHeightRange[name] = value;

      const isValid =
        updatedPavilionHeightRange.from !== "" &&
        updatedPavilionHeightRange.to !== ""
          ? Number(updatedPavilionHeightRange.to) >
            Number(updatedPavilionHeightRange.from)
          : true;

      setIsPavilionHeightRangeValid(isValid);
      setPavilionHeightRange(updatedPavilionHeightRange);

      return;
    }
    if (property === "pavilionAngleRange") {
      const updatedPavilionAngleRange: any = { ...pavilionAngleRange };
      updatedPavilionAngleRange[name] = value;

      const isValid =
        updatedPavilionAngleRange.from !== "" &&
        updatedPavilionAngleRange.to !== ""
          ? Number(updatedPavilionAngleRange.to) >
            Number(updatedPavilionAngleRange.from)
          : true;

      setIsPavilionAngleRangeValid(isValid);
      setPavilionAngleRange(updatedPavilionAngleRange);

      return;
    }
    if (property === "girdlePercentageRange") {
      const updatedGirdlePercentageRange: any = { ...girdlePercentageRange };
      updatedGirdlePercentageRange[name] = value;

      const isValid =
        updatedGirdlePercentageRange.from !== "" &&
        updatedGirdlePercentageRange.to !== ""
          ? Number(updatedGirdlePercentageRange.to) >
            Number(updatedGirdlePercentageRange.from)
          : true;

      setIsGirdlePercentageRangeValid(isValid);
      setGirdlePercentageRange(updatedGirdlePercentageRange);

      return;
    }
  };

  const onLabGrownTypeSelectChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = e.target;
    let updatedSelectedLabGrownTypeList = [...selectedLabGrownType];
    updatedSelectedLabGrownTypeList = updatedSelectedLabGrownTypeList.filter(
      (type) => type !== value
    );

    if (checked) {
      updatedSelectedLabGrownTypeList.push(value);
    }

    setSelectedLabGrownType([...updatedSelectedLabGrownTypeList]);
  };

  const onFancyColorSelectChangeHandler = (selectedFancyColorList: any) => {
    const values = selectedFancyColorList.map(
      (item: { display: string; value: string }) => item.value
    );
    setSelectedFancyColor(values);
  };

  const onFancyIntensitySelectChangeHandler = (
    selectedFancyIntensityList: any
  ) => {
    const values = selectedFancyIntensityList.map(
      (item: { display: string; value: string }) => item.value
    );
    setSelectedFancyIntensity(values);
  };

  const onFancyOvertoneSelectChangeHandler = (
    selectedFancyOvertoneList: any
  ) => {
    const values = selectedFancyOvertoneList.map(
      (item: { display: string; value: string }) => item.value
    );
    setSelectedFancyOvertone(values);
  };

  const onResetClickHandler = () => {
    setIsDiscountRangeValid(true);
    setIsPricePerCaratRangeValid(true);
    setIsTotalPriceRangeValid(true);
    setIsTablePercentageRangeValid(true);
    setIsDepthPercentageRangeValid(true);
    setIsLengthRangeValid(true);
    setIsWidthRangeValid(true);
    setIsRatioRangeValid(true);
    setIsCrownHeightRangeValid(true);
    setIsCrownAngleRangeValid(true);
    setIsPavilionHeightRangeValid(true);
    setIsPavilionAngleRangeValid(true);
    setIsGirdlePercentageRangeValid(true);
    setSelectedCountry([]);
    setSelectedCulet([]);
    setSelectedEyeClean([]);
    setSelectedKeyToSymbolExcluded([]);
    setSelectedKeyToSymbolIncluded([]);
    setCaratRange([{ from: "", to: "" }]);
    setSelectedShape([]);
    setSelectedLab([]);
    setSelectedColor([]);
    setSelectedClarity([]);
    setSelectedCut([]);
    setSelectedPolish([]);
    setSelectedSymmetry([]);
    setSelectedFluorescence([]);
    setIsNoBGM(false);
    setDiscountRange({ from: "", to: "" });
    setPricePerCaratRange({ from: "", to: "" });
    setTotalPriceRange({ from: "", to: "" });
    setTablePercentageRange({ from: "", to: "" });
    setDepthPercentageRange({ from: "", to: "" });
    setLengthRange({ from: "", to: "" });
    setWidthRange({ from: "", to: "" });
    setRatioRange({ from: "", to: "" });
    setCrownHeightRange({ from: "", to: "" });
    setCrownAngleRange({ from: "", to: "" });
    setPavilionHeightRange({ from: "", to: "" });
    setPavilionAngleRange({ from: "", to: "" });
    setGirdlePercentageRange({ from: "", to: "" });
    setSelectedFancyColor([]);
    setSelectedFancyIntensity([]);
    setSelectedFancyOvertone([]);
    setIsFancyColor(false);
    setSelectedLabGrownType([]);
    setSelectedCutCheckboxValue("");
    router.push(links.ADVANCE_SEARCH);
  };

  const culetList =
    diamondType === EDiamondType.NATURAL_DIAMONDS
      ? naturalCuletList
      : labGrownCuletList;

  const inputClassColor = isTypeNatural ? "" : "bg-tertiary-alt/30";
  const scrollBarClass = isTypeNatural ? "scrollbox" : "scrollbar-green";
  const resetButtonClass = `btn-lg ${
    isTypeNatural
      ? "btn-tertiary-outline hover:!bg-white hover:!text-tertiary"
      : "btn-tertiary-alt-outline"
  }`;
  const searchButtonClass = `btn-lg ${
    isTypeNatural ? "btn-tertiary" : "btn-tertiary-alt"
  }`;
  const selectClasses = {
    option: (state: any) =>
      state.isSelected
        ? isTypeNatural
          ? "!bg-tertiary"
          : "!bg-tertiary-alt"
        : "",
    control: (state: any) =>
      state.isFocused
        ? isTypeNatural
          ? "!ring-1 !ring-tertiary"
          : "!ring-1 !ring-tertiary-alt"
        : isTypeNatural
        ? "!bg-dashboard_primary"
        : "!bg-tertiary-alt/15",
  };

  return (
    <section>
      <div className="container">
        <div className="flex flex-row items-center justify-center gap-x-6 py-6 flex-wrap max-[640px]:gap-y-3">
          <ButtonComponent
            buttonText="Natural Diamond"
            active={diamondType === EDiamondType.NATURAL_DIAMONDS}
            handleTabOnClick={() => {
              onDiamondTypeChangeHandler(EDiamondType.NATURAL_DIAMONDS);
            }}
          />
          <ButtonComponent
            buttonText="Lab Grown Diamond"
            active={diamondType === EDiamondType.LAB_GROWN_DIAMONDS}
            handleTabOnClick={() => {
              onDiamondTypeChangeHandler(EDiamondType.LAB_GROWN_DIAMONDS);
            }}
            activeClass="bg-tertiary-alt border-tertiary-alt text-white"
            hoverClass="hover:bg-tertiary-alt hover:border-tertiary-alt hover:text-white"
          />
        </div>
        <form
          className="bg-white rounded-[12px] pb-[55px]"
          onSubmit={handleFormSubmit}
        >
          <div className="max-w-full ">
            <div className="max-w-full w-full grid grid-cols-2">
              <div className="border-r-[1px] border-primary/20 max-[768px]:col-span-2 max-[768px]:border-r-0 max-[768px]:border-b-[1px]">
                <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                  Shape
                </span>
                <ul
                  className={`flex gap-5 overflow-y-auto py-4 px-5 ${scrollBarClass}`}
                >
                  {diamondShapes.map((shape: any, index: any) => {
                    return (
                      <li
                        key={`diamond-shape-options-${index}`}
                        className="max-w-full w-full"
                      >
                        <div className="flex flex-col cursor-pointer relative">
                          <input
                            type="checkbox"
                            id={`checkbox-shape-${index}`}
                            className="cursor-pointer absolute w-full h-full appearance-none peer/shape"
                            onChange={shapeSelectHandler}
                            value={shape.value}
                            checked={selectedShape.includes(shape.value)}
                          />
                          <div
                            className={`${
                              isTypeNatural
                                ? "bg-dashboard_primary peer-checked/shape:bg-tertiary/30"
                                : "bg-tertiary-alt/30 peer-checked/shape:bg-tertiary-alt"
                            } mb-[5px] rounded-[10px] p-[10px] `}
                          >
                            <div className="w-9 h-8 flex justify-center items-center">
                              <Image src={shape.icon} alt="shape icon" />
                            </div>
                          </div>
                          <label
                            htmlFor={`checkbox-shape-${index}`}
                            className="font-poppins text-xs capitalize text-center peer-checked/shape:font-medium"
                          >
                            {shape.name}
                          </label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="max-[768px]:col-span-2 max-[768px]:border-b-[1px] border-primary/20">
                <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                  Lab
                </span>
                <ul
                  className={`flex gap-5 overflow-y-auto px-5 pt-4 pb-7 ${scrollBarClass}`}
                >
                  {diamondLabList.map((lab: any, index: any) => {
                    return (
                      <>
                        {lab.diamondType.includes(diamondType) ? (
                          <li key={`diamond-lab-options-${index}`}>
                            <div className="flex flex-col cursor-pointer relative">
                              <input
                                type="checkbox"
                                id={`checkbox-lab-${index}`}
                                className="cursor-pointer w-full h-full absolute appearance-none peer/lab"
                                onChange={labSelectHandler}
                                value={lab.name}
                                checked={selectedLab.includes(lab.name)}
                              />
                              <div
                                className={`${
                                  isTypeNatural
                                    ? "bg-dashboard_primary peer-checked/lab:bg-tertiary/30"
                                    : "bg-tertiary-alt/30 peer-checked/lab:bg-tertiary-alt"
                                } mb-[5px] rounded-[10px] p-[10px]`}
                              >
                                <div className="w-9 h-8 flex justify-center items-center ">
                                  <Image
                                    src={lab.icon}
                                    alt="diamond lab icon"
                                  />
                                </div>
                              </div>
                              <label
                                htmlFor={`checkbox-lab-${index}`}
                                className="font-poppins text-xs uppercase text-center peer-checked/lab:font-medium"
                              >
                                {lab.name}
                              </label>
                            </div>
                          </li>
                        ) : null}
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="max-w-full w-full grid grid-cols-2">
              <div className="border-r-[1px] border-primary/20 max-[768px]:col-span-2 max-[768px]:border-r-0 max-[768px]:border-b-[1px]">
                <div className="border-b-[1px] border-primary/20">
                  <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                    Carat
                  </span>
                  <div>
                    {caratRange.map((range, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4 flex-wrap"
                        >
                          <InputComponent
                            type="number"
                            placeholder="From"
                            value={range.from}
                            handleChange={(event: any) =>
                              handleCaratChange(event, index)
                            }
                            onKeyDown={handleOnKeyDown}
                            name="from"
                            step="any"
                            className={`${
                              !isCaratRangeValid &&
                              Number(caratRange[index].to) <=
                                Number(caratRange[index].from)
                                ? "border border-red-600 bg-red-100"
                                : ""
                            }`}
                          />
                          <InputComponent
                            type="number"
                            placeholder="To"
                            value={range.to}
                            handleChange={(event: any) =>
                              handleCaratChange(event, index)
                            }
                            onKeyDown={handleOnKeyDown}
                            name="to"
                            step="any"
                            className={`${
                              !isCaratRangeValid &&
                              Number(caratRange[index].to) <=
                                Number(caratRange[index].from)
                                ? "border border-red-600 bg-red-100"
                                : ""
                            }`}
                          />
                          {caratRange.length > 1 && (
                            <button
                              className={`${
                                isTypeNatural
                                  ? "bg-tertiary"
                                  : "bg-tertiary-alt"
                              } rounded-[5px] flex justify-center items-center p-[10px] w-[32px] h-[32px]`}
                              type="button"
                              onClick={() => handleDeleteInput(index)}
                            >
                              <Image src={delete_icon_img} alt="" />
                            </button>
                          )}
                          {index === caratRange.length - 1 && (
                            <button
                              className={`${
                                isTypeNatural
                                  ? "bg-tertiary"
                                  : "bg-tertiary-alt"
                              } rounded-[5px] flex justify-center items-center p-[10px]`}
                              type="button"
                              onClick={() => handleCaratInput(index)}
                            >
                              <Image src={plus_sign_img} alt="" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="border-b-[1px] border-primary/20">
                  <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                    Clarity
                  </span>
                  <ul
                    className={`flex gap-5 py-6 px-5 overflow-y-auto ${scrollBarClass}`}
                  >
                    {diamondClarity.map((clarity: any, index: any) => {
                      return (
                        <li
                          key={`diamond-clarity-options-${index}`}
                          className="relative"
                        >
                          <input
                            type="checkbox"
                            className="absolute inset-0 appearance-none peer/clarity cursor-pointer"
                            name="checkbox-clarity"
                            value={clarity.code}
                            onChange={claritySelectHandler}
                            checked={selectedClarity.includes(clarity.code)}
                          />
                          <label
                            className={`py-2 px-4 rounded-md font-poppins text-xs uppercase ${
                              isTypeNatural
                                ? "bg-dashboard_primary peer-checked/clarity:bg-tertiary/30"
                                : "bg-tertiary-alt/30 peer-checked/clarity:bg-tertiary-alt"
                            } peer-checked/clarity:font-medium`}
                          >
                            {clarity.code}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                    Fluorescence
                  </span>
                  <ul
                    className={`flex gap-5 py-4 px-5 overflow-y-auto ${scrollBarClass}`}
                  >
                    {diamondFluorescence.map(
                      (fluorescence: any, index: any) => {
                        return (
                          <li key={`diamond-fluorescence-options-${index}`}>
                            <div className="relative">
                              <input
                                type="checkbox"
                                className="absolute inset-0 appearance-none peer/fluorescence cursor-pointer"
                                name="checkbox-fluorescence"
                                value={fluorescence.name}
                                onChange={fluorescenceSelectHandler}
                                checked={selectedFluorescence.includes(
                                  fluorescence.name
                                )}
                              />
                              <p
                                className={`py-[10px] w-max px-4 ${
                                  isTypeNatural
                                    ? "bg-dashboard_primary peer-checked/fluorescence:bg-tertiary/30"
                                    : "bg-tertiary-alt/30 peer-checked/fluorescence:bg-tertiary-alt"
                                } rounded-md uppercase font-poppins text-xs peer-checked/fluorescence:font-medium`}
                              >
                                {fluorescence.name}
                              </p>
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
                <div className="grid grid-cols-2 border-t-[1px] border-primary/20">
                  <div className="lg:border-r-[1px] max-[768px]:border-r-[1px] md:border-r-[1px] border-primary/20   lg:col-span-1 max-[768px]:col-span-1 max-[480px]:col-span-2 max-[480px]:border-r-0 max-[480px]:border-b-[1px]">
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Location
                    </span>
                    <div className="pt-8 pb-4 px-5">
                      <Select
                        isMulti
                        name="country"
                        getOptionLabel={(e) => e.country}
                        getOptionValue={(e) => e.country}
                        options={countryListForSearch}
                        onChange={onCountrySelectChangeHandler}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        value={selectedCountry}
                        id="select-inp-country"
                        classNames={selectClasses}
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-1 max-[768px]:col-span-1 max-[480px]:col-span-2">
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Eye Clean
                    </span>
                    <div className="pt-8 pb-4 px-5">
                      <Select
                        isMulti
                        name="eyeClean"
                        getOptionLabel={(e) => e.display}
                        getOptionValue={(e) => e.value}
                        options={diamondEyeCleanList}
                        onChange={onEyeCleanSelectChangeHandler}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        value={selectedEyeClean}
                        id="select-inp-eye-clean"
                        classNames={selectClasses}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-[768px]:col-span-2">
                <div className="border-b-[1px] border-primary/20">
                  <div className="advance-search-label border-b border-primary/40 flex flex-wrap max-[640px]:gap-y-1 flex-row justify-start items-center">
                    <span className="max-w-full flex flex-col md:mr-9 sm:mr-4 max-[640px]:mr-3 ">
                      Color
                    </span>
                    <div className="flex justify-center items-center mr-5">
                      <input
                        type="checkbox"
                        className={`mr-1 ${
                          isTypeNatural
                            ? "accent-tertiary"
                            : "accent-tertiary-alt"
                        } w-3.5 h-3.5 cursor-pointer`}
                        id="checkbox-no-bgm"
                        onChange={onNoBGMChangeHandler}
                        checked={isNoBGM}
                      />
                      <label
                        htmlFor="checkbox-no-bgm"
                        className="font-poppins text-xs cursor-pointer"
                      >
                        No BGM
                      </label>
                    </div>
                    <div className="flex justify-center items-center mr-5">
                      <input
                        type="checkbox"
                        className={`mr-1 ${
                          isTypeNatural
                            ? "accent-tertiary"
                            : "accent-tertiary-alt"
                        } w-3.5 h-3.5 cursor-pointer`}
                        id="checkbox-fancy-color"
                        onChange={onFancyCheckChangeHandler}
                        checked={isFancyColor}
                      />
                      <label
                        htmlFor="checkbox-fancy-color"
                        className="font-poppins text-xs cursor-pointer"
                      >
                        Fancy Color
                      </label>
                    </div>
                  </div>
                  <div
                    className={`border ${
                      isTypeNatural
                        ? "border-t-tertiary"
                        : "border-t-tertiary-alt"
                    } shadow-md grid lg:grid-cols-3 gap-3 px-2 py-4 ${
                      isFancyColor ? "" : "!hidden"
                    }`}
                  >
                    <div className="px-2 grid gap-2">
                      <label className="font-poppins text-sm">Intensity</label>
                      <Select
                        isMulti
                        name="intensity"
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        getOptionLabel={(e) => e.display}
                        getOptionValue={(e) => e.value}
                        options={diamondFancyIntensityList}
                        onChange={onFancyIntensitySelectChangeHandler}
                        value={diamondFancyIntensityList.filter((item) =>
                          selectedFancyIntensity.includes(item.value)
                        )}
                        id="select-inp-fancy-intensity"
                        classNames={selectClasses}
                      />
                    </div>
                    <div className="px-2 grid gap-2">
                      <label className="font-poppins text-sm">Overtone</label>
                      <Select
                        isMulti
                        name="overtone"
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        getOptionLabel={(e) => e.display}
                        getOptionValue={(e) => e.value}
                        options={diamondFancyOvertoneList}
                        onChange={onFancyOvertoneSelectChangeHandler}
                        value={diamondFancyOvertoneList.filter((item) =>
                          selectedFancyOvertone.includes(item.value)
                        )}
                        id="select-inp-fancy-overtone"
                        classNames={selectClasses}
                      />
                    </div>
                    <div className="px-2 grid gap-2">
                      <label className="font-poppins text-sm">Color</label>
                      <Select
                        isMulti
                        name="fancy-color"
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        getOptionLabel={(e) => e.display}
                        getOptionValue={(e) => e.value}
                        options={diamondFancyColorList}
                        onChange={onFancyColorSelectChangeHandler}
                        value={diamondFancyColorList.filter((item) =>
                          selectedFancyColor.includes(item.value)
                        )}
                        id="select-inp-fancy-color"
                        classNames={selectClasses}
                      />
                    </div>
                  </div>
                  <ul
                    className={`flex gap-5 pt-4 pb-2 overflow-y-auto ${scrollBarClass} px-4`}
                  >
                    {diamondColorList.map((color: any, index: any) => {
                      return (
                        <li key={`diamond-color-options-${index}`}>
                          <div className="w-[60px] relative">
                            <input
                              type="checkbox"
                              className="absolute inset-0 appearance-none peer/color cursor-pointer"
                              name="checkbox-color"
                              value={color.name}
                              onChange={colorSelectHandler}
                              checked={selectedColor.includes(color.name)}
                              disabled={isFancyColor === true}
                            />
                            <p
                              className={`font-poppins text-xs text-center uppercase ${
                                isTypeNatural
                                  ? "bg-dashboard_primary peer-checked/color:bg-tertiary/30"
                                  : "bg-tertiary-alt/30 peer-checked/color:bg-tertiary-alt"
                              }  py-2 rounded-md peer-checked/color:font-medium`}
                            >
                              {color.name}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="border-b-[1px] border-primary/20">
                  <div className="advance-search-label border-b border-primary/40 flex flex-wrap max-[640px]:gap-y-1 flex-row justify-start items-center py-3">
                    <span className="max-w-full flex flex-col md:mr-9 sm:mr-4 max-[640px]:mr-3">
                      Cut
                    </span>
                    <div className="font-poppins font-normal text-xs leading-[14px] flex flex-row justify-center mr-4">
                      <input
                        type="checkbox"
                        id="checkbox-id-ex"
                        name="checkbox-all-ex"
                        value="ex"
                        className={`mr-[6px] ${
                          isTypeNatural
                            ? "accent-tertiary"
                            : "accent-tertiary-alt"
                        } min-w-4 cursor-pointer`}
                        onChange={checkCutPolishSymmetryHandler}
                        checked={selectedCutCheckboxValue === "ex"}
                      />
                      <label
                        htmlFor="checkbox-id-ex"
                        className="cursor-pointer"
                      >
                        3 EX+
                      </label>
                    </div>
                    <div className="font-poppins font-normal text-xs leading-[14px] flex flex-row justify-center mr-4">
                      <input
                        type="checkbox"
                        id="checkbox-id-vg"
                        name="checkbox-all-vg"
                        value="vg"
                        className={`mr-[6px] ${
                          isTypeNatural
                            ? "accent-tertiary"
                            : "accent-tertiary-alt"
                        } min-w-4 cursor-pointer`}
                        onChange={checkCutPolishSymmetryHandler}
                        checked={selectedCutCheckboxValue === "vg"}
                      />
                      <label
                        htmlFor="checkbox-id-vg"
                        className="cursor-pointer"
                      >
                        3 VG+
                      </label>
                    </div>
                    <div className="font-poppins font-normal text-xs leading-[14px] flex flex-row justify-center mr-4">
                      <input
                        type="checkbox"
                        id="checkbox-id-gd"
                        name="checkbox-all-gd"
                        value="gd"
                        className={`mr-[6px] ${
                          isTypeNatural
                            ? "accent-tertiary"
                            : "accent-tertiary-alt"
                        } min-w-4 cursor-pointer`}
                        onChange={checkCutPolishSymmetryHandler}
                        checked={selectedCutCheckboxValue === "gd"}
                      />
                      <label
                        htmlFor="checkbox-id-gd"
                        className="cursor-pointer"
                      >
                        3 GD+
                      </label>
                    </div>
                  </div>
                  <ul
                    className={`flex gap-5 py-3 px-5 overflow-y-auto ${scrollBarClass}`}
                  >
                    {diamondCutList.map((cut: any, index: any) => {
                      return (
                        <li key={`diamond-cut-options-${index}`}>
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="absolute inset-0 appearance-none peer/cut cursor-pointer"
                              name="checkbox-cut"
                              value={cut.code}
                              onChange={cutSelectHandler}
                              checked={selectedCut.includes(cut.code)}
                            />
                            <p
                              className={`py-2 px-4 ${
                                isTypeNatural
                                  ? "bg-dashboard_primary peer-checked/cut:bg-tertiary/30"
                                  : "bg-tertiary-alt/30 peer-checked/cut:bg-tertiary-alt"
                              } rounded-md uppercase font-poppins text-xs peer-checked/cut:font-medium`}
                            >
                              {cut.code}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="border-b-[1px] border-primary/20">
                  <div className="advance-search-label border-b border-primary/40 flex flex-row justify-start items-center pt-2 pb-[5px]">
                    <span className="  max-w-full  flex flex-col mr-9">
                      Polish
                    </span>
                  </div>
                  <ul
                    className={`flex gap-5 py-3 pl-5 overflow-y-auto ${scrollBarClass}`}
                  >
                    {diamondPolishList.map((polish: any, index: any) => {
                      return (
                        <li key={`diamond-polish-options-${index}`}>
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="absolute inset-0 appearance-none peer/polish cursor-pointer"
                              name="checkbox-polish"
                              value={polish.code}
                              onChange={polishSelectHandler}
                              checked={selectedPolish.includes(polish.code)}
                            />
                            <p
                              className={`py-2 px-4 ${
                                isTypeNatural
                                  ? "bg-dashboard_primary peer-checked/polish:bg-tertiary/30"
                                  : "bg-tertiary-alt/30 peer-checked/polish:bg-tertiary-alt"
                              } rounded-md uppercase font-poppins text-xs peer-checked/polish:font-medium`}
                            >
                              {polish.code}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="border-b-[1px] border-primary/20">
                  <div className="advance-search-label border-b border-primary/40 flex flex-row justify-start items-center pt-2 pb-[5px]">
                    <span className="  max-w-full  flex flex-col mr-9">
                      Symmetry
                    </span>
                  </div>
                  <ul
                    className={`flex gap-5 py-3 px-5 overflow-y-auto ${scrollBarClass}`}
                  >
                    {diamondSymmetryList.map((symmetry: any, index: any) => {
                      return (
                        <li key={`diamond-symmetry-options-${index}`}>
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="absolute inset-0 appearance-none peer/symmetry cursor-pointer"
                              name="checkbox-symmetry"
                              value={symmetry.code}
                              onChange={symmetrySelectHandler}
                              checked={selectedSymmetry.includes(symmetry.code)}
                            />
                            <p
                              className={`py-2 px-4 ${
                                isTypeNatural
                                  ? "bg-dashboard_primary peer-checked/symmetry:bg-tertiary/30"
                                  : "bg-tertiary-alt/30 peer-checked/symmetry:bg-tertiary-alt"
                              } rounded-md uppercase font-poppins text-xs peer-checked/symmetry:font-medium`}
                            >
                              {symmetry.code}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 border-t-[1px] border-b-[1px] border-primary/20">
            <div className="border-r-[1px] max-[768px]:border-b-[1px] md:border-b-[1px] lg:border-b-0 border-primary/20 sm:col-span-2 md:col-span-2 lg:col-span-1 max-[640px]:col-span-2 max-[525px]:col-span-4 max-[525px]:border-r-0">
              <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                Disc % Range
              </span>
              <div className="pt-8 pb-4 px-5 flex flex-row gap-4">
                <InputComponent
                  type="number"
                  placeholder="From"
                  className={`max-w-[48%] ${
                    !isDiscountRangeValid
                      ? "border border-red-600 bg-red-100"
                      : inputClassColor
                  }`}
                  name="from"
                  handleChange={(e: any) => {
                    handleRangeInput(e, "discountRange");
                  }}
                  onKeyDown={handleOnKeyDown}
                  step="any"
                  value={discountRange.from}
                />

                <InputComponent
                  type="number"
                  placeholder="To"
                  className={`max-w-[48%] ${
                    !isDiscountRangeValid
                      ? "border border-red-600 bg-red-100"
                      : inputClassColor
                  }`}
                  name="to"
                  handleChange={(e: any) => {
                    handleRangeInput(e, "discountRange");
                  }}
                  onKeyDown={handleOnKeyDown}
                  step="any"
                  value={discountRange.to}
                />
              </div>
            </div>
            <div className=" lg:border-r-[1px] max-[768px]:border-b-[1px] md:border-b-[1px] lg:border-b-0 md:border-r-0 border-primary/20 sm:col-span-2 md:col-span-2 lg:col-span-1 max-[640px]:col-span-2 max-[525px]:col-span-4">
              <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                Price Per Carat Range $
              </span>
              <div className="pt-8 pb-4 px-5 flex flex-row gap-4">
                <InputComponent
                  type="number"
                  placeholder="From"
                  className={`max-w-[48%] ${
                    !isPricePerCaratRangeValid
                      ? "border border-red-600 bg-red-100"
                      : inputClassColor
                  }`}
                  name="from"
                  handleChange={(e: any) => {
                    handleRangeInput(e, "pricePerCaratRange");
                  }}
                  onKeyDown={handleOnKeyDown}
                  step="any"
                  value={pricePerCaratRange.from}
                />

                <InputComponent
                  type="number"
                  placeholder="To"
                  className={`max-w-[48%] ${
                    !isPricePerCaratRangeValid
                      ? "border border-red-600 bg-red-100"
                      : inputClassColor
                  }`}
                  name="to"
                  handleChange={(e: any) => {
                    handleRangeInput(e, "pricePerCaratRange");
                  }}
                  onKeyDown={handleOnKeyDown}
                  step="any"
                  value={pricePerCaratRange.to}
                />
              </div>
            </div>
            <div className="border-r-[1px]  border-primary/20 sm:col-span-2 md:col-span-2 lg:col-span-1 max-[640px]:col-span-2 max-[525px]:col-span-4 max-[525px]:border-r-0">
              <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                Total Price Range $
              </span>
              <div className="pt-8 pb-4 px-5 flex flex-row gap-4">
                <InputComponent
                  type="number"
                  placeholder="From"
                  className={`max-w-[48%] ${
                    !isTotalPriceRangeValid
                      ? "border border-red-600 bg-red-100"
                      : inputClassColor
                  }`}
                  name="from"
                  handleChange={(e: any) => {
                    handleRangeInput(e, "totalPriceRange");
                  }}
                  onKeyDown={handleOnKeyDown}
                  step="any"
                  value={totalPriceRange.from}
                />

                <InputComponent
                  type="number"
                  placeholder="To"
                  className={`max-w-[48%] ${
                    !isTotalPriceRangeValid
                      ? "border border-red-600 bg-red-100"
                      : inputClassColor
                  }`}
                  name="to"
                  handleChange={(e: any) => {
                    handleRangeInput(e, "totalPriceRange");
                  }}
                  onKeyDown={handleOnKeyDown}
                  step="any"
                  value={totalPriceRange.to}
                />
              </div>
            </div>
            {diamondType === EDiamondType.LAB_GROWN_DIAMONDS ? (
              <div className="border-primary/20  sm:col-span-2 md:col-span-2 lg:col-span-1 max-[640px]:col-span-2 max-[525px]:col-span-4">
                <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                  Type
                </span>
                <div className="pt-8 pb-4 px-5 flex flex-row gap-4">
                  <ul
                    className={`flex gap-5 overflow-y-auto ${scrollBarClass}`}
                  >
                    {Object.values(ELabGrownType).map(
                      (type: any, index: any) => {
                        return (
                          <li key={`lab-grown-type-options-${index}`}>
                            <div className="relative">
                              <input
                                type="checkbox"
                                className="absolute inset-0 appearance-none peer/lab-grown-type cursor-pointer"
                                name="checkbox-lab-grown-type"
                                value={type}
                                onChange={onLabGrownTypeSelectChangeHandler}
                                checked={selectedLabGrownType.includes(type)}
                              />
                              <p
                                className={`py-2 px-4 ${
                                  isTypeNatural
                                    ? "bg-dashboard_primary peer-checked/lab-grown-type:bg-tertiary/30"
                                    : "bg-tertiary-alt/30 peer-checked/lab-grown-type:bg-tertiary-alt"
                                } rounded-md uppercase font-poppins text-xs peer-checked/lab-grown-type:font-medium`}
                              >
                                {type.replace("_")}
                              </p>
                            </div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
          <div className="max-w-full w-full py-[42px]">
            <div
              className={`${
                isTypeNatural ? "bg-tertiary" : "bg-tertiary-alt"
              } flex flex-row justify-between items-center rounded-xl max-w-full w-full py-3 px-8 font-poppins font-semibold text-lg leading-5 text-white max-[768px]:py-3 max-[768px]:px-5 max-[768px]:font-medium max-[768px]:text-base max-[768px]:leading-4`}
            >
              <h4>Advance Search</h4>
              <button onClick={toggleAdvanceSearch} type="button">
                <Image
                  src={arrow_icon}
                  alt="down_icon"
                  width={40}
                  height={40}
                  className={`cursor-pointer w-6 h-6 ${
                    isAdvanceSearchOpen ? "rotate-180" : ""
                  } transition duration-300`}
                />
              </button>
            </div>
            <TECollapse
              style={{ overflow: "visible" }}
              show={isAdvanceSearchOpen}
              className="transition-all duration-300 h-auto"
            >
              <div className="grid lg:grid-cols-4 border-b-[1px] border-primary/20 md:grid-cols-2 ">
                <div className="pl-[18px] pr-6 border-r-[1px] border-primary/20 pt-2">
                  <div>
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Table%
                    </span>
                    <div className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4">
                      <InputComponent
                        type="number"
                        placeholder="From"
                        className={`max-w-[52%] w-full ${
                          !isTablePercentageRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="from"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "tablePercentageRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={tablePercentageRange.from}
                      />

                      <InputComponent
                        type="number"
                        placeholder="To"
                        className={`max-w-[52%] w-full ${
                          !isTablePercentageRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="to"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "tablePercentageRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={tablePercentageRange.to}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Ratio
                    </span>
                    <div className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4">
                      <InputComponent
                        type="number"
                        placeholder="From"
                        className={`max-w-[52%] w-full ${
                          !isRatioRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="from"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "ratioRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={ratioRange.from}
                      />

                      <InputComponent
                        type="number"
                        placeholder="To"
                        className={`max-w-[52%] w-full ${
                          !isRatioRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="to"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "ratioRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={ratioRange.to}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Pavilion Angle
                    </span>
                    <div className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4">
                      <InputComponent
                        type="number"
                        placeholder="From"
                        className={`max-w-[52%] w-full ${
                          !isPavilionAngleRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="from"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "pavilionAngleRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={pavilionAngleRange.from}
                      />

                      <InputComponent
                        type="number"
                        placeholder="To"
                        className={`max-w-[52%] w-full ${
                          !isPavilionAngleRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="to"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "pavilionAngleRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={pavilionAngleRange.to}
                      />
                    </div>
                  </div>
                  {diamondType === EDiamondType.NATURAL_DIAMONDS ? (
                    <div>
                      <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                        Contains Key to symbol
                      </span>
                      <div className="pt-4 pb-5 pl-5">
                        <Select
                          isMulti
                          name="containKeyToSymbol"
                          getOptionLabel={(e) => e.symbol}
                          getOptionValue={(e) => e.symbol.toLowerCase()}
                          options={diamondKeyToSymbolList}
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          value={selectedKeyToSymbolIncluded}
                          onChange={onContainKeyToSymbolSelectChangeHandler}
                          id="select-inp-contain-key-to-symbol"
                          classNames={selectClasses}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="pl-[18px] pr-6 border-r-[1px] border-primary/20 pt-2">
                  <div>
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Total Depth
                    </span>
                    <div className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4">
                      <InputComponent
                        type="number"
                        placeholder="From"
                        className={`max-w-[52%] w-full ${
                          !isDepthPercentageRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="from"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "depthPercentageRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={depthPercentageRange.from}
                      />

                      <InputComponent
                        type="number"
                        placeholder="To"
                        className={`max-w-[52%] w-full ${
                          !isDepthPercentageRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="to"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "depthPercentageRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={depthPercentageRange.to}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Crown Height
                    </span>
                    <div className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4">
                      <InputComponent
                        type="number"
                        placeholder="From"
                        className={`max-w-[52%] w-full ${
                          !isCrownHeightRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="from"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "crownHeightRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={crownHeightRange.from}
                      />

                      <InputComponent
                        type="number"
                        placeholder="To"
                        className={`max-w-[52%] w-full ${
                          !isCrownHeightRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="to"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "crownHeightRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={crownHeightRange.to}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Girdle%
                    </span>
                    <div className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4">
                      <InputComponent
                        type="number"
                        placeholder="From"
                        className={`max-w-[52%] w-full ${
                          !isGirdlePercentageRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="from"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "girdlePercentageRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={girdlePercentageRange.from}
                      />

                      <InputComponent
                        type="number"
                        placeholder="To"
                        className={`max-w-[52%] w-full ${
                          !isGirdlePercentageRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="to"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "girdlePercentageRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={girdlePercentageRange.to}
                      />
                    </div>
                  </div>
                </div>
                <div className="pl-[18px] pr-6 border-r-[1px] border-primary/20 pt-2">
                  <div>
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Length
                    </span>
                    <div className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4">
                      <InputComponent
                        type="number"
                        placeholder="From"
                        className={`max-w-[52%] w-full ${
                          !isLengthRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="from"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "lengthRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={lengthRange.from}
                      />

                      <InputComponent
                        type="number"
                        placeholder="To"
                        className={`max-w-[52%] w-full ${
                          !isLengthRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="to"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "lengthRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={lengthRange.to}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Crown Angle
                    </span>
                    <div className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4">
                      <InputComponent
                        type="number"
                        placeholder="From"
                        className={`max-w-[52%] w-full ${
                          !isCrownAngleRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="from"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "crownAngleRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={crownAngleRange.from}
                      />

                      <InputComponent
                        type="number"
                        placeholder="To"
                        className={`max-w-[52%] w-full ${
                          !isCrownAngleRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="to"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "crownAngleRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={crownAngleRange.to}
                      />
                    </div>
                  </div>

                  <div className="">
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Select Culet
                    </span>
                    <div className="pt-4 pb-5 pl-5 static w-auto z-[10]">
                      <Select
                        isMulti
                        name="culet"
                        getOptionLabel={(e) => e.display}
                        getOptionValue={(e) => e.value}
                        options={culetList}
                        className=""
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={onCuletSelectChangeHandler}
                        value={selectedCulet}
                        id="select-inp-culet"
                        classNames={selectClasses}
                      />
                    </div>
                  </div>
                </div>
                <div className="pl-[18px] pr-6 pt-2">
                  <div>
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Width
                    </span>
                    <div className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4">
                      <InputComponent
                        type="number"
                        placeholder="From"
                        className={`max-w-[52%] w-full ${
                          !isWidthRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="from"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "widthRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={widthRange.from}
                      />

                      <InputComponent
                        type="number"
                        placeholder="To"
                        className={`max-w-[52%] w-full ${
                          !isWidthRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="to"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "widthRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={widthRange.to}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                      Pavilion Height
                    </span>
                    <div className="flex flex-row items-center pt-4 pl-5 pb-5 gap-4">
                      <InputComponent
                        type="number"
                        placeholder="From"
                        className={`max-w-[52%] w-full ${
                          !isPavilionHeightRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="from"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "pavilionHeightRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={pavilionHeightRange.from}
                      />

                      <InputComponent
                        type="number"
                        placeholder="To"
                        className={`max-w-[52%] w-full ${
                          !isPavilionHeightRangeValid
                            ? "border border-red-600 bg-red-100"
                            : inputClassColor
                        }`}
                        name="to"
                        handleChange={(e: any) => {
                          handleRangeInput(e, "pavilionHeightRange");
                        }}
                        onKeyDown={handleOnKeyDown}
                        step="any"
                        value={pavilionHeightRange.to}
                      />
                    </div>
                  </div>

                  {diamondType === EDiamondType.NATURAL_DIAMONDS ? (
                    <div>
                      <span className="advance-search-label border-b border-primary/40 max-w-full w-full flex flex-col">
                        Do not Contain Key To symbol
                      </span>
                      <div className="pt-4 pb-5 pl-5">
                        <Select
                          isMulti
                          name="notContainKeyToSymbol"
                          getOptionLabel={(e) => e.symbol}
                          getOptionValue={(e) => e.symbol.toLowerCase()}
                          options={diamondKeyToSymbolList}
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          value={selectedKeyToSymbolExcluded}
                          onChange={onNotContainKeyToSymbolChangeHandler}
                          id="select-inp-not-contain-key-to-symbol"
                          classNames={selectClasses}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </TECollapse>
          </div>
          <div className="flex flex-row items-center justify-center gap-7">
            <button
              className={resetButtonClass}
              type="reset"
              onClick={onResetClickHandler}
            >
              Reset
            </button>
            <button className={searchButtonClass} type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DiamondSearch;
