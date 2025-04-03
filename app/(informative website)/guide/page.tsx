import HeroSection from "@/components/HeroSection";
import heroImage from "@/public/assets/images/diamond-4c-hero-image.webp";
import diamond4CsImage from "@/public/assets/images/4Cs-of-diamonds.webp";
import Image from "next/image";
import { guideContent } from "@/utils/content.util";
import { Metadata } from "next";
import { getSEOMetaData } from "@/app/seo";
import { links } from "@/utils/links";

export const metadata: Metadata = getSEOMetaData({
  link: links.GUIDE,
  canonical: links.GUIDE,
});

export default function Page(){
    return <main>
        <HeroSection 
            title="diamond's 4c guide" 
            heroImage={heroImage} />
        <div className="grid sm:grid-cols-12">
            <div className="sm:col-span-10 sm:col-start-2">
                <div className="grid mx-3 my-[10dvh] gap-8 sm:grid-cols-2 place-items-center">
                    <div className="flex justify-center items-center sm:col-span-2">
                        <Image src={diamond4CsImage} alt="The 4Cs of diamonds" />
                    </div>
                    {guideContent.map((content,index) => <>
                        <div key={content.title} className="grid gap-3 sm:col-span-2">
                            <h3 className="text-center title">{index+1}. {content.title}</h3>
                            {content.description.map((description,index1) => <p className="text-center content-text mx-4" key={`${content.title.toLowerCase()}-description-${index1}`}>{description}</p>)}   
                            <div className="my-3">
                                <Image src={content.image} alt={`${content.title} chart`} className="object-contain sm:w-[80%] mx-auto" />
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
        </div>
    </main>
}