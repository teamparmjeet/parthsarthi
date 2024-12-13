"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function ProfilePage() {
    const [admin, setadmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { data: session } = useSession();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(
                    `/api/Admin/find-admin-byemail/${session?.user?.email}`
                );
                setadmin(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.email) fetchAdminData();
    }, [session]);

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#b9870c]"></div>
                <p className="ml-4 text-lg text-gray-700">Loading...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-red-500">{error}</p>
            </div>
        );

    return (
        <div className="  flex items-center justify-center">
            <div className="w-full p-4">
                <h1 className="text-3xl font-bold  text-[#b9870c] mb-8">
                    Admin Profile
                </h1>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-[#b9870c] text-white flex items-center justify-center font-bold text-2xl">
                            {admin.name[0]}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{admin.name}</h2>
                            <p className="text-sm text-gray-500">
                                {admin.usertype === "1" ? "Admin" : "Super Admin"}
                            </p>
                        </div>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex justify-between">
                            <span className="text-gray-600 font-medium">Phone:</span>
                            <span className="text-gray-800">{admin.phone}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600 font-medium">Email:</span>
                            <span className="text-gray-800">{admin.email}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600 font-medium">
                                User Type:
                            </span>
                            <span className="text-gray-800">  {admin.usertype === "1" ? "Admin" : "Super Admin"}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
