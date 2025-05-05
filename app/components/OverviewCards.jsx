import styles from "./OverviewCards.module.css";

const cards = [
  {
    title: "Total Videos Judged",
    value: "132",
    footer: "View Details →",
    color: "--accent2",
  },
  {
    title: "Pending Video",
    value: "35",
    footer: "+7 New Today",
    color: "--accent3",
  },
  {
    title: "Today's Task",
    value: "7",
    footer: "Go to Screening →",
    color: "--accent",
  },
  {
    title: "Judging in Progress",
    value: "2",
    footer: "View Process",
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
