import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

console.log(
  "Socket Server Running on Port 3001"
);

const roomUsers = new Map<
  string,
  {
    interviewer: boolean;
    candidate: boolean;
  }
>();

io.on("connection", (socket) => {

  console.log(
    "Connected:",
    socket.id
  );

  socket.onAny(
    (event, ...args) => {
      console.log(
        "EVENT:",
        event
      );
    }
  );

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

  socket.on(
    "active-view-change",
    ({ roomCode, view }) => {
      socket
        .to(roomCode)
        .emit(
          "remote-active-view",
          view
        );
    }
  );

  socket.on(
    "screen-share-state",
    ({ roomCode, role, sharing, streamId }) => {
      socket.to(roomCode).emit(
        "screen-share-state-updated",
        {
          role,
          sharing,
          streamId,
        }
      );
    }
  );

  socket.on(
    "webrtc-offer",
    ({ roomCode, offer }) => {
      console.log(
        "Offer received by server"
      );

      socket.to(roomCode).emit(
        "webrtc-offer",
        offer
      );
    }
  );

  socket.on(
    "webrtc-answer",
    ({ roomCode, answer }) => {
      console.log(
        "Answer received by server"
      );

      socket.to(roomCode).emit(
        "webrtc-answer",
        answer
      );
    }
  );

  socket.on(
    "webrtc-ice-candidate",
    ({
      roomCode,
      candidate,
    }) => {
      socket.to(roomCode).emit(
        "webrtc-ice-candidate",
        candidate
      );
    }
  );

  socket.on(
  "mic-state-change",
  ({
    roomCode,
    enabled,
  }) => {
    console.log(
      "Broadcast mic:",
      roomCode,
      enabled
    );

    socket
      .to(roomCode)
      .emit(
        "mic-state-updated",
        enabled
      );
  }
);
socket.on(
  "camera-state-change",
  ({
    roomCode,
    enabled,
  }) => {
    console.log(
      "Broadcast camera:",
      roomCode,
      enabled
    );

    socket
      .to(roomCode)
      .emit(
        "camera-state-updated",
        enabled
      );
  }
);

socket.on(
  "webrtc-renegotiate-offer",
  ({
    roomCode,
    offer,
  }) => {
    socket.to(roomCode).emit(
      "webrtc-renegotiate-offer",
      offer
    );
  }
);

socket.on(
  "webrtc-renegotiate-answer",
  ({
    roomCode,
    answer,
  }) => {
    socket.to(roomCode).emit(
      "webrtc-renegotiate-answer",
      answer
    );
  }
);
});

