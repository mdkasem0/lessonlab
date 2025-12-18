import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { Link } from "react-router";
import { useAuth } from "../../../Context/useAuth";
import LoaderSpainer from "../../../Components/Loader/LoaderSpainer";
import { UpdateLessonModal } from "../../../Components/modals/UpdateLessonModal ";
import DeleteLessonModal from "../../../Components/modals/DeleteLessonModal";

const MyLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editLesson, setEditLesson] = useState(null);
  const [deleteLesson, setDeleteLesson] = useState(null);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_ApiCall}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLessons(res.data.lessons);
    } catch {
      toast.error("Failed to fetch lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchLessons();
  }, [user]);

  const updateField = async (id, payload) => {
    try {
      const token = await user.getIdToken();
      await axios.patch(
        `${import.meta.env.VITE_ApiCall}/lesson/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLessons((prev) =>
        prev.map((l) => (l._id === id ? { ...l, ...payload } : l))
      );
      toast.success("Lesson updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const confirmDelete = async (id) => {
    try {
      const token = await user.getIdToken();
      await axios.delete(`${import.meta.env.VITE_ApiCall}/lesson/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLessons((prev) => prev.filter((l) => l._id !== id));
      toast.success("Lesson deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteLesson(null);
    }
  };

  if (loading) return <LoaderSpainer />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Lessons</h2>

      {lessons.length === 0 ? (
        <p className="text-gray-500">No lessons created yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Visibility</th>
                <th>Access</th>
                <th>Created</th>
                <th>Likes</th>
                <th>Saves</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id}>
                  <td className="font-medium">{lesson.title}</td>
                  <td>{lesson.category}</td>

                  {/* VISIBILITY */}
                  <td>
                    <select
                      value={lesson?.visibility?.toLowerCase() || "public"}
                      onChange={(e) =>
                        updateField(lesson._id, {
                          visibility: e.target.value,
                        })
                      }
                      className="select select-sm"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </td>

                  {/* ACCESS LEVEL */}
                  <td>
                    <select
                      value={lesson.accessLevel}
                      disabled={!user?.isPremium}
                      onChange={(e) =>
                        updateField(lesson._id, {
                          accessLevel: e.target.value,
                        })
                      }
                      className="select select-sm"
                    >
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                    </select>
                  </td>

                  <td>{new Date(lesson.created_at).toLocaleDateString()}</td>
                  <td>{lesson.likesCount || 0}</td>
                  <td>{lesson.saveCount || 0}</td>

                  {/* ACTIONS */}
                  <td className="flex gap-2">
                    <Link
                      to={`/lisson/${lesson._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      <FiEye />
                    </Link>

                    <button
                      onClick={() => setEditLesson(lesson)}
                      className="btn btn-sm btn-outline btn-info"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      onClick={() => setDeleteLesson(lesson)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* UPDATE MODAL */}
      {editLesson && (
        <UpdateLessonModal
          lesson={editLesson}
          onClose={() => setEditLesson(null)}
          onSuccess={fetchLessons}
        />
      )}

      {/* DELETE MODAL */}
      <DeleteLessonModal
        lesson={deleteLesson}
        onClose={() => setDeleteLesson(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default MyLessons;
