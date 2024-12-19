"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Logo from '@/public/annother-parth.svg';
import { ChevronDown, MessageCircle, Headset, Menu, X, Mail, Smartphone, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { usePathname } from 'next/navigation';
import TopBar from "./TopBar";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);


    const { data: session, status } = useSession();
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const pathname = usePathname();



    useEffect(() => {
        const alldata = async () => {
            try {
                const response = await axios.get('/api/category');
                setCategory(response.data.data);
            } catch (error) {
                console.error('Error fetching data data:', error);
            } finally {
                setLoading(false);
            }
        };

        alldata();
    }, []);



    const menuItems = [
        {
            title: "About Us",
            href: "#",
            submenu: [
                { title: "About Us", href: "/about-us" },
                { title: "Profile", href: "/profile" },
                { title: "Vision", href: "/vision" },
                { title: "Management and leadership ", href: "/manage" }
            ]
        },

        {
            title: "Our Projects",
            href: "#",
            submenu: category.map((item) => ({
                title: item.title,
                href: `/projects`
            }))
        },
        {
            title: "Career",
            href: "/career",
            badge: "Hiring"
        },
        {
            title: "Blog",
            href: "/blog"
        },
        {
            title: "Contact us",
            href: "/contact-us"
        }
    ];
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const isActiveLink = (href) => pathname === href;

    // const toggleSubMenu = () => {
    //     setIsSubMenuOpen((prev) => !prev);
    // };
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null); // For tracking the open submenu index

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev); // Toggle mobile menu visibility
    };

    const toggleSubMenu = (index) => {
        setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index)); // Only one submenu open at a time
    };

    return (
        <header>
            {

                status === "authenticated" ? <TopBar /> : ""
            }

            <div className="bg-[#2d2849] py-2">
                <div className="container w-[90%] mx-auto">
                    <div className="grid sm:grid-cols-2">
                        <div className="col-span-1 flex items-center justify-start space-x-4">
                            <p className="text-white md:flex hidden items-center text-sm"><Mail size={15} className="me-1" />info@parthsarthibuilder.com</p>
                            <p className="text-white sm:flex hidden items-center text-sm"><Smartphone size={15} className="me-1" />+91 9024-965-965</p>
                        </div>
                        <div className="col-span-1 flex items-center sm:justify-end justify-center space-x-2">
                            <Link className="h-[25px]  w-[25px] bg-[#CC9B18] rounded-[4px] text-white flex items-center justify-center" href='https://www.facebook.com/parthsarthijaipur'><Facebook size={14} /></Link>
                            <Link className="h-[25px] w-[25px] bg-[#CC9B18] rounded-[4px] text-white flex items-center justify-center" href='https://www.facebook.com/parthsarthijaipur'><Instagram size={14} /></Link>
                            <Link className="h-[25px]  w-[25px] bg-[#CC9B18] rounded-[4px] text-white flex items-center justify-center" href='https://www.facebook.com/parthsarthijaipur'><Youtube size={14} /></Link>
                            <Link className="h-[25px]  w-[25px] bg-[#CC9B18] rounded-[4px] text-white flex items-center justify-center" href='https://www.facebook.com/parthsarthijaipur'><Linkedin size={14} /></Link>

                        </div>
                    </div>
                </div>
            </div>
            <nav className={`z-50 py-2 transition-all duration-300`}>
                <div className="container w-[90%] mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="col-span-2">
                            <Link href="/"><Image alt='' src={Logo} className="md:max-w-[90px] max-w-[50px]" /></Link>
                        </div>
                        <div className="flex items-center">

                            {/* Desktop Menu */}
                            <ul
                                className={`fixed lg:static top-0 left-0 lg:flex lg:items-center lg:w-auto bg-white lg:bg-transparent z-50  transition-transform duration-300 ${isMobileMenuOpen
                                    ? "transform translate-x-0 w-80 h-screen flex flex-col justify-start p-6"
                                    : "transform -translate-x-full lg:translate-x-0 lg:h-auto"
                                    }`}
                            >
                                {/* Close Button for Mobile Menu */}
                                {isMobileMenuOpen && (
                                    <button
                                        onClick={toggleMobileMenu}
                                        className="absolute top-4 right-6 text-gray-600 text-2xl lg:hidden"
                                    >
                                        <X size={30} />
                                    </button>
                                )}

                                {menuItems.map((link, index) => (
                                    <li
                                        key={index}
                                        className={`relative mt-5 border-b lg:border-none ${isMobileMenuOpen ? "py-2" : "ms-3"
                                            }`}
                                        onClick={() => link.submenu && toggleSubMenu(index)}
                                    >
                                        <Link
                                            className={`block py-[11px] px-[26px] rounded-full text-sm ${openSubMenuIndex === index
                                                ? "bg-[#2d2849] text-white"
                                                : "bg-gray-50 hover:bg-[#f2e1b561]"
                                                }`}
                                            href={link.href}
                                        >
                                            {link.title}
                                            {link.submenu && (
                                                <span className="ml-2 float-right lg:inline transition-transform duration-300">
                                                    <ChevronDown
                                                        size={15}
                                                        className={`${openSubMenuIndex === index ? "rotate-180" : ""}`}
                                                    />
                                                </span>
                                            )}
                                        </Link>
                                        {link.submenu && (
                                            <div
                                                className={`overflow-hidden transition-[max-height] duration-300 ${openSubMenuIndex === index ? "max-h-screen" : "max-h-0"
                                                    } lg:absolute lg:min-w-max lg:bg-white lg:shadow-lg lg:rounded-2xl lg:z-50 lg:p-2 lg:transition-opacity lg:duration-300 ${openSubMenuIndex === index
                                                        ? "lg:opacity-100"
                                                        : "lg:opacity-0 lg:pointer-events-none"
                                                    }`}
                                            >
                                                <ul
                                                    className={`${isMobileMenuOpen ? "pl-4 pr-2 pb-2" : "space-y-1 lg:space-y-0"
                                                        }`}
                                                >
                                                    {link.submenu.map((subLink, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link
                                                                className={`block py-[10px] px-[24px] rounded-full text-sm hover:bg-[#f2e1b561] ${isMobileMenuOpen ? "text-gray-600" : ""
                                                                    }`}
                                                                href={subLink.href}
                                                            >
                                                                {subLink.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div style={{ background: 'linear-gradient(to right, #DAB221, #B07C0A)' }} className={`ms-3 group relative text-white bg-[#2d2849] flex justify-center items-center h-[40px] w-[40px] rounded-full text-sm`}>
                                <Headset />

                                <div className="absolute hidden group-hover:block top-10 z-20  backdrop-blur-sm text-[#CC9B18] px-2 border rounded-md shadow-md">
                                    <ul className=" divide-y">
                                        {/* Email Link */}
                                        <li>
                                            <Link
                                                href="mailto:info@parthsarthibuilder.com"
                                                title="Send Email"
                                                className="flex items-center underline gap-x-2 p-1 my-1 rounded-lg hover:bg-gray-100 transition duration-200"
                                            >
                                                <Mail color="#CC9B18" size={18} />
                                                Email
                                            </Link>
                                        </li>

                                        {/* WhatsApp Link */}
                                        <li>
                                            <Link
                                                href="https://wa.me/+919024965965"
                                                passHref
                                                title="Message on WhatsApp"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex underline items-center gap-x-2 p-1 my-1 rounded-lg hover:bg-gray-100 transition duration-200"
                                            >
                                                <MessageCircle color="#6cb049" size={18} />
                                                WhatsApp
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                            {/* Mobile Menu Button */}
                            <button onClick={toggleMobileMenu} className="lg:hidden ms-3 flex items-center">
                                {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
                            </button>
                        </div>
                    </div>
                </div>

            </nav>
        </header>
    );
}
