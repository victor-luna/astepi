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

      <section className={styles.section2}>

        <div className={styles.quemSomos}>

          <div className={styles.quemSomosTitulo}>
            <p className={styles.quemSomosT1}>
              Conheça
            </p>
            <h1 className={styles.quemSomosT2}>
              ASTEPI
            </h1>
            <p className={styles.quemSomosT3}>
              ASSESSORIA DE TREINAMENTO, ESTÁGIO, PESQUISA E INTEGRAÇÃO
            </p>
          </div>

          <div className={styles.quemSomosDescricao}>
            <div className={styles.quemSomosLinhaInicio}></div>
            <div className={styles.quemSomosConteudo}>A ASTEPI do Núcleo de Prática Jurídica, criada em 30 de março de 1974, vem desenvolvendo atividades de ensino, pesquisa e extensão, cumprindo seus objetivos institucionais de promoção do conhecimento e da prática do exercício das funções jurídicas, prestação de servições de assistência jurídica gratuita à população carente e de integração do aluno à comunidade, visando, acima de tudo, à promoção da justiça social.</div>
            <div className={styles.quemSomosLinhaFinal}></div>
          </div>

        </div>

      </section>

    </div>
  )
}

export default Home;