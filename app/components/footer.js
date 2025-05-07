import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.footerTitle}>Made by Binh Nguyen</p>
      <div className={styles.contact}>
        <Link href="https://github.com/binhnguyen63/insightify" target="_blank">
          <img
            className={`${styles.contactIcon} ${styles.githubIcon}`}
            src="/github-mark.svg"
          ></img>
        </Link>
        <Link
          href="https://www.linkedin.com/in/binh-nguyen-244608196/"
          target="_blank"
        >
          <img className={styles.contactIcon} src="/LI-In-Bug.png"></img>
        </Link>
        <Link href="mailto:binhnguyen4344@gmail.com">
          <img className={styles.contactIcon} src="/email.png"></img>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
