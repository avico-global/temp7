import React, { useMemo } from "react";
import Head from "next/head";
import MarkdownIt from "markdown-it";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import AboutBanner from "@/components/containers/AboutBanner";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import Rightbar from "@/components/containers/Rightbar";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";

// Font
import { Raleway } from "next/font/google";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function About({
  logo,
  about_me,
  imagePath,
  categories,
  blog_list,
  domain,
  meta,
  contact_details,
  favicon,
  layout,
  nav_type,
  footer_type,
  logo_white,

}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(about_me?.value);

  const reversedLastFiveBlogs = useMemo(() => {
    const lastFiveBlogs = blog_list?.slice(-5);
    return lastFiveBlogs ? [...lastFiveBlogs].reverse() : [];
  }, [blog_list]);

  const breadcrumbs = useBreadcrumbs();
  const page = layout?.find((page) => page.page === "about");

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/about`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

      <Navbar
        logo={logo}
        nav_type={nav_type}
        imagePath={imagePath}
        blog_list={blog_list}
        categories={categories}
        contact_details={contact_details}
      />

      <AboutBanner image={`${imagePath}/${about_me.file_name}`} />

      <FullContainer>
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} className="mt-7" />
        </Container>
      </FullContainer>
      <div className=" mx-auto max-w-[1200px] " >
        <div className="pb-16 pt-8">
          <div className="grid grid-cols-about gap-16 w-full">
            <div
              className="markdown-content about_me prose max-w-full"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <Rightbar
              widgets={page?.widgets}

              about_me={about_me}
              imagePath={imagePath}
              blog_list={blog_list}
              categories={categories}
              contact_details={contact_details}
              lastFiveBlogs={reversedLastFiveBlogs}
            />
          </div>
        </div>
      </div>

      <Footer
        logo={logo_white}
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
              "@type": "WebSite",
              "@id": `http://${domain}/#website`,
              url: `http://${domain}/`,
              name: domain,
              description: meta?.description,
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `http://${domain}`,
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `http://${domain}${breadcrumb.url}`,
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const logo_white = await callBackendApi({ domain, query, type: "logo_white" });

  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const meta = await callBackendApi({ domain, query, type: "meta_about" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo.data[0] || null,
      logo_white: logo_white.data[0] || null,
      layout: layout?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      blog_list: blog_list.data[0]?.value,
      categories: categories?.data[0]?.value || null,
      contact_details: contact_details.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
    },
  };
}
