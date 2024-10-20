import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

export default function BlogBannerStyle({ myblog, imagePath }) {
  return (
    <FullContainer>
      <Container className="min-h-[50vh] overflow-hidden p-10 text-center relative rounded-xl mt-5">
        <Image
          src={`${imagePath}/${myblog?.file_name}`}
          alt={
            myblog?.value.imageAltText ||
            myblog?.value?.tagline ||
            "No Banner Found"
          }
          title={myblog?.value.imageTitle || myblog?.value.title}
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-full object-cover absolute top-0"
        />
        <Container
          style={{
            backgroundColor: `rgba(0, 0, 0, ${myblog?.value?.opacity / 100})`,
            color: myblog.textColor || "white",
          }}
          className="px-10 py-5 text-center gap-4 rounded-md"
        >
          <Badge>{myblog?.value?.article_category}</Badge>
          <h1
            style={{ fontSize: myblog?.value?.titleFontSize || 34 }}
            className="font-bold"
          >
            {myblog?.value.title}
          </h1>
          <div className="flex gap-4">
            <p>{myblog?.value?.author}</p> - <p>{myblog?.value.published_at}</p>
          </div>
        </Container>
      </Container>
    </FullContainer>
  );
}
