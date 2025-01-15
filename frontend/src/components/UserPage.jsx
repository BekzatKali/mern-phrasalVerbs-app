import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const [userPhrasalVerbs, setUserPhrasalVerbs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getUsersPhrasalVerbs = async () => {
      try {
        const response = await fetch(`/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserPhrasalVerbs(data);
        console.log(data);
      } catch (error) {
        console.log("Error in getting user's verbs", error);
      }
    };

    getUsersPhrasalVerbs();
  }, []);
  return (
    <div className="container p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userPhrasalVerbs.length === 0 && <p>This user has no phrasal verbs</p>}

        {userPhrasalVerbs.map((item) => (
          <div
            className="flex flex-col gap-3 bg-slate-200 p-4 rounded-2xl"
            key={item._id}
          >
            <h2 className="font-bold">{item.verb}</h2>
            <p>{item.example}</p>
            <p>Created at {item.createdAt.slice(0, 10)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
