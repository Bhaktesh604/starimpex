import IconImg01 from "@/public/assets/customer-dashboard/MotTableImages/search_page_01.svg";
import IconImg02 from "@/public/assets/customer-dashboard/MotTableImages/search_page_02 (2).svg";
import IconImg03 from "@/public/assets/customer-dashboard/MotTableImages/search_page_03.svg";
import IconImg04 from "@/public/assets/customer-dashboard/MotTableImages/search_page_04.svg";
import IconImg06 from "@/public/assets/customer-dashboard/MotTableImages/search_page_06.svg";
import IconImg07 from "@/public/assets/customer-dashboard/MotTableImages/search_page_07.svg";
import DiamondImage from "@/public/assets/images/diamond-img.png";

export const MotTableMenu = [
  {
    type: ["search"],
    href: "/",
    name: "compareDiamond",
    menuIconImg: IconImg01,
    tooltipName: "Compare stone",
  },
  {
    type: ["search", "price-track"],
    href: "/",
    name: "addToCart",
    menuIconImg: IconImg02,
    tooltipName: "Add to cart",
  },
  {
    type: ["search", "cart", "price-track"],
    href: "/",
    name: "exportExcel",
    menuIconImg: IconImg03,
    tooltipName: "Export Excel",
  },
  {
    type: ["search", "cart", "price-track"],
    href: "/",
    name: "sendMail",
    menuIconImg: IconImg04,
    tooltipName: "Send mail",
  },
  {
    type: ["search", "cart", "price-track"],
    href: "/",
    name: "notes",
    menuIconImg: IconImg06,
    tooltipName: "Stone comments",
  },
  {
    type: ["search", "price-track"],
    name: "copyToClipboard",
    menuIconImg: IconImg07,
    tooltipName: "Copy StoneId",
  },
];

export const MotAdminTableMenu = [
  {
    type: ["search", "cart", "price-track", "purchase-list"],
    href: "/",
    name: "exportExcel",
    menuIconImg: IconImg03,
    tooltipName: "Export Excel",
  },
  {
    type: ["search", "cart", "price-track"],
    href: "/",
    name: "sendMail",
    menuIconImg: IconImg04,
    tooltipName: "Send mail",
  },
  {
    type: ["search", "price-track"],
    menuIconImg: IconImg07,
    name: "copyToClipboard",
    tooltipName: "Copy StoneId",
  },
];

export const MotTableSearchResultHeaders = [
  {
    headerName: "Status",
    customStyle: "!max-w-[100%] cursor-text",
    tableType: "search-result",
  },
  {
    headerName: "Stone ID",
    customStyle: "!min-w-[170px] w-full relative",
    fieldName: "stoneNo",
    tableType: "search-result",
  },
  {
    headerName: "Notes",
    customStyle: "!max-w-[100%] cursor-text",
    tableType: "search-result",
  },
  {
    headerName: "Action",
    customStyle: "!max-w-[100%] cursor-text",
    tableType: "search-result",
  },
  {
    headerName: "Lab",
    customStyle: "!max-w-[100%] relative",
    fieldName: "lab",
    tableType: "search-result",
  },
  {
    headerName: "Shape",
    customStyle: "!max-w-[100%] relative",
    fieldName: "shape",
    tableType: "search-result",
  },
  {
    headerName: "Type",
    customStyle: "!max-w-[100%] relative",
    fieldName: "type",
    tableType: "search-result",
  },
  {
    headerName: "Weight",
    customStyle: "!max-w-[100%] relative",
    fieldName: "caratWeight",
    tableType: "search-result",
  },
  {
    headerName: "Color",
    customStyle: "!max-w-[100%] relative",
    fieldName: "color",
    tableType: "search-result",
  },
  {
    headerName: "Clarity",
    customStyle: "!max-w-[100%] relative",
    fieldName: "clarity",
    tableType: "search-result",
  },
  {
    headerName: "Cut",
    customStyle: "!max-w-[100%] relative",
    fieldName: "cut",
    tableType: "search-result",
  },
  {
    headerName: "Polish",
    customStyle: "!max-w-[100%] relative",
    fieldName: "polish",
    tableType: "search-result",
  },
  {
    headerName: "Symmetry",
    customStyle: "!max-w-[100%] relative",
    fieldName: "symmetry",
    tableType: "search-result",
  },
  {
    headerName: "Fluorescence",
    customStyle: "!max-w-[100%] relative",
    fieldName: "florescence",
    tableType: "search-result",
  },
  {
    headerName: "Rap USD",
    customStyle: "!max-w-[100%] relative",
    fieldName: "rap",
    tableType: "search-result",
  },
  {
    headerName: "Discount %",
    customStyle: "!max-w-[100%] relative",
    fieldName: "ourDiscount",
    tableType: "search-result",
  },
  {
    headerName: "Price/Carat $",
    customStyle: "!max-w-[100%] relative",
    fieldName: "pricePerCarat",
    tableType: "search-result",
  },
  {
    headerName: "Total Amount $",
    customStyle: "!max-w-[100%] relative",
    fieldName: "ourPrice",
    tableType: "search-result",
  },
  {
    headerName: "Location",
    customStyle: "!max-w-[100%] relative",
    fieldName: "country",
    tableType: "search-result",
  },
  {
    headerName: "Measurement",
    customStyle: "!max-w-[100%] relative",
    fieldName: "measurement",
    tableType: "search-result",
  },
  {
    headerName: "Table %",
    customStyle: "!max-w-[100%] relative",
    fieldName: "tablePercentage",
    tableType: "search-result",
  },
  {
    headerName: "Depth %",
    customStyle: "!max-w-[100%] relative",
    fieldName: "depthPercentage",
    tableType: "search-result",
  },
  {
    headerName: "Hearts and Arrows",
    customStyle: "!max-w-[100%] relative",
    fieldName: "heartsAndArrows",
    tableType: "search-result",
  },
  {
    headerName: "Inclusion",
    customStyle: "!max-w-[100%] relative",
    fieldName: "inclusion",
    tableType: "search-result",
  },
  {
    headerName: "Shade",
    customStyle: "!max-w-[100%] relative",
    fieldName: "shade",
    tableType: "search-result",
  },
  {
    headerName: "Milky",
    customStyle: "!max-w-[100%] relative",
    fieldName: "milky",
    tableType: "search-result",
  },
  {
    headerName: "Luster",
    customStyle: "!max-w-[100%] relative",
    fieldName: "luster",
    tableType: "search-result",
  },
  {
    headerName: "Eye Clean",
    customStyle: "!max-w-[100%] relative",
    fieldName: "eyeClean",
    tableType: "search-result",
  },
  {
    headerName: "Ratio",
    customStyle: "!max-w-[100%] relative",
    fieldName: "ratio",
    tableType: "search-result",
  },
  {
    headerName: "Crown Angle",
    customStyle: "!max-w-[100%] relative",
    fieldName: "crownAngle",
    tableType: "search-result",
  },
  {
    headerName: "Crown Height",
    customStyle: "!max-w-[100%] relative",
    fieldName: "crownHeight",
    tableType: "search-result",
  },
  {
    headerName: "Pavilion Angle",
    customStyle: "!max-w-[100%] relative",
    fieldName: "pavilionAngle",
    tableType: "search-result",
  },
  {
    headerName: "Pavilion Height",
    customStyle: "!max-w-[100%] relative",
    fieldName: "pavilionHeight",
    tableType: "search-result",
  },
  {
    headerName: "Culet",
    customStyle: "!max-w-[100%] relative",
    fieldName: "culetSize",
    tableType: "search-result",
  },
  {
    headerName: "Key To Symbol",
    customStyle: "!max-w-[100%] relative",
    fieldName: "keyToSymbol",
    tableType: "search-result",
  },
  {
    headerName: "Motiba Gems Comment ",
    customStyle: "!min-w-[250px] w-full relative",
    fieldName: "motibaGemsComment",
    tableType: "search-result",
  },
];

export const MotAdminSearchResultHeaders = [
  {
    headerName: "Status",
    customStyle: "!max-w-[100%] cursor-text",
    tableType: "admin-search-result",
  },
  {
    headerName: "Stone ID",
    customStyle: "!min-w-[170px] w-full relative",
    fieldName: "stoneNo",
    tableType: "admin-search-result",
  },
  {
    headerName: "View",
    customStyle: "!max-w-[100%] cursor-text",
    tableType: "admin-search-result",
  },
  {
    headerName: "Lab",
    customStyle: "!max-w-[100%] relative",
    fieldName: "lab",
    tableType: "admin-search-result",
  },
  {
    headerName: "Shape",
    customStyle: "!max-w-[100%] relative",
    fieldName: "shape",
    tableType: "admin-search-result",
  },
  {
    headerName: "Type",
    customStyle: "!max-w-[100%] relative",
    fieldName: "type",
    tableType: "admin-search-result",
  },
  {
    headerName: "Weight",
    customStyle: "!max-w-[100%] relative",
    fieldName: "caratWeight",
    tableType: "admin-search-result",
  },
  {
    headerName: "Color",
    customStyle: "!max-w-[100%] relative",
    fieldName: "color",
    tableType: "admin-search-result",
  },
  {
    headerName: "Clarity",
    customStyle: "!max-w-[100%] relative",
    fieldName: "clarity",
    tableType: "admin-search-result",
  },
  {
    headerName: "Cut",
    customStyle: "!max-w-[100%] relative",
    fieldName: "cut",
    tableType: "admin-search-result",
  },
  {
    headerName: "Polish",
    customStyle: "!max-w-[100%] relative",
    fieldName: "polish",
    tableType: "admin-search-result",
  },
  {
    headerName: "Symmetry",
    customStyle: "!max-w-[100%] relative",
    fieldName: "symmetry",
    tableType: "admin-search-result",
  },
  {
    headerName: "Fluorescence",
    customStyle: "!max-w-[100%] relative",
    fieldName: "florescence",
    tableType: "admin-search-result",
  },
  {
    headerName: "Rap USD",
    customStyle: "!max-w-[100%] relative",
    fieldName: "rap",
    tableType: "admin-search-result",
  },
  {
    headerName: "Discount %",
    customStyle: "!max-w-[100%] relative",
    fieldName: "ourDiscount",
    tableType: "admin-search-result",
  },
  {
    headerName: "Price/Carat $",
    customStyle: "!max-w-[100%] relative",
    fieldName: "pricePerCarat",
    tableType: "admin-search-result",
  },
  {
    headerName: "Total Amount $",
    customStyle: "!max-w-[100%] relative",
    fieldName: "ourPrice",
    tableType: "admin-search-result",
  },
  {
    headerName: "Actual Rap",
    customStyle: "!max-w-[100%] relative",
    fieldName: "",
    tableType: "admin-search-result",
  },
  {
    headerName: "Actual Discount",
    customStyle: "!max-w-[100%] relative",
    fieldName: "",
    tableType: "admin-search-result",
  },
  {
    headerName: "Actual Price/Carat $",
    customStyle: "!max-w-[100%] relative",
    fieldName: "",
    tableType: "admin-search-result",
  },
  {
    headerName: "Actual Total Price $",
    customStyle: "!max-w-[100%] relative",
    fieldName: "",
    tableType: "admin-search-result",
  },
  {
    headerName: "Location",
    customStyle: "!min-w-[120px] w-full relative",
    fieldName: "country",
    tableType: "admin-search-result",
  },
  {
    headerName: "Measurement",
    customStyle: "!max-w-[100%] relative",
    fieldName: "measurement",
    tableType: "admin-search-result",
  },
  {
    headerName: "Table %",
    customStyle: "!max-w-[100%] relative",
    fieldName: "tablePercentage",
    tableType: "admin-search-result",
  },
  {
    headerName: "Depth %",
    customStyle: "!max-w-[100%] relative",
    fieldName: "depthPercentage",
    tableType: "admin-search-result",
  },
  {
    headerName: "Hearts and Arrows",
    customStyle: "!max-w-[100%] relative",
    fieldName: "heartsAndArrows",
    tableType: "admin-search-result",
  },
  {
    headerName: "Inclusion",
    customStyle: "!max-w-[100%] relative",
    fieldName: "inclusion",
    tableType: "admin-search-result",
  },
  {
    headerName: "Shade",
    customStyle: "!max-w-[100%] relative",
    fieldName: "shade",
    tableType: "admin-search-result",
  },
  {
    headerName: "Milky",
    customStyle: "!max-w-[100%] relative",
    fieldName: "milky",
    tableType: "admin-search-result",
  },
  {
    headerName: "Luster",
    customStyle: "!max-w-[100%] relative",
    fieldName: "luster",
    tableType: "admin-search-result",
  },
  {
    headerName: "Eye Clean",
    customStyle: "!max-w-[100%] relative",
    fieldName: "eyeClean",
    tableType: "admin-search-result",
  },
  {
    headerName: "Ratio",
    customStyle: "!max-w-[100%] relative",
    fieldName: "ratio",
    tableType: "admin-search-result",
  },
  {
    headerName: "Crown Angle",
    customStyle: "!max-w-[100%] relative",
    fieldName: "crownAngle",
    tableType: "admin-search-result",
  },
  {
    headerName: "Crown Height",
    customStyle: "!max-w-[100%] relative",
    fieldName: "crownHeight",
    tableType: "admin-search-result",
  },
  {
    headerName: "Pavilion Angle",
    customStyle: "!max-w-[100%] relative",
    fieldName: "pavilionAngle",
    tableType: "admin-search-result",
  },
  {
    headerName: "Pavilion Height",
    customStyle: "!max-w-[100%] relative",
    fieldName: "pavilionHeight",
    tableType: "admin-search-result",
  },
  {
    headerName: "Culet",
    customStyle: "!max-w-[100%] relative",
    fieldName: "culetSize",
    tableType: "admin-search-result",
  },
  {
    headerName: "Key To Symbol",
    customStyle: "!max-w-[100%] relative",
    fieldName: "keyToSymbol",
    tableType: "admin-search-result",
  },
  {
    headerName: "Motiba Gems Comment",
    customStyle: "!min-w-[250px] w-full relative",
    fieldName: "motibaGemsComment",
    tableType: "admin-search-result",
  },
];

export const MotTableCartHeaders = [
  {
    headerName: "Status",
    customStyle: "!min-w-[120px] w-full",
    tableType: "cart",
  },
  {
    headerName: "Stone ID",
    customStyle: "!min-w-[170px] w-full",
    tableType: "cart",
  },
  {
    headerName: "Notes",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Action",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Lab",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Shape",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Type",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Weight",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Color",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Clarity",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Cut",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Polish",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Symmetry",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Fluorescence",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Rap USD",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Disc % Range",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Price/Carat $",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Total Amount $",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Location",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Measurement",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Table %",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Depth %",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Hearts and Arrows",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Inclusion",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Shade",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Milky",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Luster",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Eye Clean",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Ratio",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Crown Angle",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Crown Height",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Pavilion Angle",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Pavilion Height",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Culet",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Key To Symbol",
    customStyle: "!max-w-[100%]",
    tableType: "cart",
  },
  {
    headerName: "Motiba Gems Comment",
    customStyle: "!min-w-[250px] w-full",
    tableType: "cart",
  },
];

export const MotTablePriceTrackHeaders = [
  {
    headerName: "Status",
    customStyle: "!min-w-[120px] w-full",
    tableType: "price",
  },
  {
    headerName: "Stone ID",
    customStyle: "!min-w-[170px] w-full",
    tableType: "price",
  },
  {
    headerName: "Notes",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Action",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Lab",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Shape",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Type",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Weight",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Color",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Clarity",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Cut",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Polish",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Symmetry",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Fluorescence",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Tracked Rap $",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Tracked Disc% ",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Tracked Price/Carat $",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Tracked Total Amount $",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Current Rap $",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },

  {
    headerName: "Current Disc% ",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },

  {
    headerName: "Current Price/Carat $",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Current Total Amount $",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },

  {
    headerName: "Location",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Measurement",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Table %",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Depth %",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Hearts and Arrows",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Inclusion",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Shade",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Milky",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Luster",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Eye Clean",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Ratio",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Crown Angle",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Crown Height",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Pavilion Angle",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Pavilion Height",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Culet",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Key To Symbol",
    customStyle: "!max-w-[100%]",
    tableType: "price",
  },
  {
    headerName: "Motiba Gems Comment",
    customStyle: "!min-w-[250px] w-full",
    tableType: "price",
  },
];

export const MotTableHistoryHeaders = [
  {
    headerName: "Action",
    customStyle: "!max-w-[100%]",
    tableType: "history",
  },
  {
    headerName: "Order ID",
    customStyle: "!max-w-[100%]",
    tableType: "history",
  },
  {
    headerName: "Order date",
    customStyle: "!max-w-[100%]",
    tableType: "history",
  },
  {
    headerName: "Total Stones",
    customStyle: "!max-w-[100%]",
    tableType: "history",
  },
  {
    headerName: "Total Carats",
    customStyle: "!max-w-[100%]",
    tableType: "history",
  },
  {
    headerName: "Gross Amount",
    customStyle: "!max-w-[100%]",
    tableType: "history",
  },
  {
    headerName: "Shipping Charge",
    customStyle: "!max-w-[100%]",
    tableType: "history",
  },
  {
    headerName: "AddLess USD",
    customStyle: "!max-w-[100%]",
    tableType: "history",
  },
  {
    headerName: "Net Amt USD",
    customStyle: "!max-w-[100%]",
    tableType: "history",
  },
  {
    headerName: "Status",
    customStyle: "!max-w-[100%]",
    tableType: "history",
  },
];

export const UserListHeaders = [
  {
    headerName: "Full Name",
    customStyle: "!max-w-[100%]",
    tableType: "userlist",
  },
  {
    headerName: "Company Name",
    customStyle: "!max-w-[100%]",
    tableType: "userlist",
  },
  {
    headerName: "Country Name",
    customStyle: "!max-w-[100%]",
    tableType: "userlist",
  },
  {
    headerName: "Mobile Number",
    customStyle: "!max-w-[100%]",
    tableType: "userlist",
  },
  {
    headerName: "Email",
    customStyle: "!max-w-[100%]",
    tableType: "userlist",
  },
  {
    headerName: "Action",
    customStyle: "!max-w-[100%]",
    tableType: "userlist",
  },
];

export const apiheaderlist = [
  {
    headerName: "API provider company name",
    customStyle: "!max-w-[100%]",
    tableType: "api",
  },
  {
    headerName: "markup %",
    customStyle: "!max-w-[100%]",
    tableType: "api",
  },
  {
    headerName: "Action",
    customStyle: "!max-w-[100%]",
    tableType: "api",
  },
];

export const AdminOrderListHeaders = [
  {
    headerName: "Order ID",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "Order Date",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "Company Name",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "Company Email",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "Total Stone",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "Total Carats",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "Gross Amount USD",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "Shipping Charge USD",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "AddLess USD",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "Net Amt USD",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "Status",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
  {
    headerName: "Action",
    customStyle: "!max-w-[100%]",
    tableType: "adminorderlist",
  },
];

export const AdminPurchaseListHeaders = [
  {
    headerName: "Order ID",
    customStyle: "!max-w-[100%]",
    tableType: "adminpurchaselist",
  },
  {
    headerName: "Date",
    customStyle: "!max-w-[100%]",
    tableType: "adminpurchaselist",
  },
  {
    headerName: "Supplier Name",
    customStyle: "!max-w-[100%]",
    tableType: "adminpurchaselist",
  },
  {
    headerName: "Supplier Address",
    customStyle: "!max-w-[100%]",
    tableType: "adminpurchaselist",
  },
  {
    headerName: "Description",
    customStyle: "!max-w-[100%]",
    tableType: "adminpurchaselist",
  },
  {
    headerName: "Total Stone",
    customStyle: "!max-w-[100%]",
    tableType: "adminpurchaselist",
  },
  {
    headerName: "Action",
    customStyle: "!max-w-[100%]",
    tableType: "adminpurchaselist",
  },
];

export const AdminOrderTableHeaders = [
  {
    headerName: "Status",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Confirmation Status",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Stone ID",
    customStyle: "!min-w-[170px] w-full",
    tableType: "admin-order",
  },
  {
    headerName: "Lab",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Shape",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Weight",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Color",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Clarity",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Cut",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Polish",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Symmetry",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Fluorescence",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Rap USD",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Disc % Range",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Price/Carat $",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Total Amount $",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Location",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
  {
    headerName: "Measurement",
    customStyle: "!max-w-[100%]",
    tableType: "admin-order",
  },
];

export const AdminSearchAnalyticsHeaders: any = [
  {
    headerName: "User",
    customStyle: "!min-w-[150px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Date and Time",
    customStyle: "!min-w-[190px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Type",
    customStyle: "!min-w-[180px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Lab",
    customStyle: "!min-w-[70px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Shape",
    customStyle: "!min-w-[80px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Carat",
    customStyle: "!min-w-[120px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Cut",
    customStyle: "!min-w-[100px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Polish",
    customStyle: "!min-w-[100px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Symmetry",
    customStyle: "!min-w-[100px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Florance",
    customStyle: "!min-w-[100px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Clarity",
    customStyle: "!min-w-[100px] w-full",
    tableType: "admin-search",
  },
  {
    headerName: "Number Result Shown",
    customStyle: "!max-w-[100%]",
    tableType: "admin-search",
  },
];

export const DiamondNotesTableHeader: any = [
  {
    headerName: "Stone ID",
    customStyle: "!min-w-[170px] w-full",
    tableType: "diamondNotes",
  },
  {
    headerName: "Lab",
    customStyle: "!max-w-[100%]",
    tableType: "diamondNotes",
  },
  {
    headerName: "Shape",
    customStyle: "!max-w-[100%]",
    tableType: "diamondNotes",
  },
  {
    headerName: "Weight",
    customStyle: "!max-w-[100%]",
    tableType: "diamondNotes",
  },
  {
    headerName: "Color",
    customStyle: "!max-w-[100%]",
    tableType: "diamondNotes",
  },
  {
    headerName: "Clarity",
    customStyle: "!max-w-[100%]",
    tableType: "diamondNotes",
  },
  {
    headerName: "Notes",
    customStyle: "!max-w-[100%]",
    tableType: "diamondNotes",
  },
];

export const CustomerOrderTableHeader = [
  {
    headerName: "Status",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Stone ID",
    customStyle: "!min-w-[170px] w-full",
    tableType: "order",
  },
  {
    headerName: "Notes",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "View",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Lab",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Shape",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Type",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Weight",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Color",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Clarity",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Cut",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Polish",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Symmetry",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Fluorescence",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Rap USD",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Discount %",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Price/Carat $",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Total Amount $",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Location",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Measurement",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Table %",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Depth %",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Hearts and Arrows",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Inclusion",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Shade",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Milky",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Luster",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Eye Clean",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Ratio",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Crown Angle",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Crown Height",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Pavilion Angle",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Pavilion Height",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Culet",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Key To Symbol",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
  {
    headerName: "Motiba Gems Comment",
    customStyle: "!min-w-[250px] w-full",
    tableType: "order",
  },
  {
    headerName: "Confirmation",
    customStyle: "!max-w-[100%]",
    tableType: "order",
  },
];

export const MotTableDiamondConfirmationHeaders = [
  {
    headerName: "Status",
    customStyle: "!max-w-[100%]",
    tableType: "diamondconfirmation",
  },
  {
    headerName: "Stone ID",
    customStyle: "!min-w-[170px] w-full",
    tableType: "diamondconfirmation",
  },
  {
    headerName: "Lab",
    customStyle: "!max-w-[100%]",
    tableType: "diamondconfirmation",
  },
  {
    headerName: "Shape",
    customStyle: "!max-w-[100%]",
    tableType: "diamondconfirmation",
  },
  {
    headerName: "Weight",
    customStyle: "!max-w-[100%]",
    tableType: "diamondconfirmation",
  },
  {
    headerName: "Color",
    customStyle: "!max-w-[100%]",
    tableType: "diamondconfirmation",
  },
  {
    headerName: "Clarity",
    customStyle: "!max-w-[100%]",
    tableType: "diamondconfirmation",
  },
];

export const AdminContactListHeaders = [
  {
    headerName: "First Name",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Last Name",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Phone",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Country",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Email",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Message",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Status",
    customStyle: "!max-w-[100%]",
  },
];

export const AdminInquiryListHeaders = [
  {
    headerName: "First Name",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Last Name",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Phone",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Email",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Company Name",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Diamond Type",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Country",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Message",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Status",
    customStyle: "!max-w-[100%]",
  },
];

export const AdminHelpListHeaders = [
  {
    headerName: "First Name",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Last Name",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Message",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Status",
    customStyle: "!max-w-[100%]",
  },
];

export const AdminFeedbackListHeaders = [
  {
    headerName: "First Name",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Last Name",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Rating",
    customStyle: "!max-w-[100%]",
  },
  {
    headerName: "Comment",
    customStyle: "!max-w-[100%]",
  },
];

export const adminCartTableHeaders = [
  {
    headerName: "User",
    customStyle: "!w-[200px] ",
  },
  {
    headerName: "Diamond Id",
    customStyle: "!w-[300px]",
  },
  {
    headerName: "Date and Time",
    customStyle: "!w-[200px] ",
  },
];

export const adminPriceTrackTableHeaders = [
  {
    headerName: "User",
    customStyle: "!w-[200px] ",
  },
  {
    headerName: "Diamond Id",
    customStyle: "!w-[300px]",
  },
  {
    headerName: "Date and Time",
    customStyle: "!w-[200px] ",
  },
];
