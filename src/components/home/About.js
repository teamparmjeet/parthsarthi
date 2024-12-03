import videoImg from "@/public/Parth-Crown-1-1024x1024.jpg";
import Image from "next/image";
import React from "react";
import { PlayCircle } from "lucide-react";
import Link from "next/link";


export default function AboutComponent() {
    return (
        <section className="py-10">
            <div className="container max-w-[90%] mx-auto">
                <div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-10 gap-4">

                    <div className="col-span-3">
                        <p className="bg-gradient-to-r animate-bounce mb-2 font-semibold inline-block px-5 py-1 text-xs rounded-full text-white from-[#DAB221] to-[#B07C0A]">About us</p>
                        <h2 className="text-3xl mb-4 font-light text-[#2d2849]">Legacy Of <span className="font-bold">PARTH SARTHI GROUP</span></h2>
                        <p className="mb-3 font-medium">-Experience luxury living with Parth Sarthi Builders and Developers</p>
                        <p className="mb-2 text-sm font-light">Are you looking for a dream home in Jaipur, situated in a prime location with modern architecture and luxury interiors? Look no further than Parth Sarthi Builders and Developers, a reputable group of companies founded by Bhagwana Ram Choudhary and Mega Ram Choudhary. With their combined expertise and experience, they have established themselves as leaders in the real estate industry, especially in Jaipur.</p>
                        <p className="my-3 font-medium">-Why Choose Parth Sarthi Builders and Developers?</p>

                        <p className="mb-2 text-sm font-light">Parth Sarthi Builders and Developers stand out from the competition for several reasons. Firstly, their commitment to quality and customer satisfaction is unmatched. Each project is carefully planned and executed to ensure that residents experience the highest level of comfort and luxury. Secondly, their attention to detail is evident in every aspect of their properties, from modern architectural designs to state-of-the-art amenities. Lastly, their premium amenities and prime locations make it convenient for residents to access essential services and enjoy a vibrant lifestyle.</p>
                        <p className="mb-2 text-sm font-light">Parth Sarthi Builder is a trustworthy brand in the real estate industry with a proven track record of delivering high-quality residential projects in Jaipur.</p>

                    </div>
                    <div className="col-span-2">
                        <Link className="block videImgtag h-full relative" href="#">
                            <Image src={videoImg} alt="Video Img" className="h-full object-cover rounded-3xl" />
                            <div className="absolute inset-0 flex justify-center items-center">
                                {/* Animated Play Icon */}
                                <PlayCircle className="text-white w-16 h-16 animate-pulse hover:scale-110 transition-transform duration-300 cursor-pointer" />
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    )
}