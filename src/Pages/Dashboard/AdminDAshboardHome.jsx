import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../Context/useAuth";
import LoaderSpainer from "../../Components/Loader/LoaderSpainer";

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        const token = await user.getIdToken();
        const { data } = await axios.get(
          `${import.meta.env.VITE_ApiCall}/admin/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          // Ensure all chart data has proper labels
          data.data.lessonGrowth.forEach((item) => {
            item.date = item._id;
          });
          data.data.userGrowth.forEach((item) => {
            item.date = item._id;
          });

          setDashboardData(data.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading || !dashboardData) return <LoaderSpainer />;

  const {
    totalUsers,
    totalPublicLessons,
    totalReportedLessons,
    mostActiveContributors,
    todaysNewLessons,
    lessonGrowth,
    userGrowth,
  } = dashboardData;

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: totalUsers },
          { title: "Public Lessons", value: totalPublicLessons },
          { title: "Reported Lessons", value: totalReportedLessons },
          { title: "Today's New Lessons", value: todaysNewLessons },
        ].map((metric) => (
          <div
            key={metric.title}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-lg font-medium">{metric.title}</h2>
            <p className="text-3xl font-bold text-[#FBD536]">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Most Active Contributors */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-3">Most Active Contributors</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {mostActiveContributors.map((user) => (
            <li
              key={user.email}
              className="py-2 flex justify-between items-center text-sm sm:text-base"
            >
              <span>{user.name}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {user.lessonCount} lessons
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-3">Lesson Growth (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lessonGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#88888833" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: 6 }}
                labelStyle={{ color: "#FBD536" }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#FBD536"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-3">User Growth (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#88888833" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", borderRadius: 6 }}
                labelStyle={{ color: "#FBD536" }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#FBD536"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
