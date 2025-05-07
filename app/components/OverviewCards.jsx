import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./OverviewCards.module.css";
import Modal from "./Modal";

const cards = [
  { title: "10 Found Results", footer: "View Details →", color: "--accent2" },
  { title: "Customer Opinions", footer: "View Details →", color: "--accent3" },
  { title: "Trending Products", footer: "View Details →", color: "--accent" },
  { title: "AI Recommendation", footer: "View Details →", color: "--accent2" },
];

export default function OverviewCards({ query }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalContentTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false);

  const requestGemini = async (title) => {
    setLoading(true);
    try {
      const message = `what are ${title} for this product or related category ${query}. Please give me up to date information. And only give me product with the recommendation or feedback, and please dont write anything else like "here are some.." or "what's your preference", just assume it yourself. Keep it simple and clean`;
      const history = [{ from: "user", text: message }];
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || res.statusText);

      const candidate = data.candidates?.[0];
      let aiText = "";
      if (typeof candidate.content === "string") aiText = candidate.content;
      else if (candidate.content?.parts)
        aiText = candidate.content.parts.map((p) => p.text).join("");
      else aiText = JSON.stringify(candidate.content);
      setModalContent(aiText);
    } catch (err) {
      setModalContent(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.grid}>
        {cards.map((c, i) => (
          <div
            key={i}
            className={styles.card}
            style={{ borderTopColor: `var(${c.color})` }}
          >
            <div className={styles.title}>{c.title}</div>
            <div
              className={styles.footer}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setModalTitle(c.title);
                setModalContent("");
                setOpenModal(true);
                requestGemini(c.title);
              }}
            >
              {c.footer}
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <div className={styles.modalContent}>
            <h1>{modalContentTitle}</h1>
            {loading ? (
              <p>Loading…</p>
            ) : (
              <ReactMarkdown>{modalContent}</ReactMarkdown>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
