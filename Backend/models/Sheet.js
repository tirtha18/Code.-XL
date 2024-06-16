import mongoose from "mongoose";

const { Schema } = mongoose;

const ProblemSchema = new Schema({
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

const SheetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sheet: {
    type: [ProblemSchema],
  },
});

const SheetsSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sheets: {
    type: [SheetSchema],
    required: true,
  },
});

const Problem = mongoose.model("Problem", ProblemSchema);
const Sheet = mongoose.model("Sheet", SheetSchema);
const Sheets = mongoose.model("Sheets", SheetsSchema);

export default Sheets;
export { Problem, Sheet };
