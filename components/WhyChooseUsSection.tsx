import Image from "next/image"
import SectionTitle from "./SectionTitle"
import { whyChooseUsContent } from "@/utils/content.util"

const WhyChooseUsSection = () => {
  return (
    <section className="my-8">
        <SectionTitle title="Why Choose Us"/>
        <div className="grid lg:grid-cols-12">
            <div className="lg:col-start-2 lg:col-span-10">
                <div className="relative grid sm:grid-cols-[repeat(2,280px)] xl:grid-cols-[repeat(4,minmax(280px,25%))] place-content-center gap-6 my-3 py-16">
                    <div className="w-full h-[60%] absolute z-[-1] top-1/2 -translate-y-1/2 blur-xl rounded-full bg-gradient-to-l from-white via-tertiary-light to-white">
                    </div>
                    {whyChooseUsContent.map((data,index) => <div key={`why-choose-us-${index}`} className="bg-white w-[280px] border border-tertiary/20 rounded-3xl p-4 group hover:scale-105 hover:-translate-y-1 transition-transform duration-500">
                        <div className='w-[90px] h-[90px] relative flex justify-center items-center mb-5 mx-auto'>
                            <div className='absolute w-full h-full bg-[url(../public/assets/images/vector-bg.svg)] bg-no-repeat bg-contain'/>
                            <Image src={data.logo} alt='diamond icon' width={65} height={65} />
                        </div>
                        <div className="pb-5">
                            <h5 className="text-center title uppercase text-primary mb-4">{data.title}</h5>
                            <div className="px-3">
                                {data.content.map((text,index1) => 
                                    <p key={`why-choose-us-${index}-content-${index1}`} 
                                       className="text-center content-text text-primary mb-3">
                                        {text}
                                    </p>)
                                }
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    </section>
  )
}

export default WhyChooseUsSection