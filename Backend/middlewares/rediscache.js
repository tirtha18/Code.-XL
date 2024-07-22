import { createClient } from "redis";
export const cache = async (req, res, next) => {
  try {
    const key = req.originalUrl;
    const client = createClient();
    await client.connect().catch((error) => {
      console.log("Connection error"), error;
    });
    const cachedData = await client.get(key);
    if (cachedData) {
      console.log(JSON.parse(cachedData));
      await client.disconnect();
      return res.json(JSON.parse(cachedData));
    } else {
      next();
    }
  } catch (error) {
    console.log("Error caching", error);
    next(error);
  }
};
