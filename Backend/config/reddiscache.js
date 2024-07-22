import { createClient } from "redis";

export const connectRedis = async () => {
  const redisUrl = process.env.REDIS_URL;
  const client = createClient({
    url: redisUrl,
  });

  client.on("error", (err) => console.error("Redis Client Error", err));

  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis", err);
  }
};
