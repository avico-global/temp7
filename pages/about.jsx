import React, { useMemo } from "react";

import Head from "next/head";
import MarkdownIt from "markdown-it";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import Container from "@/components/common/Container";
import Rightbar from "@/components/containers/Rightbar";
import FullContainer from "@/components/common/FullContainer";
import AboutBanner from "@/components/containers/AboutBanner";
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
  categories,
  blog_list,
  imagePath,
  about_me,
  domain,
  logo,
  meta,
  page,
  favicon,
  nav_type,
  footer_type,
  contact_details,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(about_me?.value);

  const reversedLastFiveBlogs = useMemo(() => {
    const lastFiveBlogs = blog_list?.slice(-5);
    return lastFiveBlogs ? [...lastFiveBlogs].reverse() : [];
  }, [blog_list]);

  const breadcrumbs = useBreadcrumbs();

  return (
    page?.enable && (
      <div className={myFont.className}>
        <Head>
          <meta charSet="UTF-8" />
          <title>{meta?.title}</title>
          <meta name="description" content={meta?.description} />
          <link rel="author" href={`https://${domain}`} />
          <link rel="publisher" href={`https://${domain}`} />
          <link rel="canonical" href={`https://${domain}/about`} />
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
            <div className="grid grid-cols-1 md:grid-cols-about gap-16 w-full mb-10">
              <div
                className="markdown-content about_me prose max-w-full mt-5"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <Rightbar
                about_me={
                  about_me?.value
                    ? {
                        ...about_me,
                        value:
                          about_me.value.split(" ").slice(0, 15).join(" ") +
                          "...",
                      }
                    : about_me
                }
                imagePath={imagePath}
                blog_list={blog_list}
                categories={categories}
                contact_details={contact_details}
                lastFiveBlogs={reversedLastFiveBlogs}
              />
            </div>
          </Container>
        </FullContainer>
        <FullContainer>
          <Container>
            <Footer
              logo={logo}
              about_me={
                about_me?.value
                  ? {
                      ...about_me,
                      value:
                        about_me.value.split(" ").slice(0, 55).join(" ") +
                        "...",
                    }
                  : about_me
              }
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
                "@id": `https://${domain}/about`,
                url: `https://${domain}/about`,
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
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const meta = await callBackendApi({ domain, type: "meta_about" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "about");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      page,
      domain,
      imagePath,
      logo: logo.data[0] || null,
      meta: meta?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      blog_list: blog_list.data[0]?.value,
      nav_type: nav_type?.data[0]?.value || {},
      copyright: copyright?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      categories: categories?.data[0]?.value || null,
      footer_type: footer_type?.data[0]?.value || {},
      contact_details: contact_details.data[0]?.value || null,
    },
  };
}
