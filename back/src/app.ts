import { app, io, server } from "./shared";
import Router from "koa-router";
import crypto from "crypto";
import Quiz from "./Quiz";

const router = new Router();

// Todo: Handle room destruction
const rooms: Map<string, Quiz> = new Map();

// HTTP API
router.get("/test", async (ctx) => {
  ctx.body = "test";
});

// On user join
io.on("connect", (socket) => {
  console.log("a user connected");

  // On room creation request
  socket.on("createRoom", (quiz) => {
    console.log("Creating room");
    // Generate room ID
    // TODO: Find a better generator and check for clash
    const roomID = crypto.randomBytes(3).toString("base64");

    // Add room to room list
    rooms.set(roomID, new Quiz(roomID, quiz));
    // Tell user room was created
    socket.emit("createRoom", 200, roomID);
  });

  // On room join request
  socket.on("joinRoom", (roomID) => {
    // Check if room exists
    if (rooms.has(roomID)) {
      console.log(`User joined room ${roomID}`);
      // Accept room connection
      socket.emit("joinRoom", 200, roomID);
      // Join room on backend part
      rooms.get(roomID).joinRoom(socket);
      socket.join(roomID);
    } else {
      // Tell use room was not found
      socket.emit("joinRoom", 404, "Room not found");
    }
  });
});

export { router as api };
