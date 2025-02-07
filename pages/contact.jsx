import React from "react";
import Head from "next/head";

import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import Map from "@/components/containers/Map";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Font
import { Raleway } from "next/font/google";
import GoogleTagManager from "@/lib/GoogleTagManager";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import JsonLd from "@/components/json/JsonLd";
import { MailOpen, MapIcon, Phone } from "lucide-react";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Contact({
  contact_details,
  footer_type,
  categories,
  imagePath,
  blog_list,
  nav_type,
  favicon,
  domain,
  logo,
  page,
  meta,
}) {
  const breadcrumbs = useBreadcrumbs();

  return (
    page?.enable && (
      <div
        className={`flex flex-col justify-between min-h-screen gap-12 ${myFont.className}`}
      >
        <Head>
          <meta charSet="UTF-8" />
          <title>{meta?.title}</title>
          <meta name="description" content={meta?.description} />
          <link rel="author" href={`https://www.${domain}`} />
          <link rel="publisher" href={`https://www.${domain}`} />
          <link rel="canonical" href={`https://www.${domain}/contact`} />
          <meta name="theme-color" content="#008DE5" />
          <link rel="manifest" href="/manifest.json" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <GoogleTagManager />
          <meta
            name="google-site-verification"
            content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
          />
        </Head>

        {/* Render Navbar */}
        <div>
          <Navbar
            logo={logo}
            nav_type={nav_type}
            imagePath={imagePath}
            blog_list={blog_list}
            categories={categories}
            contact_details={contact_details}
          />
          {/* Render Breadcrumbs */}
          <FullContainer>
            <Container>
              <Breadcrumbs breadcrumbs={breadcrumbs} className="py-7" />
              <h1 className="w-full text-3xl font-bold border-b mb-10">
                Contact Us
              </h1>
            </Container>
          </FullContainer>
        </div>

        <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b ">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Image and Contact Info */}
              <div className="hidden lg:block">
                <div className="relative h-[600px] rounded-2xl overflow-hidden">
                  <img
                    src={
                      "/img/contact1.png" ||
                      `${imagePath}/${about_me.file_name}`
                    }
                    alt="Contact Us"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-100">
                        <Phone className="w-5 h-5 mr-3" />
                        <span>
                          {contact_details?.phone || "+1 (555) 000-0000"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-100">
                        <MailOpen className="w-5 h-5 mr-3" />
                        <span>
                          {contact_details?.email || "contact@example.com"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-100">
                        <MapIcon className="w-5 h-5 mr-3" />
                        <span>
                          {contact_details?.address ||
                            "123 Business Street, City, Country"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div>
                <div className="text-center mb-12 lg:text-left">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
                    Get in Touch
                  </h1>
                  <p className="text-lg text-gray-600">
                    We&apos;d love to hear from you. Please fill out this form.
                  </p>
                </div>

                <div className="rounded-2xl shadow-2xl p-8 md:p-12 bg-white/95 backdrop-blur-sm border border-gray-100">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-white/50 text-gray-900 placeholder-gray-400"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-white/50 text-gray-900 placeholder-gray-400"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-white/50 text-gray-900 placeholder-gray-400"
                          placeholder="+1 (555) 000-0000"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-white/50 text-gray-900 placeholder-gray-400 resize-none"
                        placeholder="Write your message here..."
                        required
                      />
                    </div>

                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-primary/20 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FullContainer>
          <Container>
            {/* Render Footer */}
            <Footer
              logo={logo}
              imagePath={imagePath}
              blog_list={blog_list}
              categories={categories}
              footer_type={footer_type}
            />
          </Container>
        </FullContainer>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `https://${domain}/contact`,
                url: `https://${domain}/contact`,
                name: meta?.title,
                description: meta?.description,
                inLanguage: "en-US",
                publisher: {
                  "@type": "Organization",
                  "@id": `https://${domain}`,
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: breadcrumb.label,
                  item: `https://${domain}${breadcrumb.url}`,
                })),
              },
            ],
          }}
        />
      </div>
    )
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const contact_details = await callBackendApi({
    domain,

    type: "contact_details",
  });
  const categories = await callBackendApi({
    domain,

    type: "categories",
  });
  const meta = await callBackendApi({ domain, type: "meta_contact" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "contact");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      page,
      domain,
      imagePath,
      logo: logo?.data[0],
      meta: meta?.data[0]?.value || null,
      blog_list: blog_list.data[0]?.value,
      nav_type: nav_type?.data[0]?.value || {},
      favicon: favicon?.data[0]?.file_name || null,
      footer_type: footer_type?.data[0]?.value || {},
      categories: categories?.data[0]?.value || null,
      contact_details: contact_details.data[0].value || null,
    },
  };
}
