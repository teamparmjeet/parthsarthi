"use client";
import React, { useState, useEffect } from "react";
import {
  Menu, X, Home, CopyPlus, ListTodo, Rocket, Gauge, User2Icon, UserPlus2, LayoutDashboard, MapPinHouse, MapPinPlus, Users, LayoutList, Group, Trash2, List, Users2, UserPlus,
  User,
  CheckSquare,
  Book,
  Calendar,
  MessageSquare,
  AlertTriangle,
  FileText,
  Phone,
  ShieldCheck,
  Download, NotebookText, MessageSquareCode,
  Mail
} from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Sidebar({ onToggleSidebar }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to true on large screens
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setIsLgScreen(isLargeScreen);
      setIsSidebarOpen(isLargeScreen); // Sidebar open by default on large screens, closed on smaller
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (onToggleSidebar) {
      onToggleSidebar(!isSidebarOpen);
    }
  };

  const isActiveLink = (href) => pathname === href;

  return (
    <>
      <div className="absolute md:top-5 top-5 left-2 md:left-5">
        <button
          className={`cursor-pointer duration-150 p-1 rounded-lg ${isSidebarOpen ? "bg-[#2d2849] text-white" : "bg-gray-200 text-black hover:bg-[#2d2849] hover:text-white"
            }`}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>
      <div>
        <div
          className={`absolute md:top-[70px] top-[70px] bottom-0 left-0 w-64 bg-white z-40 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform bottom-0 absolute border bg-white duration-300 ease-in-out`}
        >
          <div className="relative h-full flex flex-col px-2">
            <ul className="h-full ">
              <Link href="/admin/dashboard">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/dashboard") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700 "
                    }`}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </li>
              </Link>


              <Link href="/admin/banner">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/banner") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <NotebookText size={18} />
                  Banner                </li>
              </Link>


              <Link href="/admin/page">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/page") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <NotebookText size={18} />
                  Pages
                </li>
              </Link>
              <Link href="/admin/projects">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/projects") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <LayoutList size={18} />
                  All Projects
                </li>
              </Link>



              <Link href="/admin/projects/add">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/projects/add") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <CopyPlus size={18} />
                  Add New Project
                </li>
              </Link>

              <Link href="/admin/category">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/category") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <ShieldCheck size={18} />
                  Category
                </li>
              </Link>

              <Link href="/admin/blogs">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/blogs") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <ListTodo size={18} />
                  Blogs
                </li>
              </Link>
              <Link href="/admin/blogs/add">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/blogs/add") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <Rocket size={18} />
                  Add Blogs
                </li>
              </Link>
              <Link href="/admin/projectleads">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/projectleads") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <Rocket size={18} />
                  Projects Leads
                </li>
              </Link>
              <Link href="/admin/reviews">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/reviews") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}>
                  <MessageSquareCode size={18} />
                  Reviews
                </li>
              </Link>


              <Link href="/admin/contact">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/contact") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}>
                  <MessageSquareCode size={18} />
                  Contact Us
                </li>
              </Link>


              <Link href="/admin/subscribe">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/subscribe") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}>
                  <MessageSquareCode size={18} />
                  Subscribe
                </li>
              </Link>

              <Link href="/admin/Offer">
                <li
                  className={`cursor-pointer text-sm px-4 py-3 duration-150 flex items-center gap-x-2 rounded-md ${isActiveLink("/admin/Offer") ? "bg-[#2d2849] text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <NotebookText size={18} />
                  Offer                </li>
              </Link>

            </ul>



            <div className="mt-auto p-2 border-t">
              <div className="flex flex-col">

                <div className="cursor-pointer hover:bg-[#f56565] text-sm rounded-md text-[#f56565] hover:text-white  px-4 py-3 duration-150 flex items-center gap-x-2">
                  <Trash2 size={18} />
                  Trash
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
