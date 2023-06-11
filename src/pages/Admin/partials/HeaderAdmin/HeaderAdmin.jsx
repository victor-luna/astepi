import React from "react";
import Logo from "../../../../assets/img/unicap-png-logo.png";
import styles from "./styles.module.scss";

const HeaderAdmin = () => {
  return (
    <nav className={styles.header}>
      <ul className={styles.headerItems}>
        <li
          className={styles.navItem}
          style={{
            width: "250px",
            maxWidth: "250px",
            justifyContent: "center",
            display: "flex",
            background: "#582424",
            margin: 0,
            padding: "8px 0 8px 0",
          }}
        >
          <a href="/" alt="Ir para página inicial">
            <img
              alt="logo"
              src={Logo}
              className={styles.headerLogo}
              width="100"
              height="100"
            />
          </a>
        </li>

        <li
          className={styles.navItem}
          style={{
            width: "80%",
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a className={styles.navLink} href="/">
            PAINEL ASTEPI
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderAdmin;
