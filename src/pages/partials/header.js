import React from "react";
import Logo from '../../assets/img/logo-normal.jpg'
import styles from "./styles.module.scss"

function Header() {
  return (
    <nav className={styles.header}>
      <ul className={styles.headerItems} style={{"display": "flex", "flexDirection": "row"}}>
        <li className={styles.navItem}>
          <a className={styles.navLink} href="/">Home</a>
        </li>

        <li className={styles.navItem}>
          <a className={styles.navLink} href="/conheca-a-astepi">CONHEÇA A ASTEPI</a>
        </li>

        <li className={styles.navItem}>
          <a className={styles.navLink} href="/noticias">NOTÍCIAS</a>
        </li>

        <li className={styles.navItem}>
          <a className={styles.navLink} href="/atendimento">COMO RECEBER ATENDIMENTO?</a>
        </li>

        <li className={styles.navItem}>
          <a className={styles.navLink} href="/login">LOGIN</a>
        </li>

        <li className={styles.navItem}>
          <a className={styles.navLink} href="/acesso-rapido">ACESSO RÁPIDO</a>
        </li>

        <li className={styles.navItem}>
          <img alt="logo" src={Logo} className={styles.headerLogo}  width="100" height="100" />
        </li>
      </ul>
    </nav>
  )
}

export default Header;