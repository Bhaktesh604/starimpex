import { getSEOMetaData } from "@/app/seo";
import LoginForm from "@/components/LoginForm";
import { links } from "@/utils/links";
import { Metadata } from "next";

export const metadata: Metadata = getSEOMetaData({
  link: links.LOGIN,
  canonical: links.LOGIN,
});

const Login = () => {
  
  return (
    <LoginForm />
  );
};

export default Login;
