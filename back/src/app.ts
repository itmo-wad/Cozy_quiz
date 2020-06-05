import { app, io, server } from "./shared";
import Router from "koa-router";
import crypto from "crypto";
import Quiz from "./Quiz";

const router = new Router();

var rooms = {};

// HTTP API
router.get("/test", async (ctx) => {
  ctx.body = "test";
});

// Socket Event
io.on("connect", (socket) => {
  console.log("a user connected");

  socket.on("createRoom", (quiz) => {
    console.log("Creating room");
    let roomID = crypto.randomBytes(4).toString("base64");

    rooms[roomID] = new Quiz(roomID, quiz);
    socket.emit("createRoom", 200, roomID);
  });

  socket.on("joinRoom", (roomID) => {
    if (roomID in rooms) {
      console.log(`User joined room ${roomID}`);
      socket.emit("joinRoom", 200, roomID);
      rooms[roomID].joinRoom(socket);
      socket.join(roomID);
    } else {
      socket.emit("joinRoom", 404, "Room not found");
    }
  });

  socket.on("status", (roomID) => {
    if (roomID in rooms) {
      socket.emit("joinRoom", 200, roomID);
    } else {
      socket.emit("joinRoom", 404, "Room not found");
    }
  });
});

export { router as api };
