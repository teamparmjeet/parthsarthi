"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import slugify from "slugify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Page({ params }) {
    const id = params.id;
    const router = useRouter();

    // State to store form data
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        image: "",
        seoTitle: "",
        seoDescription: "",
        imageFile: null, // To store the uploaded image file
    });

    const [loading, setLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "title") {
            generateUniqueSlug(value);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, imageFile: file })); // Store the file separately for upload
    };

    // Function to generate a unique slug
    const generateUniqueSlug = async (title) => {
        if (!title) return;

        // Generate slug using slugify
        let newSlug = slugify(title, { lower: true, strict: true });

        try {
            const { data } = await axios.get(`/api/category/check-slug/${newSlug}`);

            let suffix = 1;
            if (data.success) {
                newSlug = `${slugify(title, { lower: true, strict: true })}-${suffix}`;
                await axios.get(`/api/category/check-slug/${newSlug}`);
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

    // Fetch Category data for editing
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/category/${id}`);

                setFormData({
                    title: res.data.data.title,
                    slug: res.data.data.slug,
                    seoTitle: res.data.data.seoTitle,
                    seoDescription: res.data.data.seoDescription,
                    image: res.data.data.image, // Set existing image URL
                    imageFile: null, // Reset the file input for new uploads
                });
            } catch (error) {
                console.error("Error fetching Category data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.image;

            // Handle image upload first if a new image file is selected
            if (formData.imageFile) {
                const formDataImage = new FormData();
                formDataImage.append("file", formData.imageFile);
                const uploadResponse = await axios.post("/api/upload", formDataImage, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                imageUrl = uploadResponse.data.file.secure_url; // Update with the new uploaded image URL
            }

            const updatedFormData = {
                ...formData,
                image: imageUrl, // Set the correct image URL
            };

            // Update Category post
            const response = await axios.patch(`/api/category/update`, { id: id, ...updatedFormData }); // Assuming you're updating the Category post

            if (response.status === 200) {
                toast.success("Category successfully updated!");
               
                // router.push("/admin/category");
            }
        } catch (err) {
            console.error("Failed to update Category:", err);
            toast.error("Failed to update Category!");
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div className="container lg:w-[90%] mx-auto py-5">
            <Toaster />
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-3">
                    <Link href={"/admin/category"}>
                        <button className="bg-[#29234b] rounded-md flex items-center text-white text-sm px-4 py-2">
                            <ArrowLeft size={16} className="me-1" /> All Category
                        </button>
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
                <div className="bg-[#29234b] text-white px-7 py-3 flex justify-between w-full">
                    <h1 className="text-lg font-bold">Edit Category</h1>
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

                        <div className="sm:col-span-6 col-span-12">
                            <label htmlFor="seoTitle" className="block text-[12px] text-gray-700">
                            Seo Title
                            </label>
                            <input
                                type="text"
                                name="seoTitle"
                                value={formData.seoTitle}
                                onChange={handleChange}
                                placeholder="Enter Page Seo Title"
                                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                            />
                        </div>

                        <div className="sm:col-span-6 col-span-12">
                            <label htmlFor="seoDescription" className="block text-[12px] text-gray-700">
                            Seo Description
                            </label>
                            <input
                                type="text"
                                name="seoDescription"
                                value={formData.seoDescription}
                                onChange={handleChange}
                                placeholder="Enter Page  Seo Description"
                                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                            />
                        </div>

                        {/* Image Preview and Upload */}
                        <div className="col-span-12">
                            <label htmlFor="image" className="block text-[12px] text-gray-700">
                                Feature Image
                            </label>

                            {/* Show existing image if it exists */}
                            {formData.image && !formData.imageFile && (
                                <div className="mb-3">
                                    <Image src={formData.image} alt="Feature" width={100} height={100} className="h-48 w-48" />
                                </div>
                            )}

                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div>
                        <button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className={`${!isFormValid || loading ? "bg-gray-400" : "bg-[#29234b]"
                                } text-white w-full font-bold py-2 px-4 rounded-md`}
                        >
                            {loading ? "Submitting..." : "Update Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
