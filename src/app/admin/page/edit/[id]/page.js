"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import slugify from "slugify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Trash2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Page({ params }) {
    // State to store form data
    const id = params.id;
    const router = useRouter();


    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        image: "",
        seoTitle: "",
        seoDescription: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Automatically generate slug when title is changed
        if (name === "title") {
            generateUniqueSlug(value);
        }
    };

    // Function to generate a unique slug
    const generateUniqueSlug = async (title) => {
        if (!title) return;

        // Generate slug using slugify
        let newSlug = slugify(title, { lower: true, strict: true });

        // Check if slug already exists in the database
        try {
            const { data } = await axios.get(`/api/pages/check-slug/${newSlug}`);

            // If slug exists, append suffix until it's unique
            let suffix = 1;
            if (data.success) {
                console.log("He");
                newSlug = `${slugify(title, { lower: true, strict: true })}-${suffix}`;
                const { data: newCheck } = await axios.get(`/api/pages/check-slug/${newSlug}`);

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
        const isFormFilled = formData.title && formData.slug;
        setIsFormValid(isFormFilled);
    }, [formData]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.patch("/api/pages/update", { id: id , ...formData });
            if (response.status === 200) {
                setSuccess("Page successfully Updated!");
                toast.success("Page successfully Updated!");
                // Reset form

            }
        } catch (err) {
            toast.error("Failed to create page!");
            setError("Failed to create page. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const dataGet = async () => {
            try {
                const res = await axios.get(`/api/pages/${id}`);

                setFormData({
                    title: res.data.data.title,
                    slug: res.data.data.slug,
                    content: res.data.data.content,
                    seoTitle: res.data.data.seoTitle,
                    seoDescription: res.data.data.seoDescription
                });
            } catch (error) {
                console.error("Error fetching reviews data:", error);
            } finally {
                setLoading(false);
            }
        };

        dataGet();
    }, [id]);

    const handleContentChange = (value) => {
        setFormData({ ...formData, content: value });
    };
    // Delete Review function
    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`/api/pages?_id=${id}`);
            if (response.status === 200) {
                toast.success("Page successfully deleted!");
                // Optionally, you can redirect after successful deletion
                router.push('/admin/page');
            }
        } catch (error) {
            toast.error("Failed to delete Page. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (

        <div className="container lg:w-[90%] mx-auto py-5">

            <Toaster />
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-3">
                    <Link href={'/admin/page'}>
                        <button className="bg-[#29234b] rounded-md flex items-center text-white text-sm px-4 py-2">
                            <ArrowLeft size={16} className='me-1' /> All Pages
                        </button>
                    </Link>
                </div>
                <div className="flex space-x-3">

                    <button onClick={handleDelete} className="bg-red-500 rounded-md flex items-center text-white text-sm px-4 py-2">
                        <Trash2 size={16} className='me-1' /> Delete
                    </button>

                </div>
            </div>

            <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-[#29234b] text-white px-7 py-3 flex justify-between w-full">
                    <h1 className="text-lg font-bold">Edit Page</h1>
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

                        {/* Image URL */}
                        <div className="sm:col-span-6 col-span-12">
                            <label htmlFor="image" className="block text-[12px] text-gray-700">
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Enter Image URL"
                                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                            />
                        </div>

                        {/* SEO Title */}
                        <div className="sm:col-span-6 col-span-12">
                            <label htmlFor="seoTitle" className="block text-[12px] text-gray-700">
                                SEO Title
                            </label>
                            <input
                                type="text"
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleChange}
                                placeholder="Enter SEO Title"
                                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                            />
                        </div>

                        {/* SEO Description */}
                        <div className="col-span-12">
                            <label htmlFor="seoDescription" className="block text-[12px] text-gray-700">
                                SEO Description
                            </label>
                            <textarea
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleChange}
                                placeholder="Enter SEO Description"
                                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className={`${!isFormValid || loading ? "bg-gray-400" : "bg-[#29234b]"} text-white w-full font-bold py-2 px-4 rounded-md`}
                        >
                            {loading ? "Submitting..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
