import { getSEOMetaData } from "@/app/seo";
import HeroSection from "@/components/HeroSection";
import heroImage from "@/public/assets/images/natural-diamonds-hero-image.webp";
import {
  naturalDiamondsContent,
  offeringBackgroundImages,
} from "@/utils/content.util";
import { links } from "@/utils/links";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = getSEOMetaData({
  link: links.NATURAL_DIAMONDS,
  canonical: links.NATURAL_DIAMONDS,
});

export default function Page() {
  return (
    <main>
      <HeroSection title={naturalDiamondsContent.title} heroImage={heroImage} />
      <div className="grid sm:grid-cols-12 my-16">
        <div className="sm:col-span-10 sm:col-start-2 mx-3">
          <p className="text-center">{naturalDiamondsContent.description}</p>
          <div className="my-8 overflow-hidden border-4 border-tertiary group w-3/4 mx-auto hover:scale-105 transition-transform rounded-sm ease-in-out">
            <Image
              src={naturalDiamondsContent.image}
              alt="natural diamonds"
              className="group-hover:scale-105 duration-500 object-cover"
            />
          </div>
          <h3 className="title mt-7 mb-3 text-tertiary">
            Manufacturing Process of natural diamonds:
          </h3>
          <div className="grid gap-5">
            {naturalDiamondsContent.manufacturingProcess.map(
              (process, index) => (
                <div key={`natural-diamond-process-${index}`}>
                  <h5 className="content-text font-semibold mb-4">
                    {index + 1}. {process.title}
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
                  {process.listContent ? (
                    <div>
                      <ul className="grid gap-3">
                        {process.listContent.map((content, index1) => (
                          <li
                            key={`list-content-${index}-${index1}`}
                            className="list-outside"
                          >
                            <h6 className="content-text text-tertiary font-semibold mb-1">
                              {content.title}
                            </h6>
                            <ul className="list-outside list-disc ml-8">
                              {content.description.map((text, index2) => (
                                <li
                                  key={`list-sub-content-${index1}-${index2}`}
                                >
                                  {text}
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              )
            )}
          </div>
          <h3 className="title mt-7 mb-3 text-tertiary">
            Our offerings are as follows:
          </h3>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 place-content-center">
            {naturalDiamondsContent.offerings.map((text, index) => (
              <div
                key={`offering-${index}`}
                className="relative rounded-[13px] overflow-hidden group hover:scale-105 transition-transform ease-in-out"
              >
                <Image
                  src={offeringBackgroundImages[index]}
                  alt="offering background image"
                  className="w-full group-hover:scale-110 duration-500"
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
