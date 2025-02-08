import React, { useEffect } from "react";
import dayjs from "dayjs";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import JsonLd from "@/components/json/JsonLd";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Footer from "@/components/containers/Footer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FullContainer from "@/components/common/FullContainer";
import Rightbar from "@/components/containers/Rightbar";
import Container from "@/components/common/Container";
import Navbar from "@/components/containers/Navbar";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";

export default function Categories({
  contact_details,
  footer_type,
  blog_list,
  tag_list,
  favicon,
  domain,
  logo,
  meta,
  page,
  categories,
  imagePath,
  about_me,
  nav_type,
}) {
  const router = useRouter();
  const { category } = router.query;
  const breadcrumbs = useBreadcrumbs();

  const filteredBlogList = blog_list.filter((item) => {
    const searchContent = sanitizeUrl(category);
    return sanitizeUrl(item.article_category) === searchContent;
  });

  useEffect(() => {
    const currentPath = router.asPath;

    if (category && (category.includes("%20") || category.includes(" "))) {
      const newCategory = category.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [category, router]);

  return (
    page?.enable && (
      <div>
        <Head>
          <meta charSet="UTF-8" />
          <title>
            {meta?.title?.replaceAll(
              "##category##",
              category
                ?.replaceAll("-", " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            )}
          </title>
          <meta
            name="description"
            content={meta?.description.replaceAll(
              "##category##",
              category?.replaceAll("-", " ")
            )}
          />
          <link rel="author" href={`https://www.${domain}`} />
          <link rel="publisher" href={`https://www.${domain}`} />
          <link rel="canonical" href={`https://www.${domain}/${category}`} />
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

        {/* Navbar */}
        <Navbar
          logo={logo}
          nav_type={nav_type}
          category={category}
          imagePath={imagePath}
          blog_list={blog_list}
          categories={categories}
          contact_details={contact_details}
        />

        {/* Breadcrumbs */}
        <FullContainer>
          <Container>
            <Breadcrumbs breadcrumbs={breadcrumbs} className="py-7" />
          </Container>
        </FullContainer>

        {/* Blog List and Right Sidebar */}
        <FullContainer className="mb-12">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-home2 gap-12 w-full">
              <div>
                <h1 className="text-2xl font-semibold border-l-4 border-primary capitalize px-4 py-1 mb-7 w-full">
                  Browsing: {category?.replaceAll("-", " ")}
                </h1>
                {filteredBlogList?.length > 0 ? (
                  ""
                ) : (
                  <div className="flex items-center justify-center border px-10 py-40 text-lg bg-gray-200">
                    No articles found related to {category}
                  </div>
                )}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredBlogList.map((item, index) => (
                    <div key={index}>
                      <Link
                        title={item?.title || "Article Link"}
                        href={`/${sanitizeUrl(
                          item.article_category
                        )}/${sanitizeUrl(item?.title)}`}
                      >
                        <div className="overflow-hidden relative min-h-40 rounded lg:min-h-52 w-full bg-black flex-1">
                          <Image
                            title={item?.title || item.imageTitle}
                            src={
                              item.image
                                ? `${imagePath}/${item.image}`
                                : "/no-image.png"
                            }
                            fill={true}
                            loading="lazy"
                            alt="blog"
                            className="w-full h-full object-cover absolute top-0 hover:scale-125 transition-all"
                          />
                        </div>
                      </Link>
                      <Link
                        title={item?.title || "Article Link"}
                        href={`/${sanitizeUrl(
                          item.article_category
                        )}/${sanitizeUrl(item?.title)}`}
                      >
                        <p className="mt-2 lg:mt-4 font-bold text-lg text-inherit leading-tight hover:underline">
                          {item.title}
                        </p>
                      </Link>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-sm font-semibold">
                          <span className="text-gray-400 text-sm">By</span>:{" "}
                          {item.author}
                        </p>
                        <span className="text-gray-400">--</span>
                        <p className="text-sm text-gray-400 font-semibold">
                          {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                        </p>
                      </div>
                      <p className="text-gray-500 mt-4">{item.tagline}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <Rightbar
                about_me={about_me}
                tag_list={tag_list}
                blog_list={blog_list}
                imagePath={imagePath}
                categories={categories}
                contact_details={contact_details}
              />
            </div>
          </Container>
        </FullContainer>
        <FullContainer>
          <Container>
            {/* Footer */}
            <Footer
              logo={logo}
              imagePath={imagePath}
              blog_list={blog_list}
              categories={categories}
              category={category}
              footer_type={footer_type}
            />
          </Container>
        </FullContainer>

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: breadcrumb.label,
                  item: `https://${domain}${breadcrumb.url}`,
                })),
              },
              {
                "@type": "WebPage",
                "@id": `https://${domain}/${category}`,
                url: `https://${domain}/${category}`,
                name: meta?.title?.replaceAll(
                  "##category##",
                  category?.replaceAll("-", " ")
                ),
                description: meta?.description?.replaceAll(
                  "##category##",
                  category?.replaceAll("-", " ")
                ),
                inLanguage: "en-US",
                publisher: {
                  "@type": "Organization",
                  "@id": `https://${domain}`,
                },
              },
              {
                "@type": "ItemList",
                url: `https://${domain}/${category}`,
                name: "blog",
                itemListElement: blog_list?.map((blog, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Article",
                    url: `https://${domain}/${sanitizeUrl(
                      blog?.article_category.replaceAll(" ", "-")
                    )}/${sanitizeUrl(blog?.title)}`,
                    name: blog.title,
                  },
                })),
              },
            ],
          }}
        />
      </div>
    )
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category } = query;

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const footer_text = await callBackendApi({ domain, type: "footer_text" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const meta = await callBackendApi({ domain, type: "meta_category" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "category");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) =>
      cat?.title?.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
  );

  if (!categoryExists) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0],
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0].value,
      about_me: about_me.data[0] || null,
      copyright: copyright?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      contact_details: contact_details.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      footer_type: footer_type?.data[0]?.value || {},
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
