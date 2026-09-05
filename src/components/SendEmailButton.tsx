"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function SendEmailButton() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleClick() {
    setStatus("sending");
    try {
      const res = await fetch("/api/send-email");
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 sm:items-start">
      <button
        onClick={handleClick}
        disabled={status === "sending"}
        className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc] md:w-[158px]"
      >
        {status === "sending" ? "寄送中..." : "寄送測試信"}
      </button>
      {status === "success" && (
        <p className="text-sm text-green-600 dark:text-green-400">已寄出，請check信箱</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">寄送失敗，請稍後再試</p>
      )}
    </div>
  );
}
