import Sheet from "../models/Sheet.js";

export const getSheets = async (req, res) => {
  try {
    console.log(req.headers);
    const user_id = req.query.user_id;
    if (!user_id) {
      return res.status(400).json({ message: "No user_id sent" });
    }
    const sheets = await Sheet.findOne({ user_id: user_id });
    if (!sheets) {
      return res.status(404).json({ message: "No sheets found for this user" });
    }
    res.json(sheets);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
