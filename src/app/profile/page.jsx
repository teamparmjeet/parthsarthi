import React from 'react'
import Image from 'next/image'
import Logo from "@/public/annother-parth.svg"
export default function page() {
    return (
        <>
            <div className='bgprofile'>
                <div className=' backdrop-blur-lg py-8'>

                    <div className="container lg:w-[80%] mx-auto">

                        <div className="grid lg:grid-cols-2">
                            <div className="col-span-1">
                                <h1 className=' border-b-4 font-semibold border-b-[#CC9B18]'>Profile</h1>
                                <p className=' text-sm leading-6 font-medium my-3'>Raheja Developers is one of the largest Real Estate companies in India established in the year 1990 by Mr. Navin M. Raheja. The company has always maintained path breaking status and has pioneered various firsts in India. From trend setting luxury housing to providing homes for the poorest section of Indian society, from India’s tallest skyscrapers to 165 acres of plotted township, from changing the way people shop to changing the way people work, We have achieved it all.
                                </p>
                                <p className=' text-sm leading-6 font-medium'>
                                    In our dynamic journey of last 30 years, we have collaborated with several top notch names in the field of construction, innovation, design, architecture, cinema and hotels. The Leela Hotel, Tata Housing, L&T, Best Western, Ginger hotel to name a few of our national alliances.Our legacy has always been to endeavor the best and deliver the best, creating value for money for everyone. The things are visible in the way we create our projects.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' bg-white  h-24'>

            </div>

            <div className='bgprofile'>
                <div className=' backdrop-blur-lg p-5 lg:p-0'>

                    <div className="container py-8 lg:py-14 lg:w-[80%] mx-auto">

                        <h2 className=' font-semibold text-2xl'>AWARD-WINNING<br></br>
                            COMPANY</h2>
                        <p className=' text-[#CC9B18] text-sm font-semibold mt-3'>OUR VALUE PROPOSITION IS ACCURACY AND CONVENIENCE</p>

                        <div className="grid lg:grid-cols-2">
                            <div className="col-span-1 flex justify-center">
                                <Image
                                    src={Logo}
                                    alt=''
                                    width={408}
                                    height={340}
                                />
                            </div>
                            <div className="col-span-1 flex flex-col gap-10 lg:justify-end lg:items-end">
                                <div className=' lg:w-64'>
                                    <div className=' flex items-center gap-1'><span className=' text-7xl font-semibold'>32</span> <span className=' border-b text-[#CC9B18]'>YEARS</span></div>
                                    <p className=' text-sm font-medium'> We have been working in the industry since 1990.</p>

                                </div>

                                <div className=' lg:w-64'>
                                    <div className=' flex items-center gap-1'><span className=' text-7xl font-semibold'>30</span> <span className=' border-b text-[#CC9B18]'>Million Sqft</span></div>
                                    <p className=' text-sm font-medium'>15700 units delivered and under construction</p>

                                </div>

                                <div className=' lg:w-64'>
                                    <div className=' flex items-center gap-1'><span className=' text-7xl font-semibold'>150 +</span> <span className=' border-b text-[#CC9B18]'>AWARDS</span></div>
                                    <p className=' text-sm font-medium'>Raheja has been awarded for constuction many times.</p>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
