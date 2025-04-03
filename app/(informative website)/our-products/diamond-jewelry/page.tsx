import { getSEOMetaData } from "@/app/seo";
import HeroSection from "@/components/HeroSection";
import heroImage from "@/public/assets/images/diamond-jewelry-hero-image.webp";
import { jewelryDiamondsContent } from "@/utils/content.util";
import { links } from "@/utils/links";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = getSEOMetaData({
  link: links.DIAMOND_JEWELRY,
  canonical: links.DIAMOND_JEWELRY,
});

export default function Page() {
    return <main>
    <HeroSection  
        title={jewelryDiamondsContent.title} 
        heroImage={heroImage}
    />
    <div className="grid sm:grid-cols-12 my-16">
        <div className="sm:col-span-10 sm:col-start-2 mx-3">
            <p className="text-center">{jewelryDiamondsContent.description}</p>
            <div className="my-8 overflow-hidden border-4 border-tertiary group w-3/4 mx-auto hover:scale-105 transition-transform rounded-sm ease-in-out">
                <Image src={jewelryDiamondsContent.image} alt="diamond jewelry" className="group-hover:scale-105 duration-500 object-cover" />
            </div>
            <h4 className="title mt-7 mb-3 text-tertiary">Our offerings are as follows:</h4>
            <ul className="list-disc list-inside">
                {jewelryDiamondsContent.offerings.map((text,index)=><li key={`offering-${index}`}>
                    <span className="text-primary text-center content-text capitalize">{text}</span>
                </li>)}
            </ul>
            <p className="content-text mt-8">{jewelryDiamondsContent.otherContent}</p>
        </div>
    </div>
</main>
}