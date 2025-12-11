import "dotenv/config";
import express from "express";
import cors from "cors";
import generatedContent from "./geminiServices.js";
import connectDB from "./db.js";
import TestData from "./db_models/TestData.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
connectDB();

app.get("/generate", async (req, res) => {
  const difficulty = req.query.difficulty || "medium";
  const timelimit = req.query.timelimit || "1";
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  try {
    const text = await generatedContent(difficulty, timelimit);
    res.type("text/plain");
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating text");
  }
});

app.post("/addData", async (req, res) => {
  try {
    const { wpm, accuracy } = req.body;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let todayData = await TestData.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (todayData) {
      // Add new values to sums
      todayData.sumWPM += wpm;
      todayData.sumAcc += accuracy;
      todayData.count += 1;

      await todayData.save();
      return res.json(todayData);
    }

    // No data for today — create new
    const newData = await TestData.create({
      sumWPM: wpm,
      sumAcc: accuracy,
      count: 1,
    });

    res.json(newData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data");
  }
});


app.get("/getData/last-30-days", async (req, res) => {
  const data = await TestData.find().sort({date:-1}).limit(30);
  res.json(data);
});

app.get("/getData/last-7-days", async (req, res) => {
  const data = await TestData.find().sort({date:-1}).limit(7);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
