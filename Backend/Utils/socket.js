import { Server} from 'socket.io'; 
import http from 'http'; 
import express from "express"; 

const app = express(); 

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
});

io.on("connection", (socket) => {
    console.log("A user connected ", socket.id);

    socket.on("join-room", (teamId) => {
        socket.join(teamId);
        console.log(`User ${socket.id} joined room ${teamId}`);
      });

    socket.on("disconnect", () => {
        console.log("A user disconneted ", socket.id);
    })
})

export {io, app, server }; 