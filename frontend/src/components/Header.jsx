import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth(); // Access user info and logout function from AuthContext
  const location = useLocation();
  console.log(location.pathname);

  return (
    <header className="bg-slate-100 shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold italic">PhrasalVerbsApp</h1>
        </Link>
        <ul className="flex justify-between items-center gap-4">
          {user ? (
            user.isAdmin && location.pathname == "/" ? (
              // If the user is an admin
              <>
                <li>
                  <Link to="/admin-dashboard">See All Users</Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              // If the user is not an admin
              <>
                {location.pathname !== "/dashboard" && (
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Log Out
                  </button>
                </li>
              </>
            )
          ) : (
            // If no user is logged in
            <>
              <li>
                <Link to="/login">Sign In</Link>
              </li>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
