"use client";
import React, { useEffect, useState } from "react";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import { ArrowRight } from 'lucide-react';
import ReviewsCard from "../card/ReviewsCard";
import axios from "axios";
import Link from "next/link";
export default function Reviews() {
    const [isMounted, setIsMounted] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchreviews = async () => {
        try {
            const response = await axios.get('/api/reviews/get/reviews');
            setReviews(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        fetchreviews();
    }, []);

    var settings3 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="py-10">
            <div className="container flex flex-col items-center max-w-[90%] mx-auto relative">
                <p className="bg-gradient-to-r animate-bounce mb-2 font-semibold inline-block px-5 py-1 text-sm rounded-full text-white from-[#DAB221] to-[#B07C0A]">ParthSarthi Developers</p>
                <h2 className="text-3xl mb-4 font-light text-[#2d2849]">Our <span className="font-bold">Testimonials</span></h2>
                <div className="w-full">
                    {isMounted && !loading ? (
                        <Slider {...settings3}>
                            {reviews.map((review, index) => (
                                <div key={index} className="px-2">
                                    <ReviewsCard review={review} />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>


            <div className=" flex justify-center mt-5">
                <Link href={`/reviews`} className="sm:flex hidden py-3 px-10 rounded-full items-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] text-white font-semibold my-3 leading-3 group transition">
                    View All
                    <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" size={18} />
                </Link>
            </div>
        </section>
    );
}
