import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/useAuth";
import LoaderSpainer from "../Loader/LoaderSpainer";

const CommentSection = ({ lessonId }) => {
  const { loading, user } = useAuth();

  const [comments, setComments] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [commentText, setCommentText] = useState("");

  const commentEndRef = useRef();

  // Auto-scroll to latest comment
  useEffect(() => {
    commentEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_ApiCall}/comments/${lessonId}`);

        // Make sure it's an array
        setComments(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load comments");
      } finally {
        setFetching(false);
      }
    };

    fetchComments();
  }, [lessonId]);

 const handlePostComment = async () => {
  if (!user) return toast.info("Please log in to comment");
  if (!commentText.trim()) return;

  try {
    const token = await user.getIdToken();
    const res = await axios.post(
      `${import.meta.env.VITE_ApiCall}/comments/${lessonId}`,
      { text: commentText }, 
      { headers: { Authorization: `Bearer ${token}` } } 
    );

    // Append new comment safely
    setComments((prev) => [...prev, res.data]);
    setCommentText("");
    toast.success("Comment posted!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to post comment");
  }
};

  if (loading || fetching) {
    return <LoaderSpainer />;
  }

  return (
    <div className="mt-10 bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-5">
      {/* Title */}
      <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
        Comments ({comments.length})
      </h3>

      {/* Comments List */}
      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {/* If no comments */}
        {comments.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-5">
            No comments yet. Be the first to comment!
          </p>
        )}

        {/* Render comments */}
        {Array.isArray(comments) &&
          comments.length > 0 &&
          comments?.map((c) => (
            <div
              key={c._id}
              className="flex gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {c.userName?.charAt(0)}
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium dark:text-gray-100">
                    {c.userName}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {c.time || "Just now"}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{c.text}</p>
              </div>
            </div>
          ))}

        <div ref={commentEndRef}></div>
      </div>

      {/* Comment Input */}
      {user ? (
        <div className="flex gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handlePostComment}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Post
          </button>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          Please log in to post a comment.
        </p>
      )}
    </div>
  );
};

export default CommentSection;
