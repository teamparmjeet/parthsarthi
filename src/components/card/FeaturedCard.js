"use client";
import parthCr from "@/public/Parth-Crown-1-1024x1024.jpg";
import logo from "@/public/annother-parth.svg";
import Link from "next/link";
import Image from "next/image";
import { Home, Maximize2 } from "lucide-react";


export default function FeaturedCard({ project }) {


    return (
        <div className="bg-gradient-to-br from-[#fff5e4] to-[#fff5e4] rounded-2xl md:p-2 p-4">
            <div className="grid md:grid-cols-5 grid-cols-1 md:gap-2 gap-5">
                <div className="col-span-2 md:order-1 order-2 space-y-5 md:p-4 flex flex-col items-start justify-center">
                    <div className="bg-white p-3 rounded-md inline-block  shadow">
                        <Image src={project.logo} width={60} height={60} alt="ParthSarthi Logos" className=" " />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                        <p className="text-gray-900 text-opacity-50 text-sm flex items-center">
                            {project.location}</p>
                    </div>

                    <div className="flex justify-between lg:flex-row flex-col lg:items-center lg:space-y-0 space-y-2 bg-slate-600 bg-opacity-40 p-4 rounded-lg w-full">
                        <p className="flex items-center">
                            <div className="flex items-center me-2 justify-center bg-gradient-to-r   from-[#DAB221] to-[#B07C0A] rounded-full h-[25px] w-[25px]">
                                <Maximize2 size={15} color="white" className="" />
                            </div>
                            <p className="text-white text-sm flex font-semibold items-center">
                                {project.projectSize.length > 0 && `${project.projectSize[0].size} Sq. Ft`}
                            </p>

                        </p>
                        <p className="flex items-center">
                            <div className="flex items-center me-2 justify-center bg-gradient-to-r   from-[#DAB221] to-[#B07C0A] rounded-full h-[25px] w-[25px]">
                                <Home size={15} color="white" className="" />
                            </div>
                            <p className="text-white text-sm flex font-semibold items-center">
                                {project.bhk.length > 0 && `${project.bhk[0].bhk} BHK, `}{project.propertyType}
                            </p>

                        </p>
                    </div>

                    <Link href={`/projects/${project.slug}`} className="flex font-semibold bg-green-500 text-white px-8 py-4 rounded-lg w-full text-center items-center justify-center">View Details</Link>

                </div>
                <div className="col-span-3 md:order-2 order-1">
                    <div className="relative rounded-2xl overflow-hidden h-[360px]">
                        <Image alt="" src={project.image} fill className="h-[360px] object-cover  object-top" />
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black to-transparent opacity-60"></div>

                        <span className="inline-block absolute top-6 text-xs -right-9 bg-red-500 py-1 text-white px-10 border-y transform rotate-45">✨Featured</span>

                    </div>
                </div>
            </div>
        </div>
    )
}