import { getSEOMetaData } from "@/app/seo";
import HeroSection from "@/components/HeroSection";
import heroImage from "@/public/assets/images/lab-grown-diamonds-hero-image.webp";
import {
  labGrownDiamondsContent,
  offeringBackgroundImages,
} from "@/utils/content.util";
import { links } from "@/utils/links";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = getSEOMetaData({
  link: links.LAB_GROWN_DIAMONDS,
  canonical: links.LAB_GROWN_DIAMONDS,
});

export default function Page() {
  return (
    <main>
      <HeroSection
        title={labGrownDiamondsContent.title}
        heroImage={heroImage}
      />
      <div className="grid sm:grid-cols-12 my-16">
        <div className="sm:col-span-10 sm:col-start-2 mx-3">
          <p className="text-center">{labGrownDiamondsContent.description}</p>
          <div className="my-8 overflow-hidden border-4 border-tertiary group w-3/4 mx-auto hover:scale-105 transition-transform rounded-sm ease-in-out">
            <Image
              src={labGrownDiamondsContent.image}
              alt="lab grown diamonds"
              className="group-hover:scale-105 duration-500 object-cover"
            />
          </div>
          <h4 className="title mt-7 mb-3 text-tertiary">
            Manufacturing Process of lab grown diamonds:
          </h4>
          <div className="grid gap-5">
            {labGrownDiamondsContent.manufacturingProcess.content.map(
              (process, index) => (
                <div key={`natural-diamond-process-${index}`}>
                  <h5 className="content-text font-semibold mb-4">
                    {process.title}
                  </h5>
                  {process.description ? (
                    <ul className="grid gap-4">
                      {process.description.map((content, index1) => (
                        <li
                          key={`content-${index}-${index1}`}
                          className="content-text"
                        >
                          <span>{content}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )
            )}
          </div>
          <h4 className="title mt-7 mb-3 text-tertiary">
            Our offerings are as follows:
          </h4>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 place-content-center">
            {labGrownDiamondsContent.offerings.map((text, index) => (
              <div
                key={`offering-${index}`}
                className="relative rounded-[13px] overflow-hidden  group hover:scale-105 transition-transform ease-in-out"
              >
                <Image
                  src={offeringBackgroundImages[index]}
                  alt="offering background image"
                  className="w-full  group-hover:scale-110 duration-500"
                />
                <div className="absolute w-full h-full bg-black/50 z-[1] inset-0">
                  <div className="h-full flex justify-center items-center px-10">
                    <p className="text-secondary/95 text-center content-text capitalize">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center content-text mt-16">
            If not done yet,{" "}
            <Link
              href={links.SIGNUP}
              className="text-tertiary font-semibold text-lg"
            >
              Register Now
            </Link>{" "}
            to explore our wide range of online inventory.
          </p>
        </div>
      </div>
    </main>
  );
}
