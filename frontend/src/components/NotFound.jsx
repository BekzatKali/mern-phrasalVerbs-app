import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center py-12">
      <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
      <p>
        The page you're looking for doesn't exist. Please check the URL or go
        back to the homepage.
      </p>
    </div>
  );
};

export default NotFound;
