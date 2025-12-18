import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const DeleteLessonModal = ({ lesson, onClose, onConfirm }) => {
  if (!lesson) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md p-6">
        <div className="flex items-center gap-3 mb-4 text-red-500">
          <FiAlertTriangle size={24} />
          <h3 className="text-lg font-semibold">Delete Lesson</h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete
          <span className="font-medium"> “{lesson.title}”</span>?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn btn-sm btn-outline"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(lesson._id)}
            className="btn btn-sm btn-error"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLessonModal;
