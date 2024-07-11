import MockResults from "../models/MockResults.js"
export const getMock = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    if (!user_id) {
      return res.status(400).json({ message: "No user_id sent" });
    }
    const mockresults = await MockResults.find({ user_id: user_id });
    if (!mockresults) {
      return res.status(404).json({ message: "No Mock results found for this user" });
    }
    res.json(mockresults);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
