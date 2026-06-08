"use client";

import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { socket } from "@/lib/socket";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useInterviewStore } from "@/store/interview-store";

export function CodeEditorPanel() {
  const language = useInterviewStore((state) => state.language);

  const { resolvedTheme } = useTheme();
  const code = useInterviewStore((state) => state.code);

  const setCode = useInterviewStore((state) => state.setCode);

  const setLanguage = useInterviewStore((state) => state.setLanguage);

  const setOutput = useInterviewStore((state) => state.setOutput);

  async function runCode() {
    try {
      setOutput("Running...");

      const response = await fetch("/api/run-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      const result = await response.json();

      setOutput(
        result.stdout ||
          result.stderr ||
          result.compile_output ||
          result.message ||
          "No output",
      );
    } catch {
      setOutput("Execution failed");
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b p-3">
        <h2 className="font-semibold">Code Editor</h2>
        <div className="flex items-center gap-2">
          <Select
            value={language}
            onValueChange={(value) => {
              setLanguage(value);

              const roomCode = window.location.pathname.split("/").pop();

              socket.emit("language-change", {
                roomCode,
                language: value,
              });
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>

              <SelectItem value="typescript">TypeScript</SelectItem>

              <SelectItem value="python">Python</SelectItem>

              <SelectItem value="java">Java</SelectItem>

              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" onClick={runCode}>
            <Play className="h-4 w-4 mr-2" />
            Run
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => {
            const newCode = value ?? "";

            setCode(newCode);

            const roomCode = window.location.pathname.split("/").pop();

            socket.emit("code-change", {
              roomCode,
              code: newCode,
            });
          }}
          theme={resolvedTheme === "dark" ? "vs-dark" : "vs"}
        />
      </div>
    </div>
  );
}
