import React from "react";
import Logo from "../../assets/img/unicap-png-logo.png";
import styles from "./styles.module.scss";

function Header() {
  const handleScrollToAtendimento = (event) => {
    event.preventDefault();

    const sectionAtendimento = document.querySelector("#section-atendimento");
    sectionAtendimento.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <nav className={styles.header}>
      <ul
        className={styles.headerItems}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <li className={styles.navItem}>
          <img
            alt="logo"
            src={Logo}
            className={styles.headerLogo}
            width="100"
            height="100"
          />
        </li>

        <li className={styles.navItem}>
          <a className={styles.navLink} href="/">
            PÁGINA INICIAL
          </a>
        </li>

        <li className={styles.navItem}>
          <a
            className={styles.navLink}
            href="https://portal.unicap.br/w/astepi-assist%C3%8Ancia-judici%C3%81ria"
          >
            CONHEÇA A ASTEPI
          </a>
        </li>

        <li className={styles.navItem}>
          <a
            className={styles.navLink}
            href="/atendimento"
            onClick={handleScrollToAtendimento}
          >
            COMO RECEBER ATENDIMENTO?
          </a>
        </li>

        <li className={styles.navItem}>
          <a className={styles.navLink} href="/login">
            LOGIN
          </a>
        </li>

        {/* <li className={styles.navItem}>
          <a className={styles.navLink} href="/acesso-rapido">
            ACESSO RÁPIDO
          </a>
        </li> */}
      </ul>
    </nav>
  );
}

export default Header;
