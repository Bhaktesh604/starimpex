import type { Metadata, Viewport } from "next";
import { Libre_Baskerville, Poppins } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StoreProvider from "@/store/StoreProvider";
import Alert from "@/components/Alert";
import { Suspense } from "react";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-barskerville",
});
const poppins = Poppins({
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Impex"
};

export const viewport: Viewport = {
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${libreBaskerville.variable} ${poppins.variable}`}>
        <Suspense>
          <StoreProvider>
            <Alert />
            <>
              <Header />
              <div>{children}</div>
              <Footer />
            </>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
