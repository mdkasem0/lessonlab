import React from "react";
import LessonCard from "../LessonCard";

// Fake lessons for “Most Saved” (replace with API later)
const fakeMostSavedLessons = [
  {
    title: "Embracing Change",
    description:
      "Change is inevitable, and embracing it opens doors to growth, learning, and new opportunities.",
    category: "Personal Growth",
    emotionalTone: "Motivational",
    accessLevel: "premium",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    creator: { name: "Sophia Lee", photoURL: "https://i.pravatar.cc/150?img=12" },
  },
  {
    title: "The Power of Gratitude",
    description:
      "Gratitude shifts your focus from what’s lacking to what you have, fostering positivity and mindfulness.",
    category: "Mindset",
    emotionalTone: "Inspirational",
    accessLevel: "free",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    creator: { name: "Ariana Gomez", photoURL: "https://i.pravatar.cc/150?img=47" },
  },
  {
    title: "Learning from Mistakes",
    description:
      "Every failure carries a lesson. Reflect on mistakes to improve, grow, and avoid repeating them.",
    category: "Career",
    emotionalTone: "Reflective",
    accessLevel: "premium",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    creator: { name: "John Doe", photoURL: "https://i.pravatar.cc/150?img=32" },
  },
  {
    title: "Mindful Living",
    description:
      "Mindfulness helps you stay present, reduce stress, and find joy in the simple things every day.",
    category: "Personal Growth",
    emotionalTone: "Motivational",
    accessLevel: "free",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    creator: { name: "Michael Brown", photoURL: "https://i.pravatar.cc/150?img=52" },
  },
];

const MostSavedLessons = ({ lessons = fakeMostSavedLessons, isPremiumUser = false }) => {
  return (
    <section >
      <div className="container mx-auto px-4 py-16 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3 dark:text-white">
         Most Saved Lessons
        </h2>

        {/* Subheading */}
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Discover the lessons that our community finds most valuable. These insights are saved repeatedly because they inspire growth, reflection, and positive change.
        </p>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={index}
              lesson={lesson}
              isPremiumUser={isPremiumUser}
              isLiked={false}
              isSaved={true} // Always shown as saved

            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostSavedLessons;
