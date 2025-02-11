'use client'
import { useState } from 'react';
import Link from 'next/link';
import styles from "@/styles/navbar.module.css";

export default function Navbar ()  {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className={styles.navbar}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`${styles.navItems} ${isOpen ? styles.active : ''}`}>
        <li className={styles.navItem}>
          <Link href="/">Get</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/create">Create</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/update">Update</Link>
        </li>
      </ul>
    </nav>
  );
};
