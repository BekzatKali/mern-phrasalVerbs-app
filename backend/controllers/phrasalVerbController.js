import PhrasalVerb from "../models/phrasalverbModel.js";
import mongoose from "mongoose";

export const getPhrasalVerbs = async (req, res, next) => {
  try {
    const phrasalVerbs = await PhrasalVerb.find({ user: req.user.id });
    res.status(200).json(phrasalVerbs);
  } catch (error) {
    console.log("Error in fetching phrasal verbs:", error.message);
    next(error);
  }
};

export const createPhrasalVerb = async (req, res, next) => {
  const { verb, example } = req.body;

  if (!verb || !example) {
    res.status(400);
    return next(new Error("Please provide all fields")); // Pass the error to the error handler
  }

  try {
    const phrasalVerb = await PhrasalVerb.create({
      verb,
      example,
      user: req.user.id,
    });

    res.status(201).json({ success: true, data: phrasalVerb });
  } catch (error) {
    console.log("Error in Create Phrasal Verb:", error.message);
    next(error); // Pass the error to the error handler
  }
};

export const updatePhrasalVerb = async (req, res, next) => {
  const { id } = req.params;
  const phrasalVerb = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404);
    return next(new Error("Invalid Phrasal Verb Id"));
  }

  try {
    const existingPhrasalVerb = await PhrasalVerb.findById(id);
    if (!existingPhrasalVerb) {
      res.status(404);
      return next(new Error("Phrasal verb not found"));
    }

    const updatedPhrasalVerb = await PhrasalVerb.findByIdAndUpdate(
      id,
      phrasalVerb,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedPhrasalVerb });
  } catch (error) {
    console.error("Error in updating phrasal verb:", error.message);
    next(error);
  }
};

export const deletePhrasalVerb = async (req, res, next) => {
  try {
    const phrasalVerb = await PhrasalVerb.findById(req.params.id);
    if (!phrasalVerb) {
      res.status(400);
      return next(new Error("Phrasal Verb not found"));
    }

    if (phrasalVerb.user.toString() !== req.user.id) {
      res.status(401);
      return next(new Error("User not authorized"));
    }

    await PhrasalVerb.deleteOne({ _id: req.params.id });
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.log("Error in Deleting product:", error.message);
    next(error);
  }
};

// correct update but only first second not needed

// export const updatePhrasalVerb = async (req, res, next) => {
//   const { id } = req.params;
//   const phrasalVerb = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(404);
//     return next(new Error("Invalid Phrasal Verb Id"));
//   }

//   // const user = await User.findById(req.user.id);
//   // // Check for user
//   // if (!user) {
//   //   res.status(401);
//   //   return next(new Error("User not found"));
//   // }

//   try {
//     const existingPhrasalVerb = await PhrasalVerb.findById(id);
//     if (!existingPhrasalVerb) {
//       res.status(404);
//       return next(new Error("Phrasal verb not found"));
//     }

//     // if (existingPhrasalVerb.user.toString() !== user.id) {
//     //   res.status(401);
//     //   return next(new Error("User not authorized"));
//     // }

//     // Update the phrasal verb
//     const updatedPhrasalVerb = await PhrasalVerb.findByIdAndUpdate(
//       id,
//       phrasalVerb,
//       { new: true }
//     );
//     res.status(200).json({ success: true, data: updatedPhrasalVerb });
//   } catch (error) {
//     console.error("Error in updating phrasal verb:", error.message);
//     next(error);
//   }
// };

// export const updatePhrasalVerb = async (req, res, next) => {
//   const { id } = req.params;
//   const phrasalVerb = req.body;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(404);
//     return next(new Error("Invalid Phrasal Verb Id"));
//   }

//   const user = await User.findById(req.user.id);
//   // check for user
//   if (!user) {
//     res.status(401);
//     return next(new Error("User not found"));
//   }
//   // make sure the logged in user matches the goal user
//   if (phrasalVerb.user.toString() !== user.id) {
//     res.status(401);
//     return next(new Error("User not authorized"));
//   }

//   try {
//     const updatedPhrasalVerb = await PhrasalVerb.findByIdAndUpdate(
//       id,
//       phrasalVerb,
//       { new: true }
//     );
//     res.status(200).json({ success: true, data: updatedPhrasalVerb });
//   } catch (error) {
//     console.log("Error in Deleting product:", error.message);
//     next(error);
//   }
// };

// correct delete at least was just to unccoment
// export const deletePhrasalVerb = async (req, res, next) => {
//   try {
//     const phrasalVerb = await PhrasalVerb.findById(req.params.id);
//     if (!phrasalVerb) {
//       res.status(400);
//       return next(new Error("Phrasal Verb not found"));
//     }

//     // const user = await User.findById(req.user.id);
//     // if (!user) {
//     //   res.status(401);
//     //   return next(new Error("User not found"));
//     // }

//     if (phrasalVerb.user.toString() !== req.user.id) {
//       res.status(401);
//       return next(new Error("User not authorized"));
//     }

//     await PhrasalVerb.deleteOne({ _id: req.params.id });
//     res.status(200).json({ id: req.params.id });
//   } catch (error) {
//     console.log("Error in Deleting product:", error.message);
//     next(error);
//   }
// };
