import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  day: {
    type: String,
    default: () => new Date().toLocaleDateString("en-US", { weekday: "short" }),
  },
  sumWPM: { type: Number, required: true },
  sumAcc: { type: Number, required: true },
  count: { type: Number, default: 1 },
});

export default mongoose.model("TestData", testSchema);
