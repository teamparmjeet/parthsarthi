"use client";
import { useState } from 'react';
import { Building2, PencilRuler, Building, ChartPie, HousePlus } from 'lucide-react';
import Image from 'next/image';
const Tabs = ({ project }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full border-gray-100 border">
            {/* Tab Header */}
            <div className="flex bg-[#e6ecfc] overflow-x-auto w-full">
                {/* Tab Buttons */}
                <button
                    className={`flex-1 py-2 text-center min-w-fit px-5 transition-colors duration-300
            ${activeTab === 0
                            ? 'border-b-4 border-[#1136cd] text-[#1136cd]'
                            : 'border-b-4 border-transparent text-gray-600 hover:text-[#1136cd] hover:border-[#1136cd]'
                        }`}
                    onClick={() => setActiveTab(0)}
                >
                    Overview
                </button>
                <button
                    className={`flex-1 py-2  min-w-fit px-5 text-center transition-colors duration-300
            ${activeTab === 1
                            ? 'border-b-4 border-[#1136cd] text-#1136cd'
                            : 'border-b-4 border-transparent text-gray-600 hover:text-[#1136cd] hover:border-[#1136cd]'
                        }`}
                    onClick={() => setActiveTab(1)}
                >
                    Location
                </button>
                <button
                    className={`flex-1 py-2  min-w-fit px-5 text-center transition-colors duration-300
            ${activeTab === 2
                            ? 'border-b-4 border-[#1136cd] text-[#1136cd]'
                            : 'border-b-4 border-transparent text-gray-600 hover:text-[#1136cd] hover:border-[#1136cd]'
                        }`}
                    onClick={() => setActiveTab(2)}
                >
                    Site Plan
                </button>
                <button
                    className={`flex-1 py-2 min-w-fit px-5 text-center transition-colors duration-300
            ${activeTab === 3
                            ? 'border-b-4 border-[#1136cd] text-[#1136cd]'
                            : 'border-b-4 border-transparent text-gray-600 hover:text-[#1136cd] hover:border-[#1136cd]'
                        }`}
                    onClick={() => setActiveTab(3)}
                >
                    Amenities
                </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white p-6">
                {/* Tab 1 Content */}
                {activeTab === 0 && (
                    <div>
                        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                            <div className="col-span-1 bg-[#fff5e4] rounded-md py-6 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]" >
                                    <Building2 size={25} className="text-white" />
                                </div>
                                <p className="text-[14px]  text-gray-500  my-1">Property Type</p>
                                <p className="mb-0 font-bold">{project.propertyType}</p>

                            </div>

                            <div className="col-span-1 bg-[#fff5e4] rounded-md py-6 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]" >
                                    <PencilRuler size={25} className="text-white" />
                                </div>
                                <p className="text-[14px]  text-gray-500  my-1">Area Size</p>
                                <div className="mb-0 font-bold flex gap-2">
                                    {project.projectSize.map((item) => (
                                        <div key={item.id}>{item.size} Sqft /</div>
                                    ))}
                                </div>

                            </div>
                            <div className="col-span-1 bg-[#fff5e4] rounded-md py-6 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]" >
                                    <Building size={25} className="text-white" />
                                </div>
                                <p className="text-[14px]  text-gray-500  my-1">BHK</p>
                                <div className="mb-0 font-bold flex gap-2">{project.bhk.map((item) => (
                                    <div key={item.id}>{item.bhk} BHK /</div>
                                ))}</div>

                            </div>

                            <div className="col-span-1 bg-[#fff5e4] rounded-md py-6 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]" >
                                    <ChartPie size={25} className="text-white" />
                                </div>
                                <p className="text-[14px]  text-gray-500  my-1">Possession Status</p>
                                <p className="mb-0 font-bold">{project.possessionStatus}</p>

                            </div>
                            <div className="col-span-1 bg-[#fff5e4] rounded-md py-6 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]" >
                                    <HousePlus size={25} className="text-white" />
                                </div>
                                <p className="text-[14px]  text-gray-500  my-1">Available Plots</p>
                                <p className="mb-0 font-bold">{project.AvailablePlot}</p>

                            </div>

                            <div className="col-span-1 bg-[#fff5e4] rounded-md py-6 flex flex-col items-center justify-center">
                                <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]" >
                                    <Building2 size={25} className="text-white" />
                                </div>
                                <p className="text-[14px]  text-gray-500  my-1">Price</p>
                                <p className="mb-0 font-bold">{project.price} ₹</p>

                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2 Content */}
                {activeTab === 1 && (

                    <div className=''
                        dangerouslySetInnerHTML={{ __html: project.map }}>
                    </div>


                )}

                {/* Tab 3 Content */}
                {activeTab === 2 && (
                    <div>
                        <Image
                            src={project.sitePlan}
                            width={500}
                            height={500}
                            alt=''
                        />

                    </div>
                )}

                {/* Tab 4 Content */}
                {activeTab === 3 && (
                    <div>
                        <h2 className="text-xl font-bold">{project.title}</h2>
                        <p className="text-gray-500">Price: ₹{project.price}</p>
                        <p className="text-gray-500">Property Type: {project.propertyType === "1" ? "Apartment" : "Other"}</p>
                        <p className="text-gray-500">BHK: {project.bhk.map((item) => (
                            <>{item.bhk} , </>
                        ))}</p>
                        <p className="text-gray-500">Project Size: {project.projectSize.map((item) => (
                            <>{item.size} sq.ft. , </>
                        ))}</p>
                        <p className="text-gray-500">Possession Status: {project.possessionStatus}</p>
                        <p className="text-gray-500">Available Plot: {project.AvailablePlot}</p>
                        <p className="text-gray-500">Featured: {project.isFeatured ? "Yes" : "No"}</p>
                        <p className="text-gray-500">Location: {project.location}</p>






                    </div>

                )}
            </div>
        </div>
    );
};

export default Tabs;
