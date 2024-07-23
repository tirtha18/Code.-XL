import client from "../config/reddiscache.js";
export const cache = async (req, res, next) => {
  try {
    const key = req.originalUrl;
    const cachedData = await client.get(key);
    if (cachedData) {
      console.log(JSON.parse(cachedData));
      return res.json(JSON.parse(cachedData));
    } else {
      next();
    }
  } catch (error) {
    console.log("Error caching", error);
    next();
  }
};
