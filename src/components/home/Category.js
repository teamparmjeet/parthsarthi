"use client";
import React, { useState, useEffect } from "react";
import Cata from "../card/cata";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowRight } from 'lucide-react';
import Slider from "react-slick";
import Link from "next/link";
import axios from "axios";

export default function Category() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/category');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: true, // Enable center mode
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="py-16 relative overflow-hidden">
            <div className="container flex flex-col items-center max-w-[90%] mx-auto relative">
                <p className="bg-gradient-to-r animate-bounce mb-2 font-semibold inline-block px-5 py-1 text-xs rounded-full text-white from-[#DAB221] to-[#B07C0A]">ParthSarthi Developers</p>
                <h2 className="text-3xl mb-4 font-light text-[#2d2849]">Find Your <span className="font-bold"> Perfect Space</span></h2>

                {/* Display loading state */}
                {loading ? (
                    <div className="flex justify-center items-center w-full h-48">
                        <p className="text-lg font-semibold text-gray-500">Loading...</p>
                    </div>
                ) : (
                    <div className="w-full">
                        <Slider {...settings}>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <div className="px-2" key={index}>
                                        <Cata imageUrl={item.image} title={item.title} />
                                    </div>
                                ))
                            ) : (
                                <div className="px-2">
                                    <Cata imageUrl={parthCr} title="Modern Apartment" />
                                </div>
                            )}
                        </Slider>
                    </div>
                )}
            </div>
            <div className=" flex justify-center mt-5">

                <Link href={`/category`} className="flex py-3 px-10 rounded-full items-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] text-white font-semibold my-3 leading-3 group transition">
                    View All
                    <ArrowRight
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
                        size={18}
                    />
                </Link>
            </div>
        </section>
    );
}
