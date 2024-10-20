import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import { sanitizeUrl } from "@/lib/myFun";

export default function MostPopular({ blog_list = [], imagePath }) {
  const popularBlogs = blog_list.filter((item) => item.isPopular);

  return (
    popularBlogs?.length > 0 && (
      <FullContainer className="py-16 text-center">
        <Container className="border border-gray-200 px-3 py-9 md:px-9">
          <h2 className="font-bold text-3xl -mt-14 bg-white px-6">
            Most Popular
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-11 mb-3">
            {popularBlogs.map((item, index) => (
              <BlogCard
                key={item.id || index}
                title={item.title}
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
                category={item.article_category}
                imageTitle={item.imageTitle}
                altImage={item.altImage}
              />
            ))}
          </div>
        </Container>
      </FullContainer>
    )
  );
}

function BlogCard({
  title,
  image,
  href,
  category,
  imageTitle = "Article Thumbnail",
  altImage = "No Thumbnail Found",
  tagline,
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <Link
        href={href || "#"}
        title={imageTitle}
        className="relative overflow-hidden w-full h-[195px]"
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
          className="w-full h-full hover:scale-110 transition-all"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <Link href={`/${sanitizeUrl(category)}`}>
        <Badge className="text-center whitespace-nowrap my-2">{category}</Badge>
      </Link>
      <Link href={href || ""}>
        <p className="font-semibold leading-5 text-lg hover:underline">
          {title}
        </p>
      </Link>
    </div>
  );
}
