"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Instant Indexer 🚀</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />
        <button type="submit">Submit</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}
