"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, ChevronsRight } from 'lucide-react';
const Breadcrumb = ({ customLabels = {} }) => {
    const router = useRouter();
    const [pathArray, setPathArray] = useState([]);

    // Update the path array when the route changes
    useEffect(() => {
        const fullPath = window.location.pathname; // Use window.location to get the path
        setPathArray(fullPath.split('/').filter((path) => path));
    }, []);

    return (
        <nav className="text-gray-700 text-xs" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex items-center">
                {/* Home link */}
                <li className="flex items-center">
                    <Link href="/" className="text-[#2d2849] hover:underline">

                        <Home size={15} />
                    </Link>
                    <ChevronsRight size={13} className="mx-2" />
                </li>

                {/* Dynamically generate links for each path segment */}
                {pathArray.map((path, index) => {
                    const fullPath = `/${pathArray.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathArray.length - 1;

                    // Get custom label if provided, otherwise capitalize the path
                    const label = customLabels[path] || decodeURIComponent(path.replace(/-/g, ' '));

                    return (
                        <li key={index} className="flex items-center">
                            {!isLast ? (
                                <>
                                    <Link href={fullPath} className="text-[#2d2849] hover:underline capitalize">
                                        {label}
                                    </Link>
                                    <ChevronsRight size={13} className="mx-2" />
                                </>
                            ) : (
                                <span className="text-gray-400 capitalize">{label}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
