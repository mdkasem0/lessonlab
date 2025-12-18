import React, { useEffect, useState } from "react";
import {
  FaLock,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../Context/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { UserUtils } from "../Utils/UserUtils";
import LoaderSpainer from "./Loader/LoaderSpainer";

const LessonCard = ({ lesson }) => {
  const {
    title,
    description,
    category,
    emotionalTone,
    creator,
    accessLevel,
    image,
  } = lesson;
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { loading, user } = useAuth();
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

  const userEmail = user?.email;

  // LIKE STATUS
  useEffect(() => {
    if (!lesson || !userEmail) return;
    setIsLiked(lesson.isLiked?.includes(userEmail));
  }, [lesson, userEmail]);

  // SAVE STATUS
  useEffect(() => {
    if (!lesson || !userEmail) return;
    setIsSaved(lesson.isSaved?.includes(userEmail));
  }, [lesson, userEmail]);

  // ----------------- LIKE -----------------
  const handleLike = async () => {
    if (!user) return toast.info("Please log in to like");

    try {
      const token = await user.getIdToken();
      const res = await axios.put(
        `${import.meta.env.VITE_ApiCall}/like/${lesson._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Liked Successfully");
    } catch (err) {
      toast.error("Failed to update like");
    }
  };

  // ----------------- SAVE -----------------
  const handleSave = async () => {
    if (!user) return toast.info("Please log in to save");

    try {
      const token = await user.getIdToken();
      const res = await axios.put(
        `${import.meta.env.VITE_ApiCall}/save/${lesson._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Lesson added to Favourites");
    } catch (err) {
      toast.error("Failed to update save");
    }
  };
  const showLocked =
    accessLevel?.toLowerCase() === "premium" && !loggedUser?.isPremium;


  const handleViewDetails = () => {
    if (showLocked) {
      navigate("/payment-to-upgrade"); // route for upgrade
    } else {
      navigate(`/lisson/${lesson._id}`); // route for normal view
    }
  };
  if (loading) {
    return <LoaderSpainer />;
  }

  return (
    <div className="card bg-base-100 shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-800 dark:text-gray-100">
      {/* IMAGE */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        {showLocked && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <FaLock className="text-white text-3xl" />
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="p-4 flex flex-col justify-between h-full">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h2>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {category} • {emotionalTone}
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {description}
        </p>

        {/* Creator + Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={creator?.photoURL}
              alt={creator?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{creator?.name}</span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <button
              // onClick={handleLike}
              className="hover:text-red-500 transition"
              aria-label="like"
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button
              // onClick={handleSave}
              className="hover:text-yellow-500 transition"
              aria-label="save"
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <button
            onClick={handleViewDetails}
            className={`w-full font-semibold py-2 px-4 rounded transition cursor-pointer uppercase ${
              showLocked
                ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {showLocked ? "Upgrade to View" : "View Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
