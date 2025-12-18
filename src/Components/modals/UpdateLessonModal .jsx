import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/useAuth";

export const UpdateLessonModal = ({ lesson, onClose, onSuccess }) => {
  const [form, setForm] = useState({ ...lesson });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const token = await user.getIdToken();

    await axios.patch(
      `${import.meta.env.VITE_ApiCall}/lesson/${lesson._id}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Lesson updated");
    onSuccess();
    onClose();
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Update failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-lg space-y-3"
      >
        <h3 className="text-lg font-semibold">Update Lesson</h3>

        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="input input-bordered w-full"
        />

        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="textarea textarea-bordered w-full"
        />

        {/* Optional Image Upload */}
        <input type="file" className="file-input w-full" />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-outline">
            Cancel
          </button>
          <button disabled={loading} className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
