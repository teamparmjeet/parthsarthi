"use client";

import { useState, useEffect } from "react";
import { PhoneCall, MapPin, Mail, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import Logo from '@/public/annother-parth.svg';
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Footer() {
    const [formData, setFormData] = useState({
        email: "",
        mobile: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [data, setdata] = useState([]);

    useEffect(() => {
        const alldata = async () => {
            try {
                const response = await axios.get('/api/pages');
                setdata(response.data.data);
            } catch (error) {
                console.error('Error fetching data data:', error);
            } finally {
                setLoading(false);
            }
        };

        alldata();
    }, []);

    useEffect(() => {
        const isFormFilled =
            formData.mobile
        formData.email

        setIsSubmitEnabled(isFormFilled);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {


            const response = await axios.post("/api/subscribe/create", formData);
            if (response.status === 200) {
                setSuccess("Subscribection successfully !");
                toast.success("Subscribection successfully!")
                setFormData({
                    email: "",
                    mobile: ""
                });
            }
        } catch (err) {
            toast.error("Failed to create Subscribection!")
            setError("Failed to create Subscribection. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneChange = (mobile) => {
        setFormData({
            ...formData,
            mobile
        });
    };


    return (
        <>
            <section className="py-10"><Toaster />
                <div className="container rounded-3xl py-7 bg-gradient-to-br relative from-[#2d2849] to-[#352d60] w-[90%]  mx-auto">
                    <div className="grid lg:grid-cols-3 gap-5">
                        <div className="col-span-1 py-4   flex items-center text-center   flex-col justify-start">
                            <div className="flex items-center mb-2 justify-center bg-gradient-to-r  animate-bounce from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]">

                                <PhoneCall size={30} className=" text-white  " />

                            </div>
                            <h4 className="font-semibold text-lg text-white">Phone Number</h4>
                            <p className=" text-sm text-white">+91 9024965965</p>

                        </div>
                        <div className="col-span-1 py-4 flex items-center text-center   flex-col justify-center">
                            <div className="flex items-center mb-2 justify-center bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px] delay-500 animate-bounce">

                                <MapPin size={30} className=" text-white  " />

                            </div>

                            <h4 className="font-semibold text-lg text-white">Address</h4>
                            <p className="text-sm text-white">
                                Parth Sarthi Tower, 2nd Floor, 2/4, Chitrakoot, Gandhi Path, Vaishali Nagar, Jaipur
                            </p>
                            <p className="text-sm text-white ">
                                <span className="text-yellow-300">Landmark:</span> Near Mall of Jaipur
                            </p>


                        </div>
                        <div className="col-span-1 py-4 flex items-center text-center   flex-col justify-center">
                            <div className="flex items-center mb-2 justify-center delay-1000 animate-bounce bg-gradient-to-r from-[#DAB221] to-[#B07C0A] rounded-full h-[55px] w-[55px]">

                                <Mail size={30} className=" text-white  " />

                            </div>
                            <h4 className="font-semibold text-lg text-white">E-Mail</h4>
                            <p className=" text-sm text-white"> info@parthsarthibuilder.com</p>

                        </div>
                    </div>
                </div>
            </section>
            <footer className="pt-10 pb-5 bg-gradient-to-br relative from-[#2d2849] to-[#352d60]">
                <div className="container   w-[90%]  mx-auto">
                    <div className="grid md:grid-cols-3 gap-5 grid-cols-1">
                        <div className="col-span-1 flex flex-col md:items-start items-center md:text-start text-center">
                            <Link className="inline-block mb-3" href="/"><Image alt='' src={Logo} className="md:max-w-[90px] max-w-[50px]" /></Link>
                            <p className="text-white text-sm mb-3">Parth Sarthi Builders has established itself as a prominent name in the construction and real estate industry in Jaipur over the past two decades with its exceptional development projects.</p>
                            <div className="flex items-center  space-x-2">
                                <Link className="h-[25px] w-[25px] bg-[#CC9B18] rounded-[4px] text-white flex items-center justify-center" href='https://www.facebook.com/parthsarthijaipur'><Facebook size={14} /></Link>
                                <Link className="h-[25px] w-[25px] bg-[#CC9B18] rounded-[4px] text-white flex items-center justify-center" href='https://www.facebook.com/parthsarthijaipur'><Instagram size={14} /></Link>
                                <Link className="h-[25px] w-[25px] bg-[#CC9B18] rounded-[4px] text-white flex items-center justify-center" href='https://www.facebook.com/parthsarthijaipur'><Youtube size={14} /></Link>
                                <Link className="h-[25px] w-[25px] bg-[#CC9B18] rounded-[4px] text-white flex items-center justify-center" href='https://www.facebook.com/parthsarthijaipur'><Linkedin size={14} /></Link>

                            </div>
                        </div>
                        <div className="col-span-1">
                            <h4 className="font-semibold text-lg border-b border-b-slate-400 pb-2 gradientText">Quick Links</h4>
                            <div className="grid sm:grid-cols-2 grid-cols-1 mt-2">
                                <div className="col-span-1">
                                    <ul className="space-x-1">
                                        <li className="relative">
                                            <Link className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href="/about-us">
                                                About Us
                                            </Link>

                                            <Link className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href="/contact-us">
                                                Contact Us
                                            </Link>
                                            <Link className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href="/blog">
                                                Blogs
                                            </Link>
                                            {/* <Link className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href="/">
                                                Privacy Policy
                                            </Link>
                                            <Link className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href="/">
                                                Terms And Conditions
                                            </Link> */}

                                            {data.map((page) => (
                                                <Link key={page._id} className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href={page.slug}>
                                                    {page.title}
                                                </Link>
                                            ))}


                                        </li>
                                    </ul>
                                </div>
                                <div className="col-span-1">
                                    <ul className="space-x-1">
                                        <li className="relative">
                                            <Link className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href="/projects">
                                                New Launch
                                            </Link>

                                            <Link className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href="/projects">
                                                Luxury Projects
                                            </Link>
                                            <Link className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href="/projects">
                                                Premium Projects
                                            </Link>
                                            <Link className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href="/projects">
                                                Affordable Residential
                                            </Link>
                                            <Link className={`py-[8px] flex text-white  px-[12px] rounded-lg text-sm  hover:bg-[#d3e7ff37]`} href="/projects">
                                                Under Construction
                                            </Link>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col md:items-start items-center md:text-start text-center">
                            <h4 className="font-semibold text-lg border-b border-b-slate-400 pb-2 gradientText">Subscribe</h4>
                            <p className="text-white text-sm mb-3 mt-3">Sign up with your email to get latest updates and offers</p>
                            <form onSubmit={handleSubmit} className="relative  mx-auto">
                                <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm">
                                    {/* Email Input */}
                                    <input
                                        type="email"
                                        name="email"
                                        className="flex-grow py- text-sm px-4 text-gray-700 placeholder-gray-400 focus:outline-none     rounded-l-md"
                                        placeholder="Email ID"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                    {/* Suffix Mail Icon */}
                                    <div className="p-2">
                                        <Mail className="text-gray-500" />
                                    </div>
                                </div>
                                <div className="flex items-center my-2 bg-white border border-gray-300 rounded-md shadow-sm">
                                    <PhoneInput
                                        country={"in"}
                                        value={formData.mobile}
                                        onChange={handlePhoneChange}

                                         className="flex-grow  text-sm text-gray-700 placeholder-gray-400 focus:outline-none     rounded-l-md"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isSubmitEnabled || loading}
                                    className={`${!isSubmitEnabled || loading ? "bg-gray-400" : "bg-yellow-500"
                                        } text-white mt-1 w-full font-bold py-2 px-4 rounded-md`}
                                >
                                    {loading ? "Subscribe..." : "Subscribe"}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className=" border-t mt-10 pt-5 border-t-slate-400 md:text-start text-center">
                        <p className="text-[12px] text-gray-200">Copyright © 2024 ParthSarthiBuilder.com . All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}