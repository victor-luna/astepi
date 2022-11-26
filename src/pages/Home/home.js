import React from "react";
import Header from "../partials/header";
import styles from "./styles.module.scss"
import LogoBranca from '../../assets/img/logo-branca-unicap.png'

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
            <img alt="logo" src={LogoBranca} width="100" height="100" />
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
      
      <section className={styles.section3}>
        
          <div className={styles.atendimento}>
            <p className={styles.atendimentoP1}>COMO FUNCIONA O ATENDIMENTO?</p>
            <div className={styles.quemSomosLinhaFinal2}></div>
            <p className={styles.atendimentoP2}>De preferência, é necessário realizar um pré-agendamento no site. Para agendar é necessário realizar um cadastro na aba ACESSO RÁPIDO (CLIQUE AQUI). Também é possível ir diretamente a nossa Sede, porém terão prioridade as pessoas que agendaram previamente.</p>
          </div>

          <div className={styles.atendimento2}>
            <p className={styles.atendimentoP3}>QUEM PODE RECEBER O ATENDIMENTO?</p>
            <div className={styles.quemSomosLinhaFinal2}></div>
            <p className={styles.atendimentoP4}>Estão aptos a receber assessoramento/ajuizamento e atendimento jurídico pessoas que não podem pagar pelos serviços e que residam no município do Recife-PE.</p>
          </div>

          <div className={styles.atendimento3}>
            <p className={styles.atendimentoP5}>COMO FUNCIONA O AGENDAMENTO?</p>
            <div className={styles.quemSomosLinhaFinal2}></div>
            <p className={styles.atendimentoP6}>É necessário realizar um cadastro básico com algumas informações pessoais como: NOME, CPF, ENDEREÇO, COMPROVANTE DE RESIDÊNCIA, EMAIL, etc. Após os dados serem conﬁrmados, é possível escolher a data e horário mais próximos para atendimento, respeitando o horário de funcionamento da ASTEPI.</p>
          </div>

      </section>

    </div>
  )
}

export default Home;