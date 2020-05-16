const shared = require("./shared");

const Router = require("koa-router");
const router = new Router();

// HTTP API
router.get("/test", async (ctx) => {
  ctx.body = "test";
});

// Socket Event
shared.io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("hello", "hi");
});

module.exports = { router };
