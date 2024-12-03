"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Search, Trash2, CirclePlus, Filter, X, Star, StarHalf } from "lucide-react";
import Link from 'next/link';

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedReviews, setSelectedReviews] = useState([]);
    const [sortOrder, setSortOrder] = useState("newest");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const allReviews = async () => {
            try {
                const response = await axios.get('/api/reviews/get');
                setReviews(response.data.data);
            } catch (error) {
                console.error('Error fetching reviews data:', error);
            } finally {
                setLoading(false);
            }
        };

        allReviews();
    }, []);

    const toggleFilterPopup = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const sortReviews = (reviews) => {
        return reviews.sort((a, b) => {
            return sortOrder === "newest"
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt);
        });
    };

    const filteredReviews = sortReviews(
        reviews.filter(review =>
            review.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Pagination logic
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

    return (
        <div className='container lg:w-[95%] mx-auto py-5'>
            {/* Search, Sort, Filter, and Bulk Actions */}
            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search size={14} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search queries"
                        className="border px-3 py-2 pl-10 text-sm focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button className="lg:hidden text-gray-600 px-3 py-2 border rounded-md" onClick={toggleFilterPopup}>
                    <Filter size={16} />
                </button>

                {/* Popup for Filters on Mobile */}
                {isFilterOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
                        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 z-50">
                            <button className="text-gray-600 mb-4" onClick={toggleFilterPopup}>
                                <X size={20} />
                            </button>
                            <div className="flex flex-col space-y-3">
                                <select
                                    className="border px-3 py-2 focus:outline-none text-sm"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                </select>

                                <Link href={'/admin/reviews/add'}>
                                    <button className="bg-[#29234b] rounded-md flex items-center text-white text-sm px-4 py-2">
                                        <CirclePlus size={16} className='me-1' /> Add reviews
                                    </button>
                                </Link>
 
                            </div>
                        </div>
                    </div>
                )}

                {/* Desktop Filter Section */}
                <div className="hidden lg:flex space-x-3">
                    <select
                        className="border px-3 py-2 focus:outline-none text-sm"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>

                    <Link href={'/admin/reviews/add'}>
                        <button className="bg-[#29234b] rounded-md flex items-center text-white text-sm px-4 py-2 ">
                            <CirclePlus size={16} className='me-1' /> Add review
                        </button>
                    </Link>
                </div>
            </div>

            {/* Query Table */}
            <div className="relative overflow-x-auto shadow-md bg-white border border-gray-200">
                <table className="w-full text-sm text-left rtl:text-right text-gray-600 font-sans">
                    <thead className="bg-[#29234b] text-white uppercase">
                        <tr>
                            <th scope="col" className="px-4 font-medium capitalize py-2"> Name</th>
                            <th scope="col" className="px-4 font-medium capitalize py-2">Rating</th>
                            <th scope="col" className="px-4 font-medium capitalize py-2">Location</th>
                            <th scope="col" className="px-4 font-medium capitalize py-2">Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-4">
                                    <div className="flex justify-center items-center h-[300px]">
                                        Loading.....
                                    </div>
                                </td>
                            </tr>
                        ) : currentReviews.length > 0 ? (
                            currentReviews.map((review) => (
                                <tr
                                    key={review._id}
                                    className={`border-b hover:bg-gray-100 odd:bg-gray-50 even:bg-gray-100 transition-colors duration-200`}
                                >
                                    <td className="px-4 py-2 font-semibold text-gray-900 text-sm whitespace-nowrap">
                                        <Link className="" href={`/admin/reviews/edit/${review._id}`}>{review.name}</Link>
                                    </td>
                                    <td className="px-4 py-2 text-[12px]">
                                        {review.star}
                                    </td>
                                    <td className="px-4 py-2 text-[12px]">
                                        {review.location}
                                    </td>
                                    <td className="px-4 py-2 text-[12px]">
                                        <span className="text-xs line-clamp-1"></span>{review.review}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    No Reviews available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-300 px-3 py-1 rounded-md"
                >
                    <ArrowLeft />
                </button>
                <span>Page {currentPage}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredReviews.length / reviewsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredReviews.length / reviewsPerPage)}
                    className="bg-gray-300 px-3 py-1 rounded-md"
                >
                    <ArrowRight />
                </button>
            </div>
        </div>
    );
}
