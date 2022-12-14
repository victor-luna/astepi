import React from "react";
import Header from "../partials/header";
import styles from "./styles.module.scss";
import LogoBranca from "../../assets/img/logo-branca-unicap.png";
import MapIcon from "../../assets/img/mapIcon.png";
import logoFooter from "../../assets/img/logo-unicap-rodape.png";
import logoFooter2 from "../../assets/img/logo-unicap-rodape2.png";
import logoFooter3 from "../../assets/img/logo-normal.jpg";

function Home() {
  return (
    <div className={styles.home}>
      <Header />

      <section className={styles.section1}>
        <div className={styles.modalVermelho}>
          <div className={styles.modalVermelhoConteudo}>
            <p className={styles.modalVermelhoParagrafo}>
              Inscrições abertas para
            </p>
            <div className={styles.modalVermelhoDivider}>
              <p className={styles.modalVermelhoParagrafo2}>
                Mediadores Voluntários
              </p>
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
            <p className={styles.quemSomosT1}>Conheça</p>
            <h1 className={styles.quemSomosT2}>ASTEPI</h1>
            <p className={styles.quemSomosT3}>
              ASSESSORIA DE TREINAMENTO, ESTÁGIO, PESQUISA E INTEGRAÇÃO
            </p>
          </div>

          <div className={styles.quemSomosDescricao}>
            <div className={styles.quemSomosLinhaInicio}></div>
            <div className={styles.quemSomosConteudo}>
              A ASTEPI do Núcleo de Prática Jurídica, criada em 30 de março de
              1974, vem desenvolvendo atividades de ensino, pesquisa e extensão,
              cumprindo seus objetivos institucionais de promoção do
              conhecimento e da prática do exercício das funções jurídicas,
              prestação de servições de assistência jurídica gratuita à
              população carente e de integração do aluno à comunidade, visando,
              acima de tudo, à promoção da justiça social.
            </div>
            <div className={styles.quemSomosLinhaFinal}></div>
          </div>
        </div>
      </section>

      <section className={styles.section3}>
        <div className={styles.atendimento}>
          <p className={styles.atendimentoP1}>COMO FUNCIONA O ATENDIMENTO?</p>
          <div className={styles.quemSomosLinhaFinal2}></div>
          <p className={styles.atendimentoP2}>
            De preferência, é necessário realizar um pré-agendamento no site.
            Para agendar é necessário realizar um cadastro na aba ACESSO RÁPIDO
            (CLIQUE AQUI). Também é possível ir diretamente a nossa Sede, porém
            terão prioridade as pessoas que agendaram previamente.
          </p>
        </div>

        <div className={styles.atendimento2}>
          <p className={styles.atendimentoP3}>
            QUEM PODE RECEBER O ATENDIMENTO?
          </p>
          <div className={styles.quemSomosLinhaFinal2}></div>
          <p className={styles.atendimentoP4}>
            Estão aptos a receber assessoramento/ajuizamento e atendimento
            jurídico pessoas que não podem pagar pelos serviços e que residam no
            município do Recife-PE.
          </p>
        </div>

        <div className={styles.atendimento3}>
          <p className={styles.atendimentoP5}>COMO FUNCIONA O AGENDAMENTO?</p>
          <div className={styles.quemSomosLinhaFinal2}></div>
          <p className={styles.atendimentoP6}>
            É necessário realizar um cadastro básico com algumas informações
            pessoais como: NOME, CPF, ENDEREÇO, COMPROVANTE DE RESIDÊNCIA,
            EMAIL, etc. Após os dados serem conﬁrmados, é possível escolher a
            data e horário mais próximos para atendimento, respeitando o horário
            de funcionamento da ASTEPI.
          </p>
        </div>
      </section>

      <section className={styles.section4}>
        <div>
          <form>
            <div className={styles.contato}>
              <legend>CONTATO</legend>
              <p className={styles.paragrafoContato}>
                <label for="name">NOME:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Digite seu nome"
                />
              </p>
              <p className={styles.paragrafoContato}>
                <label for="email">EMAIL:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Digite seu e-mail"
                />
              </p>
              <p className={styles.paragrafoContato}>
                <label for="number">FONE:</label>
                <input
                  type="number"
                  name="number"
                  id="number"
                  placeholder="Digite seu telefone"
                />
              </p>
              <p className={styles.paragrafoContato}>
                <label for="mensagem">MENSAGEM:</label>
              </p>

              <textarea
                className={styles.textArea}
                id="mensagem"
                name="mensagem"
                rows="5"
                cols="33"
                placeholder="Digite sua mensagem..."
              />

              <button className={styles.buttonSubmit}>Enviar</button>
            </div>
          </form>
        </div>

        <div className={styles.contato2}>
          <h2>ONDE ESTAMOS</h2>
          <p className={styles.paragrafoContato2}>
            SEDE – Rua Afonso Pena, 249, Recife-PE
          </p>
          <img alt="logo" src={MapIcon} width="100" height="100" />
        </div>
      </section>

      <section className={styles.section5}>
        <div className={styles.footer}>
          <p className={styles.footerParagrafo}>TELEFONE: (81) 2119.4157</p>
          <p className={styles.footerParagrafo2}>EMAIL: astepi@unicap.br</p>
        </div>

        <div className={styles.footer2}>
          <img alt="logo" src={logoFooter3} width="100" height="100" />
          <img alt="logo" src={logoFooter} width="100" height="100" />
          <img alt="logo" src={logoFooter2} width="100" height="100" />
        </div>
      </section>

      <p className={styles.finalText}>TODOS OS DIREITOS RESERVADOS.</p>
    </div>
  );
}

export default Home;
