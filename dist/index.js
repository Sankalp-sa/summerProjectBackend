"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const mainRoute_js_1 = __importDefault(require("./routes/mainRoute.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const connection_js_1 = require("./db/connection.js");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "https://summerprojectbackend.onrender.com",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    },
});
exports.io = io;
io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);
    socket.on("disconnect", () => {
        console.log("Socket disconnected", socket.id);
    });
    socket.on("joinRoom", (userId) => {
        console.log(userId + " joined the room");
        socket.join(userId);
    });
});
// CORS configuration
app.use((0, cors_1.default)({
    origin: "https://summerprojectbackend.onrender.com",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_PARSER_SECRET));
app.use(express_1.default.static("public"));
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1", mainRoute_js_1.default);
const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
    try {
        await (0, connection_js_1.connectToDb)();
        console.log("Server started at port " + PORT);
        console.log("Connected to Db");
    }
    catch (error) {
        console.log("Error in connection");
        console.log(error);
    }
});
//# sourceMappingURL=index.js.map