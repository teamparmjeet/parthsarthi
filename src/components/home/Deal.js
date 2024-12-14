"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Deal() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [dealEndDate, setDealEndDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDeal = async () => {
    try {
      const response = await axios.get("/api/Deal/fetchall/all");
      const fetchedEndDate = new Date(response.data.data[0].Deal);
      setDealEndDate(fetchedEndDate);
    } catch (error) {
      console.error("Error fetching deal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeal();
  }, []);

  useEffect(() => {
    if (dealEndDate) {
      const updateCountdown = () => {
        const now = new Date();
        const difference = dealEndDate - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      };

      const timer = setInterval(updateCountdown, 1000);
      return () => clearInterval(timer);
    }
  }, [dealEndDate]);

  return (
    <section className="py-4">
      <div className="container w-[90%] mx-auto text-center">
        <div className="bg-gradient-to-r from-[#e6ecfc] to-[#e3ebff] p-8 sm:rounded-full rounded-3xl justify-center flex md:flex-row flex-col items-center relative">
          <span className="text-3xl animate-ping inline-block md:ms-[70px] md:mb-0 mb-5">🎉 </span>
          <h2 className="sm:text-lg md:me-10 text-sm font-bold text-gray-800 md:mb-0 mb-5 animate-pulse">
            Weekend Deal-ights Ends In 🎁:
          </h2>
          <div className="flex justify-center space-x-3 items-center md:mb-0 mb-3">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <div key={index} className="flex flex-col items-center animate-fade-in">
                <span className="sm:text-4xl text-2xl font-extrabold text-[#2d2849] animate-scale">
                  {value}
                </span>
                <span className="sm:text-xs text-[10px] uppercase font-light text-red-500 mt-1">
                  {unit.charAt(0).toUpperCase() + unit.slice(1, 1)}{unit.slice(1)}
                </span>
                <div className="w-12 bg-white h-1 mt-1 rounded-full">
                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{
                      width: `${unit === "days"
                        ? (value / 50) * 100
                        : unit === "hours"
                          ? (value / 24) * 100
                          : unit === "minutes" || unit === "seconds"
                            ? (value / 60) * 100
                            : 0
                        }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute -bottom-4 w-full">
            <Link href="/Offer">
              <button className="bg-red-600 text-white text-sm font-bold py-2 px-6 rounded-full shadow-lg hover:bg-red-700 transition-all ease-in-out duration-200">
                Claim Your Deal Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
