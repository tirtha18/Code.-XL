import mongoose from "mongoose";

import { Schema } from "mongoose";

const questionSchema = new Schema({
  problem: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});
const mockSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  total_q: {
    type: String,
    required: true,
  },
  attempted_q: {
    type: String,
    required: true,
  },
  correct_q: {
    type: String,
    required: true,
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
});

export default mongoose.model("MockResults", mockSchema);