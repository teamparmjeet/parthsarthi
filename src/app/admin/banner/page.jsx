"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
    const [formData, setFormData] = useState({ imgurl: "" });
    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAllBanners = async () => {
            try {
                const response = await axios.get("/api/banner/fetchall/banner");
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching banners:", error);
                toast.error("Failed to fetch banners.");
            }
        };

        fetchAllBanners();
    }, []);

    const handleDelete = async (_id) => {
        try {
            const response = await axios.delete(`/api/banner/delete?_id=${_id}`);
            if (response.status === 200) {
                toast.success("Banner deleted successfully.");
                setData((prevData) => prevData.filter((item) => item._id !== _id));
            } else {
                toast.error("Failed to delete the banner.");
            }
        } catch (error) {
            console.error("Error deleting banner:", error);
            toast.error("Error deleting the banner.");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, imgurl: file }));
    };

    useEffect(() => {
        setIsFormValid(!!formData.imgurl);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imgurl = formData.imgurl;

            if (formData.imgurl) {
                const formDataimgurl = new FormData();
                formDataimgurl.append("file", formData.imgurl);
                const uploadResponse = await axios.post("/api/upload", formDataimgurl, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                imgurl = uploadResponse.data.file.secure_url;
            }

            const updatedFormData = { ...formData, imgurl };
            const response = await axios.post("/api/banner/create", updatedFormData);

            if (response.status === 200) {
                toast.success("Banner successfully created!");
                setFormData({ imgurl: "" });
                setData((prevData) => [...prevData, updatedFormData]);
                window.location.reload();
            }
        } catch (err) {
            console.error("Failed to create banner:", err);
            toast.error("Failed to create banner!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="p-5 space-y-4">
                <Toaster />
                <form onSubmit={handleSubmit} className="space-y-3">
                    <label htmlFor="imgurl" className="block text-sm text-gray-700">
                        Banner Image
                    </label>
                    <input
                        type="file"
                        name="imgurl"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className={`w-full py-2 text-white font-bold rounded-md ${!isFormValid || loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Submitting..." : "Add Banner"}
                    </button>
                </form>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((item) => (
                        <div
                            key={item._id}
                            className="relative overflow-hidden rounded-lg shadow-md border border-gray-200"
                        >
                            <Image
                                src={item.imgurl}
                                alt={`Banner ${item._id}`}
                                width={1920}
                                height={1080}
                                className="object-cover w-full h-48"
                            />
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="absolute top-2 right-2 text-xs text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
