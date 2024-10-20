import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";

export default function MustRead({ blog_list = [], imagePath }) {
  const mustReadBlogs = blog_list.filter((item) => item.isMustRead);

  return (
    mustReadBlogs?.length > 0 && (
      <div className="grid grid-cols-1 gap-8 w-full">
        {mustReadBlogs.map((item, index) => (
          <BlogCard
            key={item.id || index}
            title={item.title}
            published_at={item.published_at}
            author={item.author}
            date={item.published_at}
            tagline={item.tagline}
            description={item.articleContent}
            image={`${imagePath}/${item.image || "no-image.png"}`}
            href={
              `/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                item?.title
              )}` || "#"
            }
            category={sanitizeUrl(item.article_category) || "#"}
            imageTitle={item.imageTitle}
            altImage={item.altImage}
          />
        ))}
      </div>
    )
  );
}

function BlogCard({
  title,
  image,
  published_at,
  href,
  category,
  imageTitle = "Article Thumbnail",
  altImage = "No Thumbnail Found",
  tagline,
}) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Link
        href={href || "#"}
        title={imageTitle}
        className="relative overflow-hidden w-full h-48"
      >
        <Image
          src={image}
          title={imageTitle}
          alt={altImage || tagline}
          priority={false}
          width={298}
          height={195}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, 33vw"
          className="h-full min-w-full hover:scale-110 transition-all"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <div className="flex flex-col justify-center w-full md:w-auto gap-3 text-left">
        <Link
          className="text-gray-400 uppercase text-sm font-semibold"
          href={`/${category}`}
        >
          {category}
        </Link>

        <Link href={href || "#"}>
          <p className="font-bold text-2xl hover:underline">{title}</p>
        </Link>

        <p className="text-gray-400 uppercase text-sm font-semibold">
          {published_at}
        </p>
      </div>
    </div>
  );
}
