// components/Topbar.jsx
"use client";

import styles from "./Topbar.module.css";
import { useEffect, useState } from "react";
import { FiSearch, FiBell, FiMessageCircle } from "react-icons/fi";

export default function Topbar({ query, setQuery }) {
  const [inputValue, setInputValue] = useState(query || "");
  const handleSubmit = (e) => {
    setQuery(inputValue);
    e.preventDefault();
  };
  return (
    <header className={styles.topbar}>
      <h1>Dashboard</h1>

      {/* controlled input */}
      <div className={styles.search}>
        <FiSearch />
        <form onSubmit={handleSubmit}>
          <input
            value={inputValue}
            type="text"
            placeholder="Search…"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className={styles.searchBtn} type="submit">
            Search
          </button>
        </form>
      </div>

      <div className={styles.icons}>
        <FiMessageCircle />
        <div className={styles.badge}>2</div>
        <FiBell />
        <img src="/profile.png" className={styles.avatar} alt="User" />
      </div>
    </header>
  );
}
