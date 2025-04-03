import { getSEOMetaData } from "@/app/seo";
import { privacyPolicyContent } from "@/utils/content.util";
import { links } from "@/utils/links";
import { Metadata } from "next";

export const metadata: Metadata = getSEOMetaData({
  link: links.PRIVACY_POLICY,
  canonical: links.PRIVACY_POLICY,
});

export default function Page() {
  return (
    <main>
      <div className="grid sm:grid-cols-12 bg-tertiary/10">
        <div className="sm:col-span-10 sm:col-start-2">
          <div className="p-3 min-h-screen grid place-items-center pt-20">
            <div className="m-3 bg-secondary rounded-lg">
              <div className="px-3 py-6 border-b border-primary/80">
                <h1 className="text-center content-text font-semibold tracking-wide !text-2xl">
                  Privacy Policy
                </h1>
              </div>
              <div className="p-12">
                <ul className="grid gap-5 list-disc">
                  {privacyPolicyContent.map((content, index) => (
                    <li
                      key={`privacy-content-${index}`}
                      className="content-text mb-2 list-circle-sm"
                    >
                      {content.text ? content.text : ""}
                      {content.htmlContent ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: content.htmlContent,
                          }}
                        ></div>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
