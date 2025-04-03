import HeroSection from "@/components/HeroSection";
import contactUsHeroImage from "@/public/assets/images/contact-us-hero-image.webp";
import phoneIcon from "@/public/assets/images/ic-phone-white.svg";
import messageIcon from "@/public/assets/images/ic-message-white.svg";
import locationIcon from "@/public/assets/images/ic-location-white.svg";
import Image from "next/image";
import {
  ADDRESS,
  ADDRESS_LINK,
  CONTACT_NUMBER,
  EMAIL,
} from "@/utils/constants";
import ContactUsForm from "@/components/ContactUsForm";
import { Metadata } from "next";
import { getSEOMetaData } from "@/app/seo";
import { links } from "@/utils/links";

export const metadata: Metadata = getSEOMetaData({
  link: links.CONTACT_US,
  canonical: links.CONTACT_US,
});

export default function ContactUs() {
  return (
    <main>
      <HeroSection title="Contact Us" heroImage={contactUsHeroImage} />
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-10 lg:col-start-2">
          <div className="rounded-3xl shadow-md border border-[#344D64] border-opacity-20 overflow-hidden -mt-[20dvh] mb-16 grid md:grid-cols-[1fr_2fr] relative z-[1]">
            <div className="bg-white h-full grid">
              <div className="h-full bg-tertiary text-secondary md:rounded-3xl grid place-content-center py-8 px-3 md:px-8">
                <h3 className="sub-title uppercase text-center">
                  contact information
                </h3>
                <ul className="mb-5 grid gap-5 py-4 place-content-center px-1">
                  <li>
                    <a href={`tel:${CONTACT_NUMBER}`} className="flex gap-2">
                      <Image src={phoneIcon} alt="phone icon" />
                      <span>{CONTACT_NUMBER}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${EMAIL}`} className="flex gap-2">
                      <Image src={messageIcon} alt="message icon" />
                      <span>{EMAIL}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={ADDRESS_LINK}
                      target="_blank"
                      className="flex gap-2 items-start"
                    >
                      <Image src={locationIcon} alt="location icon" />
                      <span>{ADDRESS}</span>
                    </a>
                  </li>
                </ul>
                <div className="mb-5 ">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sin!4v1743671662732!5m2!1sen!2sin!6m8!1m7!1sz6QonWF6xl9OX0gGv1f1Bw!2m2!1d21.22390683556279!2d72.82432060076775!3f164.1976658591075!4f4.975015201411935!5f0.7820865974627469"
                    height="200"
                    className="border-0 rounded-lg w-full mx-auto "
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="bg-white sm:px-5">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
