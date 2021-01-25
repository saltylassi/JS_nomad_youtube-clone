import db from "./db";
import dotenv from 'dotenv';
dotenv.config();

import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";


const PORT = process.env.PORT;

const handleListening = () => {
    console.log(`on ${PORT}`);
}

app.listen(PORT,handleListening);