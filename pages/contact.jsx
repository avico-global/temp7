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

          {/* Render Map */}
          <FullContainer>
            <Container>
              {contact_details?.mapDetails?.mapUrl ? (
                <LoadScript googleMapsApiKey="AIzaSyAPeJFoV41Bq2QOImPkf3Dai8hP6aZ7MFg">
                  <GoogleMap
                    mapContainerClassName="h-[500px] w-full rouded-md"
                    center={contact_details?.mapDetails?.center}
                    zoom={12}
                  >
                    <Marker position={contact_details?.mapDetails?.center} />
                  </GoogleMap>
                </LoadScript>
              ) : (
                <Map location="united states" />
              )}
            </Container>
          </FullContainer>
          {/* Render Contact Info */}
          <FullContainer>
            <Container className="mt-10 text-center text-gray-500 text-xs gap-3">
              <p className="text-xl mt-3 font-bold text-black">
                {contact_details?.name}
              </p>
              <p>{contact_details?.email}</p>
              <p>{contact_details?.address}</p>
              <p>{contact_details?.phone}</p>
            </Container>
          </FullContainer>
        </div>

        {/* Render Footer */}
        <Footer
          logo={logo}
          imagePath={imagePath}
          blog_list={blog_list}
          categories={categories}
          footer_type={footer_type}
        />

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
