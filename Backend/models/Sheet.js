import mongoose from "mongoose";

const { Schema } = mongoose;

const Problem = new Schema({
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
});

const Sheet = new Schema({
  name: {
    type: String,
    required: true,
  },
  sheet: {
    type: [Problem],
  },
});
const sheetsSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sheets: {
    type: [Sheet],
    required: true,
  },
});
export default mongoose.model("Sheets", sheetsSchema);
