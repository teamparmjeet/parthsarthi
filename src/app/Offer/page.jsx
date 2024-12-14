"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from '@/components/Breadcrumb';
import { Search, X } from 'lucide-react';
import New from '@/components/card/new';
import BannerVideo from "@/components/home/BannerVideo";
// import parthCr from "@/public/Parth-Crown-1-1024x1024.jpg";
import axios from "axios";
export default function Offer() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of items per page
    const [isMounted, setIsMounted] = useState(false);
    const [data, setdata] = useState([]);

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {
        const alldata = async () => {
            try {
                const response = await axios.get('/api/category');
                setdata(response.data.data);
            } catch (error) {
                console.error('Error fetching data data:', error);
            } finally {
                setLoading(false);
            }
        };

        alldata();
    }, []);


    const fetchprojects = async () => {
        try {
            const response = await axios.get('/api/projects/fetchall/project');
            setProjects(response.data.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch projects. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsMounted(true);
        fetchprojects();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset page
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1); // Reset page
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        setCurrentPage(1); // Reset page
    };

    const removeFilter = (filterType) => {
        if (filterType === 'category') {
            setSelectedCategory('');
        } else if (filterType === 'status') {
            setSelectedStatus('');
        }
    };


    const filteredProjects = projects.filter((project) => {
        return (
            (selectedCategory === '' || project.category.includes(selectedCategory)) &&  // Use includes for array
            (selectedStatus === '' || project.possessionStatus === selectedStatus) &&
            project.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });


    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div>
                <BannerVideo />
            </div>
            <section className="py-2 bg-[#e6ecfc]">
                <div className="container max-w-[90%] mx-auto">
                    <Breadcrumb customLabels={{ projects: 'Projects' }} />
                </div>
            </section>
            <section className="py-4">
                <div className="container max-w-[90%] mx-auto">
                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                        <div className="relative w-full lg:w-1/3">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-gray-400" /> {/* Lucide search icon */}
                            </span>
                            <input
                                type="text"
                                className="w-full pl-10 p-3 border text-sm border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#DAB221]"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex space-x-4">
                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="p-3 border border-gray-300 text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-[#DAB221]"
                            >
                                <option value="">All Categories</option>
                                {data.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>


                            {/* Status Filter */}
                            <select
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                className="p-3 border border-gray-300 text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-[#DAB221]"
                            >
                                <option value="">All Status</option>
                                <option value="Ready to Move">Ready to Move</option>
                                <option value="Under Construction">Under Construction</option>
                                <option value="Sold Out">Sold Out</option>
                                <option value="Coming Soon">Coming Soon</option>
                                <option value="Possession Offered">Possession Offered</option>
                                {/* Add more status options as needed */}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap mt-4 space-x-2 space-y-2">
                        {selectedCategory && (
                            <div className="bg-yellow-100 text-yellow-600 text-sm px-4 py-2 rounded-full flex items-center space-x-2">
                                {/* Find the category title based on selectedCategory */}
                                <span>Category: {data.find((item) => item._id === selectedCategory)?.title || 'Unknown Category'}</span>
                                <X className="h-4 w-4 cursor-pointer" onClick={() => removeFilter('category')} /> {/* Close icon */}
                            </div>
                        )}

                        {selectedStatus && (
                            <div className="bg-yellow-100 text-yellow-600 text-sm px-4 py-2 rounded-full flex items-center space-x-2">
                                <span>Status: {selectedStatus}</span>
                                <X className="h-4 w-4 cursor-pointer" onClick={() => removeFilter('status')} /> {/* Close icon */}
                            </div>
                        )}
                    </div>
                    {/* Project Cards */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProjects.length > 0 ? (
                            currentProjects.map((project) => (
                                <New key={project._id} imageUrl={project.image}
                                    status={project.possessionStatus}
                                    logo={project.logo}
                                    title={project.title}
                                    location={project.location}
                                    size={project.projectSize}
                                    bhk={project.bhk}
                                    category={project.category}
                                    keyid={project.slug} />
                            ))
                        ) : (
                            <div className="text-center text-gray-500 col-span-full">Please Wait...</div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
