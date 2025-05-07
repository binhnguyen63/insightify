"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./AiModel.module.css";

export default function AiModel({ query = "loreal foundation" }) {
  const [messages, setMessages] = useState([
    { from: "ai", text: `Hello! How can I help you with ${query}?` },
  ]);
  useEffect(() => {
    setMessages([
      {
        from: "ai",
        text: `Hello! How can I help you with ${query}?`,
      },
    ]);
  }, [query]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newHistory = [...messages, { from: "user", text: trimmed }];
    setMessages(newHistory);
    setInputValue("");
    setLoading(true);

    const minimalHistory = [newHistory[0], ...newHistory.slice(-4)];

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: minimalHistory }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      let aiText = "";
      const candidate = data.candidates?.[0];
      const content = candidate?.content;
      if (typeof content === "string") aiText = content;
      else if (content?.parts)
        aiText = content.parts.map((p) => p.text).join("");
      else aiText = JSON.stringify(content);

      setMessages((msgs) => [...msgs, { from: "ai", text: aiText }]);
    } catch (err) {
      console.error("AI error:", err);
      setMessages((msgs) => [
        ...msgs,
        { from: "ai", text: `Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.chatSection}>
      <h2 className={styles.heading}>
        Need Help to choose best product? Ask AI
      </h2>
      <div className={styles.chatContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.message} ${
              msg.from === "user" ? styles.user : styles.ai
            }`}
          >
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your question..."
          className={styles.input}
          disabled={loading}
        />
        <button type="submit" className={styles.sendButton} disabled={loading}>
          {loading ? "…" : "Send"}
        </button>
      </form>
    </section>
  );
}
