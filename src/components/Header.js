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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            title: "About us",
            href: "/about-us"
        },
        {
            title: "Our Projects",
            href: "#",
            submenu: category.map((item) => ({
                title: item.title,  // Assuming each category object has a `name` field
                href: `/projects` // Assuming `slug` is used for dynamic URLs
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

    const isActiveLink = (href) => pathname === href;

    const toggleSubMenu = () => {
        setIsSubMenuOpen((prev) => !prev);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
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
                            <ul className="hidden lg:flex items-center">
                                {menuItems.map((link, index) => (
                                    <li className="relative ms-3" key={index} onClick={link.submenu && toggleSubMenu}>
                                        <Link className={`py-[11px] flex justify-center items-center px-[26px] rounded-full text-sm ${isActiveLink(link.href) ? "bg-[#2d2849] text-white" : "bg-gray-50 hover:bg-[#f2e1b561]"}`} href={link.href}>
                                            {link.title}
                                            {link.badge && (
                                                <span className="text-[8px] py-1 absolute top-[-5px] end-0 font-semibold leading-none bg-red-500 text-white px-2 rounded-full">
                                                    {link.badge}
                                                </span>
                                            )}
                                            {link.submenu && (
                                                <span className="ml-2 transition-transform duration-300">
                                                    <ChevronDown size={15} className={`${isSubMenuOpen && 'rotate-180'}`} />
                                                </span>
                                            )}
                                        </Link>
                                        {link.submenu && (
                                            <div className={`absolute min-w-max left-0 bg-white shadow-lg rounded-2xl z-50 p-2 transition-opacity duration-300 ${isSubMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                                <div className="absolute top-[-10px] left-1/4 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-white"></div>
                                                <ul className="space-y-1">
                                                    {link.submenu.map((subLink, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link className="py-[10px] block px-[24px] rounded-full text-sm hover:bg-[#f2e1b561]" href={subLink.href}>
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

                {/* Mobile Menu */}
                <div className={`fixed z-50 top-0 left-0 w-64 h-full bg-white shadow-lg transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-lg font-bold">Menu</h2>
                        <button onClick={toggleMobileMenu}><X size={20} /></button>
                    </div>
                    <ul className="flex flex-col">
                        {menuItems.map((link, index) => (
                            <li key={index}>
                                <div onClick={link.submenu ? toggleSubMenu : undefined} className="relative py-3 px-4 flex justify-between items-center cursor-pointer">
                                    <Link className={`text-sm ${isActiveLink(link.href) ? "bg-[#2d2849] text-white" : "text-gray-800"}`} href={link.href}>
                                        {link.title}
                                    </Link>
                                    {link.submenu && (
                                        <ChevronDown size={15} className={`${isSubMenuOpen ? 'rotate-180' : ''}`} />
                                    )}
                                </div>
                                {link.submenu && isSubMenuOpen && (
                                    <ul className="ml-4">
                                        {link.submenu.map((subLink, subIndex) => (
                                            <li key={subIndex}>
                                                <Link className="py-2 block text-sm hover:bg-[#f2e1b561]" href={subLink.href}>
                                                    {subLink.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
