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
const allowedOrigins = [
    'https://summerprojectfrontend.onrender.com',
    'http://localhost:5173', // Add your local development URL
    // Add any other allowed origins here
];
const io = new socket_io_1.Server(server, {
    cors: {
        origin: allowedOrigins,
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
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_PARSER_SECRET));
app.use(express_1.default.static("public"));
app.use((0, morgan_1.default)("dev"));
// Set necessary headers for all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
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