"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { socket } from "@/lib/socket";
import { useInterviewStore } from "@/store/interview-store";



type SocketProviderProps = {
  roomCode: string;
  role: "INTERVIEWER" | "CANDIDATE";
};

export function SocketProvider({ roomCode, role }: SocketProviderProps) {
  const router = useRouter();

  const addMessage = useInterviewStore((state) => state.addMessage);

  const addTabSwitch =
  useInterviewStore(
    (state) =>
      state.addTabSwitch
  );

  const setCode = useInterviewStore((state) => state.setCode);

  const setLanguage = useInterviewStore((state) => state.setLanguage);

  const setCandidateConnected = useInterviewStore(
    (state) => state.setCandidateConnected,
  );

  const setInterviewerConnected = useInterviewStore(
    (state) => state.setInterviewerConnected,
  );

  const setSharedQuestion = useInterviewStore(
    (state) => state.setSharedQuestion,
  );

  const setInterviewStatus = useInterviewStore(
    (state) => state.setInterviewStatus,
  );

  const setInterviewStartedAt = useInterviewStore(
    (state) => state.setInterviewStartedAt,
  );

  const setRemoteActiveView = useInterviewStore(
    (state) => state.setRemoteActiveView,
  );

  const setCandidateSharing = useInterviewStore(
    (state) => state.setCandidateSharing,
  );

  const setInterviewerSharing = useInterviewStore(
    (state) => state.setInterviewerSharing,
  );

  const setRemoteMicEnabled = useInterviewStore(
    (state) => state.setRemoteMicEnabled,
  );

  const setRemoteCameraEnabled = useInterviewStore(
    (state) => state.setRemoteCameraEnabled,
  );

  const setRemoteScreenStreamId = useInterviewStore(
    (state) => state.setRemoteScreenStreamId,
  );

  useEffect(() => {
  let leftAt = 0;

  function handleVisibility() {
    if (
      document.visibilityState ===
      "hidden"
    ) {
      leftAt = Date.now();
      return;
    }

    if (
      document.visibilityState ===
      "visible" &&
      leftAt
    ) {
      const returnedAt =
        Date.now();

      const event = {
        leftAt,
        returnedAt,
        duration: Math.floor(
          (returnedAt - leftAt) /
            1000
        ),
      };

      if (role === "CANDIDATE") {
  addTabSwitch(event);

  socket.emit(
    "tab-switch",
    {
      roomCode,
      event,
    }
  );
}

      leftAt = 0;
    }
  }

  document.addEventListener(
    "visibilitychange",
    handleVisibility
  );

  return () => {
    document.removeEventListener(
      "visibilitychange",
      handleVisibility
    );
  };
}, [
  roomCode,
  addTabSwitch,
]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);

      socket.emit("join-room", {
        roomCode,
        role,
      });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket Error:", error);
    });

    socket.on("question-shared", (question) => {
      setSharedQuestion(question);
    });

    socket.on("code-updated", (code) => {
      setCode(code);
    });

    socket.on("language-updated", (language) => {
      setLanguage(language);
    });

    socket.on("chat-message-received", (message) => {
      addMessage(message);
    });

    socket.on("presence-updated", (presence) => {
      console.log("Presence:", presence);

      setCandidateConnected(presence.candidate);

      setInterviewerConnected(presence.interviewer);

      const otherUserConnected =
        role === "INTERVIEWER" ? presence.candidate : presence.interviewer;

      if (!otherUserConnected) {
        useInterviewStore.getState().setRemoteActiveView("CODE");
      }
    });

    socket.on("interview-started", () => {
      setInterviewStatus("ACTIVE");

      setInterviewStartedAt(Date.now());
    });

    socket.on("interview-ended", () => {
      useInterviewStore.getState().resetInterviewState();

      if (role === "CANDIDATE") {
        router.push("/candidate");
      }
    });

    socket.on("mic-state-updated", (enabled) => {
      console.log("REMOTE MIC:", enabled);

      setRemoteMicEnabled(enabled);
    });

    socket.on("camera-state-updated", (enabled) => {
      console.log("REMOTE CAMERA:", enabled);

      setRemoteCameraEnabled(enabled);
    });

    socket.on("remote-active-view", (view) => {
      setRemoteActiveView(view);
    });

    socket.on("screen-share-state-updated", ({ role, sharing, streamId }) => {
      if (role === "CANDIDATE") {
        setCandidateSharing(sharing);
      }
      if (role === "INTERVIEWER") {
        setInterviewerSharing(sharing);
      }
      if (sharing && streamId) {
        setRemoteScreenStreamId(streamId);
      } else {
        setRemoteScreenStreamId(null);
      }
    });

    socket.on(
  "tab-switch-updated",
  (event) => {
    if (
      role === "INTERVIEWER"
    ) {
      addTabSwitch(event);
    }
  }
);

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("question-shared");
      socket.off("code-updated");
      socket.off("language-updated");
      socket.off("chat-message-received");
      socket.off("presence-updated");
      socket.off("interview-started");
      socket.off("interview-ended");
      socket.off("remote-active-view");
      socket.off("screen-share-state-updated");
      socket.off("mic-state-updated");
      socket.off(
  "tab-switch-updated"
);

      socket.off("camera-state-updated");

      socket.disconnect();
    };
  }, [
    roomCode,
    role,
    router,
    addMessage,
    setCode,
    setLanguage,
    setCandidateConnected,
    setInterviewerConnected,
    setSharedQuestion,
    setInterviewStatus,
    setInterviewStartedAt,
    setRemoteActiveView,
    setCandidateSharing,
    setInterviewerSharing,
    setRemoteMicEnabled,
    setRemoteCameraEnabled,
    addTabSwitch,
  ]);

  return null;
}
