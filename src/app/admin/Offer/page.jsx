"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Deal from '@/components/home/Deal';

export default function Page() {
    const [dealDate, setDealDate] = useState("");
    const [dealTime, setDealTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentDeal, setCurrentDeal] = useState(null); // To store current deal info

    useEffect(() => {
        const fetchDealData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/Deal/fetchall/blog');
                if (response.data.data && response.data.data.length > 0) {
                    const fetchedDealDate = new Date(response.data.data[0].Deal);
                    const formattedDate = fetchedDealDate.toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
                    const formattedTime = fetchedDealDate.toISOString().split('T')[1].split('.')[0]; // Extract time in HH:mm:ss format

                    setDealDate(formattedDate);
                    setDealTime(formattedTime);
                    setCurrentDeal(fetchedDealDate); // Store the current deal
                }
            } catch (error) {
                console.error('Error fetching deal data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDealData();
    }, []);

    const handleUpdate = async () => {
        if (!dealDate || !dealTime) {
            alert("Please select both date and time.");
            return;
        }

        const dealDateTime = new Date(`${dealDate}T${dealTime}`);

        setLoading(true);
        try {
            const response = await axios.patch('/api/Deal/update', {
                id: "675d388d6e562c925bb4e377", // Replace with actual ID if needed
                Deal: dealDateTime,
            });
            alert(response.data.message || "Deal updated successfully!");
            window.location.reload(); // Refresh the page to reflect the updated deal
        } catch (error) {
            console.error("Error updating deal:", error);
            alert(error.response?.data?.message || "Failed to update the deal.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="relative">
                <Deal />
                <div className="absolute top-0 left-0 right-0 bottom-0 bac"></div>
            </div>

            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">Update Deal</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex items-end gap-4 flex-wrap">
                        <div className="relative">
                            <label htmlFor="deal-date" className="block mb-1">Date:</label>
                            <input
                                type="date"
                                id="deal-date"
                                className={`border p-2 rounded w-full ${currentDeal && dealDate === currentDeal.toISOString().split('T')[0] ? 'bg-yellow-100 border-yellow-500' : ''}`} // Highlight current deal date
                                value={dealDate}
                                onChange={(e) => setDealDate(e.target.value)}
                                disabled={loading} // Disable input when loading
                            />

                        </div>
                        <div className="relative">
                            <label htmlFor="deal-time" className="block mb-1">Time:</label>
                            <input
                                type="time"
                                id="deal-time"
                                className={`border p-2 rounded w-full ${currentDeal && dealTime === currentDeal.toISOString().split('T')[1].split('.')[0] ? 'bg-yellow-100 border-yellow-500' : ''}`} // Highlight current deal time
                                value={dealTime}
                                onChange={(e) => setDealTime(e.target.value)}
                                disabled={loading} // Disable input when loading
                            />

                        </div>
                        <button
                            className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50' : ''}`}
                            onClick={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Deal"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
