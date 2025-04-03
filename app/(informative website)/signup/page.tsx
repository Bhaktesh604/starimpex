import { getSEOMetaData } from "@/app/seo";
import SignUpForm from "@/components/SignUpForm";
import { links } from "@/utils/links";
import { Metadata } from "next";

export const metadata: Metadata = getSEOMetaData({
  link: links.SIGNUP,
  canonical: links.SIGNUP,
});

const SignUp = () => {
  return <SignUpForm />
};

export default SignUp;
