import React from "react";
import Header from "../partials/header";
import styles from "./styles.module.scss"

function Home() {
  return (
    <div className={styles.home}>
      <Header />         
      <section className={styles.section1}>
        <div className={styles.modalVermelho}>
          <div className={styles.modalVermelhoConteudo}>
            <p className={styles.modalVermelhoParagrafo}>Inscrições abertas para</p>
            <div className={styles.modalVermelhoDivider}>
              <p className={styles.modalVermelhoParagrafo2}>Mediadores Voluntários</p>
              <p className={styles.modalVermelhoParagrafo3}>ASTEPI</p>
            </div>
            <p className={styles.modalVermelhoParagrafo4}>Contato: 2119-4157</p>
            <p className={styles.modalVermelhoLogoUnicap}>LOGO UNICAP</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home;