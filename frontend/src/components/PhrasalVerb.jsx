// import React from 'react'

// const PhrasalVerb = () => {
//     const [phrasalVerb, setPhrasalVerb] = useState({
//       verb: "",
//       example: "",
//     });
//     const [phrasalVerbs, setPhrasalVerbs] = useState([]);
//     const [editVerbId, setEditVerbId] = useState(null);
//     const [editFormData, setEditFormData] = useState({ verb: "", example: "" });

//     const getPhrasalVerbs = async () => {
//       try {
//         const res = await axios.get("/api/phrasal-verbs");
//         setPhrasalVerbs(res.data.data);
//         console.log("these are phrasal verbs:", res.data.data);
//       } catch (error) {
//         console.error("Error fetching todos:", error.message);
//       }
//     };

//     const createPhrasalVerb = async (e) => {
//       e.preventDefault();
//       try {
//         const res = await axios.post("/api/phrasal-verbs", phrasalVerb);
//         setPhrasalVerb({ verb: "", example: "" });
//         getPhrasalVerbs();
//         console.log("created phrasal verb:", res.data);
//       } catch (error) {
//         console.error("Error creating a phrasal verb:", error.message);
//       }
//     };

//     const deletePhrasalVerb = async (id) => {
//       try {
//         await axios.delete(`/api/phrasal-verbs/${id}`);
//         console.log(`Phrasal verb with id ${id} deleted`);
//         getPhrasalVerbs();
//       } catch (error) {
//         console.error("Error deleting phrasal verb:", error.message);
//       }
//     };
//     const handleEditClick = (id, currentVerb) => {
//       setEditVerbId(id);
//       setEditFormData({ verb: currentVerb.verb, example: currentVerb.example });
//     };

//     const handleEditChange = (e) => {
//       const { name, value } = e.target;
//       setEditFormData({ ...editFormData, [name]: value });
//     };

//     const handleEditSubmit = async (e) => {
//       e.preventDefault();
//       await updatePhrasalVerb(editVerbId, editFormData);
//       setEditVerbId(null); // Exit edit mode
//     };
//     const updatePhrasalVerb = async (id, updatedData) => {
//       try {
//         const res = await axios.put(`/api/phrasal-verbs/${id}`, updatedData);
//         console.log("Updated phrasal verb:", res.data.data);
//         getPhrasalVerbs();
//       } catch (error) {
//         console.error("Error updating phrasal verb:", error.message);
//       }
//     };

//     useEffect(() => {
//       getPhrasalVerbs();
//     }, []);

//   return (
//     <div>
//       <div>
//         <h2>Create a phrasal sdsdsdverb</h2>
//         <form action="">
//           <label htmlFor="phrasalVerb">Phrasal Verb</label>
//           <input
//             id="phrasalVerb"
//             placeholder="Phrasal Verb"
//             type="text"
//             value={phrasalVerb.verb}
//             onChange={(e) =>
//               setPhrasalVerb({ ...phrasalVerb, verb: e.target.value })
//             }
//           />
//           <label htmlFor="example">Example</label>
//           <input
//             id="example"
//             placeholder="Example"
//             type="text"
//             value={phrasalVerb.example}
//             onChange={(e) =>
//               setPhrasalVerb({ ...phrasalVerb, example: e.target.value })
//             }
//           />
//           <button onClick={createPhrasalVerb}>Create</button>
//         </form>

//         <button onClick={getPhrasalVerbs}>fetch all phrasal verbs</button>
//         <div>
//           <div>
//             {phrasalVerbs.length > 0 ? (
//               <ul>
//                 {phrasalVerbs.map((verb) =>
//                   editVerbId === verb._id ? (
//                     <form key={verb._id} onSubmit={handleEditSubmit}>
//                       <input
//                         type="text"
//                         name="verb"
//                         value={editFormData.verb}
//                         onChange={handleEditChange}
//                       />
//                       <input
//                         type="text"
//                         name="example"
//                         value={editFormData.example}
//                         onChange={handleEditChange}
//                       />
//                       <button type="submit">Save</button>
//                       <button onClick={() => setEditVerbId(null)}>
//                         Cancel
//                       </button>
//                     </form>
//                   ) : (
//                     <li key={verb._id}>
//                       <strong>{verb.verb}:</strong> {verb.example}
//                       <button onClick={() => handleEditClick(verb._id, verb)}>
//                         Edit
//                       </button>
//                       <button onClick={() => deletePhrasalVerb(verb._id)}>
//                         Delete
//                       </button>
//                     </li>
//                   )
//                 )}
//               </ul>
//             ) : (
//               <p>No phrasal verbs available. Please add some!</p>
//             )}
//           </div>

//           <p>No phrasal verbs</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PhrasalVerb
