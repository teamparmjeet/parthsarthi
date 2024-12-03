"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import slugify from "slugify";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false, // Disable SSR for this component
});
import 'react-quill/dist/quill.snow.css';

export default function Page() {
    // State to store form data
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "title") {
            generateUniqueSlug(value);
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, image: file }));
    };

    // Function to generate a unique slug
    const generateUniqueSlug = async (title) => {
        if (!title) return;

        // Generate slug using slugify
        let newSlug = slugify(title, { lower: true, strict: true });

        // Check if slug already exists in the database
        try {
            const { data } = await axios.get(`/api/blogs/check-slug/${newSlug}`);

            // If slug exists, append suffix until it's unique
            let suffix = 1;
            if (data.success) {
                newSlug = `${slugify(title, { lower: true, strict: true })}-${suffix}`;
                const { data: newCheck } = await axios.get(`/api/blogs/check-slug/${newSlug}`);

                suffix++;
            }

            // Update slug in the form data
            setFormData((prevState) => ({ ...prevState, slug: newSlug }));
        } catch (err) {
            console.error("Error generating slug", err);
        }
    };

    // Validate form
    useEffect(() => {
        setIsFormValid(!!formData.title && !!formData.slug);
    }, [formData]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.image;

            // Handle image upload first if there's an image file
            if (formData.image) {
                const formDataImage = new FormData();
                formDataImage.append('file', formData.image);
                const uploadResponse = await axios.post('/api/upload', formDataImage, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imageUrl = uploadResponse.data.file.secure_url; // Get the uploaded image URL
            }

            // Now update formData with the uploaded image URL and then submit the form
            const updatedFormData = {
                ...formData,
                image: imageUrl // Set the correct image URL here
            };

            // Call the second API to save the blog
            const response = await axios.post("/api/blogs/create", updatedFormData);

            if (response.status === 200) {
                toast.success("Blog successfully created!");
                // Clear the form after success
                setFormData({ title: "", slug: "", content: "", image: "" });
            }
        } catch (err) {
            console.error("Failed to create page:", err);
            toast.error("Failed to create page!");
        } finally {
            setLoading(false);
        }
    };

    const handleContentChange = (value) => {
        setFormData({ ...formData, content: value });
    };

    return (
        <div className="container lg:w-[90%] mx-auto py-5">
            <Toaster />
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-3">
                    <Link href={'/admin/blogs'}>
                        <button className="bg-[#29234b] rounded-md flex items-center text-white text-sm px-4 py-2">
                            <ArrowLeft size={16} className='me-1' /> All Blogs
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-[#29234b] text-white px-7 py-3 flex justify-between w-full">
                    <h1 className="text-lg font-bold">Add New Blogs</h1>
                </div>

                <form onSubmit={handleSubmit} className="px-5 py-3 space-y-3">
                    <div className="grid grid-cols-12 gap-4">
                        {/* Title */}
                        <div className="sm:col-span-6 col-span-12">
                            <label htmlFor="title" className="block text-[12px] text-gray-700">
                                Page Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter Page Title"
                                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                            />
                        </div>

                        {/* Slug (Read-Only Field) */}
                        <div className="sm:col-span-6 col-span-12">
                            <label htmlFor="slug" className="block text-[12px] text-gray-700">
                                Slug
                            </label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="Enter Page Slug"
                                className="block w-full px-2 py-2 text-gray-500 bg-gray-100 border border-gray-200 sm:text-sm"
                            />
                        </div>

                        {/* Content */}
                        <div className="col-span-12">
                            <label htmlFor="content" className="block text-[12px] text-gray-700">
                                Content
                            </label>
                            <ReactQuill theme="snow" value={formData.content} onChange={handleContentChange} />
                        </div>

                        <div className="col-span-12">
                            <label htmlFor="image" className="block text-[12px] text-gray-700">Feature Image</label>
                            <input type="file" name="image" accept="image/*" onChange={handleFileChange}
                                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm" />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className={`${!isFormValid || loading ? "bg-gray-400" : "bg-[#29234b]"} text-white w-full font-bold py-2 px-4 rounded-md`}
                        >
                            {loading ? "Submitting..." : "Add Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
