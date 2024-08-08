import mongoose from "mongoose";

const { Schema } = mongoose;

const ProblemSchema = new Schema({
  sheet_id: {
    type: Schema.Types.ObjectId,
    ref: "Sheet",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "DONE"],
    default: "PENDING",
  },
  notes: {
    type: String,
    default: ""
  },
  videoLink: {
    type: String,
  },
});

const Problem = mongoose.model("Problem", ProblemSchema);

export default Problem;
