
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
      return "Motiba Gems | B2B Supplier of Natural & Lab-Grown Diamonds in Surat - Certified & Custom Jewelry";
    case links.ABOUT_US: 
      return "About Motiba Gems | Trusted B2B Supplier of Natural & Lab-Grown Diamonds";
    case links.CONTACT_US: 
      return "Contact Us - Motiba Gems | Connect for Support or Inquiry";
    case links.FORGOT_PASSWORD: 
      return "Forgot Password | Motiba Gems Account Recovery";
    case links.GUIDE: 
      return "Diamond's 4C Guide - Motiba Gems | Guide to Quality";
    case links.INQUIRY: 
      return "Inquire for Loose Diamonds | Request Information from Motiba Gems";
    case links.NATURAL_DIAMONDS: 
      return "Natural Diamonds | Manufacturing Process & Offerings by Motiba Gems";
    case links.LAB_GROWN_DIAMONDS: 
      return "Lab-Grown Diamonds | Manufacturing Process & Offerings by Motiba Gems";
    case links.DIAMOND_JEWELRY: 
      return "Our Product - Diamond Jewelry | Motiba Gems";
    case links.PRIVACY_POLICY: 
      return "Privacy Policy | How Motiba Gems Protects Your Data";
    case links.SIGNUP: 
      return "Sign Up | Create Your Motiba Gems Account ";
    case links.LOGIN: 
      return "Login | Access Your Motiba Gems Account";
    case links.TERMS: 
      return "Terms & Conditions | Motiba Gems Usage Guidelines";
  }
  return "Motiba Gems | B2B Supplier of Natural & Lab-Grown Diamonds in Surat - Certified & Custom Jewelry";
};

const getDescription = (link?: string, description?: string): string => {
  if (description) return description;
  switch (link) {
    case links.HOME:
      return "Motiba Gems, a leading B2B diamond supplier in Surat, specializes in natural and lab-grown diamonds. Offering certified and non-certified options in various sizes, colors, and shapes, we also provide custom diamond jewelry solutions for your business needs.";
    case links.ABOUT_US: 
      return "Discover Motiba Gems, a Surat-based B2B leader in natural and lab-grown diamonds. Learn about our commitment to quality, offering certified and non-certified diamonds, and custom diamond jewelry designed to meet your business needs.";
    case links.CONTACT_US: 
      return "Have a question or need support? Get in touch with our professional team for expert help and personalized assistance on all your diamond needs.";
    case links.FORGOT_PASSWORD: 
      return "Reset your Motiba Gems account password if you've forgotten it. Follow our secure process to regain access to your account quickly and easily.";
    case links.GUIDE: 
      return "Learn about Diamond's 4Cs with Motiba Gems. Our guide helps you understand the key factors of diamond like Carat, Color, Clarity, Cut.";
    case links.INQUIRY: 
      return "Interested in loose diamonds? Contact through our inquiry form for expert advice and detailed information.";
    case links.NATURAL_DIAMONDS: 
      return "Discover Motiba Gems' natural diamonds, crafted with precision. Learn about our manufacturing process and explore our certified and non-certified options in various sizes, colors, and shapes.";
    case links.LAB_GROWN_DIAMONDS: 
      return "Discover Motiba Gems' lab-grown diamonds, crafted for quality. Learn about our eco-friendly process and explore our certified and non-certified options in various sizes, colors, and shapes.";
    case links.DIAMOND_JEWELRY: 
      return "Explore Motiba Gems' exquisite diamond jewelry collection. From custom designs to ready-made pieces, find certified jewelry in various styles and settings to suit your business needs.";
    case links.PRIVACY_POLICY: 
      return "Read Motiba Gems' Privacy Policy to understand how we collect, use, and protect your personal information while you browse our website and make purchases.";
    case links.SIGNUP: 
      return "Sign up for a Motiba Gems account to start managing your orders, enjoy personalized services, and stay updated with our latest offerings and updates.";
    case links.LOGIN: 
      return "Log in to your Motiba Gems account to manage your orders, view your details, and access exclusive features. Secure access for registered users.";
    case links.TERMS: 
      return "Review the terms and conditions of using Motiba Gems' website, including user responsibilities, product information, and legal agreements for secure transactions.";
  }
  return "Motiba Gems, a leading B2B diamond supplier in Surat, specializes in natural and lab-grown diamonds. Offering certified and non-certified options in various sizes, colors, and shapes, we also provide custom diamond jewelry solutions for your business needs.";
};
  