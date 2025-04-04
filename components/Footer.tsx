import { ADDRESS, CRAFTED_BY_LINK, FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL } from "@/utils/constants";
import facebookIcon from '@/public/assets/images/ic-facebook-black.svg';
import instagramIcon from '@/public/assets/images/ic-instagram-black.svg';
import linkedinIcon from '@/public/assets/images/ic-linkedin-black.svg';
import rapnetLogo from '@/public/assets/images/rapnet-logo.png';
import giaLogo from '@/public/assets/images/gia-logo.png';
import igiLogo from '@/public/assets/images/igi-logo.png';
import hrdLogo from '@/public/assets/images/hrd-logo.png';
// import motibaGemsLogo from '@/public/assets/images/motiba-gems-logo.svg'
import motibaGemsLogo from '@/public/assets/images/starimpex.png'
import Image from "next/image";
import Link from "next/link";
import { links } from "@/utils/links";
import { products } from "@/utils/content.util";

const Footer = () => {
  return (
    <footer className="mb-0">
       <div className="bg-tertiary-light grid md:grid-cols-12 gap-3 py-8 px-3 relative">
        <div className="grid gap-5 sm:grid-cols-3 md:grid-cols-4 md:col-span-12 md:col-start-2">
          <div>
            <Link href={links.HOME}>
              <Image src={motibaGemsLogo} alt="star impex logo" className="w-60 object-contain mb-4" />
            </Link>
            <div className="w-[80%] mt-2">
                <p className="content-text break-words">
                A manufacturer and supplier of Lab Grown Diamonds & Lab Grown Diamonds Jewellery in both Certified & Non Certified in various sizes, color, clarity and shapes. as well as custom diamond jewelry.
                </p>
            </div>
          </div>
          <div className="md:mx-auto">
            <h5 className="mb-2 footer-heading">Our Products</h5>
            <ul className="flex flex-col gap-2">
              {products.map((product,index) => <li key={`our-product-link-${index}`} className="content-text">
                <Link href={product.link}>{product.title}</Link>
              </li>)} 
            </ul>
          </div>
          <div className="md:mx-auto">
            <h5 className="mb-2 footer-heading">Address</h5>
            <p className="mb-3 content-text">
              {ADDRESS}
            </p>
          </div>
          <div className="md:mx-auto">
            <h5 className="mb-2 footer-heading">Quick Links</h5>
            <ul className="flex flex-col gap-2 content-text">
              <li>
                <Link href={links.ABOUT_US}>About us</Link>
              </li>
              <li>
                <Link href={links.CONTACT_US}>Contact us</Link>
              </li>
              <li>
                <Link href={links.PRIVACY_POLICY}>Privacy policy</Link>
              </li>
              <li>
                <Link href={links.TERMS}>Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid md:col-start-2 md:col-span-10 relative mb-4">
          <ul className="flex gap-5 items-center pt-3">
            <li>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                className="inline-flex items-center gap-1"
              >
                <Image
                  src={facebookIcon}
                  alt="facebook icon"
                  className="w-[18px] h-[18px]"
                  width={18}
                  height={18}
                />
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                className="inline-flex items-center gap-1"
              >
                <Image
                  src={instagramIcon}
                  alt="instagram icon"
                  className="w-[18px] h-[18px]"
                  width={18}
                  height={18}
                />
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                className="inline-flex items-center gap-1"
              >
                <Image
                  src={linkedinIcon}
                  alt="linkedin icon"
                  className="w-[17px] h-[17px]"
                  width={18}
                  height={18}
                />
              </a>
            </li>
          </ul>
          <div className="absolute max-sm:top-full max-sm:w-full right-0 md:-right-6 bottom-0 mt-2">
            <div className="flex gap-6 max-sm:justify-start max-sm:w-full">
                  <Image src={giaLogo} alt="GIA logo"  className="w-[60px] object-contain" />
                  <Image src={igiLogo} alt="IGI logo"  className="w-[60px] object-contain" />
                  <Image src={hrdLogo} alt="HRD logo"  className="w-[60px] object-contain" />
                  {/* <Image src={rapnetLogo} alt="RAPNET logo" className="w-[60px] object-contain"  /> */}
            </div>
          </div>
        </div>
       </div>
       <div className="flex flex-col gap-1 justify-center p-1 bg-tertiary">
          <p className="text-center content-text text-secondary text-opacity-80">
            Copyright © 2025 Star Impex. All Rights Reserved.
          </p>
          <div className="sm:absolute sm:right-0 sm:px-3">
            <div className="flex gap-1 text-secondary text-opacity-80 max-sm:justify-center">
              {/* <p>Crafted by</p> */}
              {/* <Link href={CRAFTED_BY_LINK} className="font-medium" target="_blank" rel="noreferrer">FiadoLabs</Link> */}
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer