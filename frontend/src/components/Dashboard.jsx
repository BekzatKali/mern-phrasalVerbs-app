import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PhrasalVerbForm from "./PhrasalVerbForm";

const Dashboard = () => {
  const { user } = useAuth();
  const [phrasalVerbs, setPhrasalVerbs] = useState([]);
  const [editingVerb, setEditingVerb] = useState(null);

  useEffect(() => {
    const fetchPhrasalVerbs = async () => {
      try {
        const response = await fetch("/api/phrasal-verbs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setPhrasalVerbs(data);
      } catch (error) {
        console.error("Error fetching phrasal verbs:", error);
      }
    };

    fetchPhrasalVerbs();
  }, []);

  const handleCreate = async (verbData) => {
    try {
      const response = await fetch("/api/phrasal-verbs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(verbData),
      });
      const data = await response.json();
      setPhrasalVerbs([...phrasalVerbs, data.data]);
    } catch (error) {
      console.error("Error creating phrasal verb:", error);
    }
  };

  const handleUpdate = async (verbData) => {
    try {
      const response = await fetch(`/api/phrasal-verbs/${editingVerb._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(verbData),
      });
      const data = await response.json();
      setPhrasalVerbs(
        phrasalVerbs.map((verb) =>
          verb._id === data.data._id ? data.data : verb
        )
      );
      setEditingVerb(null);
    } catch (error) {
      console.error("Error updating phrasal verb:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/phrasal-verbs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPhrasalVerbs(phrasalVerbs.filter((verb) => verb._id !== id));
    } catch (error) {
      console.error("Error deleting phrasal verb:", error);
    }
  };

  return (
    <section className="py-6">
      <div className="container mx-auto p-4 flex justify-center items-center flex-col">
        <h1 className="text-xl mb-8">
          Welcome,{" "}
          {user?.name?.slice(0, 1).toUpperCase() + user?.name?.slice(1)}!
        </h1>
        <div className="max-w-[50%] w-full">
          <PhrasalVerbForm onSubmit={handleCreate} />
        </div>
        {phrasalVerbs.length === 0 ? (
          <p className="text-xl mb-6">
            You haven't created a phrasal verb yet, so create one!
          </p>
        ) : (
          <p className="text-xl mb-6">Here are your phrasal verbs</p>
        )}

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-[90%]">
          {phrasalVerbs.length > 0 &&
            phrasalVerbs.map((verb) => (
              <li className="flex flex-col h-full" key={verb._id}>
                {editingVerb?._id === verb._id ? (
                  <div className="flex flex-col h-full">
                    <PhrasalVerbForm
                      onSubmit={handleUpdate}
                      initialData={verb}
                    />
                    <button
                      onClick={() => setEditingVerb(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-white rounded px-6 py-2 duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 bg-slate-200 p-4 rounded h-full">
                    <h2 className="text-xl font-bold">{verb.verb}</h2>
                    <p className="text-xl mb-4 flex-grow">{verb.example}</p>
                    <div className="flex items-center gap-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded px-6 py-2 duration-200"
                        onClick={() => setEditingVerb(verb)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white rounded px-6 py-2 duration-200"
                        onClick={() => handleDelete(verb._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Dashboard;
