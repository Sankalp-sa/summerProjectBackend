import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./routes/mainRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { connectToDb } from "./db/connection.js";

dotenv.config();

const app = express();
const server = createServer(app);

const allowedOrigins = [
  'https://summerprojectfrontend.onrender.com',
  'http://localhost:5173',  // Add your local development URL
  // Add any other allowed origins here
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

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
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(express.static("public"));

app.use(morgan("dev"));

// Set necessary headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  try {
    await connectToDb();
    console.log("Server started at port " + PORT);
    console.log("Connected to Db");
  } catch (error) {
    console.log("Error in connection");
    console.log(error);
  }
});

export { io };