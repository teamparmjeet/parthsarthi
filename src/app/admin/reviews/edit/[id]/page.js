"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const reviewId = params.id;
  const router = useRouter();
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    star: "",
    review: "",
    defaultdata: "reviews",
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
      formData.name && formData.location && formData.star && formData.review;
    setIsFormValid(isFormFilled);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.patch("/api/reviews/update", {id: reviewId , ...formData});
      if (response.status === 200) {
        setSuccess("Review successfully Updated!");
        toast.success("Review successfully Updated!");
        
      }
    } catch (err) {
      setError("Failed to create Review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const dataGet = async () => {
      try {
        const response = await axios.get(`/api/reviews/${reviewId}`);
        setFormData({
          name: response.data.data.name,
          star: response.data.data.star,
          location: response.data.data.location,
          review: response.data.data.review,
        });
      } catch (error) {
        console.error("Error fetching reviews data:", error);
      } finally {
        setLoading(false);
      }
    };

    dataGet();
  }, [reviewId]);

  // Delete Review function
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/reviews/delete?_id=${reviewId}`);
      if (response.status === 200) {
        toast.success("Review successfully deleted!");
        // Optionally, you can redirect after successful deletion
        router.push('/admin/reviews');
      }
    } catch (error) {
      toast.error("Failed to delete review. Please try again.");
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
          <Link href={"/admin/reviews"}>
            <button className="bg-[#29234b] rounded-md flex items-center text-white text-sm px-4 py-2 ">
              <ArrowLeft size={16} className="me-1" /> All review
            </button>
          </Link>
          <button
            className="bg-red-500 rounded-md flex items-center text-white text-sm px-4 py-2 "
            onClick={handleDelete} // Added delete function here
          >
            <Trash2 size={16} className="me-1" /> Delete
          </button>
        </div>
      </div>
      <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-[#29234b] text-white px-7 py-3 flex justify-between w-full">
          <h1 className="text-lg font-bold">Edit Review</h1>
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-500 text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="px-5 py-3 space-y-3">
          {/* Form Fields */}
          <div className="grid grid-cols-12 gap-4">
            <div className="sm:col-span-12 col-span-12">
              <label htmlFor="name" className="block text-[12px] text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
              />
            </div>
            <div className="sm:col-span-6 col-span-12">
              <label className="block text-[12px] text-gray-700">From</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                placeholder="From"
                onChange={handleChange}
                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
              />
            </div>

            <div className="sm:col-span-6 col-span-12">
              <label className="block text-[12px] text-gray-700">Star</label>
              <select
                name="star"
                onChange={handleChange}
                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
              >
                <option value="1" selected={formData.star === 1}>
                  1
                </option>
                <option value="2" selected={formData.star === 2}>
                  2
                </option>
                <option value="3" selected={formData.star === 3}>
                  3
                </option>
                <option value="4" selected={formData.star === 4}>
                  4
                </option>
                <option value="4.5" selected={formData.star === 4.5}>
                  4.5
                </option>
                <option value="5" selected={formData.star === 5}>
                  5
                </option>
              </select>
            </div>

            <div className="col-span-12">
              <label className="block text-[12px] text-gray-700">Review</label>
              <textarea
                name="review"
                onChange={handleChange}
                value={formData.review}
                className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
                placeholder="Review"
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
              {loading ? "Submitting..." : "Add Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
