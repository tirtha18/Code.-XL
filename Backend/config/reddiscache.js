import { createClient } from "redis";
export const connectRedis = async () => {
  const client = createClient();
  client.on("error", (err) => console.error("Redis Client Error", err));
  try {
    await client.connect({
      url: "redis://red-cqek96hu0jms739e0ttg:6379",
    });
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis", err);
  }
};
