import Image, { StaticImageData } from 'next/image'
import diamondWhite from '@/public/assets/images/diamond-white.svg'

const HeroSection = ({title="",description="",heroImage=null}:{title:string,description?:string,heroImage:StaticImageData|null}) => {
  return (
    <section className={`h-[70dvh] grid place-content-center relative`} style={{clipPath: 'polygon(100% 0, 100% 85%, 50% 100%, 0 85%, 0% 0%)'}}>
          <Image src={diamondWhite} alt='diamond white' className='absolute left-16 top-[30%]'/>
          <Image src={diamondWhite} alt='diamond white' className='absolute right-16 top-[30%] rotate-45'/>
        <div className='absolute h-full w-full z-[-1] bg-tertiary-dark/70'/>
        <div className='absolute h-full w-full z-[-2]'>
          {heroImage ? <Image src={heroImage} alt={`${title}`} className='h-full w-full object-cover object-center' />: null}
        </div>
        <h1 className='title text-secondary text-center uppercase mb-3'>{title}</h1>
        {description?<p className='content-text text-secondary text-center w-[80dvw] sm:w-[60dvw] lg:w-[35dvw] mx-auto'>{description}</p>:null}
    </section>
  )
}

export default HeroSection