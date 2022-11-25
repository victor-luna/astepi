import React from "react";
import logo from '../../assets/img/logo-normal.jpg'
import styles from "./styles.module.scss"

function HeaderAgendamento() {
  return (
    <nav className={styles.header}>
      <ul className={styles.headerItems} style={{"display": "flex", "flexDirection": "row"}}>
        <li className={styles.navItem}>
          <a className={styles.titulo}>Agendamento</a>
        </li>

        <li className={styles.navItem}>
          <img alt="logo" src={logo} className={styles.logoAstepi}  width="100" height="100" />
        </li>
      </ul>
    </nav>
  )
}

export default HeaderAgendamento;