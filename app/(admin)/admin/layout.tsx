import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../globals.css";
import RenderHeader from "@/components/RenderHeader";
import { Suspense } from "react";
import StoreProvider from "@/store/StoreProvider";
import Alert from "@/components/Alert";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Star Impex",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} mt-20`}>
        <Suspense>
          <StoreProvider>
            <Alert />
            <>
              <RenderHeader />
              <div className=" max-md:mt-[8rem] md:mt-0">{children}</div>
            </>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
