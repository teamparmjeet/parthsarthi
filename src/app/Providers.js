"use client";
import { SessionProvider } from "next-auth/react";
import { usePathname } from 'next/navigation';
import FrontEndLayout from '../components/FrontEndLayout';
import AdminLayout from '../components/AdminLayout';

export const AuthProvider = ({ children }) => {
    const pathname = usePathname(); // Now you can use this because it's a Client Component

    const isAdminRoute = pathname.startsWith('/admin'); // Check if the current route is an admin route

    return <SessionProvider>
        {isAdminRoute ? (
            <AdminLayout>{children}</AdminLayout>
        ) : (
            <FrontEndLayout>{children}</FrontEndLayout>
        )}

    </SessionProvider>;
}
