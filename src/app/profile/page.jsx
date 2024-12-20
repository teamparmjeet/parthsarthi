"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import Logo from '@/public/annother-parth.svg';

export default function Page() {
    const imageRef = useRef(null);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = e.clientX - left - width / 2; // Horizontal distance from center
        const y = e.clientY - top - height / 2; // Vertical distance from center

        const rotateX = (y / height) * 20; // Adjust rotation sensitivity
        const rotateY = (x / width) * -20;

        imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`; // Adjust 3D perspective
    };

    const handleMouseLeave = () => {
        imageRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    return (
        <>
            <div className='bgprofile'>
                <div className='py-8'>
                    <div className="container lg:w-[80%] mx-auto">
                        <div className="grid lg:grid-cols-2">
                            <div className="col-span-1">
                                <h1 className='border-b-4 font-semibold border-b-[#CC9B18]'>Profile</h1>
                                <p className='text-sm leading-6 font-medium my-3'>
                                    Raheja Developers is one of the largest Real Estate companies in India established in the year 1990 by Mr. Navin M. Raheja...
                                </p>
                                <p className='text-sm leading-6 font-medium'>
                                    In our dynamic journey of last 30 years, we have collaborated with several top-notch names in the field of construction, innovation, and design...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=''>
                <div className='backdrop-blur-lg p-5 lg:p-0'>
                    <div className="container py-8 lg:py-14 lg:w-[80%] mx-auto">
                        <h2 className='font-semibold text-2xl'>
                            AWARD-WINNING<br /> COMPANY
                        </h2>
                        <p className='text-[#CC9B18] text-sm font-semibold mt-3'>
                            OUR VALUE PROPOSITION IS ACCURACY AND CONVENIENCE
                        </p>

                        <div className="grid lg:grid-cols-2">
                            <div
                                className="col-span-1 flex justify-center image-container"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Image
                                    ref={imageRef}
                                    src={Logo}
                                    alt="Logo"
                                    width={408}
                                    height={340}
                                    className="image"
                                />
                            </div>
                            <div className="col-span-1 flex flex-col gap-10 lg:justify-end lg:items-end">
                                <div className='lg:w-64'>
                                    <div className='flex items-center gap-1'>
                                        <span className='text-7xl font-semibold'>32</span>
                                        <span className='border-b text-[#CC9B18]'>YEARS</span>
                                    </div>
                                    <p className='text-sm font-medium'>We have been working in the industry since 1990.</p>
                                </div>

                                <div className='lg:w-64'>
                                    <div className='flex items-center gap-1'>
                                        <span className='text-7xl font-semibold'>30</span>
                                        <span className='border-b text-[#CC9B18]'>Million Sqft</span>
                                    </div>
                                    <p className='text-sm font-medium'>15700 units delivered and under construction</p>
                                </div>

                                <div className='lg:w-64'>
                                    <div className='flex items-center gap-1'>
                                        <span className='text-7xl font-semibold'>150 +</span>
                                        <span className='border-b text-[#CC9B18]'>AWARDS</span>
                                    </div>
                                    <p className='text-sm font-medium'>Raheja has been awarded for construction many times.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
