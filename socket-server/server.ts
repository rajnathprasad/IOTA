import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

console.log("Socket Server Running on Port 3001");

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("join-room", (roomCode: string) => {
    socket.join(roomCode);

    console.log(
      `${socket.id} joined room ${roomCode}`
    );
  });

  socket.on(
    "question-share",
    ({ roomCode, question }) => {
      socket
        .to(roomCode)
        .emit(
          "question-shared",
          question
        );
    }
  );

  socket.on(
  "code-change",
  ({ roomCode, code }) => {
    socket
      .to(roomCode)
      .emit(
        "code-updated",
        code
      );
  }
);

socket.on(
  "language-change",
  ({ roomCode, language }) => {
    socket
      .to(roomCode)
      .emit(
        "language-updated",
        language
      );
  }
);

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });

  socket.on(
  "chat-message",
  ({ roomCode, message }) => {
    console.log(
      "CHAT:",
      roomCode,
      message.message
    );

    socket
      .to(roomCode)
      .emit(
        "chat-message-received",
        message
      );
  }
);
});