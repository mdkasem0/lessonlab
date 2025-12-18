import React from "react";
import { FiHeart, FiBookmark, FiEye } from "react-icons/fi";

const StatsEngagement = ({ lesson }) => {
  const views = Math.floor(Math.random() * 10000);
  // const li

  return (
    <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Engagement
      </h3>

      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">

        {/* Likes */}
        <div className="flex items-center gap-3">
          <FiHeart className="text-red-500 text-xl" />
          <span>
            <strong className="text-gray-900 dark:text-white">
              {lesson.likesCount||0}
            </strong>{" "}
            Likes
          </span>
        </div>

        {/* Favorites */}
        <div className="flex items-center gap-3">
          <FiBookmark className="text-yellow-500 text-xl" />
          <span>
            <strong className="text-gray-900 dark:text-white">
              {lesson.saveCount|| 0}
            </strong>{" "}
            Favorites
          </span>
        </div>

        {/* Views */}
        <div className="flex items-center gap-3">
          <FiEye className="text-blue-500 text-xl" />
          <span>
            <strong className="text-gray-900 dark:text-white">
              {views.toLocaleString()}
            </strong>{" "}
            Views
          </span>
        </div>

      </div>
    </div>
  );
};

export default StatsEngagement;
