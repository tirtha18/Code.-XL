import Sheet from "../models/Sheet.js";
import client from "../config/reddiscache.js";
import Problem from "../models/SheetProblems.js";
export const getSheets = async (req, res) => {
  try {
    const key = req.originalUrl;
    const user_id = req.query.user_id;
    if (!user_id) {
      return res.status(400).json({ message: "No user_id sent" });
    }
    const sheets = await Sheet.find({ user_id: user_id });
    if (!sheets) {
      return res.status(404).json({ message: "No sheets found for this user" });
    }
    for (let i = 0; i < sheets.length; i++) {
      const problems = await Problem.find({ sheet_id: sheets[i]._id });
      sheets[i] = sheets[i].toObject();
      sheets[i]["sheet"] = problems;
    }
    await client.set(key, JSON.stringify({ sheets: sheets }));
    client.expire(key, 600);
    res.json({ sheets: sheets });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
