import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
import { initializePassport } from "./passport/initializePassport";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const mongoDB = process.env.MONGODB_URL;

initializePassport();

mongoose.set('strictQuery', false);

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
    console.log('MongoDB connected');
}

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
});