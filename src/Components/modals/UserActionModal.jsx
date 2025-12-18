import { FiAlertTriangle } from "react-icons/fi";

const UserActionModal = ({ user, action, onClose, onConfirm }) => {
  if (!user) return null;

  const isDelete = action === "delete";
  const isRoleUpdate = action === "role";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-md p-6">
        <div className={`flex items-center gap-3 mb-4 ${isDelete ? "text-red-500" : "text-yellow-400"}`}>
          <FiAlertTriangle size={24} />
          <h3 className="text-lg font-semibold">
            {isDelete ? "Delete User" : "Update User Role"}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {isDelete
            ? `Are you sure you want to delete "${user.name}"? This action cannot be undone.`
            : `Are you sure you want to promote "${user.name}" to Admin?`}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(user._id)}
            className={`px-4 py-2 rounded text-white ${isDelete ? "bg-red-500 hover:bg-red-600" : "bg-yellow-400 hover:bg-yellow-500"}`}
          >
            {isDelete ? "Delete" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};


export default UserActionModal