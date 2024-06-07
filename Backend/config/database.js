import 'dotenv/config'
import mongoose from 'mongoose'
const URI = process.env.MONGO_URI
const connectToDatabase = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export {connectToDatabase}