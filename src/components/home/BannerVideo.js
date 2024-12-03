"use client";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from "react";
import Slider from "react-slick";
import Image from 'next/image';
import Link from 'next/link';

export default function BannerVideo() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const images = [
        'https://res.cloudinary.com/disbjpwzn/image/upload/v1727681243/main/qu86sr1pdxoxxpp11ode.webp'
    ]

    return (

        <section className="">

            <div className="container mx-auto w-full overflow-hidden">
                <Slider {...settings}>
                    <div>
                        <Link href="/projects">
                            <Image src={images[0]} width={1920}
                                height={1080} className="max-w-full w-full" alt='Parth Sarthi' />
                        </Link>
                    </div>
                    <div>
                        <Link href="/projects">
                            <Image src={images[0]} width={1920}
                                height={1080} className="max-w-full w-full" alt='Parth Sarthi' />
                        </Link>
                    </div>


                </Slider>
            </div>


        </section>
    )
}