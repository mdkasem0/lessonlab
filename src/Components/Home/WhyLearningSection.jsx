import React from "react";
import { FaLightbulb, FaUsers, FaBrain, FaHeart } from "react-icons/fa";

const benefits = [
  {
    icon: <FaLightbulb className="text-yellow-500 w-8 h-8" />,
    title: "Gain Insights",
    description:
      "Learn from experiences and wisdom of others to make informed decisions in your personal and professional life.",
  },
  {
    icon: <FaUsers className="text-blue-500 w-8 h-8" />,
    title: "Connect With Community",
    description:
      "Explore lessons shared by people worldwide and join a community dedicated to growth and reflection.",
  },
  {
    icon: <FaBrain className="text-purple-500 w-8 h-8" />,
    title: "Enhance Mindfulness",
    description:
      "Reflect on life lessons to stay mindful, avoid repeating mistakes, and focus on what truly matters.",
  },
  {
    icon: <FaHeart className="text-red-500 w-8 h-8" />,
    title: "Personal Growth",
    description:
      "Implement learned lessons in your life to foster emotional intelligence, resilience, and overall well-being.",
  },
];

const WhyLearningSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 dark:text-white">
          Why Learning From Life Matters
        </h2>

        {/* Section Subheading */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          Learning from life’s experiences helps you grow, reflect, and gain
          wisdom. Explore key lessons shared by our community to understand,
          apply, and thrive in your own journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLearningSection;
