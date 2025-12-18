import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTrash2, FiCheckCircle, FiStar } from "react-icons/fi";
import LoaderSpainer from "../../../Components/Loader/LoaderSpainer";
import { useAuth } from "../../../Context/useAuth";
import DeleteLessonModal from "../../../Components/modals/DeleteLessonModal";

const ManageLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", visibility: "", flagged: "" });
  const [stats, setStats] = useState({ public: 0, private: 0, flagged: 0 });
  const [selectedLesson, setSelectedLesson] = useState(null);

  const fetchLessons = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const { data } = await axios.get(`${import.meta.env.VITE_ApiCall}/admin/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
        params: filters,
      });
      if (data.success) {
        setLessons(data.lessons);
        setStats(data.stats);
      }
    } catch (error) {
      toast.error("Failed to fetch lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [user, filters]);

  const deleteLesson = async (lessonId) => {
    try {
      const token = await user.getIdToken();
      await axios.delete(`${import.meta.env.VITE_ApiCall}/admin/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Lesson deleted successfully");
      fetchLessons();
    } catch (error) {
      toast.error("Failed to delete lesson");
    }
  };

const updateLesson = async (lessonId, action) => {
  try {
    let url = "";
    const token = await user.getIdToken();

    if (action === "reviewed") {
      url = `${import.meta.env.VITE_ApiCall}/admin/lessons/${lessonId}/reviewed`;
    } else if (action === "featured") {
      url = `${import.meta.env.VITE_ApiCall}/admin/lessons/${lessonId}/featured`;
    } else {
      return;
    }

    const res = await axios.put(
      url,
      null, // ✅ no body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (res.data.success) {
      toast.success(res.data.message);

      // 🔁 update UI without refetch
      setLessons((prev) =>
        prev.map((lesson) =>
          lesson._id === lessonId
            ? {
                ...lesson,
                isReviewed:
                  action === "reviewed" ? true : lesson.isReviewed,
                isFeatured:
                  action === "featured" ? true : lesson.isFeatured,
              }
            : lesson
        )
      );
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to update lesson"
    );
  }
};

  if (loading) return <LoaderSpainer />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Manage Lessons</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-lg font-semibold">Public Lessons</h2>
          <p className="text-2xl">{stats?.totalPublicLessons}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-lg font-semibold">Private Lessons</h2>
          <p className="text-2xl">{stats?.totalPrivateLessons}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-lg font-semibold">Flagged Lessons</h2>
          <p className="text-2xl">{stats?.totalFlaggedLessons}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <select
          value={filters.category}
          onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <option value="">All Categories</option>
          <option value="Mindset">Mindset</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Career">Career</option>
          <option value="Life">Relationships</option>
          <option value="Mistakes Learned">Mistakes Learned</option>
        </select>
  
        <select
          value={filters.visibility}
          onChange={(e) => setFilters((prev) => ({ ...prev, visibility: e.target.value }))}
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <option value="">All Visibilities</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <select
          value={filters.flagged}
          onChange={(e) => setFilters((prev) => ({ ...prev, flagged: e.target.value }))}
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <option value="">All</option>
          <option value="true">Flagged</option>
          <option value="false">Not Flagged</option>
        </select>
      </div>

      {/* Lessons Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Visibility</th>
              <th className="px-4 py-2 text-left">Flagged</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {lessons.map((lesson) => (
              <tr key={lesson._id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="px-4 py-2">{lesson.title}</td>
                <td className="px-4 py-2">{lesson.author_name}</td>
                <td className="px-4 py-2">{lesson.category}</td>
                <td className="px-4 py-2">{lesson.visibility}</td>
                <td className="px-4 py-2">{lesson.isFlagged ? "Yes" : "No"}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  {!lesson.isReviewed && (
                    <button
                      onClick={() => updateLesson(lesson._id, "reviewed")}
                      className="bg-green-500 cursor-pointer text-white p-2 rounded hover:bg-green-600"
                      title="Mark as Reviewed"
                    >
                      <FiCheckCircle />
                    </button>
                  )}
                  {!lesson.isFeatured && (
                    <button
                      onClick={() => updateLesson(lesson._id, "featured")}
                      className="bg-yellow-400 cursor-pointer text-white p-2 rounded hover:bg-yellow-500"
                      title="Make Featured"
                    >
                      <FiStar />
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedLesson(lesson)}
                    className="bg-red-500 cursor-pointer text-white p-2 rounded hover:bg-red-600"
                    title="Delete Lesson"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {lessons.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No lessons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {selectedLesson && (
        <DeleteLessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onConfirm={(id) => {
            deleteLesson(id);
            setSelectedLesson(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageLessons;
