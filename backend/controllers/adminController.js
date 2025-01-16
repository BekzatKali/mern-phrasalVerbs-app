import mongoose from "mongoose";
import PhrasalVerb from "../models/PhrasalVerbModel.js";
import User from "../models/UserModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in fetching users:", error.message);
    next(error);
  }
};

export const getPhrasalVerbsOfUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const phrasalVerbs = await PhrasalVerb.find({ user: id });
    res.status(200).json(phrasalVerbs);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User was deleted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
