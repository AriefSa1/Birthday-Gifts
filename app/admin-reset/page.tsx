"use client";

import { useState } from "react";

export default function AdminResetPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/admin-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
        setMessage("Semua jawaban berhasil direset.");
      } else {
        setStatus("error");
        setMessage(body.error || "Gagal reset.");
      }
    } catch {
      setStatus("error");
      setMessage("Terjadi kesalahan jaringan.");
    }
  };

  return (
    <main className="min-h-dvh w-full flex items-center justify-center bg-[#0b060a] px-4">
      <div className="w-full max-w-sm bg-purple-950/20 border border-purple-400/20 rounded-2xl p-6 backdrop-blur-md">
        <h1 className="text-sm uppercase tracking-widest text-pink-200 mb-4">
          Reset jawaban
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-pink-50 text-sm outline-none focus:border-pink-400/50"
        />
        <button
          onClick={handleReset}
          disabled={status === "loading" || !password}
          className="w-full py-2 rounded-lg bg-pink-600/30 border border-pink-400/30 text-pink-100 text-sm uppercase tracking-widest disabled:opacity-40"
        >
          {status === "loading" ? "Memproses..." : "Reset semua jawaban"}
        </button>
        {message && (
          <p
            className={`mt-4 text-xs ${
              status === "done" ? "text-green-300" : "text-red-300"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
