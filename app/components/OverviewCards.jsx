import styles from "./OverviewCards.module.css";

const cards = [
  {
    title: "Total Search Results",
    value: "10",
    footer: "View Details →",
    color: "--accent2",
  },
  {
    title: "Product Reviews Rating",
    value: "10/10",
    footer: "View Details →",
    color: "--accent3",
  },
  {
    title: "Customer Feedback",
    value: "Good Product",
    footer: "View Details →",
    color: "--accent",
  },
  {
    title: "AI Feedback",
    value: "Better Options",
    footer: "View Details →",
    color: "--accent2",
  },
];

export default function OverviewCards() {
  return (
    <div className={styles.grid}>
      {cards.map((c, i) => (
        <div
          key={i}
          className={styles.card}
          style={{ borderTopColor: `var(${c.color})` }}
        >
          <div className={styles.value}>{c.value}</div>
          <div className={styles.title}>{c.title}</div>
          <div className={styles.footer}>{c.footer}</div>
        </div>
      ))}
    </div>
  );
}
