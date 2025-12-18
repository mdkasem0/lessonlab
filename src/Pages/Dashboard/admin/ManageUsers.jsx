import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiAlertTriangle, FiTrash2, FiUserCheck } from "react-icons/fi";
import { useAuth } from "../../../Context/useAuth";
import LoaderSpainer from "../../../Components/Loader/LoaderSpainer";
import { toast } from "react-toastify";
import UserActionModal from "../../../Components/modals/UserActionModal";



const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState({ open: false, action: "", user: null });

  console.log(users)
  const fetchUsers = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const token = await user.getIdToken();
      const { data } = await axios.get(`${import.meta.env.VITE_ApiCall}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setUsers(data.users);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const handleUpdateRole = async (userId) => {
    try {
      const token = await user.getIdToken();
      await axios.put(
        `${import.meta.env.VITE_ApiCall}/admin/users/${userId}/role`,
        { role: "admin" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Role updated successfully");
      setModal({ open: false, action: "", user: null });
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = await user.getIdToken();
      await axios.delete(`${import.meta.env.VITE_ApiCall}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully");
      setModal({ open: false, action: "", user: null });
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  if (loading) return <LoaderSpainer />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Manage Users</h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Total Lessons</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{u.name}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{u.email}</td>
                <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{u.role}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{u.totalLessons}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  {u.role === "user" && (
                    <button
                      onClick={() => setModal({ open: true, action: "role", user: u })}
                      className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
                      title="Promote to Admin"
                    >
                      <FiUserCheck />
                    </button>
                  )}
                  <button
                    onClick={() => setModal({ open: true, action: "delete", user: u })}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    title="Delete User"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Modal */}
      {modal.open && modal.action && (
        <UserActionModal
          user={modal.user}
          action={modal.action}
          onClose={() => setModal({ open: false, action: "", user: null })}
          onConfirm={modal.action === "delete" ? handleDeleteUser : handleUpdateRole}
        />
      )}
    </div>
  );
};

export default ManageUsers;
