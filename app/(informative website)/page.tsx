import ContactUsSection from "@/components/ContactUsSection";
import HeroSectionMain from "@/components/HeroSectionMain";
import OurProductsSection from "@/components/OurProductsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Image from "next/image";
import bgImage3 from "@/public/assets/images/vector-bg-3.svg";
import { Metadata } from "next";
import { getSEOMetaData } from "../seo";
import { links } from "@/utils/links";

export const metadata: Metadata = getSEOMetaData({
  link: links.HOME,
  canonical: links.HOME,
});

function Home() {
  return (
    <div>
      <div className="relative">
        <Image
          src={bgImage3}
          alt="shape in background"
          className="absolute top-[30%] right-[5%]"
        />
        <Image
          src={bgImage3}
          alt="shape in background"
          className="absolute bottom-[40%] right-[5%]"
        />
        <Image
          src={bgImage3}
          alt="shape in background"
          className="absolute top-[45%] left-[5%] -rotate-45"
        />
        <Image
          src={bgImage3}
          alt="shape in background"
          className="absolute bottom-[20%] left-[5%] -rotate-45"
        />
        <HeroSectionMain />
        <OurProductsSection />
        <WhyChooseUsSection />
        <ContactUsSection />
      </div>
    </div>
  );
}

export default Home;
