import React from "react";
import { FiClock, FiEye, FiCalendar, FiRefreshCcw } from "react-icons/fi";

const LessonMetadata = ({ lesson }) => {
  return (
    <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-4">

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Lesson Details
      </h3>

      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">

        {/* Created Date */}
        <div className="flex items-center gap-3">
          <FiCalendar className="text-gray-400 dark:text-gray-500 text-lg" />
          <span>
            Created:{" "}
            <strong className="text-gray-900 dark:text-white">
              {new Date(lesson.created_at).toLocaleDateString()}
            </strong>
          </span>
        </div>

        {/* Updated Date */}
        <div className="flex items-center gap-3">
          <FiRefreshCcw className="text-gray-400 dark:text-gray-500 text-lg" />
          <span>
            Updated:{" "}
            <strong className="text-gray-900 dark:text-white">
              {new Date(lesson.updated_at).toLocaleDateString()}
            </strong>
          </span>
        </div>

        {/* Visibility */}
        <div className="flex items-center gap-3">
          <FiEye className="text-gray-400 dark:text-gray-500 text-lg" />
          <span>
            Visibility:{" "}
            <strong className="text-gray-900 dark:text-white">{lesson.visibility}</strong>
          </span>
        </div>

        {/* Reading Time */}
        <div className="flex items-center gap-3">
          <FiClock className="text-gray-400 dark:text-gray-500 text-lg" />
          <span>
            Estimated Reading:{" "}
            <strong className="text-gray-900 dark:text-white">5 min</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LessonMetadata;
