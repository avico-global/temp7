import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { Menu, Search, X } from "lucide-react";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

export default function Navbar({
  logo,
  categories,
  imagePath,
  blog_list,
  searchContainerRef,
}) {
  const [sidebar, setSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef(null); // Add a ref for the sidebar
  // Add new state variables for search
  const [searchQuery, setSearchQuery] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const searchRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const lastThreeBlogs = blog_list.slice(-3);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false); // Close sidebar if clicked outside
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  // Add search handlers
  const handleSearchToggle = () => {
    setOpenSearch(!openSearch);
    setSearchQuery('');
    setFilteredBlogs([]);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredBlogs([]);
      return;
    }

    const filtered = blog_list?.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    ) || [];
    setFilteredBlogs(filtered);
  };

  // Add click outside handler for search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
        setSearchQuery('');
        setFilteredBlogs([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <FullContainer>
        <Container>
          <div className="w-full">
            <div className="p-10 border-b">
              <Logo logo={logo} imagePath={imagePath} />
            </div>
            <div className="flex items-center justify-between gap-3 mx-auto border-b-2 border-black p-6 max-w-[1500px]">
              <Menu
                onClick={() => setSidebar(true)}
                className="cursor-pointer w-8"
              />

              {/* Main Nav Links */}
              <div className="hidden lg:flex space-x-4 lg:space-x-9">
                <Link title="Home" href="/">
                  Home
                </Link>

                {/* Categories Link */}
                <div
                  className="relative group"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button title="Categories" className="hover:text-black">
                    Categories
                  </button>

                  {/* Categories Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute left-0 top-full bg-white shadow-xl rounded-md z-50 p-2 w-[300px] grid grid-cols-1">
                      {categories.map((category, index) => (
                        <Link
                          key={index}
                          href={`/${encodeURI(sanitizeUrl(category.title))}`}
                          className="border-b last:border-none"
                        >
                          <div className="flex items-center gap-4 hover:bg-gray-100 p-2 transition">
                            <Image
                              src={`${imagePath}/${category.image}`}
                              alt={category.title}
                              width={60}
                              height={100}
                              className="rounded-md h-14"
                            />
                            <span className="font-medium capitalize">
                              {category.title}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link title="Contact" href="/contact">
                  Contacts
                </Link>
                <Link
                  title="About"
                  href="/about"
                  className="  mb-2 w-fit transition-all"
                >
                  About
                </Link>
              </div>

              {/* Search Section */}
              <div
                className="flex items-center justify-end gap-3 text-gray-500 relative"
                ref={searchRef}
              >
                <Search
                  className="w-5 md:w-4 text-black cursor-pointer"
                  onClick={handleSearchToggle}
                />
                
                {openSearch && (
                  <div className="fixed lg:absolute top-16 lg:right-0 lg:ml-auto w-full lg:w-fit flex flex-col items-start justify-center lg:justify-end left-0">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="lg:text-xl border border-gray-300 inputField rounded-md outline-none bg-gray-300  shadow-xl p-2 px-3 mx-auto duration-300 ease-in-out  w-5/6 lg:w-[650px] focus:ring-2 focus:ring-gray-500"
                      placeholder="Search..."
                      autoFocus
                    />
                    {searchQuery && (
                      <div className="lg:absolute top-full p-1 lg:p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 mx-auto w-5/6 lg:w-[650px]">
                        {filteredBlogs?.length > 0 ? (
                          filteredBlogs.map((item, index) => (
                            <Link
                              key={index}
                              title={item.title}
                              href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(item?.title)}`}
                            >
                              <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                                {item.title}
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="p-2 text-gray-600">
                            No articles found.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </FullContainer>

      {/* Sidebar for Mobile */}
      <div
        className={`sidebar fixed top-0 left-0 h-screen flex flex-col justify-between bg-white text-black shadow-xl z-50 overflow-x-hidden p-10 lg:p-6 ${
          sidebar ? "open" : "-ml-96"
        }`}
        ref={sidebarRef}
      >
        <div>
          <div className="flex items-center justify-between">
            <Logo logo={logo} imagePath={imagePath} />
            <X
              className="w-8 text-black cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </div>

          <div className="pt-32 hidden lg:flex flex-col items-center p-2">
            <div className="lg:flex lg:flex-col">
              {lastThreeBlogs.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-widget1 gap-4 py-3 border-b last:border-none"
                >
                  <Link
                    title={item.title || "Article"}
                    href={`/${encodeURI(
                      sanitizeUrl(item.article_category)
                    )}/${encodeURI(sanitizeUrl(item.title))}`}
                  >
                    <div className="overflow-hidden relative min-h-20 w-full bg-black flex-1 rounded-full">
                      <Image
                        title={
                          item?.imageTitle || item?.title || "Article Thumbnail"
                        }
                        alt={
                          item?.tagline || item?.altText || "Article Thumbnail"
                        }
                        src={
                          item.image
                            ? `${imagePath}/${item.image}`
                            : "/no-image.png"
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
                      <p className="font-semibold leading-tight ">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Menu Links */}
          <div className="flex lg:hidden text-2xl flex-col gap-6 mt-16">
            <Link title="Home" href="/">
              Home
            </Link>
            <div className="relative">
              <button
                title="Categories"
                className="cursor-pointer"
                onClick={toggleDropdown}
              >
                Categories
              </button>

              {/* Categories Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 top-full bg-white text-black shadow-lg rounded-md z-50 p-4 w-[300px]  grid grid-cols-1 gap-4">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/${encodeURI(sanitizeUrl(category.title))}`}
                    >
                      <div className="flex items-center  gap-4 hover:bg-gray-100 p-2 transition">
                        <Image
                          src={`${imagePath}/${category.image}`}
                          alt={category.title}
                          width={60}
                          height={100}
                          className="rounded-md"
                        />
                        <span className="font-semibold">{category.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link title="Contact" href="/contact">
              Contacts
            </Link>

            <Link
              title="About"
              href="/about"
              className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
            >
              About
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Styles */}
      <style jsx>{`
        .sidebar {
          width: 0;
          transition: width 0.3s ease;
        }
        .sidebar.open {
          width: 300px;
        }
        @media only screen and (max-width: 600px) {
          .sidebar.open {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
