import { createClient } from "redis";
export const delcacheData = async (req, res, next, url) => {
  try {
    const user_id = req.body.user_id;
    let keydel = url;
    if (!user_id) return res.status(400).json({ message: "Invalid Request!" });
    keydel += user_id;
    const client = createClient();
    await client.connect();
    await client.del(keydel);
    console.log("cache deleted successfully");
    await client.disconnect();
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
