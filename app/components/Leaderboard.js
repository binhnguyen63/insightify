import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import styles from "./Leaderboard.module.css";

const players = [
  { name: "Gabriel Medina", country: "Brazil", score: 9.6, delta: +5 },
  { name: "Julian Wilson", country: "Australia", score: 9.5, delta: +1 },
  /* …and so on… */
];

export default function Leaderboard() {
  return (
    <section className={styles.lb}>
      <h2>Leaderboard</h2>
      <ul>
        {players.map((p, i) => (
          <li key={i}>
            <span className={styles.rank}>{i + 1}</span>
            <img src={`/avatars/${i + 1}.jpg`} className={styles.avatar} />
            <div className={styles.info}>
              <strong>{p.name}</strong>
              <small>{p.country}</small>
            </div>
            <div className={styles.score}>
              {p.score.toFixed(1)}
              {p.delta > 0 ? (
                <FiArrowUp className={styles.up} />
              ) : (
                <FiArrowDown className={styles.down} />
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className={styles.viewAll}>View All</button>
    </section>
  );
}
