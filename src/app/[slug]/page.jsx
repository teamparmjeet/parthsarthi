"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Image from 'next/image';
export default function Page({ params }) {
    const slug = params.slug;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState("")

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(`/api/pages/single-byslug/${slug}`);
                setData(response.data.data);
            } catch (err) {
                setError("Failed to fetch project data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [slug]);

    if (loading) {
        return (
            <section className="py-4">
                <div className="container max-w-[90%] mx-auto text-center">
                    <p className="text-xl font-bold text-gray-600">Loading project details...</p>
                    <div className="mt-4">
                        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16 mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-4">
                <div className="container max-w-[90%] mx-auto text-center">
                    <p className="text-xl font-bold text-red-600">{error}</p>
                </div>
            </section>
        );
    }
    return (
        <>
            <section className="py-8">
                <title>{data.seoTitle}</title>
                <div className="container max-w-[80%] mx-auto">

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{data.title}</h1>


                    {data.image && (
                        <div className="mb-6">
                            <Image
                                src={data.image}
                                alt={data.title}
                                height={200}
                                width={200}
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    )}


                    {data.content && (
                        <div className=''
                            dangerouslySetInnerHTML={{ __html: data.content }}>
                        </div>
                    )}





                </div>
            </section>
        </>
    )
}
