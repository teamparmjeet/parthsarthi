"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { Trash2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const contactId = params.id;
  const router = useRouter();
  const [data, setData] = useState("")

  const [loading, setLoading] = useState(false);





  useEffect(() => {
    const dataGet = async () => {
      try {
        const response = await axios.get(`/api/contact/${contactId}`);
        setData(response.data.data)
      } catch (error) {
        console.error("Error fetching contacts data:", error);
      } finally {
        setLoading(false);
      }
    };

    dataGet();
  }, [contactId]);

  // Delete contact function
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/contact/delete?_id=${contactId}`);
      if (response.status === 200) {
        toast.success("contact successfully deleted!");
        // Optionally, you can redirect after successful deletion
        router.push('/admin/contact');
      }
    } catch (error) {
      toast.error("Failed to delete contact. Please try again.");
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
          <Link href={"/admin/contact"}>
            <button className="bg-[#29234b] rounded-md flex items-center text-white text-sm px-4 py-2 ">
              <ArrowLeft size={16} className="me-1" /> All contact
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
          <h1 className="text-lg font-bold">Contact Request</h1>
        </div>



        <div className="grid grid-cols-12 gap-4 p-5">
          <div className="sm:col-span-12 col-span-12">
            <label htmlFor="fullName" className="block text-[12px] text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Name"
              value={data.fullName}
              disabled

              className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
            />
          </div>



          <div className="sm:col-span-12 col-span-12">
            <label htmlFor="email" className="block text-[12px] text-gray-700">
            Email
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Name"
              value={data.email}
              disabled

              className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
            />
          </div>

          <div className="sm:col-span-12 col-span-12">
            <label htmlFor="phone" className="block text-[12px] text-gray-700">
            Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="phone"
              value={data.phone}
              disabled

              className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
            />
          </div>


          <div className="sm:col-span-12 col-span-12">
            <label htmlFor="address" className="block text-[12px] text-gray-700">
            Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="address"
              value={data.address}
              disabled

              className="block w-full px-2 py-2 text-gray-500 bg-white border border-gray-200 placeholder:text-gray-400 focus:border-[#29234b] focus:outline-none focus:ring-[#29234b] sm:text-sm"
            />
          </div>

        </div>


      </div>
    </div>
  );
}
