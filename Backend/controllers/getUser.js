import User from "../models/User.js";
import client from "../config/reddiscache.js"
export const getUser = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const key = req.originalUrl;
    if (!user_id) return res.status(400).json({ message: "No User ID found" });
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "No valid user found" });
    await client.set(key, JSON.stringify(user));
    client.expire(key,30);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
