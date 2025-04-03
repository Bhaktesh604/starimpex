import { getSEOMetaData } from "@/app/seo";
import { termsConditionContent } from "@/utils/content.util";
import { links } from "@/utils/links";
import { Metadata } from "next";

export const metadata: Metadata = getSEOMetaData({
  link: links.TERMS,
  canonical: links.TERMS,
});

export default function Page(){
    return <main>
    <div className="grid sm:grid-cols-12 bg-tertiary/10">
        <div className="sm:col-span-10 sm:col-start-2">
            <div className="p-3 min-h-screen grid place-items-center pt-20">
                <div className="m-3 bg-secondary rounded-lg my-6">
                    <div className="px-3 py-6 border-b border-primary/80">
                        <h1 className="text-center content-text font-semibold tracking-wide !text-2xl">Terms & Conditions</h1>
                    </div>
                    <ul className="p-8 grid gap-8">
                        {termsConditionContent.content.map((content,index) => 
                            <li key={`terms-${index}`}>
                                <h3 className="title mb-3 text-tertiary list-square">{content.title}</h3>
                                <div>
                                    {content.description.map((text,index1) => 
                                    <p key={`terms-${index}-${index1}`} className="content-text mb-4">{text}</p>)}
                                </div>
                                <div>
                                    {content.otherContent?.map((content,index) => <div key={`${content.title.toLowerCase()}-content`}>
                                        <h4 className="font-medium">{content.title} :</h4>
                                        {
                                            content.description.map((text,index1) => <p key={`content-${index}-${index1}`} className="list-circle-outline">
                                                <span className="content-text">{text}</span>
                                            </p>)
                                        }
                                    </div>)}
                                </div>
                            </li>
                        )}
                        <p><span className="font-semibold content-text">Please note: </span>{termsConditionContent.note}</p>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</main>
}