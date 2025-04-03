import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        "libre-barskerville": ["var(--font-libre-barskerville)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--color-tertiary) / <alpha-value>)",
        "tertiary-light": "rgb(var(--color-tertiary-light) / <alpha-value>)",
        "tertiary-dark": "rgb(var(--color-tertiary-dark) / <alpha-value>)",
        "customer-background":
          "rgb(var(--color-customer-background) / <alpha-value>)",
        dashboard_primary: "rgb(var(--color-dashboard-primary)/<alpha-value>)",
        history_primary: "rgb(var(--color-history-primary)/<alpha-value>)",
        "tertiary-alt": "rgb(var( --color-tertiary-alt)/<alpha-value>)",
        gray_color: "rgb(var(--order-pending)/<alpha-value>)",
        green_color: "rgb(var(--order-confirm)/<alpha-value>)",
        red_color: "rgb(var(--order-canceled)/<alpha-value>)",
        yellow_color: "rgb(var(--order-partially-confirm)/<alpha-value>)",
        filter_yellow_color: "rgb(var(--filter-yellow)/<alpha-value>)",
        filter_green_color: "rgb(var(--filter-green)/<alpha-value>)",
        filter_red_color: "rgb(var(--filter-red)/<alpha-value>)",
        silver_color: "rgb(var(--silver-color)/<alpha-value>)",
        view_option_color:
          "rgb(var(--view-product-option-color)/<alpha-value>)",
      },
    },
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
export default config;
