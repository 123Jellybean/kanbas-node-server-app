import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    course: String,
    description: String,
    dueDate: Date,
    availableFrom: Date,
    untilDate: Date,
    points: Number,
  },
  { collection: "assignments2" }
);

export default schema;