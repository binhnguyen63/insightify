import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>in the Moment</div>
      <ul className={styles.menu}>
        <li className={styles.active}>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/screening">Screening</Link>
        </li>
        <li>
          <Link href="/scoring">Scoring</Link>
        </li>
        <li>
          <Link href="/leaderboard">Leader Board</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
      <div className={styles.logout}>
        <Link href="/api/auth/logout">Log Out</Link>
      </div>
    </aside>
  );
}
