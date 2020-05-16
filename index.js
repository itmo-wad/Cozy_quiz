const shared = require("./src/shared");
const app = shared.app;

const serve = require("koa-static");
const Router = require("koa-router");

// Create a router
const router = new Router();

// Server static elements from public folder
app.use(serve("public"));

// Serve API on subpath /api
const api = require("./src");
router.use("/api", api.router.routes(), api.router.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

// Start webserver
shared.server.listen(8080, "");
