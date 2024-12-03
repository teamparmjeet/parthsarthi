"use client";
import { useState } from 'react';

const ReadMore = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full border-gray-100 border mt-5">
      {/* Tab Header */}
      <div className="flex bg-[#e6ecfc]  py-3 px-5 font-bold">
        Description
      </div>

      {/* Description Content */}
      <div className="p-4">
       
          <div className={`text-sm ${!isExpanded ? 'line-clamp-2' : ''}`}
            dangerouslySetInnerHTML={{ __html: project.content }}>
          </div>
      

        {/* Read More/Read Less Button */}
        <button
          className="text-blue-500 text-sm mt-2"
          onClick={toggleReadMore}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
};

export default ReadMore;
