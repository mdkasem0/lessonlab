import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Context/useAuth";
import LessonCard from "../Components/LessonCard";
import { UserUtils } from "../Utils/UserUtils";

const Profile = () => {
  const { user, reloadUser, updateUserProfile } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loggedUser, setLoggedUser] = useState(null);
  const [totalLesson, setTotalLesson] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const data = await UserUtils.getCurrentUser(token);
        setLoggedUser(data);
      } catch (err) {
        console.error("Error fetching logged user:", err);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchUserLessons = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const res = await axios.get(
          `${import.meta.env.VITE_ApiCall}/my-public-lessons`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLessons(res.data.publicLessons);
        setTotalLesson(res.data.totalLessonsCount);
        setLoading(false);
      } catch {
        toast.error("Failed to load lessons");
        setLoading(false);
      }
    };
    const resSaved = async () => {
      try {
        const token = await user.getIdToken();
        const fav= await axios.get(`${import.meta.env.VITE_ApiCall}/my-favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalSaved(fav.data.data.length)
      } catch (error) {
        toast.error("Favourite count fetch fail");
      }
    };
    // setTotalSaved(resSaved.data.data.length || 0);
    
    fetchUserLessons();
    resSaved()
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile({
        displayName: displayName,
        photoURL: photoURL,
      });
      await axios.patch(`/api/users/${user._id}`, {
        name: displayName,
        photoURL,
      });
      toast.success("Profile updated");
      reloadUser();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* PROFILE CARD */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <img
              src={photoURL || "https://i.pravatar.cc/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />
            {loggedUser?.isPremium && (
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
                Premium ⭐
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {user?.displayName}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-6 mt-4">
              <Stat label="Lessons Created" value={totalLesson} />
              <Stat label="Lessons Saved" value={totalSaved || 0} />
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleUpdate} className="w-full md:w-72 space-y-3">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Photo URL"
              className="input input-bordered w-full"
            />
            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>

      {/* USER LESSONS */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Public Lessons</h3>

        {lessons.length === 0 ? (
          <p className="text-gray-500">No public lessons created yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="text-center">
    <p className="text-xl font-bold">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

export default Profile;
