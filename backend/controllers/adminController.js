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
