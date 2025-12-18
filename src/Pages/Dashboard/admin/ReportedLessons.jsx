import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTrash2, FiXCircle, FiInfo } from "react-icons/fi";
import { useAuth } from "../../../Context/useAuth";
import LoaderSpainer from "../../../Components/Loader/LoaderSpainer";

const ReportedLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all reported lessons
  const fetchReportedLessons = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_ApiCall}/admin/reported-lessons`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLessons(res.data.reportedLessons);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch reported lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportedLessons();
  }, [user]);

  // Open modal with detailed reports
  const openReportsModal = async (lessonId) => {
    try {
      const token = await user.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_ApiCall}/admin/reported-lessons/${lessonId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Expect res.data to have { lesson: {}, reports: [] }
      setSelectedLesson(res.data.lesson ? { ...res.data.lesson, flags: res.data.reports } : null);
      setModalOpen(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch lesson reports");
    }
  };

  // Ignore reports
  const ignoreReports = async (lessonId) => {
    try {
      const token = await user.getIdToken();
      await axios.delete(
        `${import.meta.env.VITE_ApiCall}/admin/reported-lessons/${lessonId}/ignore`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Reports ignored successfully");
      fetchReportedLessons();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to ignore reports");
    }
  };

  // Delete lesson
  const deleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      const token = await user.getIdToken();
      await axios.delete(`${import.meta.env.VITE_ApiCall}/admin/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Lesson deleted successfully");
      fetchReportedLessons();
      setModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete lesson");
    }
  };

  if (loading) return <LoaderSpainer />;

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6">Reported / Flagged Lessons</h1>

<div className="overflow-x-auto rounded-lg shadow">
  {lessons.length === 0 ? (
    <p className="p-4 text-center text-gray-500 dark:text-gray-400">
      No reported lessons found.
    </p>
  ) : (
    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700 text-left">
          <th className="p-3 border-b">Title</th>
          <th className="p-3 border-b text-center">Reports</th>
          <th className="p-3 border-b text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {lessons.map((lesson) => (
          <tr
            key={lesson._id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <td className="p-3 border-b">{lesson.title}</td>
            <td className="p-3 border-b text-center font-medium">{lesson.reportCount}</td>
            <td className="p-3 border-b flex gap-2 justify-center">
              <button
                onClick={() => openReportsModal(lesson._id)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                title="View Reports"
              >
                <FiInfo />
              </button>
              <button
                onClick={() => ignoreReports(lesson._id)}
                className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500 transition"
                title="Ignore Reports"
              >
                <FiXCircle />
              </button>
              <button
                onClick={() => deleteLesson(lesson._id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                title="Delete Lesson"
              >
                <FiTrash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

      {/* Modal */}
      {modalOpen && selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-lg transition-colors">
            <h2 className="text-xl font-bold mb-4">{selectedLesson.title}</h2>
            <h3 className="font-semibold mb-2">Reports:</h3>

            {selectedLesson.flags?.length === 0 ? (
              <p className="text-gray-500">No reports.</p>
            ) : (
              <ul className="space-y-2">
                {selectedLesson.flags.map((flag) => (
                  <li
                    key={flag._id}
                    className="border p-2 rounded bg-gray-50 dark:bg-gray-700"
                  >
                    <p>
                      <strong>Reporter:</strong> {flag.reporterEmail}
                    </p>
                    <p>
                      <strong>Reason:</strong> {flag.reason}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-300">
                      {new Date(flag.timestamp).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Close
              </button>
              <button
                onClick={() => deleteLesson(selectedLesson._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;
