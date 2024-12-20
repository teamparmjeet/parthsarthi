"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const JobForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        jobprofile: "",

    });
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    useEffect(() => {
        const alldata = async () => {
            try {
                const response = await axios.get('/api/jobcategory');
                setCategory(response.data.data);
            } catch (error) {
                console.error('Error fetching data data:', error);
            } finally {
                setLoading(false);
            }
        };

        alldata();
    }, []);

    useEffect(() => {
        const allFieldsFilled =
            formData.fullName &&
            formData.email &&
            formData.phone &&
            formData.address &&
            formData.jobprofile;

        setIsSubmitEnabled(allFieldsFilled && isOtpVerified);
    }, [formData, isOtpVerified]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const sendOtp = async () => {
        try {
            const response = await axios.post("/api/contact/otp", { email: formData.email });
            if (response.data.success) {
                toast.success("OTP sent to your email.");
                setIsOtpSent(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error sending OTP.");
            console.error("Error sending OTP:", error);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post("/api/contact/otp", {
                email: formData.email,
                otp,
            });
            if (response.data.success) {
                toast.success("OTP verified.");
                setIsOtpVerified(true);
                setIsOtpSent(false); // Clear OTP UI after successful verification
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error verifying OTP.");
            console.error("Error verifying OTP:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/job/create", formData);
            if (response.data.success) {
                toast.success("Job Request Sent Successfully");
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    address: "",
                    jobprofile: ""

                });
                setOtp("");
                setIsOtpSent(false);
                setIsOtpVerified(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error submitting the form.");
            console.error("Error submitting the form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <Toaster />

            {/* Full Name */}
            <div className="relative z-0 w-full mb-4 group">
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
                    placeholder=" "
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="fullName"
                    className="peer-focus:font-medium absolute mx-1 px-1 text-sm bg-white text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#CC9B18] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Full Name
                </label>
            </div>

            {/* Email */}
            <div className="relative z-0 w-full mb-4 group">
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute mx-1 px-1 text-sm bg-white text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#CC9B18] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Email
                </label>
                {!isOtpVerified && (
                    <button
                        type="button"
                        onClick={sendOtp}
                        className="mt-2 text-[#CC9B18] text-sm hover:underline"
                    >
                        Send OTP
                    </button>
                )}
            </div>

            {/* OTP Verification */}
            {isOtpSent && !isOtpVerified && (
                <div className="relative z-0 w-full mb-4 group">
                    <input
                        type="text"
                        name="otp"
                        id="otp"
                        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={verifyOtp}
                        className="mt-2 text-[#CC9B18] text-sm hover:underline"
                    >
                        Verify OTP
                    </button>
                </div>
            )}

            {/* Phone */}
            <div className="relative z-0 w-full mb-4 group">
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
                    placeholder=" "
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="phone"
                    className="peer-focus:font-medium absolute mx-1 px-1 text-sm bg-white text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#CC9B18] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Phone
                </label>
            </div>


            <div className="relative z-0 w-full mb-4 group">
                <select
                    className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
                    name="jobprofile"
                    id="jobprofile"
                    value={formData.jobprofile}
                    onChange={handleChange}
                    required
                >
                    <option value="" selected>Select Job Profile</option>
                    {category.map((data) => (

                        <option key={data.id} value={data.category}>{data.category}</option>
                    ))}

                </select>

            </div>
            <div className="relative z-0 w-full mb-4 group">
                <input
                    type="text"
                    name="address"
                    id="address"
                    className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#CC9B18] peer"
                    placeholder=" "
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="address"
                    className="peer-focus:font-medium absolute bg-white mx-1 px-1 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-[#CC9B18] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Address
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className={`w-full py-2.5 px-4 bg-[#CC9B18] text-white text-sm font-medium rounded-md focus:outline-none ${isSubmitEnabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                disabled={!isSubmitEnabled}
            >
                Submit
            </button>
        </form>
    );
};

export default JobForm;
