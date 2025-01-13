import mongoose from "mongoose";

const PhrasalVerbSchema = mongoose.Schema(
  {
    verb: {
      type: String,
      required: true,
    },
    example: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PhrasalVerb = mongoose.model("PhrasalVerb", PhrasalVerbSchema);

export default PhrasalVerb;
