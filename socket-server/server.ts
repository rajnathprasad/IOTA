import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

const roomUsers = new Map<
  string,
  {
    interviewer: boolean;
    candidate: boolean;
  }
>();



io.on("connection", (socket) => {


  let currentRoom = "";
  let currentRole = "";

  socket.on(
    "join-room",
    ({
      roomCode,
      role,
    }) => {
      socket.join(roomCode);

      currentRoom = roomCode;
      currentRole = role;

      const room =
        roomUsers.get(roomCode) ?? {
          interviewer: false,
          candidate: false,
        };

      if (
        role === "INTERVIEWER"
      ) {
        room.interviewer = true;
      }

      if (
        role === "CANDIDATE"
      ) {
        room.candidate = true;
      }

      roomUsers.set(
        roomCode,
        room
      );

      io.to(roomCode).emit(
        "presence-updated",
        room
      );


    }
  );

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
    ({
      roomCode,
      language,
    }) => {
      socket
        .to(roomCode)
        .emit(
          "language-updated",
          language
        );
    }
  );

  socket.on(
    "chat-message",
    ({
      roomCode,
      message,
    }) => {
      socket
        .to(roomCode)
        .emit(
          "chat-message-received",
          message
        );
    }
  );

  socket.on(
    "disconnect",
    () => {
      const room =
        roomUsers.get(
          currentRoom
        );

      if (room) {
        if (
          currentRole ===
          "INTERVIEWER"
        ) {
          room.interviewer =
            false;
        }

        if (
          currentRole ===
          "CANDIDATE"
        ) {
          room.candidate =
            false;
        }

        io.to(
          currentRoom
        ).emit(
          "presence-updated",
          room
        );
      }


    }
  );

  socket.on(
  "interview-started",
  (roomCode) => {
    

    socket
      .to(roomCode)
      .emit(
        "interview-started"
      );
  }
);

socket.on(
  "interview-ended",
  (roomCode) => {
    

    socket
      .to(roomCode)
      .emit(
        "interview-ended"
      );
  }
);

});