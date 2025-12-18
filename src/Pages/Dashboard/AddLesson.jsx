import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/useAuth";
import axios from "axios";
import { FiStar, FiHeart } from "react-icons/fi";
import { FaIdBadge } from "react-icons/fa";
import { UserUtils } from "../../Utils/UserUtils";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const emotionalTones = ["Motivational", "Sad", "Realization", "Gratitude"];

const AddLesson = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [emotionalTone, setEmotionalTone] = useState(emotionalTones[0]);
  const [visibility, setVisibility] = useState("Public");
  const [accessLevel, setAccessLevel] = useState("Free");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken(); // get Firebase token
        const data = await UserUtils.getCurrentUser(token); // fetch user from backend
        setLoggedUser(data);
      } catch (err) {
        toast.error("Error fetching logged user:", err);
      }
    };

    fetchUser();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description)
      return toast.error("Title and description are required");

    const lessonData = {
      title,
      description,
      category,
      emotionalTone,
      visibility,
      accessLevel,
      userId: user._id,
      image: imageUrl || import.meta.env.VITE_lessonPhoto,
      author_photo: user.photoURL,
      author_name: user.displayName,
      author_email: user.email,
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      setSubmitting(true);
      axios
        .post(`${import.meta.env.VITE_ApiCall}/addlesson`, lessonData)
        .then((res) => {
          if (res.data.success) {
            toast.success("Lesson Successfully added");
            e.target.reset();
          }
        })
        .catch((error) => {
          toast.error(`${error.message} found`);
        });

      setTitle("");
      setDescription("");
      setCategory(categories[0]);
      setEmotionalTone(emotionalTones[0]);
      setVisibility("Public");
      setAccessLevel("Free");
      setImageUrl("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add lesson");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto p-8 rounded-xl shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Animated objects outside the form */}
      <FiStar className="absolute top-6 left-8 text-gray-300 dark:text-gray-700 text-3xl animate-bounce-slow opacity-30" />
      <FiHeart className="absolute top-20 right-10 text-gray-300 dark:text-gray-700 text-4xl animate-bounce-slower opacity-25" />
      <FiStar className="absolute bottom-10 left-12 text-gray-300 dark:text-gray-700 text-2xl animate-bounce-slow opacity-20" />
      <FiStar className="absolute bottom-10 left-12 text-gray-300 dark:text-gray-700 text-2xl animate-bounce-slow opacity-20" />
      <FiStar className="absolute bottom-10 -left-17 text-gray-300 dark:text-gray-700 text-2xl animate-bounce-slow opacity-20" />
      <FiStar className="absolute bottom-10 left-10 text-gray-300 dark:text-gray-700 text-2xl animate-bounce-slow opacity-20" />
      <FaIdBadge className="absolute bottom-10 left-6 text-gray-300 dark:text-gray-700 text-2xl animate-bounce-slow opacity-20" />
      <FiStar className="absolute bottom-10 left-8 text-gray-300 dark:text-gray-700 text-2xl animate-bounce-slow opacity-20" />

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add New Lesson
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 relative z-10"
      >
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          required
        />

        <textarea
          placeholder="Lesson Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          rows={5}
          required
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
        />

        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition w-full"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={emotionalTone}
            onChange={(e) => setEmotionalTone(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition w-full"
          >
            {emotionalTones.map((tone) => (
              <option key={tone}>{tone}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition w-full"
          >
            <option>Public</option>
            <option>Private</option>
          </select>

         <select
  value={accessLevel}
  onChange={(e) => setAccessLevel(e.target.value)}
  className={`border rounded-lg p-3 focus:outline-none focus:ring-2 transition w-full
    ${
      loggedUser?.isPremium
        ? "border-gray-300 dark:border-gray-700 focus:ring-gray-500" // Normal styling for premium
        : "border-gray-300 dark:border-gray-700 opacity-50 cursor-not-allowed focus:ring-0" // Greyed out for non-premium
    }`}
  disabled={!loggedUser?.isPremium}
  title={
    !loggedUser?.isPremium
      ? "Upgrade to Premium to create Premium lessons"
      : ""
  }
>
  <option>Free</option>
  <option>Premium</option>
</select>

        </div>

        <button
          type="submit"
          className="mt-4 cursor-pointer bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium py-3 rounded-lg hover:opacity-90 transition"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Lesson"}
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
