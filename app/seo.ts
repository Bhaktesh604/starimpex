
import { WEB_URL } from "@/utils/constants";
import { links } from "@/utils/links";
import { Metadata } from "next";
  
export const getSEOMetaData = ({
  link,
  title,
  description,
  canonical
}: {
  link?: string;
  title?: string;
  description?: string;
  canonical: string;
}): Metadata => {
  return {
    // metadataBase: new URL(WEB_URL as string),
    metadataBase: WEB_URL ? new URL(WEB_URL) : undefined,
    title: getTitle(link, title),
    description: getDescription(link, description),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonical,
    },
    manifest: "/site.webmanifest",
    icons: {
      icon: "/favicon.ico",
      apple: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      other: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          url: "/apple-touch-icon.png",
        },
        { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
      ],
    },
    openGraph: {
      type: 'website',
      url: WEB_URL,
      title: getTitle(link, title),
      description: getDescription(link, description),
      images: `${WEB_URL}favicon.ico`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
};

const getTitle = (link?: string, title?: string): string => {
  if (title) return title;
  switch (link) {
    case links.HOME:
      return "Star Impex | B2B Supplier of Lab-Grown Diamonds & Lab-Grown Diamond Jewellery in Surat - Certified & Custom Jewelry";
    case links.ABOUT_US: 
      return "About Star Impex | Trusted B2B Supplier of Lab-Grown Diamond Jewellery & Lab-Grown Diamonds";
    case links.CONTACT_US: 
      return "Contact Us - Star Impex | Connect for Support or Inquiry";
    case links.FORGOT_PASSWORD: 
      return "Forgot Password | Star Impex Account Recovery";
    case links.GUIDE: 
      return "Diamond's 4C Guide - Star Impex | Guide to Quality";
    case links.INQUIRY: 
      return "Inquire for Loose Diamonds | Request Information from Star Impex";
    case links.NATURAL_DIAMONDS: 
      return "Natural Diamonds | Manufacturing Process & Offerings by Star Impex";
    case links.LAB_GROWN_DIAMONDS: 
      return "Lab-Grown Diamonds | Manufacturing Process & Offerings by Star Impex";
    case links.DIAMOND_JEWELRY: 
      return "Our Product - Diamond Jewelry | Star Impex";
    case links.PRIVACY_POLICY: 
      return "Privacy Policy | How Star Impex Protects Your Data";
    case links.SIGNUP: 
      return "Sign Up | Create Your Star Impex Account ";
    case links.LOGIN: 
      return "Login | Access Your Star Impex Account";
    case links.TERMS: 
      return "Terms & Conditions | Star Impex Usage Guidelines";
  }
  return "Star Impex | B2B Supplier of Lab-Grown Diamonds & Lab-Grown Diamond Jewellery in Surat - Certified & Custom Jewelry";
};

const getDescription = (link?: string, description?: string): string => {
  if (description) return description;
  switch (link) {
    case links.HOME:
      return "Star Impex, a leading B2B diamond supplier in Surat, specializes in Lab-Grown Diamonds & Lab-Grown Diamond Jewellery. Offering certified and non-certified options in various sizes, colors, and shapes, we also provide custom diamond jewelry solutions for your business needs.";
    case links.ABOUT_US: 
      return "Discover Star Impex, a Surat-based B2B leader in Lab-Grown Diamonds & Lab-Grown Diamond Jewellery. Learn about our commitment to quality, offering certified and non-certified diamonds, and custom diamond jewelry designed to meet your business needs.";
    case links.CONTACT_US: 
      return "Have a question or need support? Get in touch with our professional team for expert help and personalized assistance on all your diamond needs.";
    case links.FORGOT_PASSWORD: 
      return "Reset your Star Impex account password if you've forgotten it. Follow our secure process to regain access to your account quickly and easily.";
    case links.GUIDE: 
      return "Learn about Diamond's 4Cs with Star Impex. Our guide helps you understand the key factors of diamond like Carat, Color, Clarity, Cut.";
    case links.INQUIRY: 
      return "Interested in loose diamonds? Contact through our inquiry form for expert advice and detailed information.";
    case links.NATURAL_DIAMONDS: 
      return "Discover Star Impex' natural diamonds, crafted with precision. Learn about our manufacturing process and explore our certified and non-certified options in various sizes, colors, and shapes.";
    case links.LAB_GROWN_DIAMONDS: 
      return "Discover Star Impex' lab-grown diamonds, crafted for quality. Learn about our eco-friendly process and explore our certified and non-certified options in various sizes, colors, and shapes.";
    case links.DIAMOND_JEWELRY: 
      return "Explore Star Impex' exquisite diamond jewelry collection. From custom designs to ready-made pieces, find certified jewelry in various styles and settings to suit your business needs.";
    case links.PRIVACY_POLICY: 
      return "Read Star Impex' Privacy Policy to understand how we collect, use, and protect your personal information while you browse our website and make purchases.";
    case links.SIGNUP: 
      return "Sign up for a Star Impex account to start managing your orders, enjoy personalized services, and stay updated with our latest offerings and updates.";
    case links.LOGIN: 
      return "Log in to your Star Impex account to manage your orders, view your details, and access exclusive features. Secure access for registered users.";
    case links.TERMS: 
      return "Review the terms and conditions of using Star Impex' website, including user responsibilities, product information, and legal agreements for secure transactions.";
  }
  return "Star Impex, a leading B2B diamond supplier in Surat, specializes in Lab-Grown Diamonds & Lab-Grown Diamond Jewellery. Offering certified and non-certified options in various sizes, colors, and shapes, we also provide custom diamond jewelry solutions for your business needs.";
};
  