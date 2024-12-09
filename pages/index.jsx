import React from "react";
import Head from "next/head";
import Banner from "@/components/containers/Banner/Banner";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Rightbar from "@/components/containers/Rightbar";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import JsonLd from "@/components/json/JsonLd";
import BlogCard from "@/components/common/BlogCard";
import Link from "next/link";
import Image from "next/image";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";
import MustRead from "@/components/containers/MustRead";
import MostPopular from "@/components/containers/MostPopular";

export default function Home({
  footer_type,
  categories,
  blog_list,
  imagePath,
  favicon,
  banner,
  domain,
  logo,
  meta,
  page,
  tag_list,
  nav_type,
  about_me,
  contact_details,
}) {
  const lastFiveBlogs = blog_list.slice(-5);

  const renderBlogList = () => {
    return (
      <div className="grid grid-cols-2 gap-5 md:gap-10">
        <div className="flex flex-col gap-5">
          {blog_list
            ?.slice(0, blog_list?.length > 7 ? 4 : 2)
            .map((item, index) => (
              <BlogCard
                key={index}
                category={sanitizeUrl(item.article_category) || "#"}
                title={item.title}
                published_at={item.published_at}
                image={
                  item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                }
                href={`/${encodeURI(
                  sanitizeUrl(item.article_category)
                )}/${encodeURI(sanitizeUrl(item.title))}`}
                imageHeight="h-72 md:h-[420px]"
                imageTitle={item.imageTitle || item.title || "Blog Image Title"}
                altImage={item.altImage || item.tagline || "Article Thumbnail"}
              />
            ))}
        </div>
        <div className="flex flex-col gap-5">
          {blog_list
            ?.slice(
              blog_list?.length > 7 ? 5 : 2,
              blog_list?.length > 7 ? 9 : 4
            )
            .map((item, index) => (
              <BlogCard
                key={index}
                category={sanitizeUrl(item.article_category) || "#"}
                title={item.title}
                published_at={item.published_at}
                image={
                  item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                }
                href={`/${encodeURI(
                  sanitizeUrl(item.article_category)
                )}/${encodeURI(sanitizeUrl(item.title))}`}
                imageHeight={index === 0 ? "h-40" : "h-72 md:h-[410px]"}
                imageTitle={item.imageTitle || item.title || "Blog Image Title"}
                altImage={item.altImage || item.tagline || "Article Thumbnail"}
              />
            ))}
        </div>
      </div>
    );
  };

  return (
    page?.enable && (
      <div className="min-h-screen">
        <Head>
          <meta charSet="UTF-8" />
          <title>{meta?.title}</title>
          <meta name="description" content={meta?.description} />
          <link rel="author" href={`https://www.${domain}`} />
          <link rel="publisher" href={`https://www.${domain}`} />
          <link rel="canonical" href={`https://www.${domain}`} />
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
          imagePath={imagePath}
          blog_list={blog_list}
          categories={categories}
          nav_type={nav_type}
          contact_details={contact_details}
        />

        <FullContainer>
          <Container className="gap-24">
            <div className="grid md:grid-cols-home gap-8 mt-10 w-full">
              <div>
                <h2 className="font-bold text-xl border-b pb-1 mb-5">
                  Editor&apos;s Choice
                </h2>
                <div className="flex flex-col gap-4">
                  {blog_list?.slice(0, 2).map((item, index) => (
                    <div className="flex flex-col group" key={index}>
                      <Link
                        key={index}
                        title={item.title}
                        href={`/${encodeURI(
                          sanitizeUrl(item.article_category)
                        )}/${encodeURI(sanitizeUrl(item.title))}`}
                        className="relative overflow-hidden w-full h-44"
                      >
                        <Image
                          src={
                            item.image
                              ? `${imagePath}/${item.image}`
                              : "/no-image.png"
                          }
                          width={331}
                          height={420}
                          loading="eager"
                          alt={
                            item.altImage || item.tagline || "Article Thumbnail"
                          }
                          priority={true}
                          title={
                            item.imageTitle || item.title || "Blog Image Title"
                          }
                          className="w-full h-full absolute top-0 group-hover:scale-125 transition-all duration-500"
                          style={{ objectFit: "cover" }}
                        />
                      </Link>

                      <div className="flex flex-col justify-start text-start gap-2 py-3">
                        <p className="text-sm font-bold text-gray-400 uppercase">
                          {item.article_category}
                        </p>
                        <Link
                          className="font-extrabold md:text-xl leading-tight group-hover:underline"
                          title={item.title}
                          href={`/${encodeURI(
                            sanitizeUrl(item.article_category)
                          )}/${encodeURI(sanitizeUrl(item.title))}`}
                        >
                          {item.title}
                        </Link>
                        <p className="text-sm font-medium text-gray-400">
                          {item.published_at}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Banner
                data={banner.value}
                image={`${imagePath}/${banner?.file_name}`}
                blog_list={blog_list}
              />

              <div className="flex flex-col items-center">
                <div className="lg:flex  lg:flex-col">
                  <h2 className="font-bold text-xl border-b pb-1 mb-3">
                    Latest Posts
                  </h2>
                  {lastFiveBlogs.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-widget gap-3 py-3 first:pt-0 border-b last:border-none group"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-bold text-gray-400 uppercase">
                          {item.article_category}
                        </p>

                        <Link
                          title={item.title || "Article Link"}
                          href={`/${encodeURI(
                            sanitizeUrl(item.article_category)
                          )}/${encodeURI(sanitizeUrl(item.title))}`}
                        >
                          <p className="font-semibold leading-tight group-hover:underline">
                            {item.title}
                          </p>
                        </Link>
                      </div>
                      <Link
                        title={item.title || "Article"}
                        href={`/${encodeURI(
                          sanitizeUrl(item.article_category)
                        )}/${encodeURI(sanitizeUrl(item.title))}`}
                      >
                        <div className="overflow-hidden relative min-h-24 w-full bg-black flex-1">
                          <Image
                            title={
                              item?.imageTitle ||
                              item?.title ||
                              "Article Thumbnail"
                            }
                            alt={
                              item?.tagline ||
                              item?.altText ||
                              "Article Thumbnail"
                            }
                            src={
                              item.image
                                ? `${imagePath}/${item.image}`
                                : "/no-image.png"
                            }
                            fill
                            loading="lazy"
                            className="w-full h-full absolute top-0 group-hover:scale-125 transition-all duration-300"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <MostPopular blog_list={blog_list} imagePath={imagePath} />

            <div>
              <div className="border-t pt-5 px-4 text-center py-10 w-full flex flex-col items-center">
                <h2 className="px-5 text-4xl font-bold -mt-10 text-center bg-white w-fit">
                  Latest Posts
                </h2>
                <h2 className="px-5 text-xl font-semibold text-gray-500 text-center mt-5">
                  Stay up-to-date
                </h2>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-home1 gap-12 w-full">
                  <div className="flex flex-col gap-10 w-full">
                    {renderBlogList(blog_list)}
                  </div>

                  <Rightbar
                    about_me={about_me}
                    tag_list={tag_list}
                    blog_list={blog_list}
                    imagePath={imagePath}
                    categories={categories}
                  />
                </div>
              </div>
            </div>
            {blog_list?.map(
              (item, index) =>
                item.isFeatured && (
                  <div
                    key={index}
                    className={`relative overflow-hidden group h-[60vh] w-full`}
                  >
                    <Link
                      key={index}
                      href={`/${sanitizeUrl(item.article_category) || "#"}`}
                      title={item.imageTitle}
                      className="relative overflow-hidden w-full h-full"
                    >
                      <Image
                        src={`${imagePath}/${item.image || "no-image.png"}`}
                        title={item.imageTitle}
                        alt={item.altImage || item.tagline}
                        priority={false}
                        width={298}
                        height={195}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, 33vw"
                        className="h-full min-w-full group-hover:scale-125 transition-all duration-1000"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>

                    <div className="flex flex-col items-center justify-center z-10 w-full text-center right-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500 md:w-auto gap-8 cursor-pointer absolute top-0 h-full text-white p-10 left-0">
                      <Link
                        className="uppercase text-sm font-semibold bg-white text-black py-0.5 px-3"
                        href={`/${sanitizeUrl(item.article_category) || "#"}`}
                      >
                        {item.article_category}
                      </Link>

                      <Link
                        href={`/${sanitizeUrl(item.article_category) || "#"}`}
                      >
                        <h3 className="font-bold text-4xl max-w-xl group-hover:underline transition-all duration-500">
                          {item.title}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-center gap-5">
                        <p>{item.author}</p>
                        {"-"}
                        <p>{item.published_at}</p>
                      </div>
                    </div>
                  </div>
                )
            )}
            <MustRead blog_list={blog_list} imagePath={imagePath} />

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

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const logo = await callBackendApi({ domain, type: "logo" });
  const meta = await callBackendApi({ domain, type: "meta_home" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });

  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });

  const project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const imagePath = await getImagePath(project_id, domain);

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "home");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  robotsTxt({ domain });

  return {
    props: {
      page,
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      banner: banner?.data[0] || null,
      meta: meta?.data[0]?.value || null,
      about_me: about_me?.data[0] || null,
      nav_type: nav_type?.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      copyright: copyright?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      categories: categories?.data[0]?.value || null,
      footer_type: footer_type?.data[0]?.value || {},
      contact_details: contact_details?.data[0]?.value || null,
    },
  };
}
