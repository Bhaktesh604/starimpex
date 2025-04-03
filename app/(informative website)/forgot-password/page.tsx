import { getSEOMetaData } from "@/app/seo";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { links } from "@/utils/links";
import { Metadata } from "next";

export const metadata: Metadata = getSEOMetaData({
  link: links.FORGOT_PASSWORD,
  canonical: links.FORGOT_PASSWORD,
});

const ForgotPassword = () => {
  return <ForgotPasswordForm />
};

export default ForgotPassword;
