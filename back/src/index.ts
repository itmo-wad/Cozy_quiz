import { app, server } from "./shared";

import serve from "koa-static";
import Router from "koa-router";

// Create a router
const router = new Router();

// Server static elements from public folder
app.use(serve("public"));

// Serve API on subpath /api
import { api } from "./app";
router.use("/api", api.routes(), api.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

// Start webserver
server.listen(8080, "");
