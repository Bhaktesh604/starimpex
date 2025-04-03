import { getUserAxiosInstance } from "@/config/axios.config";
import { DiamondSearch } from "@/interfaces/diamond.interface";
import { PAGE_LIMIT } from "@/utils/constants";

export const getDiamondListApi = async (
  skip: number = 0,
  limit: number = PAGE_LIMIT,
  diamondType: string | null = "",
  no_bgm: string | null = "",
  is_fancy_color: string | null = "",
  shape: string | null = "",
  lab: string | null = "",
  carat: string | null = "",
  fancy_intensity: string | null = "",
  fancy_overtone: string | null = "",
  fancy_color: string | null = "",
  color: string | null = "",
  clarity: string | null = "",
  florescence: string | null = "",
  cut: string | null = "",
  polish: string | null = "",
  symmetry: string | null = "",
  country: string | null = "",
  eye_clean: string | null = "",
  discount: string | null = "",
  price_per_carat: string | null = "",
  total_price: string | null = "",
  lab_grown_type: string | null = "",
  table_percentage: string | null = "",
  depth_percentage: string | null = "",
  length: string | null = "",
  width: string | null = "",
  ratio: string | null = "",
  crown_height: string | null = "",
  crown_angle: string | null = "",
  pavilion_height: string | null = "",
  pavilion_angle: string | null = "",
  girdle_percentage: string | null = "",
  culet: string | null = "",
  contain_key_to_symbol: string | null = "",
  do_not_contain_key_to_symbol: string | null = "",
  stoneIds: string | null = "",
  sort_order: string | null = ""
) => {
  let queryParams = `skip=${skip}&limit=${limit}`;
  if (diamondType) {
    queryParams = `${queryParams}&diamondType=${diamondType}`;
  }

  if (stoneIds) {
    queryParams = `${queryParams}&stoneIds=${stoneIds}`;
  }

  if (no_bgm !== null) {
    queryParams = `${queryParams}&noBGM=${no_bgm}`;
  }
  if (is_fancy_color !== null) {
    queryParams = `${queryParams}&isFancyColor=${is_fancy_color}`;
  }
  if (shape) {
    queryParams = `${queryParams}&shapeList=${decodeURIComponent(shape)}`;
  }
  if (lab) {
    queryParams = `${queryParams}&labList=${decodeURIComponent(lab)}`;
  }
  if (carat) {
    queryParams = `${queryParams}&caratWeightList=${decodeURIComponent(carat)}`;
  }
  if (fancy_intensity) {
    queryParams = `${queryParams}&fancyColorList=${decodeURIComponent(
      fancy_intensity
    )}`;
  }
  if (fancy_overtone) {
    queryParams = `${queryParams}&fancyIntensityList=${decodeURIComponent(
      fancy_overtone
    )}`;
  }
  if (fancy_color) {
    queryParams = `${queryParams}&fancyOvertoneList=${decodeURIComponent(
      fancy_color
    )}`;
  }
  if (color) {
    queryParams = `${queryParams}&colorList=${decodeURIComponent(color)}`;
  }
  if (clarity) {
    queryParams = `${queryParams}&clarityList=${decodeURIComponent(clarity)}`;
  }
  if (florescence) {
    queryParams = `${queryParams}&florescenceList=${decodeURIComponent(
      florescence
    )}`;
  }
  if (cut) {
    queryParams = `${queryParams}&cutList=${decodeURIComponent(cut)}`;
  }
  if (polish) {
    queryParams = `${queryParams}&polishList=${decodeURIComponent(polish)}`;
  }
  if (symmetry) {
    queryParams = `${queryParams}&symmetryList=${decodeURIComponent(symmetry)}`;
  }
  if (country) {
    queryParams = `${queryParams}&countryList=${decodeURIComponent(country)}`;
  }
  if (eye_clean) {
    queryParams = `${queryParams}&eyeCleanList=${decodeURIComponent(
      eye_clean
    )}`;
  }
  if (discount) {
    queryParams = `${queryParams}&discountRange=${decodeURIComponent(
      discount
    )}`;
  }
  if (price_per_carat) {
    queryParams = `${queryParams}&pricePerCaratRange=${decodeURIComponent(
      price_per_carat
    )}`;
  }
  if (total_price) {
    queryParams = `${queryParams}&totalPriceRange=${decodeURIComponent(
      total_price
    )}`;
  }
  if (lab_grown_type) {
    queryParams = `${queryParams}&typeList=${decodeURIComponent(
      lab_grown_type
    )}`;
  }
  if (table_percentage) {
    queryParams = `${queryParams}&tablePercentageRange=${decodeURIComponent(
      table_percentage
    )}`;
  }
  if (depth_percentage) {
    queryParams = `${queryParams}&depthPercentageRange=${decodeURIComponent(
      depth_percentage
    )}`;
  }
  if (length) {
    queryParams = `${queryParams}&lengthRange=${decodeURIComponent(length)}`;
  }
  if (width) {
    queryParams = `${queryParams}&widthRange=${decodeURIComponent(width)}`;
  }
  if (ratio) {
    queryParams = `${queryParams}&ratioRange=${decodeURIComponent(ratio)}`;
  }
  if (crown_height) {
    queryParams = `${queryParams}&crownHeightRange=${decodeURIComponent(
      crown_height
    )}`;
  }
  if (crown_angle) {
    queryParams = `${queryParams}&crownAngleRange=${decodeURIComponent(
      crown_angle
    )}`;
  }
  if (pavilion_height) {
    queryParams = `${queryParams}&pavilionHeightRange=${decodeURIComponent(
      pavilion_height
    )}`;
  }
  if (pavilion_angle) {
    queryParams = `${queryParams}&pavilionAngleRange=${decodeURIComponent(
      pavilion_angle
    )}`;
  }
  if (girdle_percentage) {
    queryParams = `${queryParams}&girdlePercentageRange=${decodeURIComponent(
      girdle_percentage
    )}`;
  }
  if (culet) {
    queryParams = `${queryParams}&culetSizeList=${decodeURIComponent(culet)}`;
  }
  if (contain_key_to_symbol) {
    queryParams = `${queryParams}&keyToSymbolIncludeList=${decodeURIComponent(
      contain_key_to_symbol
    )}`;
  }
  if (do_not_contain_key_to_symbol) {
    queryParams = `${queryParams}&keyToSymbolExcludeList=${decodeURIComponent(
      do_not_contain_key_to_symbol
    )}`;
  }
  if (sort_order) {
    queryParams = `${queryParams}&sortOrder=${decodeURIComponent(sort_order)}`;
  }
  const resp = await getUserAxiosInstance().get(`/diamond/list?${queryParams}`);

  return resp.data;
};

export const getDiamondApi = async (diamondId: string = "") => {
  if (!diamondId) {
    return;
  }
  const resp = await getUserAxiosInstance().get(
    `/diamond/details/${diamondId}`
  );

  return resp.data;
};

export const saveDiamondSearchApi = async (filters: DiamondSearch) => {
  const resp = await getUserAxiosInstance().post(`/diamond/search/save`, {
    filters,
  });

  return resp.data;
};

export const exportStonesDetailsToExcel = async (diamondIds: string[] = []) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    diamondIds: diamondIds,
  };

  const resp = await axiosInstance.post(`/diamond/export`, body, {
    responseType: "blob",
  });
  return resp;
};

export const sendStoneDetailsMail = async (
  email: string,
  diamondIds: string[]
) => {
  const axiosInstance = getUserAxiosInstance();
  const body = {
    email: email,
    diamondIds: diamondIds,
  };

  try {
    const resp = await axiosInstance.post(`/diamond/send-excel-mail`, body);
    return resp.data;
  } catch (error) {
    throw error;
  }
};
export const addDiamondNotesApi = async (
  diamondNotes: {
    diamondId: string;
    notes: string;
  }[]
) => {
  if (!diamondNotes) {
    return;
  }

  const resp = await getUserAxiosInstance().put(`/diamond/notes/update`, {
    diamondNotes,
  });

  return resp.data;
};

export const getDiamondCertificateApi = async (diamondId: string = "") => {
  if (!diamondId) {
    return;
  }
  const resp = await getUserAxiosInstance().get(
    `/diamond/certificate/${diamondId}`
  );

  return resp.data;
};

export const getDiamondVideoApi = async (diamondId: string = "") => {
  if (!diamondId) {
    return;
  }
  const resp = await getUserAxiosInstance().get(`/diamond/video/${diamondId}`);

  return resp.data;
};
