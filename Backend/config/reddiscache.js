import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const client = new Redis(process.env.REDIS_URL);

client.on('error', (error) => console.log('Redis Client Error', error));

export default client;
