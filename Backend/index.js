import express from 'express'; 
import { connectDB } from './DB/connectDB.js';
import dotenv from 'dotenv'; 
import cors from 'cors';
import clanRoutes from './Routes/clan.routes.js';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express(); 
const PORT = process.env.PORT || 5000; 

app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173",credentials: true }));
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Hack Of Clans !! ")
}); 

app.use("/api/hackofclans", clanRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server chal raha hai bhai");
})