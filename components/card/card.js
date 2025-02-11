import React from "react";
import styles from "@/styles/card.module.css";

const HomeCard = ({ id, name, lastName, type, date, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3 className={styles.title}>{name + " " + lastName}</h3>
      <p className={styles.title}>ID: {id}</p>
      <p className={styles.title}>Type Permission : {type}</p>
      <p className={styles.title}>Date: {date}</p>
    </div>
  );
};

export default HomeCard;
