import express from "express";
import dotenv from "dotenv";
import cookiePasser from 'cookie-parser'

import cors from 'cors'

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);

app.use(express.json());
app.use(cookiePasser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)


const server = app.listen(PORT,()=>{
    console.log(`server is running on port  ${PORT}`);
    connectDB();
});

server.timeout = 30000;