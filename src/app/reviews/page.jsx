"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewsCard from "@/components/card/ReviewsCard";

export default function ReviewsArchivePage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            const response = await axios.get("/api/reviews/get/reviews");
            setReviews(response.data.data);
        } catch (error) {
            setError("Failed to load reviews. Please try again later.");
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <section className="py-10 bg-gray-50">
            <div className="container flex flex-col items-center max-w-[90%] mx-auto relative">
                <p className="bg-gradient-to-r animate-bounce mb-2 font-semibold inline-block px-5 py-1 text-sm rounded-full text-white from-[#DAB221] to-[#B07C0A]">
                    ParthSarthi Developers
                </p>
                <h2 className="text-3xl mb-4 font-light text-[#2d2849]">
                    Our <span className="font-bold">Testimonials</span>
                </h2>

                <div className="w-full">
                    {loading && (
                        <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#DAB221] mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading reviews...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="text-center text-red-600 py-10">
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && reviews.length === 0 && (
                        <div className="text-center text-gray-600 py-10">
                            <p>No reviews available at the moment.</p>
                        </div>
                    )}

                    {!loading && !error && reviews.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.map((review, index) => (
                                <div key={index} className="px-2">
                                    <ReviewsCard review={review} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
