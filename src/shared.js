// Create app
const Koa = require("koa");
const app = new Koa();

// Create websocket server
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

module.exports = {
  app,
  server,
  io,
};
