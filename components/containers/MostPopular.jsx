import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";

export default function MostPopular({ blog_list = [], imagePath }) {
  const mostPopularBlogs = blog_list.filter((item) => item.isPopular);

  return (
    mostPopularBlogs?.length > 0 && (
      <div>
        <div className="border-t pt-5 px-4 text-center py-10 w-full flex flex-col items-center">
          <h2 className="px-5 text-4xl font-bold -mt-10 text-center bg-white w-fit">
            {"Most Popular"}
          </h2>
          <h2 className="px-5 text-xl font-semibold text-gray-500 text-center mt-5">
            Discover the top trending articles everyone is reading.
          </h2>
        </div>
        <div className="grid grid-cols-mustRead gap-8 w-full">
          {mostPopularBlogs.slice(0, 1).map((item, index) => (
            <div key={index} className="relative overflow-hidden group h-full">
              <Link
                href={`/${sanitizeUrl(item.article_category) || "#"}`}
                title={item.imageTitle}
                className="relative overflow-hidden w-full"
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

              <div className="flex flex-col z-10 justify-end w-full right-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500 md:w-auto gap-5 text-left absolute top-0 h-full text-white p-10 left-0">
                <Link
                  className="uppercase font-semibold"
                  href={`/${sanitizeUrl(item.article_category) || "#"}`}
                >
                  {item.article_category}
                </Link>

                <Link href={`/${sanitizeUrl(item.article_category) || "#"}`}>
                  <h3 className="font-bold text-4xl group-hover:underline">
                    {item.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-3">
                  <p className="capitalize font-semibold">{item.author}</p>{" "}
                  {"-"}
                  <p className="font-semibold">{item.published_at}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-8">
            {mostPopularBlogs.slice(1).map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-5 group">
                <Link
                  href={`/${sanitizeUrl(item.article_category) || "#"}`}
                  title={item.imageTitle}
                  className="relative overflow-hidden w-full h-56"
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
                    className="h-full min-w-full group-hover:scale-125 transition-all duration-500"
                    style={{ objectFit: "cover" }}
                  />
                </Link>

                <div className="flex flex-col justify-center w-full md:w-auto gap-3 text-left">
                  <Link
                    className="text-gray-400 uppercase text-sm font-semibold"
                    href={`/${sanitizeUrl(item.article_category) || "#"}`}
                  >
                    {item.article_category}
                  </Link>

                  <Link href={`/${sanitizeUrl(item.article_category) || "#"}`}>
                    <p className="font-bold text-2xl group-hover:underline">
                      {item.title}
                    </p>
                  </Link>

                  <p className="text-gray-400 uppercase text-sm font-semibold">
                    {item.published_at}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
