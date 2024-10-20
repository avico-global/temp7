import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { sanitizeUrl } from "@/lib/myFun";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";

export default function LatestBlogs({ blogs, imagePath }) {
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  const handleSeeMore = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 6);
  };

  return (
    <FullContainer className="py-16 text-center">
      <Container>
        <h2 className="font-bold text-3xl bg-white px-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 w-full mt-11 mb-3">
          {blogs?.slice(0, visibleBlogs).map((item, index) => (
            <BlogCard
              key={index}
              title={item.title}
              author={item.author}
              date={item.published_at}
              tagline={item.tagline}
              content={item.articleContent}
              image={
                item.image ? `${imagePath}/${item.image}` : "/no-image.png"
              }
              href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                item?.title
              )}`}
              imageTitle={item.imageTitle}
              altImage={item.altImage}
            />
          ))}
        </div>
        {visibleBlogs < blogs.length && (
          <Button onClick={handleSeeMore} className=" bg-button text-black hover:bg-button/80 mt-10">
            See More Articles
          </Button>
        )}
      </Container>
    </FullContainer>
  );
}

function BlogCard({ title, image, tagline, href, imageTitle, altImage }) {
  return (
    <div>
      <Link
        title={imageTitle || title || "Article Thumbnail"}
        href={href || "#"}
      >
        <div className="relative overflow-hidden w-full h-80 hover:opacity-80 transition-all">
          <Image
            src={image}
            title={imageTitle || title || "Article Thumbnail"}
            alt={altImage || tagline || "No Thumbnail Found"}
            priority={true}
            fill={true}
            loading="eager"
            sizes="400px, 300px"
            className="-z-10 w-full h-full object-cover absolute top-0"
          />
        </div>
      </Link>
      <Link title={title || imageTitle || "Article Link"} href={href || ""}>
        <h3 className="font-semibold text-lg mt-4 leading-5 hover:underline">
          {title}
        </h3>
      </Link>
      <p className="text-gray-500 mt-2 text-sm">{tagline}</p>
    </div>
  );
}
