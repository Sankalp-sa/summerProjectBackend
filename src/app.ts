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
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

    socket.on("disconnect", () => {
      console.log("Socket disconnected", socket.id);
    })

  // Join user-specific room
    socket.on("joinRoom", (userId) => {
      console.log(userId + " joined the room")
      socket.join(userId);
    });
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use(express.static("public"));

app.use(morgan("dev"));

app.use("/api/v1", router);

const PORT = process.env.PORT;

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
