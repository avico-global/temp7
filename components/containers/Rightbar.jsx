import { Circle, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { sanitizeUrl } from "@/lib/myFun";

const md = new MarkdownIt();

export default function Rightbar({
  about_me = {},
  category,
  tag_list = [],
  blog_list = [],
  imagePath,
  categories = [],
}) {
  const content = md.render(about_me?.value || "");
  const router = useRouter();
  const currentPath = router.asPath;

  const isActive = (path) => currentPath === path;
  const lastFiveBlogs = blog_list.slice(-4);

  const renderAbout = () => (
    <Link
      title="About"
      href="/about"
      className="flex flex-col items-center text-center"
    >
      <div className="relative overflow-hidden ">
        <Image
          src={`${imagePath}/${about_me.file_name}`}
          title={`${content.slice(0, 100)}...`}
          alt={`${content.slice(0, 100)}...`}
          priority
          width={500}
          height={500}
          loading="eager"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0  flex flex-col justify-end text-start p-4  font-bold text-white  text-xl bg-black bg-opacity-50">
          <h3 className=" lg:text-3xl font-bold ">About</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: md.render(about_me?.value || ""),
            }}
          />
        </div>
      </div>
    </Link>
  );

  const renderCategories = () => (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-xl border-b w-full bg-gray-50 py-1 px-3">
        Categories
      </h2>
      <div className="flex flex-col w-full px-2 py-4">
        {categories.map((item, index) => (
          <Link
            key={index}
            title={item?.title}
            href={`/${encodeURI(sanitizeUrl(item.title))}`}
            className={cn(
              "text-gray-500 capitalize w-full flex items-center gap-2 hover:text-black transition-all p-2 border-b-2 border-gray-100 hover:border-black",
              (category === item.title || isActive(`/${item.title}`)) &&
                "border-black text-black"
            )}
          >
            <Circle className="w-2 h-2 text-blue-800" />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );

  const renderTags = () =>
    tag_list?.length > 0 && (
      <div className="border flex flex-col items-center text-center">
        <h2 className="font-bold text-xl border-b w-full bg-gray-50 py-1 px-3">
          Article Tags
        </h2>
        <div className="flex items-center flex-wrap w-full text-left px-2 py-4 gap-2">
          {tag_list?.slice(0, 10)?.map((item, index) => (
            <Link
              key={index}
              title={item.tag}
              href={`/tags/${encodeURI(sanitizeUrl(item.tag))}`}
              className="bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer rounded py-1 text-sm px-2"
            >
              {item.tag}
              {item.article_ids?.length > 1 && (
                <span className="bg-black text-white px-1 ml-1 text-sm rounded-full">
                  {item.article_ids.length}
                </span>
              )}
            </Link>
          ))}
        </div>
        <Link
          title="Click to see all tags"
          href="/tags"
          className="my-3 underline font-bold"
        >
          Click To See All Tags
        </Link>
      </div>
    );

  const renderLatestPosts = () => (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-xl border-b w-full bg-gray-50 py-1 px-3">
        {" Editor's Choice"}
      </h2>
      <div className="flex flex-col my-3">
        {lastFiveBlogs.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-widget gap-3 py-3 border-b last:border-none"
          >
            <Link
              title={item.title || "Article"}
              href={`/${encodeURI(
                sanitizeUrl(item.article_category)
              )}/${encodeURI(sanitizeUrl(item.title))}`}
            >
              <div className="overflow-hidden relative min-h-36 w-full bg-black flex-1">
                <Image
                  title={item?.imageTitle || item?.title || "Article Thumbnail"}
                  alt={item?.tagline || item?.altText || "Article Thumbnail"}
                  src={
                    item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                  }
                  fill
                  loading="lazy"
                  className="object-cover hover:scale-125 transition-all"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Link>

            <div>
              <Link
                title={item.title || "Article Link"}
                href={`/${encodeURI(
                  sanitizeUrl(item.article_category)
                )}/${encodeURI(sanitizeUrl(item.title))}`}
              >
                <p className="font-semibold leading-tight hover:underline">
                  {item.title}
                </p>
              </Link>
              <div className="flex items-center gap-2 mt-1 justify-between text-gray-500">
                <p className="text-xs">{item.author}</p>
                <p className="text-xs whitespace-nowrap">{item.published_at}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-fit sticky top-0 flex flex-col gap-12">
      {renderAbout()}
      {renderCategories()}
      {renderTags()}
      {renderLatestPosts()}
    </div>
  );
}
