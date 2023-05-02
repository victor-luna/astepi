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
  const [dataNascimento, setDataNascimento] = React.useState(""); //add
  const [profissao, setProfissao] = React.useState(""); //add
  const [estadoCivil, setEstadoCivil] = React.useState(""); //add
  const [nacionalidade, setNacionalidade] = React.useState(""); //add
  const [celular, setCelular] = React.useState(""); //add

  tippy("[data-tippy-content]");

  function formatDate(dateStr) {
    const dateParts = dateStr.split("-");
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    return `${day}-${month}-${year}`;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formattedDate = formatDate(dataNascimento);
    axios
      .post("https://astepi-unicap.herokuapp.com/usuarios", {
        nome: nome + " " + sobrenome,
        email: email,
        senha: senha,
        cpf: cpf,
        dataNascimento: formattedDate,
        profissao: profissao,
        estadoCivil: estadoCivil,
        nacionalidade: nacionalidade,
        celular: Number(celular),
      })
      .then((response) => console.log(response));
  }

  // eslint-disable-next-line
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

        <h1 className={styles.h1}>Cadastro</h1>
      </nav>

      <p className={styles.p}>
        Olá usuário!<br></br> Para conseguir acessar o sistema para agendamento,
        é necessario preencher as informações abaixo.
      </p>
      <div className={styles.formData}>
        <form onSubmit={handleSubmit}>
          <div className={styles.blocopessoa}>
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

            {senha === confirmarSenha && senha !== 0 ? (
              <button type="submit" className={styles.button}>
                Cadastrar
              </button>
            ) : (
              <button disabled type="submit" className={styles.button}>
                Cadastrar
              </button>
            )}

            <div className={styles.inputcpf}>
              <label htmlFor="cpf">CPF</label>
              <br />
              <input
                type="number"
                className={styles.input}
                placeholder=""
                id="cpf"
                onChange={(event) => setCpf(event.target.value)}
                name="cpf"
              />
            </div>

            <div className={styles.inputdatanasc}>
              <label htmlFor="dataNasc">Data de Nascimento</label>
              <br />
              <input
                type="date"
                className={styles.input}
                placeholder=""
                id="dataNasc"
                onChange={(event) => setDataNascimento(event.target.value)}
                name="dataNasc"
              />
            </div>

            <div className={styles.inputprofissao}>
              <label htmlFor="profissao">Profissão</label>
              <br />
              <input
                type="text"
                className={styles.input}
                placeholder=""
                id="profissao"
                onChange={(event) => setProfissao(event.target.value)}
                name="profissao"
              />
            </div>

            <div className={styles.inputestadocivil}>
              <label htmlFor="estadoCivil">Estado Civil</label>
              <br />
              <select
                className={styles.inputselect}
                placeholder=""
                id="estadoCivil"
                onChange={(event) => setEstadoCivil(event.target.value)}
                name="estadoCivil"
              >
                <option className={styles.inputselect}></option>
                <option className={styles.inputselect}>Solteiro</option>
                <option className={styles.inputselect}>Casado</option>
                <option className={styles.inputselect}>Divorciado</option>
                <option className={styles.inputselect}>Separado</option>
                <option className={styles.inputselect}>Viúvo</option>
              </select>
            </div>

            <div className={styles.inputnacionalidade}>
              <label htmlFor="nacionalidade">Nacionalidade</label>
              <br />
              <input
                type="text"
                className={styles.input}
                placeholder=""
                id="nacionalidade"
                onChange={(event) => setNacionalidade(event.target.value)}
                name="nacionalidade"
              />
            </div>
          </div>

          <div className={styles.blocoendereco}>
            <div className={styles.inputrua}>
              <div className={styles.inputnumero}>
                <div className={styles.inputcep}>
                  <div className={styles.inputcomplemento}>
                    <div className={styles.inputcelular}>
                      <label htmlFor="celular">Celular</label>
                      <br />
                      <input
                        type="tel"
                        className={styles.input}
                        required
                        placeholder="(xx) xxxxx-xxxx"
                        id="celular"
                        onChange={(event) =>
                          setCelular(Number(event.target.value))
                        }
                        name="celular"
                      />
                    </div>
                  </div>
                </div>
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
