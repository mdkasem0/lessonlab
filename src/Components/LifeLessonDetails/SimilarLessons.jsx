import React, { useEffect, useState } from "react";
import axios from "axios";
import LessonCard from "../LessonCard";
import LoaderSpainer from "../Loader/LoaderSpainer";

const SimilarLessons = ({ currentLesson }) => {
  const [similarLessons, setSimilarLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentLesson) return;

    const fetchSimilarLessons = async () => {
      try {
        setLoading(true);
        // Fetch lessons with same category or emotionalTone, exclude current lesson
        const res = await axios.get(
          `${import.meta.env.VITE_ApiCall}/lessons/similar/${currentLesson._id}`
        );
console.log(res)
        // Limit to 6 lessons
        setSimilarLessons(res.data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch similar lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarLessons();
  }, [currentLesson]);

  if (loading) return <LoaderSpainer />;

  if (!similarLessons || similarLessons.length === 0)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        No similar lessons found.
      </p>
    );

  return (
    <div className="mt-20">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center dark:text-white">
        Similar Lessons
      </h2>

      {/* Subheading */}
      <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-center">
        Explore more lessons that match your interests, emotions, and personal growth journey.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {similarLessons.map((lesson) => (
          <div
            key={lesson._id}
            className="transform transition-all hover:-translate-y-2 hover:shadow-xl duration-300"
          >
            <LessonCard lesson={lesson} isLiked={false} isSaved={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarLessons;
