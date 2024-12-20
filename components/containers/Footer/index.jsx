import React from "react";
import LatestPosts from "../LatestPosts";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sanitizeUrl } from "@/lib/myFun";
import Logo from "../Navbar/Logo";

export default function Footer({
  categories,
  blog_list,
  imagePath,
  category,
  logo,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/sitemap.xml";
  };

  return (
    <div className="w-full border-t pt-10">
      <div className="grid grid-cols-1 md:grid-cols-footer gap-10 w-full">
        <div>
          <Logo logo={logo} imagePath={imagePath} />
        </div>

        <div className="grid grid-cols-2 gap-5 p-2">
          <div className="flex flex-col">
            <p className="font-bold mb-5">Categories</p>
            {categories?.map((item, index) => (
              <Link
                key={index}
                title={item?.title || "Article Link"}
                href={`/${sanitizeUrl(item.title)}`}
                className={cn(
                  "uppercase text-sm mb-2 hover:text-button w-fit transition-all",
                  category === item.title && "border-b-2 border-button"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col ">
            <p className="font-bold mb-5">Quick Links</p>
            <Link
              title="Home"
              href="/"
              className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
            >
              Home
            </Link>
            <Link
              title="About"
              href="/about"
              className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
            >
              About
            </Link>
            <Link
              title="Contact"
              href="/contact"
              className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
            >
              Contact
            </Link>
            <Link
              title="Terms & Conditions"
              href="/terms-and-conditions"
              className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
            >
              Terms & Conditions
            </Link>
            <Link
              title="Privacy Policy"
              href="/privacy-policy"
              className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
            >
              Privacy Policy
            </Link>
            <Link title="Sitemap" href="/sitemap.xml" legacyBehavior>
              <a
                title="Sitemap"
                onClick={handleClick}
                className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
              >
                Sitemap
              </a>
            </Link>
          </div>
        </div>
        <LatestPosts blog_list={blog_list} imagePath={imagePath} />
      </div>

      <p className="mt-12 py-6 border-t  text-center  text-sm">
        All Right Reservfed{" "}
      </p>
    </div>
  );
}
