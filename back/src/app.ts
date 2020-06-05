import { app, io, server } from "./shared";
import Router from "koa-router";
import crypto from "crypto";
import Quiz from "./Quiz";

const router = new Router();

const rooms: Map<string, Quiz> = new Map();

// HTTP API
router.get("/test", async (ctx) => {
  ctx.body = "test";
});

// Socket Event
io.on("connect", (socket) => {
  console.log("a user connected");

  socket.on("createRoom", (quiz) => {
    console.log("Creating room");
    const roomID = crypto.randomBytes(3).toString("base64");

    rooms.set(roomID, new Quiz(roomID, quiz));
    socket.emit("createRoom", 200, roomID);
  });

  socket.on("joinRoom", (roomID) => {
    if (rooms.has(roomID)) {
      console.log(`User joined room ${roomID}`);
      socket.emit("joinRoom", 200, roomID);
      rooms.get(roomID).joinRoom(socket);
      socket.join(roomID);
    } else socket.emit("joinRoom", 404, "Room not found");
  });

  socket.on("status", (roomID) => {
    if (rooms.has(roomID)) socket.emit("joinRoom", 200, roomID);
    else socket.emit("joinRoom", 404, "Room not found");
  });
});

export { router as api };
