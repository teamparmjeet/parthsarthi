"use client"
import React, { useState, useEffect } from 'react';
import {
    LaptopMinimal, Settings, Bell, Menu, X, Search, UserPlus,
    User, CheckSquare, Book, Calendar, MessageSquare, Users,
    AlertTriangle, FileText, Phone, MapPinHouse, MapPinPlus,
    ShieldCheck, Download, Mail, Gauge, LogOut, UserCircle
} from "lucide-react";
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Smallbtn from './btn/Smallbtn';
import Btn1 from './btn/Btn1';
import Logo from '@/public/annother-parth.svg';
export default function AdminHeader() {
    const { data: session } = useSession();
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [isLgScreen, setIsLgScreen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };
    const userName = session?.user?.name || "User";
    const firstInitial = userName.charAt(0);
    const Menulist = [
        {
            id: "1",
            title: "Admission",
            icon: CheckSquare,
            submenu: [
                { name: "New Admissions", icon: UserPlus, href: "/main/underdevelopment" },
                { name: "Branch Visits", icon: User, href: "/main/underdevelopment" },
                { name: "Enrolled Students", icon: CheckSquare, href: "/main/underdevelopment" },
                { name: "Student Interaction History", icon: Book, href: "/main/underdevelopment" },
                { name: "Class Scheduling", icon: Calendar, href: "/main/underdevelopment" },
                { name: "Parent-Teacher Communication", icon: MessageSquare, href: "/main/underdevelopment" },
                { name: "Student Groups", icon: Users, href: "/main/underdevelopment" },
                { name: "Behavior Reports", icon: AlertTriangle, href: "/main/underdevelopment" },
                { name: "Health Records", icon: FileText, href: "/main/underdevelopment" },
                { name: "Emergency Contacts", icon: Phone, href: "/main/underdevelopment" },
            ],
        },
        {
            id: "2",
            title: "Branchs",
            icon: MapPinHouse,
            submenu: [
                { name: "All Branch", icon: MapPinHouse, href: "/main/page/branch" },
                { name: "New Branch", icon: MapPinPlus, href: "/main/page/addbranch" },
                { name: "Register Staff", icon: ShieldCheck, href: "/main/page/registerstaff" },
                { name: "Staff", icon: Users, href: "/main/page/staff" },
                { name: "Branch Reports", icon: Download, href: "/main/page/branchreport" },
                { name: "Branch Performance", icon: Gauge, href: "/main/page/performance" }
            ],
        },
        {
            id: "5",
            title: "Communication",
            icon: Mail,
            submenu: [
                { name: "Email Communication", icon: Mail, href: "/main/underdevelopment" },
            ],
        },
    ];
    useEffect(() => {
        const handleResize = () => {
            setIsLgScreen(window.innerWidth >= 1278);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseEnter = (id) => {
        if (isLgScreen) setOpenSubmenu(id);
    }

    const handleMouseLeave = () => {
        if (isLgScreen) setOpenSubmenu(null);
    };

    const handleClick = (id) => {
        if (!isLgScreen) {
            setOpenSubmenu(openSubmenu === id ? null : id);
        }
    };
    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    return (
        <>

            <div className='shadow lg:h-[70px] lg:flex items-center'>
                <div className="lg:w-[97%] px-2 mx-auto">
                    <div className="grid lg:grid-cols-9 sm:grid-cols-2 grid-cols-2 items-center">
                        <div className="lg:col-span-6 sm:col-span-1 col-span-1">
                            <div className='flex items-center w-full gap-5'>

                                <button className=' opacity-0'><Menu />
                                </button>
                                <div className='grid lg:grid-cols-12 items-center'>
                                    <div className='col-span-2'>
                                        <Image src={Logo} className='' alt='Logo' height={60} />
                                    </div>

                                    <div className='col-span-10 hidden sm:flex items-center justify-end'>
                                        {/* <ul className='flex flex-wrap'>
                                            {Menulist.map((item) => (
                                                <li
                                                    key={item.id}
                                                    className='relative group'
                                                    onMouseEnter={() => handleMouseEnter(item.id)}
                                                    onMouseLeave={handleMouseLeave}
                                                    onClick={() => handleClick(item.id)}
                                                >
                                                    <div className='cursor-pointer hover:bg-gray-100 text-[14px] text-gray-700 rounded-md px-4 py-2 duration-150'>
                                                        {item.title}
                                                    </div>
                                                    {(openSubmenu === item.id && item.submenu) && (
                                                        <ul className='absolute lg:w-80 top-100 left-0  bg-white shadow p-2 rounded-lg z-50'>
                                                            {item.submenu.map((submenuItem, index) => (
                                                                <Link key={index} href={submenuItem.href}>
                                                                    <li className='py-2 px-3 hover:bg-[#b9880c48] flex items-center gap-x-2 text-sm text-gray-700   duration-150 cursor-pointer rounded-md'>
                                                                        <submenuItem.icon size={17} /> {submenuItem.name}
                                                                    </li>
                                                                </Link>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul> */}
                                        {/* Search Bar */}
                                        <div className="relative ms-4 w-full   hidden sm:block">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <Search className="text-gray-500" size={18} />
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md  focus:outline-none   sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="lg:col-span-3 sm:col-span-1 col-span-1">

                            <div className='flex items-center justify-end gap-1 lg:gap-1'>

                                <div className='sm:block hidden'><Smallbtn icon={Settings} href="/" /></div>
                                <div onClick={toggleNotification}>
                                    <Smallbtn icon={Bell} href="javascript:void(0)" />
                                </div>
                                {isNotificationOpen && (
                                    <div className="absolute top-16 right-4 w-[300px] bg-white rounded-md shadow-sm  border p-4 z-50 h-[70vh] overflow-y-auto">
                                        <h4 className="text-lg font-semibold mb-2">Notifications</h4>
                                        <ul className="space-y-2">
                                            <li className="text-gray-700">No new notifications</li>
                                            {/* You can dynamically add notification items here */}
                                        </ul>
                                    </div>
                                )}
                                <div className='sm:block hidden'>
                                    <Link href="/main/page/addquery">
                                        <Btn1 title="New Property" />
                                    </Link>
                                </div>
                                <div className='relative'>
                                    <div
                                        className="cursor-pointer w-10 h-10 rounded-full bg-[#2d2849] text-white flex items-center justify-center"
                                        onClick={toggleProfile}
                                    >
                                        {firstInitial}
                                    </div>
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                                            <Link href="/main/profile">
                                                <div className='flex items-center px-4 py-2 hover:bg-gray-100'>
                                                    <UserCircle size={18} className='mr-2' />
                                                    <span>Profile</span>
                                                </div>
                                            </Link>
                                            <div
                                                onClick={() => signOut()}
                                                className='flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                            >
                                                <LogOut size={18} className='mr-2' />
                                                <span>Logout</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}