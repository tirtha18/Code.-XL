import mongoose from "mongoose";

const { Schema } = mongoose;

const SheetSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sheet = mongoose.model("Sheet", SheetSchema);

export default Sheet;
