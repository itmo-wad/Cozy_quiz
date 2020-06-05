// Create app
import Koa from "koa";
import http from "http";
import socketio from "socket.io";

const app = new Koa();

// Create websocket server
const server = http.createServer(app.callback());
const io = socketio(server);

export { app };
export { server };
export { io };
