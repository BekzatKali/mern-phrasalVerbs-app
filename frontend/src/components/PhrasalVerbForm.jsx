import React, { useState } from "react";

const PhrasalVerbForm = ({ onSubmit, initialData = {} }) => {
  const [verb, setVerb] = useState(initialData.verb || "");
  const [example, setExample] = useState(initialData.example || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    setExample("");
    setVerb("");
    onSubmit({ verb, example });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-6 w-full">
      <input
        className="bg-slate-200 px-6 py-2 rounded outline-none"
        type="text"
        value={verb}
        onChange={(e) => setVerb(e.target.value)}
        placeholder="Verb"
        required
      />
      <input
        className="bg-slate-200 px-6 py-2 rounded outline-none"
        type="text"
        value={example}
        onChange={(e) => setExample(e.target.value)}
        placeholder="Example"
        required
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded px-6 py-2 duration-200"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default PhrasalVerbForm;
