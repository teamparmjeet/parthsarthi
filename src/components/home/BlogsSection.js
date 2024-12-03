"use client"; 
import React, { useEffect, useState } from "react";
import Link from "next/link";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowRight } from 'lucide-react';
import Slider from "react-slick";
import BlogCard from "../card/BlogCard";
import axios from "axios";

export default function BlogsSection() {
    const [isMounted, setIsMounted] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

   
     const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blogs/fetchall/blog'); 
            setBlogs(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        fetchBlogs();
    }, []);

    // Slider settings
    var setting5 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                },
            }
        ],
    };

   
    return (
        <section className="bg-[#fff5e4] py-16">
            <div className="container max-w-[90%] mx-auto">
                <p className="bg-gradient-to-l animate-bounce font-semibold inline-block px-5 py-1 text-xs rounded-full text-white from-[#DAB221] to-[#352d60]">✨Articles</p>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-light text-[#2d2849]">
                        Our <span className="font-bold">Blogs</span>
                    </h2>
                    <Link href={`/blog`} className="sm:flex hidden py-3 px-10 rounded-full items-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] text-white font-semibold my-3 leading-3 group transition">
                        View All
                        <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" size={18} />
                    </Link>
                </div>

                <div className="w-full relative">
                {isMounted && !loading ? (
                        <Slider {...setting5}>
                            {blogs.map((blog) => (
                                <div key={blog._id} className="items px-2">
                                    <BlogCard blog={blog} />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div>Loading...</div> 
                    )}
                </div>
            </div>
        </section>
    );
}
