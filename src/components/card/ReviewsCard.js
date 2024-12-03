import { Star, StarHalf } from "lucide-react";
import { useState, useEffect } from 'react';

const getRandomColor = () => {
    const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500", "bg-orange-500"];
    return colors[Math.floor(Math.random() * colors.length)];
};

export default function ReviewsCard({review}) {
    const [bgColor, setBgColor] = useState('');
    useEffect(() => {
        setBgColor(getRandomColor());
    }, []);


    const renderStars = () => {
        const fullStars = Math.floor(review.star);
        const hasHalfStar = review.star - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`full-${i}`} size={16} fill="currentColor" />
                ))}
                {hasHalfStar && <StarHalf size={16} fill="currentColor" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star key={`empty-${i}`} size={16} />
                ))}
            </>
        );
    };
    return (

        <div className="bg-gray-100 border rounded-lg p-4">
            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-3 flex items-start justify-center">
                    <span className={`nameLetter ${bgColor} h-[55px] w-[55px] text-[25px] font-bold text-white rounded-full p-3 flex items-center justify-center`}>
                    {review.name.charAt(0).toUpperCase()}
                    </span>
                </div>

                <div className="col-span-9 flex flex-col justify-center">
                    <p className="font-bold mb-0">{review.name}</p>
                    <p className="text-sm text-gray-500">From {review.location}</p>
                </div>

                <div className="col-span-12">
                    <p className="text-yellow-500 mb-1 flex">
                    {renderStars()}

                    </p>
                    <p className="text-sm line-clamp-2">
                        {review.review}
                    </p>
                </div>
            </div>
        </div>

    )
}