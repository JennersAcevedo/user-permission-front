import React from 'react';
import styles from "@/styles/title.module.css";

const Title = ({ title }) => {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.highlightedText}>{title}</h1>
    </div>
  );
};

export default Title;
