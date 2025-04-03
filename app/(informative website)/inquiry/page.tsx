import HeroSection from "@/components/HeroSection";
import contactUsHeroImage from "@/public/assets/images/contact-us-hero-image.webp";
import InquiryForm from "@/components/InquiryForm";
import { Metadata } from "next";
import { getSEOMetaData } from "@/app/seo";
import { links } from "@/utils/links";

export const metadata: Metadata = getSEOMetaData({
  link: links.INQUIRY,
  canonical: links.INQUIRY,
});

export default function ContactUs() {
  return (
    <main>
      <HeroSection
        title="Inquire for loose diamond"
        heroImage={contactUsHeroImage}
      />
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-3">
          <div className="rounded-3xl shadow-md border border-[#344D64] border-opacity-20 overflow-hidden -mt-[20dvh] mb-16 grid relative z-[1]">
            <div className="bg-white sm:px-8">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
