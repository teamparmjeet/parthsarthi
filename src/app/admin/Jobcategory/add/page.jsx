"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { CirclePlus, ArrowLeft } from "lucide-react";

export default function Page() {
    // State to store form data
    const [formData, setFormData] = useState({
        category: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

    };



    useEffect(() => {
        const isFormFilled =
            formData.category;


        setIsFormValid(isFormFilled);
    }, [formData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {


            const response = await axios.post("/api/jobcategory/create", formData);
            if (response.status === 200) {
                setSuccess("Job Category successfully created!");
                toast.success("Job Category successfully created!")
                setFormData({
                    category: "",

                });
            }
        } catch (err) {
            toast.error("Failed to create Job Category !")
            setError("Failed to create Job Category . Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container lg:w-[90%] mx-auto py-5">
            <Toaster />
            <div className="flex justify-between items-center mb-4">


                {/* Desktop Filter Section */}
                <div className="flex space-x-3">

                    <Link href={'/admin/Jobcategory'}>
                        <button className="bg-[#29234b] rounded-md flex items-center text-white text-sm px-4 py-2 ">
                            <ArrowLeft size={16} className='me-1' /> All Category
                        </button>
                    </Link>
                </div>
            </div>
            <div className="bg-white shadow-lg   overflow-hidden border border-gray-200">
                <div className="bg-[#29234b] text-white px-7 py-3 flex justify-between w-full">
                    <h1 className="text-lg font-bold">Add New Category</h1>
                </div>


                {error && <div className="text-red-500 text-center">{error}</div>}
                {success && <div className="text-green-500  text-center">{success}</div>}

                <form onSubmit={handleSubmit} className="px-5 py-3 space-y-3">
                    {/* Branch Name */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="sm:col-span-12 col-span-12">
                            <label htmlFor="category" className="block text-[12px] text-gray-700">
                                Category Name
                            </label>
                            <input
                                type="text"
                                name="category"
                                placeholder="Enter Category Name"
                                value={formData.category}
                                onChange={handleChange}
                                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200  placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
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
                            {loading ? "Submitting..." : "Add Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
