// Use ESM syntax
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Listen for changes from clients and broadcast to others
  socket.on("updateEditorContent", (content) => {
    io.emit("editorContent", content);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(3001, () => {
  console.log("Server listening on port 3001");
});
