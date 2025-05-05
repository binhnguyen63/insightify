import styles from "./Topbar.module.css";
import { FiSearch, FiBell, FiMessageCircle } from "react-icons/fi";

export default function Topbar() {
  return (
    <header className={styles.topbar}>
      <h1>Dashboard</h1>
      <div className={styles.search}>
        <FiSearch />
        <input placeholder="Search…" />
      </div>
      <div className={styles.icons}>
        <FiMessageCircle />
        <div className={styles.badge}>2</div>
        <FiBell />
      </div>
      <img src="/profile.png" className={styles.avatar} alt="User" />
    </header>
  );
}
