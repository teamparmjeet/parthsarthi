"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios"; // Import axios
import BlogCard from "@/components/card/BlogCard";
import { ArrowRight } from "lucide-react"; // Assuming you're using lucide-react for icons

export default function Page() {
    const [isMounted, setIsMounted] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("/api/blogs/fetchall/blog");
            setBlogs(response.data.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setError("Failed to load blogs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        fetchBlogs();
    }, []);

    return (
        <section className="bg-[#fff5e4] py-16">
            <div className="container max-w-[90%] mx-auto">
                <p className="bg-gradient-to-l animate-bounce font-semibold inline-block px-5 py-1 text-xs rounded-full text-white from-[#DAB221] to-[#352d60]">
                    ✨ Articles
                </p>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-light text-[#2d2849]">
                        Our <span className="font-bold">Blogs</span>
                    </h2>

                </div>

                <div className="w-full relative">
                    {isMounted ? (
                        loading ? (
                            <div className="text-center text-lg">Loading...</div>
                        ) : error ? (
                            <div className="text-center text-red-500">{error}</div>
                        ) : blogs.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogs.map((blog) => (
                                    <div key={blog._id} className="px-2">
                                        <BlogCard blog={blog} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">No blogs available.</div>
                        )
                    ) : null}
                </div>
            </div>
        </section>
    );
}
