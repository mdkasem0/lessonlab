import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiHeart, FiBookmark, FiFlag, FiShare2, FiX } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../../Context/useAuth";
import LoaderSpainer from "../Loader/LoaderSpainer";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";

import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const reportReasons = [
  "Inappropriate Content",
  "Hate Speech or Harassment",
  "Misleading or False Information",
  "Spam or Promotional Content",
  "Sensitive or Disturbing Content",
  "Other",
];

const InteractionButtons = ({ lesson, setLesson }) => {
  const [reportModal, setReportModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const { loading, user } = useAuth();
  const [shareModal, setShareModal] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
      toast.success("Liked Successfully")
      setLesson((prev) => ({
        ...prev,
        isLiked: res.data.lesson.isLiked,
        likesCount: res.data.lesson.likesCount,
      }));
    } catch (err) {
      console.error(err);
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
      toast.success("Lesson added to Favourites")

      setLesson((prev) => ({
        ...prev,
        isSaved: res.data.lesson.isSaved,
        saveCount: res.data.lesson.saveCount,
      }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update save");
    }
  };

  // ----------------- REPORT -----------------
  const submitReport = async () => {
    if (!selectedReason) return toast.error("Please select a reason");
    if (!user) return toast.info("Please log in to report");

    try {
      const token = await user.getIdToken();
      await axios.post(
        `${import.meta.env.VITE_ApiCall}/report/${lesson._id}`,
        { reason: selectedReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Report submitted successfully");
      setReportModal(false);
      setSelectedReason("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit report");
    }
  };


  const Btn = ({ active, onClick, icon, text, activeColor }) => (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg font-medium transition 
        ${
          active
            ? `${activeColor} text-white`
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
        }`}
    >
      {icon} {text}
    </motion.button>
  );

  if (loading) return <LoaderSpainer />;

  return (
    <>
      <div className="flex flex-wrap gap-4 mt-4">
        <Btn
          active={isLiked}
          activeColor="bg-red-500"
          onClick={handleLike}
          text={
            isLiked
              ? `Unlike`
              : `Like`
          }
          icon={<FiHeart />}
        />
        <Btn
          active={isSaved}
          activeColor="bg-yellow-500"
          onClick={handleSave}
          text={
            isSaved
              ? `Unsave `
              : `Save `
          }
          icon={<FiBookmark />}
        />
        <Btn
          onClick={() => setReportModal(true)}
          text="Report"
          icon={<FiFlag />}
        />
        <Btn
          activeColor="bg-blue-500"
          onClick={() => setShareModal(true)}
          text="Share"
          icon={<FiShare2 />}
        />
      </div>

      {/* Report Modal */}
      {reportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-md shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold dark:text-white">
                Report Lesson
              </h2>
              <button onClick={() => setReportModal(false)}>
                <FiX className="text-xl" />
              </button>
            </div>

            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Select Reason:
            </label>
            <select
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            >
              <option value="">-- Choose --</option>
              {reportReasons.map((reason, idx) => (
                <option key={idx} value={reason}>
                  {reason}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setReportModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={submitReport}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Submit Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {shareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[90%] max-w-md shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold dark:text-white">
                Share This Lesson
              </h2>
              <button onClick={() => setShareModal(false)}>
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="flex justify-around mt-4">
              <FacebookShareButton
                url={window.location.href}
                quote={lesson.title}
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={window.location.href}
                title={lesson.title}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>

              <WhatsappShareButton
                url={window.location.href}
                title={lesson.title}
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>

              <LinkedinShareButton url={window.location.href}>
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default InteractionButtons;
