'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Fade } from "react-awesome-reveal";

const Product = ({product,alternateView=false}: {product:any, alternateView:boolean}) => {
  const router = useRouter();

  return (
    <div className={`px-3 my-8 grid sm:grid-cols-2 ${alternateView ? "bg-gradient-to-r from-tertiary-light" : "bg-gradient-to-l from-tertiary-light"}`}>
        <div className={`${alternateView?'sm:order-2':''}`}>
            <Image src={product.image} alt="product image" className="object-contain sm:w-[60%] sm:mx-auto"  />
        </div>
        <div className={`text-center my-3 flex flex-col items-center justify-center ${alternateView?'sm:order-1':''}`}>
           <Fade cascade direction="up" triggerOnce>
              <h4 className="sub-title uppercase mb-6">{product.title}</h4>
              {product.content 
              ? <div className="w-[60%] mx-auto">
                  {product.content.map((text:string,index:number) => 
                      <p key={index} className="mb-2 mx-2 content-text">{text}</p>)}
                </div> 
              : null}
              <button className="btn btn-tertiary-outline my-5" onClick={()=>{router.push(product.link)}}>Explore</button>
            </Fade>
        </div>
    </div>
  )
}

export default Product