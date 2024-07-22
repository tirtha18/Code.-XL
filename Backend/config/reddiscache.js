import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();
export const connectRedis = async () => {
  try {
    const client = createClient({
      url: process.env.REDIS_URL,
    });
    await client.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
};
