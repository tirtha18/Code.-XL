import User from "../models/User.js";
import { createClient } from "redis";
export const getUser = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const key = req.originalUrl;
    if (!user_id) return res.status(400).json({ message: "No User ID found" });
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "No valid user found" });
    const client = createClient();
    await client.connect();
    await client.set(key, JSON.stringify(user), { EX: 600 });
    await client.disconnect();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
