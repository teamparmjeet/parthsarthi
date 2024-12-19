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
    const [data, setdata] = useState([]);

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

    useEffect(() => {
        const alldata = async () => {
            try {
                const response = await axios.get('/api/projects/fetchall/project');
                setdata(response.data.data);
            } catch (error) {
                console.error('Error fetching data data:', error);
            } finally {
                setLoading(false);
            }
        };

        alldata();
    }, []);
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

    const handleCategoryChange = async (itemId) => {
        // Ensure that formData.category is an array, defaulting to an empty array if not
        const updatedCategories = Array.isArray(formData.category) ? formData.category : [];
    
        // Toggle logic: Add item if not present, remove item if already included
        const updatedCategoryList = updatedCategories.includes(itemId)
            ? updatedCategories.filter((id) => id !== itemId) // Remove itemId
            : [...updatedCategories, id]; // Add itemId
    
        // Update the state with the new category list
        setFormData((prev) => ({ ...prev, category: updatedCategoryList }));
    
        try {
            console.log("Updated categories:", updatedCategoryList);
    
            // Send the updated categories to the API
            const response = await axios.patch("/api/projects/update", {
                id: itemId,
                category: updatedCategoryList,
            });
    
            if (response.status === 200) {
                toast.success("Category updated successfully!");
            }
        } catch (err) {
            console.error("Failed to update category:", err);
            toast.error("Failed to update category!");
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

                <form onSubmit={handleSubmit} className="px-5 py-3 grid grid-cols-4 gap-4 space-y-3">
                    <div className=" col-span-2">
                        {/* Title */}
                        <div>
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
                        <div>
                            <label htmlFor="slug" className="block text-[12px] text-gray-700">
                                Slug
                            </label>
                            <input
                                type="text"
                                name="slug"
                                disabled
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="Enter Page Slug"
                                className="block w-full px-2 py-2 text-gray-500 bg-gray-100 border border-gray-200 sm:text-sm"

                            />
                        </div>

                        <div>
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

                        <div>
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
                                <div className="relative h-[100px] w-full mb-3">
                                    <Image
                                        src={formData.image}
                                        alt="category image"
                                        layout="fill"
                                        objectFit="cover"
                                    />
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
                    </div>
                    <div className="col-span-2">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-600 font-sans">
                            <thead className="bg-[#29234b] text-white uppercase">
                                <tr>
                                    <th scope="col" className="px-4 font-medium capitalize py-2">Title</th>
                                    <th scope="col" className="px-4 font-medium capitalize py-2">Slug</th>
                                    <th scope="col" className="px-4 font-medium capitalize py-2">Check</th>


                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr
                                        key={item._id}
                                        className={`border-b hover:bg-gray-100 odd:bg-gray-50 even:bg-gray-100 transition-colors duration-200`}
                                    >

                                        <td className="px-4 py-2 text-[12px]">
                                            {item.title}
                                        </td>

                                        <td className="px-4 py-2 text-[12px]">
                                            {item.slug}
                                        </td>
                                        <td className="px-4 py-2 text-[12px]">
                                            <input
                                                type="checkbox"
                                                id={`category-${item._id}`}
                                                name="category"
                                                checked={item.category.includes(id)}
                                                onChange={() => handleCategoryChange(item._id)}
                                                className="mr-2"
                                            />
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    );
}
