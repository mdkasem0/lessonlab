import React from "react";
import { useNavigate } from "react-router";
import { FiUser } from "react-icons/fi";

const CreatorCard = ({ creator }) => {
  const navigate = useNavigate();

  return (
    <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">

      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiUser className="text-gray-400 dark:text-gray-500" />
        Creator
      </h3>

      <div className="flex items-center gap-4">
        
        {/* Avatar */}
        <div className="relative">
          <img
            src={creator.author_photo}
            alt={creator.author_name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-300 dark:ring-gray-600"
          />
        </div>

        {/* Creator Info */}
        <div className="flex flex-col">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
            {creator.author_name}
          </h4>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            {creator.totalLessons} Lessons Published
          </p>

          {/* Button */}
          <button
            onClick={() => navigate(`/profile/${creator.name}`)}
            className="mt-3 px-4 py-2 text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
          >
            View All Lessons
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
