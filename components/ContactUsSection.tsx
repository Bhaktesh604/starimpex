import phoneIcon from "@/public/assets/images/ic-phone.svg";
import messageIcon from "@/public/assets/images/ic-message.svg";
import contactBg from "@/public/assets/images/contact-section-bg.webp";
import Image from "next/image";
import { CONTACT_NUMBER, EMAIL } from "@/utils/constants";

const ContactUsSection = () => {
  return (
    <section className="relative">
      <div className="absolute -z-[1] h-[50%] sm:h-[75%]">
        <div className="absolute bg-black/60 w-full h-full" />
        <Image
          src={contactBg}
          alt="contact section background"
          className="h-full"
        />
      </div>
      <div className="py-14 px-3">
        <h3 className="text-secondary sub-title text-center mb-5">
          CONTACT US
        </h3>
      </div>
      <div className="pb-8 flex flex-col sm:flex-row gap-5 lg:w-[40vw] justify-center items-center lg:justify-between lg:mx-auto">
        <a
          href={`tel:${CONTACT_NUMBER}`}
          className="bg-white w-[250px] border border-tertiary/20 hover:border-tertiary rounded-3xl py-4 grid place-items-center hover:scale-105 hover:-translate-y-1 transition-transform duration-500"
        >
          <div className="w-[75px] h-[75px] relative flex justify-center items-center mb-3">
            <div className="absolute w-full h-full bg-[url(../public/assets/images/vector-bg.svg)] bg-no-repeat bg-contain " />
            <Image src={phoneIcon} alt="phone icon" width={35} height={35} />
          </div>
          <span>{CONTACT_NUMBER}</span>
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="bg-white w-[250px] border border-tertiary/20 hover:border-tertiary rounded-3xl py-4 grid place-items-center hover:scale-105 hover:-translate-y-1 transition-transform duration-500"
        >
          <div className="w-[75px] h-[75px] relative flex justify-center items-center mb-3">
            <div className="absolute w-full h-full bg-[url(../public/assets/images/vector-bg.svg)] bg-no-repeat bg-contain " />
            <Image
              src={messageIcon}
              alt="message icon"
              width={35}
              height={35}
            />
          </div>
          <span>{EMAIL}</span>
        </a>
      </div>
    </section>
  );
};

export default ContactUsSection;
