import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "../globals.css";
import Navbar from "./ui/Navbar";
import StoreProvider from "@/store/StoreProvider";
import Alert from "@/components/Alert";
import { Suspense } from "react";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Motiba Gems",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-customer-background`}>
        <Suspense>
          <StoreProvider>
            <Alert />
            <Navbar />
            <div className="mt-28 md:mt-20">{children}</div>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
