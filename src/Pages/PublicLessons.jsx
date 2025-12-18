import React, { useState, useEffect } from "react";
import LessonCard from "../Components/LessonCard";
import LoaderSpainer from "../Components/Loader/LoaderSpainer";
import { toast } from "react-toastify";
import Wraper from "../Components/Wraper";
import axios from "axios";

const PublicLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sort, setSort] = useState("");

  const [fetching, setFetching] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  // --- Debounce search ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset page when search changes
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setFetching(true);

        const url = new URL(`${import.meta.env.VITE_ApiCall}/publicLesson`);
        url.searchParams.append("page", page);
        url.searchParams.append("pageSize", pageSize);
        if (debouncedSearch) url.searchParams.append("search", debouncedSearch);
        if (category) url.searchParams.append("category", category);
        if (tone) url.searchParams.append("tone", tone);
        if (sort) url.searchParams.append("sort", sort);

        const { data } = await axios.get(url);
        console.log("API response:", data);

        setLessons(data.lessons || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load lessons");
      } finally {
        setFetching(false);
      }
    };

    fetchLessons();
  }, [debouncedSearch, category, tone, sort, page]);

  if (fetching) return <LoaderSpainer />;

  return (
    <div className="container mx-auto px-4 py-12">
      <Wraper>
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 dark:text-white">
            Browse Public Life Lessons
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore lessons shared publicly by our community. Filter, sort, and
            search to discover wisdom.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or keyword"
            className="input w-full md:w-1/3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
          />

          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            className="select w-full md:w-1/4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Mindset">Mindset</option>
            <option value="Career">Career</option>
            <option value="Life Skills">Life Skills</option>
          </select>

          <select
            value={tone}
            onChange={(e) => {
              setPage(1);
              setTone(e.target.value);
            }}
            className="select w-full md:w-1/4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="">All Emotional Tones</option>
            <option value="Motivational">Motivational</option>
            <option value="Inspirational">Inspirational</option>
            <option value="Reflective">Reflective</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
            className="select w-full md:w-1/4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="">Sort by</option>
            <option value="newest">Newest</option>
            <option value="mostSaved">Most Saved</option>
          </select>
        </div>

        {/* Lessons Grid */}
        {lessons.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No public lessons found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 transition"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition ${
                  page === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 transition"
            >
              Next
            </button>
          </div>
        )}
      </Wraper>
    </div>
  );
};

export default PublicLessons;
