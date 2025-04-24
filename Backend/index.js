import express from 'express'; 
import { connectDB } from './DB/connectDB.js';
import dotenv from 'dotenv'; 
import cors from 'cors';
import clanRoutes from './Routes/clan.routes.js';
import cookieParser from "cookie-parser";
import messageRoutes from "./Routes/clanMessage.routes.js"
import teamRoutes from "./Routes/clanTeam.routes.js"
import exploreRoutes from "./Routes/explore.routes.js"

import { app , server } from './Utils/socket.js';

dotenv.config(); 
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
  
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.get("/", (req, res) => {
    res.send("Hello Hack Of Clans !! ")
}); 

app.use("/api/hackofclans", clanRoutes);
app.use("/api/hackofclans/messages", messageRoutes);
app.use("/api/hackofclans/teams", teamRoutes)
app.use("/api/hackofclans/explore", exploreRoutes)

server.listen(PORT, () => {
    connectDB();
    console.log("Server chal raha hai bhai");
})