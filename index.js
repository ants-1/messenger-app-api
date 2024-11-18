import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
    console.log('MongoDB connected');
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
});