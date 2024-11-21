import React, { useEffect } from "react";
import dayjs from "dayjs";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import JsonLd from "@/components/json/JsonLd";
import Footer from "@/components/containers/Footer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Container from "@/components/common/Container";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import FullContainer from "@/components/common/FullContainer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Rightbar from "@/components/containers/Rightbar";
import Navbar from "@/components/containers/Navbar";
import useBreadcrumbs from "@/lib/useBreadcrumbs";

export default function Categories({
  contact_details,
  categories,
  blog_list,
  imagePath,
  about_me,
  tag_list,
  nav_type,
  favicon,
  domain,
  logo,
  meta,
  page,
}) {
  const router = useRouter();
  const { tag } = router.query;

  const breadcrumbs = useBreadcrumbs();

  const filteredBlogList = blog_list.filter((item) => {
    const searchContent = tag?.replaceAll("-", " ")?.toLowerCase();
    return item.tags?.some((tag) => tag?.toLowerCase() === searchContent);
  });

  useEffect(() => {
    const currentPath = router.asPath;

    if (tag && (tag.includes("%20") || tag.includes(" "))) {
      const newTag = tag.replaceAll(/%20/g, "-").replaceAll(/ /g, "-");
      router.replace(`/tags/${newTag}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [tag, router]);

  return (
    page?.enable && (
      <div>
        <Head>
          <meta charSet="UTF-8" />
          <title>{meta?.title?.replaceAll("##tag##", tag)}</title>
          <meta
            name="description"
            content={meta?.description.replaceAll("##tag##", tag)}
          />
          <link rel="author" href={`https://www.${domain}`} />
          <link rel="publisher" href={`https://www.${domain}`} />
          <link rel="canonical" href={`https://www.${domain}/tags/${tag}`} />
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
        <Navbar
          logo={logo}
          nav_type={nav_type}
          imagePath={imagePath}
          blog_list={blog_list}
          categories={categories}
        />

        {/* Render Breadcrumbs */}
        <FullContainer>
          <Container>
            <Breadcrumbs breadcrumbs={breadcrumbs} className="py-7" />
          </Container>
        </FullContainer>

        {/* Render Page Results */}
        <FullContainer className="mb-12">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-home1 gap-12 w-full">
              <div>
                <h1 className="text-2xl font-semibold border-l-4 border-primary capitalize px-4 py-1 mb-7 w-full">
                  Tag: {tag?.replaceAll("-", " ")}
                </h1>
                {filteredBlogList.length === 0 && (
                  <div className="flex items-center justify-center border px-10 py-40 text-lg bg-gray-200">
                    No articles found related to {tag}
                  </div>
                )}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredBlogList.map((item, index) => (
                    <div key={index}>
                      <Link
                        title={item?.title || "Article Link"}
                        href={`/${item.article_category
                          ?.toLowerCase()
                          ?.replaceAll(" ", "-")}/${item.title
                          ?.replace(/ /g, "-")
                          ?.toLowerCase()}`}
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
                        href={`/${item.article_category
                          ?.toLowerCase()
                          ?.replaceAll(" ", "-")}/${item.title
                          ?.replace(/ /g, "-")
                          ?.toLowerCase()}`}
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

        {/* Render Footer */}
        <Footer
          logo={logo}
          imagePath={imagePath}
          blog_list={blog_list}
          categories={categories}
        />

        {/* Render JSON-LD */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `https://${domain}/tags/${tag}`,
                url: `https://${domain}/tags/${tag}`,
                name: meta?.title,
                isPartOf: {
                  "@id": `https://${domain}`,
                },
                description: meta?.description,
                inLanguage: "en-US",
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

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { tag } = query;

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
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const meta = await callBackendApi({ domain, type: "meta_tag" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  const tagExists = tag_list?.data[0]?.value?.some(
    (t) =>
      t?.tag?.toLowerCase()?.replaceAll(" ", "-") ===
      tag?.toLowerCase()?.replaceAll(" ", "-")
  );

  if (!tagExists) {
    return {
      notFound: true,
    };
  }

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "Tag Page");
  }

  if (!page?.enable) {
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
      blog_list: blog_list.data[0]?.value,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0].value || null,
      tag_list: tag_list?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
