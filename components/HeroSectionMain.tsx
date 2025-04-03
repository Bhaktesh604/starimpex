'use client'
import inquiryIcon from '@/public/assets/images/ic-inquiry.svg';
import { links } from '@/utils/links';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AttentionSeeker } from 'react-awesome-reveal';
import Typewriter from 'typewriter-effect';

const HeroSectionMain = () => {
  const router = useRouter();

  return (
    <section className="pt-28 min-h-screen grid place-content-center relative bg-black/80">
        <div className='absolute w-full h-full z-[-1]'>
            <video
                className="w-full h-full object-fill md:aspect-video aspect-[4/3]"
                src="/assets/videos/home-page-video.mp4"
                autoPlay
                muted
                loop
            />
        </div>
        <div className='grid place-content-center place-items-center gap-5 lg:gap-8 mx-3 sm:w-[75dvw] lg:w-[60dvw]'>
            <h1 className='title uppercase text-center' >
                <span className='pl-2 block max-lg:h-32 text-secondary' >           
                       <Typewriter
                            onInit={(typewriter) => {
                                typewriter.typeString('From Rough to <strong style="color: #4E94F2;">Wonder</strong>')
                                .pauseFor(2500)
                                .deleteAll()
                                .typeString('<strong style="color: #4E94F2;">Advance</strong> technology & Expertise')
                                .pauseFor(2500)
                                .deleteAll()
                                .typeString('Maximizing the <strong style="color: #4E94F2;">Brilliance</strong>')
                                .pauseFor(2500)
                                .deleteAll()
                                .typeString('Experience of <strong style="color: #4E94F2;">Ultra Luxury</strong>')
                                .pauseFor(2500)
                                .deleteAll()
                                .typeString('Reflecting the <strong style="color: #4E94F2;">Promise</strong>')
                                .pauseFor(2500)
                                .deleteAll()
                                .start();
                            }}
                            options={{loop: true,cursor:"",wrapperClassName:'span',delay:50}}
                            
                        />
                </span>
            </h1>
            <button className="btn btn-secondary" onClick={()=>router.push(links.CONTACT_US)}><Image src={inquiryIcon} alt="inquiry icon" className="w-5 h-5" /><span>Contact us</span></button>
            <div className='grid sm:grid-cols-3 gap-3 sm:gap-5 lg:gap-14'>
                <div>
                    <AttentionSeeker effect='heartBeat' triggerOnce><h2 className='text-secondary sub-title text-center'>2800+</h2></AttentionSeeker>
                    <p className='text-secondary/80 content-text uppercase text-center'>Happy Customers</p>
                </div>
                <div>
                    <AttentionSeeker effect='heartBeat' triggerOnce><h2 className='text-secondary sub-title text-center'>10000+</h2></AttentionSeeker>
                    <p className='text-secondary/80 content-text uppercase text-center'>Orders Fulfilled</p>
                </div>
                <div>
                    <AttentionSeeker effect='heartBeat' triggerOnce><h2 className='text-secondary sub-title text-center'>18+</h2></AttentionSeeker>
                    <p className='text-secondary/80 content-text uppercase text-center'>Countries</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSectionMain