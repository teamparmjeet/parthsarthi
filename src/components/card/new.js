import Image from 'next/image';
import Link from 'next/link';
import { Home, Maximize2, MapPin } from 'lucide-react';

export default function New({ imageUrl, logo, status, title, location, size, bhk, keyid }) {
    return (
        <Link href={`/projects/${keyid}`} className="block bg-white border border-gray-200 p-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Property Image with Label */}
            <div className="relative p-0 m-0 overflow-hidden h-80">
                <Image
                    src={imageUrl}
                    alt="Property Image"
                    fill
                    className=""
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>

                <span className="absolute top-2 left-2 bg-gradient-to-r mb-2 font-semibold inline-block px-3 py-0.5 text-[10px] rounded-full text-white from-[#26ff35] to-[#16911e]">
                    {status}
                </span>
            </div>


            <div className="p-4">
                <div className=' flex  gap-4'>
                    <div className="bg-white rounded-md inline-block ">
                        <Image src={logo} width={100} height={100} alt="ParthSarthi Logos" className="max-h-[50px] w-auto" />
                    </div>
                    <div>

                        <h3 className="text-lg font-bold text-[#2d2849] truncate">{title}</h3>


                        <p className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="w-4 h-4 mr-1 text-[#CC9B18]" /> {location}
                        </p>
                    </div>

                </div>

                <div className="flex items-center justify-between mt-3 border-t pt-3">
                    <span className="flex items-center text-[12px] text-gray-600">
                        <Maximize2 size={12} className="mr-2 text-gray-400" /> {size[0].size} Sq. Ft
                    </span>
                    <span className="flex items-center text-[12px] text-gray-600">
                        <Home size={12} className="mr-2 text-gray-400" /> {bhk[0].bhk} BHK
                    </span>
                </div>
            </div>
        </Link>
    );
}
