"use client";
import { useState } from "react";

export default function SearchWithButton() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const doSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      {/* INPUT + BUTTON */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images…"
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button
          onClick={doSearch}
          disabled={loading}
          style={{ padding: "0.5rem 1rem" }}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      {/* IMAGE RESULTS */}
      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "1rem",
        }}
      >
        {results.map((item) => (
          <a
            key={item.cacheId || item.link}
            href={item.image.contextLink} // link to the page where the image lives
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center" }}
          >
            <img
              src={item.link} // the actual image URL
              alt={item.title}
              style={{ width: "100%", height: "auto", borderRadius: 4 }}
            />
            <p style={{ fontSize: "0.9rem", marginTop: 4 }}>{item.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
