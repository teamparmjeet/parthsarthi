"use client";
import Image from "next/image";
import Link from "next/link";
import parthCr from "@/public/Parth-Crown-1-1024x1024.jpg";
import { formatDistanceToNow } from "date-fns";
import { Calendar } from "lucide-react";
export default function BlogCard({ blog }) {
    return (
        <div className="max-w-4xl mx-auto bg-white border rounded-lg overflow-hidden grid grid-cols-12">
            {/* Blog Image in col-4 */}
            <div className="sm:col-span-4 col-span-12">
                <Image src={blog.image} width={500} height={500} alt="Blog Image" className="w-full h-full object-cover" />
            </div>

            {/* Blog Content in col-8 */}
            <div className="sm:col-span-8 col-span-12 p-4 flex flex-col justify-center">
                {/* Blog Title */}
                <h2 className="font-bold text-gray-800 line-clamp-2 mb-2">
                    {blog.title}
                </h2>

                {/* Blog Description */}
                <div className="text-gray-600 text-sm mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: blog.content }}>
                </div>

                {/* Blog Footer */}
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 flex items-center leading-none">
                        <Calendar size={12} className="mr-2" />
                        <span className="inline-block">
                            {/* Show the "4 days ago" message */}
                            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                        </span>
                    </span>
                    <Link href={`/blog/${blog.slug}`} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                        Read More
                    </Link>
                </div>
            </div>
        </div>

    );
}
