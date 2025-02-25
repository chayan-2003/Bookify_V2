import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import bodyParser from "body-parser";
import billRoute from "./routes/bill.js";
import http from "http"; // Import the http module
import { Server } from "socket.io";

dotenv.config();

const app = express();

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, { // Ensure environment variable is MONGO_URL
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://bookify-v2-alpha.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// Event Listeners
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'https://bookify-v2-alpha.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api", billRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === 'production' ? {} : err.stack,
  });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("roomBooked", (data) => {
    console.log("Room booked:", data);
    // Broadcast the event to all connected clients
    io.emit("roomBooked", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.set("socketio", io);

server.listen(8080, () => { // Use server.listen instead of app.listen
  connect();
  console.log("Connected to backend on port 8080!");
});