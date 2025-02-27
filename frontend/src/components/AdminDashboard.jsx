import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching phrasal verbs:", error);
      }
    };

    getAllUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    console.log(id);
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div className="bg-slate-200 rounded p-4" key={user._id}>
            <h1>Name: {user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Created at: {user.createdAt.slice(0, 10)}</p>
            <p className="mb-2">isAdmin: {user.isAdmin.toString()}</p>
            <div className="flex items-center gap-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 duration-300 rounded px-4 py-1 text-white"
                onClick={() => navigate(`/admin-dashboard/${user._id}`)}
              >
                See User Page
              </button>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="bg-red-500 hover:bg-red-600 duration-300 rounded px-4 py-1 text-white"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
