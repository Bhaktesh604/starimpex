import HeroSection from "@/components/HeroSection";
import { aboutUsContent } from "@/utils/content.util";
import aboutUsHeroImage from "@/public/assets/images/about-us-hero-image.webp";
import bgImage3 from "@/public/assets/images/vector-bg-3.svg";
import bgImage1 from "@/public/assets/images/vector-bg-1.svg";
import bgImage2 from "@/public/assets/images/vector-bg-2.svg";
import Image from "next/image";
import { Metadata } from "next";
import { getSEOMetaData } from "@/app/seo";
import { links } from "@/utils/links";

export const metadata: Metadata = getSEOMetaData({
  link: links.ABOUT_US,
  canonical: links.ABOUT_US,
});

export default function AboutUs() {
  return (
    <main>
        <HeroSection 
            title="About Us" 
            heroImage={aboutUsHeroImage} />
        <div className="grid sm:grid-cols-12 relative">
            <Image src={bgImage1} alt="shape in background" className="absolute right-0"/>
            <Image src={bgImage3} alt="shape in background" className="absolute top-[10%] left-[10%]"/>
            <Image src={bgImage3} alt="shape in background" className="absolute bottom-[20%] right-[10%]"/>
            <Image src={bgImage2} alt="shape in background" className="absolute left-0 bottom-0"/>
            <div className="sm:col-span-10 sm:col-start-2">
                <div className="mx-3 my-8 lg:my-16">
                    <p className="content-text text-primary text-center">Star Impex was founded in 2002 by Pareshbhai Moradiya, with a manufacturing facility located in Surat. Over the years, the company has experienced significant business growth, supported by a skilled workforce. In 2017, Star Impex expanded its operations to include rough diamond imports from overseas. Today, the company stands as a prominent trader & supplier to B2B customers from all over the globe for both Certified and Non-Certified Diamonds in Natural and LGDs. As well as designer diamond jewelry.</p>
                </div>
                <div className="grid gap-6 place-content-center">
                    {
                        aboutUsContent.map((data,index) => <div key={`about-us-${index}`} className="py-8 px-3 grid sm:grid-cols-2 place-items-center place-content-center">
                            <div className={`sm:w-[60%] mx-auto mb-3 ${index%2!==0?'sm:order-2':''}`}>
                                <Image src={data.image} alt={`depicting ${data.title}`} />
                            </div>
                            <div className={`${index%2!==0?'sm:order-1':''}`}>
                                <h2 className="text-center title text-primary mb-8">{data.title}</h2>
                                <div className="grid gap-3">
                                    {data.content.map((text,index1) => 
                                        <p key={`about-us-${index}-${index1}`} 
                                            className="text-center text-primary content-text">
                                            {text}
                                        </p>)}
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    </main>
  );
}