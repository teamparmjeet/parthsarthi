"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = ({ pdflink }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        terms: false,
    });

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    // Check if all form fields are filled and terms are accepted
    useEffect(() => {
        const allFieldsFilled = Object.values(formData).every((value) => value !== "");
        setIsSubmitEnabled(allFieldsFilled && formData.terms);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Submit form data to the API
            const response = await axios.post('/api/contact/create', formData);
            if (response.data.success) {
                toast.success("Contact Request Send Successfully")
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    address: "",
                    terms: false,
                })
                window.location.href = pdflink;
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error submitting the form", error);
            alert("An error occurred while submitting the form.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            {/* Full Name */} <Toaster />

            <p className=" text-sm bg-[#DAB221] px-4 rounded-md text-white mb-5">Get Your  Brochure: Fill Out the Form Below!</p>
            <div className="relative z-0 w-full mb-4 group">
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="fullName"
                    className="peer-focus:font-medium absolute mx-1 px-1 text-sm bg-white text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Full Name
                </label>
            </div>

            {/* Email ID */}
            <div className="relative z-0 w-full mb-4 group">
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm bg-white mx-1 px-1 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Email ID
                </label>
            </div>

            {/* Phone No. */}
            <div className="relative z-0 w-full mb-4 group">
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="phone"
                    className="peer-focus:font-medium absolute text-sm bg-white mx-1 px-1 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Phone No.
                </label>
            </div>

            {/* Address */}
            <div className="relative z-0 w-full mb-4 group">
                <input
                    type="text"
                    name="address"
                    id="address"
                    className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="address"
                    className="peer-focus:font-medium absolute bg-white mx-1 px-1 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Address
                </label>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center mb-3">
                <input
                    id="terms"
                    type="checkbox"
                    name="terms"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="terms" className="ml-2 text-xs text-gray-900">
                    I agree to the Terms and Conditions
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className={`flex w-full text-center justify-center py-5 px-10 rounded-full items-center 
    bg-gradient-to-r from-[#DAB221] to-[#B07C0A] text-white font-semibold my-3 leading-3 group transition 
    ${!isSubmitEnabled ? 'bg-gray-400 cursor-not-allowed' : 'hover:opacity-90 active:opacity-80'}`}
                disabled={!isSubmitEnabled}
            >
                Connect Now
            </button>

         

        </form>
    );
};

export default ContactForm;
