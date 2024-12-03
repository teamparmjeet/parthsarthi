"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cata from "@/components/card/cata";

export default function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/category");
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load categories. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="py-16 relative overflow-hidden container lg:w-[90%] mx-auto">
            <h1 className="text-3xl font-bold mb-6">Category Archive</h1>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <p className="text-lg font-medium">Loading categories...</p>
                </div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : data.length === 0 ? (
                <div className="text-center text-gray-500">No categories available.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.map((item, index) => (
                        <Cata key={index} imageUrl={item.image} title={item.title} />
                    ))}
                </div>
            )}
        </div>
    );
}
