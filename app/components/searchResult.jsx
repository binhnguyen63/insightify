"use client";

import { useState, useEffect } from "react";
import styles from "./searchResult.module.css"; // Adjust the path as needed

export default function SearchResult({ query = "loreal foundation" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  function truncate(text, max = 60) {
    return text.length > max ? text.slice(0, max) + "…" : text;
  }
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [query]);

  return (
    <section className={styles.searchResult}>
      <div className={styles.header}>
        <h2>Search Results for “{query}”</h2>
        {/* you can wire this up to change `query` if you want a View All or new search */}
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {items.map((item, i) => {
          // try to pull a thumbnail (for web search results, Google CSE may populate pagemap.cse_thumbnail)
          const thumb =
            item.pagemap?.cse_thumbnail?.[0]?.src || // Google CSE web search
            item.link; // fallback to the link itself

          return (
            <div key={i} className={styles.card}>
              {thumb && (
                <img src={thumb} alt={item.title} className={styles.thumb} />
              )}
              <div className={styles.meta}>
                <p className={styles.title}>{truncate(item.title)}</p>
                <button
                  className={styles.button}
                  onClick={() => window.open(item.image.contextLink, "_blank")}
                >
                  View Product
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
