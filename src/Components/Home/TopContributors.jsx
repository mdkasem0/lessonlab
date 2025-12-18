import React from "react";

// Fake contributors data
const fakeContributors = [
  {
    author_name: "Ariana Gomez",
    author_photo: "https://i.pravatar.cc/150?img=47",
    count: 12,
  },
  {
    author_name: "John Doe",
    author_photo: "https://i.pravatar.cc/150?img=32",
    count: 9,
  },
  {
    author_name: "Sophia Lee",
    author_photo: "https://i.pravatar.cc/150?img=12",
    count: 7,
  },
  {
    author_name: "Michael Brown",
    author_photo: "https://i.pravatar.cc/150?img=52",
    count: 6,
  },
];

const TopContributors = ({ contributors = [] }) => {
  let displayContributors = [...contributors];

  // Ensure exactly 4 contributors
  if (displayContributors.length < 4) {
    const needed = 4 - displayContributors.length;
    displayContributors.push(...fakeContributors.slice(0, needed));
  } else if (displayContributors.length > 4) {
    displayContributors = displayContributors.slice(0, 4);
  }

  return (
    <section>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
          Top Contributors of the Week
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Recognizing the most active members who are sharing meaningful lessons and inspiring growth in our community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {displayContributors.map((user, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={user?.author_photo}
                alt={user.author_name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold mb-1 dark:text-white">{user.author_name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {user.count} Lessons Created
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContributors;
