import React from "react";
import LessonCard from "../LessonCard";

// Fake lessons array (used as filler)
const fakeLessons = [
  {
    title: "Growth Begins With Self‑Awareness",
    description:
      "A powerful reminder that understanding yourself is the first step toward intentional living.",
    category: "Personal Growth",
    emotionalTone: "Motivational",
    accessLevel: "premium",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    creator: { name: "Ariana Gomez", photoURL: "https://i.pravatar.cc/150?img=47" },
  },
  {
    title: "The Art of Mindful Living",
    description:
      "Learn how mindfulness can transform daily routines into purposeful experiences.",
    category: "Mindset",
    emotionalTone: "Reflective",
    accessLevel: "free",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    creator: { name: "John Doe", photoURL: "https://i.pravatar.cc/150?img=32" },
  },
  {
    title: "Embracing Failure",
    description:
      "Discover why embracing failures leads to growth, resilience, and personal development.",
    category: "Career",
    emotionalTone: "Motivational",
    accessLevel: "premium",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    creator: { name: "Sophia Lee", photoURL: "https://i.pravatar.cc/150?img=12" },
  },
  {
    title: "Gratitude in Daily Life",
    description:
      "Learn to cultivate gratitude and notice the little things that make life beautiful.",
    category: "Personal Growth",
    emotionalTone: "Inspirational",
    accessLevel: "free",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    creator: { name: "Michael Brown", photoURL: "https://i.pravatar.cc/150?img=52" },
  },
];

const LessonGrid = ({ lessons = [], isPremiumUser = false }) => {
  // Ensure exactly 4 lessons
  let displayLessons = [...lessons];
  if (displayLessons.length < 4) {
    const needed = 4 - displayLessons.length;
    displayLessons.push(...fakeLessons.slice(0, needed));
  } else if (displayLessons.length > 4) {
    displayLessons = displayLessons.slice(0, 4);
  }

  return (
    <div className="mt-10 container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-4 dark:text-white">Featured Life Lessons</h2>

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
        Explore the most inspiring and meaningful lessons shared by our community. Managed dynamically
        from the admin dashboard, you can discover, learn, and grow with every story.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayLessons.map((lesson, index) => (
          <LessonCard
            key={index}
            lesson={lesson}
            isPremiumUser={isPremiumUser}
            isLiked={false}
            isSaved={false}
            onLike={() => console.log("Liked", lesson.title)}
            onSave={() => console.log("Saved", lesson.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonGrid;
