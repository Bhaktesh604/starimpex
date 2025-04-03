import { products } from "@/utils/content.util"
import SectionTitle from "./SectionTitle"
import Product from "./Product"

const OurProductsSection = () => {
  return (
    <section className="my-8">
        <SectionTitle title="Our Products"/>
        <div>
          {products.map((product,index) => <div key={`our-product-${index}`}>
            <Product product={product} alternateView={index%2!==0} />
          </div>)}
        </div>
    </section>
  )
}

export default OurProductsSection