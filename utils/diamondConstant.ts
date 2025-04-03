import roundIcon from "@/public/assets/diamond/shape/ic-diamond-shape-round.svg";
import cushionIcon from "@/public/assets/diamond/shape/ic-diamond-shape-cushion.svg";
import marquiseIcon from "@/public/assets/diamond/shape/ic-diamond-shape-marquise.svg";
import pearIcon from "@/public/assets/diamond/shape/ic-diamond-shape-pear.svg";
import princessIcon from "@/public/assets/diamond/shape/ic-diamond-shape-princess.svg";
import heartIcon from "@/public/assets/diamond/shape/ic-diamond-shape-heart.svg";
import ovalIcon from "@/public/assets/diamond/shape/ic-diamond-shape-oval.svg";
import emeraldIcon from "@/public/assets/diamond/shape/ic-diamond-shape-emerald.svg";
import radiantIcon from "@/public/assets/diamond/shape/ic-diamond-shape-radiant.svg";
import squareEmeraldIcon from "@/public/assets/diamond/shape/ic-diamond-shape-square-emerald.svg";
import othersIcon from "@/public/assets/diamond/shape/ic-diamond-shape-others.svg";
import giaIcon from "@/public/assets/diamond/lab/ic-diamond-lab-gia.svg";
import hrdIcon from "@/public/assets/diamond/lab/ic-diamond-lab-hrd.svg";
import igiIcon from "@/public/assets/diamond/lab/ic-diamond-lab-igi.svg";
import fmIcon from "@/public/assets/diamond/lab/ic-diamond-lab-fm.svg";
import ngtcIcon from "@/public/assets/diamond/lab/ic-diamond-lab-ngtc.svg";
import iidgrIcon from "@/public/assets/diamond/lab/ic-diamond-lab-iidgr.svg";
import { EDiamondType } from "@/interfaces/common.interface";
import noneIcon from "@/public/assets/diamond/lab/ic-diamond-lab-none.svg";

export const diamondShapes = [
  {
    icon: roundIcon,
    name: "round",
    value: "round",
  },
  {
    icon: cushionIcon,
    name: "cushion",
    value: "cushion",
  },
  {
    icon: marquiseIcon,
    name: "marquise",
    value: "marquise",
  },
  {
    icon: pearIcon,
    name: "pear",
    value: "pear",
  },
  {
    icon: princessIcon,
    name: "princess",
    value: "princess",
  },
  {
    icon: heartIcon,
    name: "heart",
    value: "heart",
  },
  {
    icon: ovalIcon,
    name: "oval",
    value: "oval",
  },
  {
    icon: emeraldIcon,
    name: "emerald",
    value: "emerald",
  },
  {
    icon: radiantIcon,
    name: "radiant",
    value: "radiant",
  },
  {
    icon: squareEmeraldIcon,
    value: "square emerald",
    name: "square emerald & asscher",
  },
  {
    icon: othersIcon,
    name: "others",
    value: "others",
  },
];

export const diamondLabList = [
  {
    icon: igiIcon,
    name: "igi",
    diamondType: [EDiamondType.LAB_GROWN_DIAMONDS],
  },
  {
    icon: giaIcon,
    name: "gia",
    diamondType: [EDiamondType.NATURAL_DIAMONDS],
  },
  {
    icon: igiIcon,
    name: "igi",
    diamondType: [EDiamondType.NATURAL_DIAMONDS],
  },
  {
    icon: giaIcon,
    name: "gia",
    diamondType: [EDiamondType.LAB_GROWN_DIAMONDS],
  },
  {
    icon: hrdIcon,
    name: "hrd",
    diamondType: [
      EDiamondType.NATURAL_DIAMONDS,
      EDiamondType.LAB_GROWN_DIAMONDS,
    ],
  },
  {
    icon: fmIcon,
    name: "fm",
    diamondType: [EDiamondType.NATURAL_DIAMONDS],
  },
  {
    icon: ngtcIcon,
    name: "ngtc",
    diamondType: [EDiamondType.NATURAL_DIAMONDS],
  },
  {
    icon: iidgrIcon,
    name: "iidgr",
    diamondType: [EDiamondType.NATURAL_DIAMONDS],
  },
  {
    icon: noneIcon,
    name: "none",
    diamondType: [
      EDiamondType.NATURAL_DIAMONDS,
      EDiamondType.LAB_GROWN_DIAMONDS,
    ],
  },
];

export const diamondClarity = [
  {
    code: "fl",
  },
  {
    code: "if",
  },
  {
    code: "vvs1",
  },
  {
    code: "vvs2",
  },
  {
    code: "vs1",
  },
  {
    code: "vs2",
  },
  {
    code: "si1",
  },
  {
    code: "si2",
  },
  {
    code: "si3",
  },
  {
    code: "i1",
  },
  {
    code: "i2",
  },
  {
    code: "i3",
  },
];

export const diamondFluorescence = [
  {
    name: "none",
  },
  {
    name: "very slight",
  },
  {
    name: "slight",
  },
  {
    name: "faint",
  },
  {
    name: "medium",
  },
  {
    name: "strong",
  },
  {
    name: "very strong",
  },
];

export const diamondCutList = [
  {
    code: "id",
  },
  {
    code: "ex",
  },
  {
    code: "vg",
  },
  {
    code: "gd",
  },
  {
    code: "fr",
  },
];

export const diamondColorList = [
  {
    name: "d",
  },
  {
    name: "e",
  },
  {
    name: "f",
  },
  {
    name: "g",
  },
  {
    name: "h",
  },
  {
    name: "i",
  },
  {
    name: "j",
  },
  {
    name: "k",
  },
  {
    name: "l",
  },
  {
    name: "m",
  },
  {
    name: "n",
  },
  {
    name: "o",
  },
  {
    name: "p",
  },
  {
    name: "q-r",
  },
  {
    name: "s-t",
  },
  {
    name: "u-v",
  },
  {
    name: "w-x",
  },
  {
    name: "y-z",
  },
];

export const diamondPolishList = [
  {
    code: "id",
  },
  {
    code: "ex",
  },
  {
    code: "vg",
  },
  {
    code: "gd",
  },
  {
    code: "fr",
  },
];

export const diamondSymmetryList = [
  {
    code: "id",
  },
  {
    code: "ex",
  },
  {
    code: "vg",
  },
  {
    code: "gd",
  },
  {
    code: "fr",
  },
];

export const naturalCuletList = [
  {
    display: "No culet (NON)",
    value: "non",
  },
  {
    display: "Very small (VS)",
    value: "vs",
  },
  {
    display: "small (S)",
    value: "s",
  },
  {
    display: "Medium (M)",
    value: "m",
  },
  {
    display: "Large (L)",
    value: "l",
  },
  {
    display: "Very Large (VL)",
    value: "vl",
  },
];

export const labGrownCuletList = [
  {
    display: "None",
    value: "none",
  },
  {
    display: "Pointed",
    value: "pointed",
  },
  {
    display: "Long",
    value: "long",
  },
];

export const diamondKeyToSymbolList = [
  {
    symbol: "Bearding",
  },
  {
    symbol: "Chip",
  },
  {
    symbol: "Crystal surface",
  },
  {
    symbol: "Flux Remnant",
  },
  {
    symbol: "Internal Laser Drilling",
  },
  {
    symbol: "Minor Details of polish",
  },
  {
    symbol: "Pinpoint",
  },
  {
    symbol: "Brown Patch of color",
  },
  {
    symbol: "Cleavage",
  },
  {
    symbol: "Etch Channel",
  },
  {
    symbol: "Indented Natural",
  },
  {
    symbol: "Knot",
  },
  {
    symbol: "Natural",
  },
  {
    symbol: "Reflecting Surface Graining",
  },
  {
    symbol: "Bruise",
  },
  {
    symbol: "Cloud",
  },
  {
    symbol: "Extra Facet",
  },
  {
    symbol: "Internal Graining",
  },
  {
    symbol: "Laser Drill Hole",
  },
  {
    symbol: "Needle",
  },
  {
    symbol: "Surface Graining",
  },
  {
    symbol: "Cavity",
  },
  {
    symbol: "Crystal",
  },
  {
    symbol: "Feather",
  },
  {
    symbol: "Internal Inscription",
  },
  {
    symbol: "Manufacturing remnant",
  },
  {
    symbol: "No inclusion",
  },
  {
    symbol: "Twining Wisp",
  },
];

export const diamondEyeCleanList = [
  {
    display: "100% Eye clean (E0)",
    value: "e0",
  },
  {
    display: "Above 80% Eye clean (E1)",
    value: "e1",
  },
  {
    display: "Above 70% Eye clean (E2)",
    value: "e2",
  },
  {
    display: "Not Eye Clean (E3)",
    value: "e3",
  },
];

export const diamondFancyIntensityList = [
  { value: "faint", display: "Faint" },
  { value: "very light", display: "Very Light" },
  { value: "light", display: "Light" },
  { value: "fancy light", display: "Fancy Light" },
  { value: "fancy", display: "Fancy" },
  { value: "fancy dark", display: "Fancy Dark" },
  { value: "fancy intense", display: "Fancy Intense" },
  { value: "fancy vivid", display: "Fancy Vivid" },
  { value: "fancy deep", display: "Fancy Deep" },
  { value: "fancy natural", display: "Fancy Natural" },
];

export const diamondFancyOvertoneList = [
  { display: "Brown", value: "brown" },
  { display: "Gray", value: "gray" },
  { display: "Pink", value: "pink" },
  { display: "Yellow", value: "yellow" },
  { display: "None", value: "none" },
  { display: "Yellowish", value: "yellowish" },
  { display: "Pinkish", value: "pinkish" },
  { display: "Bluish", value: "bluish" },
  { display: "Reddish", value: "reddish" },
  { display: "Greenish", value: "greenish" },
  { display: "Purplish", value: "purplish" },
  { display: "Orangey", value: "orangey" },
  { display: "Grayish", value: "grayish" },
  { display: "Brownish", value: "brownish" },
  { display: "Brown Orangey", value: "brown orangey" },
  { display: "Brownish Greenish", value: "brownish greenish" },
  { display: "Brownish Yellowish", value: "brownish yellowish" },
  { display: "Grayish Greenish", value: "grayish greenish" },
  { display: "Grayish Yellowish", value: "grayish yellowish" },
];

export const diamondFancyColorList = [
  { display: "Fancy Light Yellow", value: "fancy light yellow" },
  { display: "Gray Blue", value: "gray blue" },
  { display: "Green Blue", value: "green blue" },
  { display: "Light Grey Blue", value: "light grey blue" },
  { display: "Vivid Green Blue", value: "vivid green blue" },
  { display: "Yellow", value: "yellow" },
  { display: "Pink", value: "pink" },
  { display: "Blue", value: "blue" },
  { display: "Red", value: "red" },
  { display: "Green", value: "green" },
  { display: "Purple", value: "purple" },
  { display: "Orange", value: "orange" },
  { display: "Violet", value: "violet" },
  { display: "Gray", value: "gray" },
  { display: "Black", value: "black" },
  { display: "Brown", value: "brown" },
  { display: "Champagne", value: "champagne" },
  { display: "Cognac", value: "cognac" },
  { display: "Chameleon", value: "chameleon" },
  { display: "White", value: "white" },
  { display: "Other", value: "other" },
  { display: "Brown Yellow", value: "brown yellow" },
  { display: "Orange Yellow", value: "orange yellow" },
  { display: "Green Yellow", value: "green yellow" },
  { display: "Orangy Yellow", value: "orangy yellow" },
  { display: "Brown Pink", value: "brown pink" },
  { display: "Purple Pink", value: "purple pink" },
  { display: "Bluish Green", value: "bluish green" },
  { display: "Yellow Green", value: "yellow green" },
  { display: "Pink Purple", value: "pink purple" },
  { display: "Yellow Orange", value: "yellow orange" },
  { display: "Brown Orange", value: "brown orange" },
  { display: "Yellow Grey", value: "yellow grey" },
  { display: "Yellow Brown", value: "yellow brown" },
  { display: "Pink Brown", value: "pink brown" },
  { display: "Orange Brown", value: "orange brown" },
  { display: "Green Chameleon", value: "green chameleon" },
];

export const diamondQueryParams = {
  DIAMOND_TYPE: "diamondType",
  NO_BGM: "noBGM",
  IS_FANCY_COLOR: "isFancyColor",
  SHAPE: "shape",
  LAB: "lab",
  CARAT: "carat",
  FANCY_INTENSITY: "fancyIntensity",
  FANCY_OVERTONE: "fancyOvertone",
  FANCY_COLOR: "fancyColor",
  COLOR: "color",
  CLARITY: "clarity",
  FLORESCENCE: "florescence",
  CUT: "cut",
  POLISH: "polish",
  SYMMETRY: "symmetry",
  COUNTRY: "country",
  EYE_CLEAN: "eyeClean",
  DISCOUNT: "discount",
  PRICE_PER_CARAT: "pricePerCarat",
  TOTAL_PRICE: "totalPrice",
  LAB_GROWN_TYPE: "labGrownType",
  TABLE_PERCENTAGE: "tablePercentage",
  DEPTH_PERCENTAGE: "depthPercentage",
  LENGTH: "length",
  WIDTH: "width",
  RATIO: "ratio",
  CROWN_HEIGHT: "crownHeight",
  CROWN_ANGLE: "crownAngle",
  PAVILION_HEIGHT: "pavilionHeight",
  PAVILION_ANGLE: "pavilionAngle",
  GIRDLE_PERCENTAGE: "girdlePercentage",
  CULET: "culet",
  CONTAIN_KEY_TO_SYMBOL: "containKeyToSymbol",
  DO_NOT_CONTAIN_KEY_TO_SYMBOL: "doNotContainKeyToSymbol",
  STONE_IDS: "stoneIds",
  SORT_ORDER: "sortOrder",
};

export const diamondCompareProperty = [
  { label: "Stone ID", key: "stoneNo", customStyles: "", isDigit: false },
  { label: "Shape", key: "shape", customStyles: "capitalize", isDigit: false },
  { label: "Lab", key: "lab", customStyles: "capitalize", isDigit: false },

  { label: "Weight", key: "caratWeight", customStyles: "", isDigit: true },
  { label: "Color", key: "color", customStyles: "uppercase", isDigit: false },
  {
    label: "Clarity",
    key: "clarity",
    customStyles: "uppercase",
    isDigit: false,
  },
  { label: "Cut", key: "cut", customStyles: "uppercase", isDigit: false },
  { label: "Polish", key: "polish", customStyles: "uppercase", isDigit: false },
  {
    label: "Symmetry",
    key: "symmetry",
    customStyles: "uppercase",
    isDigit: false,
  },
  {
    label: "Fluorescence",
    key: "florescence",
    customStyles: "capitalize",
    isDigit: false,
  },
  {
    label: "Measurement",
    key: "measurement",
    customStyles: "",
    isDigit: false,
  },
  {
    label: "Total Depth %",
    key: "depthPercentage",
    customStyles: "",
    isDigit: true,
  },
  { label: "Table %", key: "tablePercentage", customStyles: "", isDigit: true },
  {
    label: "Girdle %",
    key: "girdlePercentage",
    customStyles: "",
    isDigit: true,
  },
  { label: "RAP USD", key: "rap", customStyles: "", isDigit: true },
  { label: "Discount %", key: "ourDiscount", customStyles: "", isDigit: true },
  {
    label: "Price/Ct USD",
    key: "pricePerCarat",
    customStyles: "",
    isDigit: true,
  },
  {
    label: "Total Amount USD",
    key: "ourPrice",
    customStyles: "",
    isDigit: true,
  },
  { label: "Shade", key: "shade", customStyles: "capitalize", isDigit: false },
  { label: "Milky", key: "milky", customStyles: "", isDigit: false },
  { label: "Inclusion", key: "inclusion", customStyles: "", isDigit: false },
];
