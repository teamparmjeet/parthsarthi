"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";

export default function SingleBlog({ params }) {
  const { slug } = params;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`/api/blogs/${slug}`);
        setBlog(response.data.data);
      } catch (err) {
        setError("Failed to fetch blog data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

  if (loading) {
    return (
      <section className="py-8">
        <div className="container max-w-[90%] mx-auto text-center">
          <p className="text-xl font-bold text-gray-600">Loading blog details...</p>
          <div className="mt-4">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="container max-w-[90%] mx-auto text-center">
          <p className="text-xl font-bold text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-2 bg-[#e6ecfc]">
        <div className="container max-w-[90%] mx-auto">
          <Breadcrumb customLabels={{ blog: "Blog", single: blog.slug }} />
        </div>
      </section>

      <section className="py-8">
        <div className="container max-w-[80%] mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-6">By {blog.author || "Unknown Author"}</p>
          <Image
            src={blog.image}
            height={500}
            width={800}
            alt={blog.title}
            className="rounded-lg shadow-md mx-auto"
          />
          <article className="mt-6 text-gray-700 leading-relaxed">
            <div className=''
              dangerouslySetInnerHTML={{ __html: blog.content }}>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
