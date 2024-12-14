"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import Image from 'next/image';
import Link from 'next/link';

export default function BannerVideo() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // To track if data is being fetched

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        const fetchAllBanners = async () => {
            try {
                const response = await axios.get("/api/banner/fetchall/banner");
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching banners:", error);
                toast.error("Failed to fetch banners.");
            } finally {
                setLoading(false); // Set loading to false once the fetch is done
            }
        };

        fetchAllBanners();
    }, []);

    return (
        <section className="">
            <div className="container mx-auto w-full overflow-hidden">
                {loading ?
                    <div className=" h-96  animated-gradient rounded-lg"></div>
                    : (
                        <Slider {...settings}>
                            {data.map((img, index) => (
                                <div key={index}>
                                    <Link href="/projects">
                                        <Image
                                            src={img.imgurl}
                                            width={1920}
                                            height={1080}
                                            className="max-w-full w-full"
                                            alt="Parth Sarthi"
                                        />
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                    )}
            </div>
        </section>
    );
}
