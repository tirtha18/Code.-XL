import client from "../config/reddiscache.js"
export const delcacheData = async (req, res, next, url) => {
  try {
    const user_id = req.body.user_id;
    let keydel = url;
    if (!user_id) return res.status(400).json({ message: "Invalid Request!" });
    keydel += user_id;
    await client.del(keydel);
    console.log("cache deleted successfully");
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
