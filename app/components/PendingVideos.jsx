import styles from "./PendingVideos.module.css";

const videos = [
  { thumb: "/thumb1.jpg", duration: "10:42", user: "Mike Phillips" },
  { thumb: "/thumb2.jpg", duration: "8:23", user: "Mila K." },
  { thumb: "/thumb3.jpg", duration: "5:22", user: "Anna Hale" },
  { thumb: "/thumb4.jpg", duration: "10:42", user: "Bruce Andrew" },
];

export default function PendingVideos() {
  return (
    <section className={styles.pendingVideos}>
      <div className={styles.header}>
        <h2>Pending Videos</h2>
        <a>View All</a>
      </div>
      <div className={styles.grid}>
        {videos.map((v, i) => (
          <div key={i} className={styles.card}>
            <img src={v.thumb} alt="" />
            <span className={styles.duration}>{v.duration}</span>
            <div className={styles.meta}>
              <small>Uploaded by</small>
              <strong>{v.user}</strong>
              <button>View Video</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
