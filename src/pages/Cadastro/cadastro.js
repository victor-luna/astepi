import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../assets/img/logo-normal.jpg";
import axios from "axios";
import tippy from "tippy.js";

function Cadastro() {
  const [nome, setNome] = React.useState("");
  const [sobrenome, setSobrenome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [rg, setRg] = React.useState("");
  const [endereco, setEndereco] = React.useState("");
  const [cep, setCep] = React.useState("");

  tippy("[data-tippy-content]");

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/pessoas", {
        nome: nome + " " + sobrenome,
        email: email,
        senha: senha,
        cpf: cpf,
        rg: rg,
        endereco: endereco,
        cep: cep,
      })
      .then((response) => console.log(response));
  }

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <nav className={styles.header}>
        <li className={styles.navItem}>
          <img
            alt="logo"
            src={logo}
            className={styles.headerLogo}
            width="100"
            height="100"
          />
        </li>

        <h1 className={styles.h1}>Cadastro de acesso</h1>
      </nav>

      <p className={styles.p}>
        Olá usuário!<br></br> Para conseguir acessar o sistema para agendamento,
        é necessario preencher as informações abaixo.
      </p>
      <div className={styles.formData}>
        <form onSubmit={handleSubmit}>
          <div className={styles.blocoprincipal}>
            <div className={styles.primeirobloco}>
              <div className={styles.inputnome}>
                <label htmlFor="nome">Nome</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="nome"
                  onChange={(event) => setNome(event.target.value)}
                  name="nome"
                />
              </div>

              <div className={styles.inputsobrenome}>
                <label htmlFor="sobrenome">Sobrenome</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="sobrenome"
                  onChange={(event) => setSobrenome(event.target.value)}
                  name="sobrenome"
                />
              </div>

              <div className={styles.inputemail}>
                <label htmlFor="email">Email</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="email"
                  onChange={(event) => setEmail(event.target.value.toString())}
                  name="email"
                />
              </div>

              <div className={styles.inputpass}>
                <label htmlFor="senha">Senha</label>
                <br />
                <input
                  type="password"
                  className={styles.input}
                  placeholder=""
                  id="senha"
                  onChange={(event) => setSenha(event.target.value)}
                  name="senha"
                />
              </div>

              <div className={styles.inputconpass}>
                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                <br />
                <input
                  type="password"
                  className={styles.input}
                  placeholder=""
                  id="confirmarSenha"
                  onChange={(event) => setConfirmarSenha(event.target.value)}
                  name="confirmarSenha"
                />
              </div>

              {senha === confirmarSenha && senha != 0 ? (
                <button type="submit" className={styles.button}>
                  Cadastrar
                </button>
              ) : (
                <span
                  data-tippy-content="As senhas estão diferentes, corrija para se cadastrar!"
                  tabindex="0"
                >
                  <button disabled type="submit" className={styles.button}>
                    Cadastrar
                  </button>
                </span>
              )}
            </div>

            <div className={styles.segundobloco}>
              <div className={styles.inputcpf}>
                <label htmlFor="cpf">CPF</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="cpf"
                  onChange={(event) => setCpf(event.target.value)}
                  name="cpf"
                />
              </div>

              <div className={styles.inputrg}>
                <label htmlFor="rg">RG</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="rg"
                  onChange={(event) => setRg(event.target.value)}
                  name="rg"
                />
              </div>
            </div>

            <div className={styles.terceirobloco}>
              <div className={styles.inputendereco}>
                <label htmlFor="endereco">Endereço</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="endereco"
                  onChange={(event) => setEndereco(event.target.value)}
                  name="endereco"
                />
              </div>

              <div className={styles.inputcep}>
                <label htmlFor="cep">CEP</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="cep"
                  onChange={(event) => setCep(event.target.value)}
                  name="cep"
                />
              </div>
            </div>
          </div>
        </form>
        <div style={{ height: "210px", backgroundColor: "#fafafa" }}></div>
      </div>
    </div>
  );
}
export default Cadastro;
