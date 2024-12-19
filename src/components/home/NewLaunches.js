"use client";
import React, { useState, useEffect } from "react";
import New from "../card/new";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowRight } from 'lucide-react';

import Slider from "react-slick";
import Link from "next/link";
import axios from "axios";

export default function NewLaunches() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/projects/fetchnewlaunch/new');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: true,
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
        <section className="py-10 bg-gradient-to-br relative overflow-hidden from-[#2d2849] to-[#352d60]">
            <div className="container flex flex-col items-center max-w-[90%] mx-auto relative">
                <div className='py-7'></div>

                <p className="lg:text-[100px] text-[60px] absolute top-[0] text-center font-bold text-slate-200 uppercase animate-bounce opacity-10 mx-auto">New Launches</p>
                <h2 className="text-3xl text-center mb-10 mt-5 font-bold text-white">New Launches Projects</h2>

                {loading ? (
                    <div className="flex justify-center items-center w-full h-48">
                        <p className="text-lg font-semibold text-gray-500">Loading...</p>
                    </div>
                ) : (
                    <div className="w-full">
                        <Slider {...settings}>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <div key={item.slug || index} className="px-2">
                                        <New
                                            keyid={item.slug}
                                            logo={item.logo}
                                            imageUrl={item.image}
                                            status="New Launch"
                                            title={item.title}
                                            location={item.location}
                                            size={item.projectSize}
                                            bhk={item.bhk}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="px-2">
                                    <New
                                        imageUrl="/placeholder.jpg" // Provide a default placeholder image
                                        status="New"
                                      
                                        title="Modern Apartment"
                                        location="Jaipur, Rajasthan"
                                        size="1800"
                                        bhk="3"
                                    />
                                </div>
                            )}
                        </Slider>
                    </div>
                )}

                <Link href={`/projects`} className="flex py-3 px-10 rounded-full items-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] text-white font-semibold my-3 leading-3 group transition">
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
