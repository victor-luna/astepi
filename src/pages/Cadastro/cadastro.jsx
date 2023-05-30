import React, { useState } from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/img/logo-normal.jpg";
import axios from "axios";
import tippy from "tippy.js";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [celular, setCelular] = useState("");
  const [telFixo, setTelFixo] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [profissao, setProfissao] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [naturalidade, setNaturalidade] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [referencia, setReferencia] = useState("");

  tippy("[data-tippy-content]");

  function formatDate(dateStr) {
    const dateParts = dateStr.split("-");
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    return `${day}-${month}-${year}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formattedDate = formatDate(dataNascimento);
    axios
      .post("https://astepi-unicap.herokuapp.com/usuarios", {
        nome,
        cpf,
        rg,
        celular,
        telFixo,
        email,
        username,
        password,
        dataNascimento: formattedDate,
        profissao,
        estadoCivil,
        nacionalidade,
        naturalidade,
      })
      .then((response) => {
        const usuarioId = response.data.id;
        axios
          .post(
            "https://astepi-unicap.herokuapp.com/usuarios/" +
              usuarioId +
              "/enderecos",
            {
              rua,
              numero,
              complemento,
              bairro,
              cidade,
              estado,
              cep,
              referencia,
            }
          )
          .then(() => {
            console.log("Cadastro realizado");
          })
          .catch((error) => {
            console.error("Erro: ", error);
          });
      })
      .catch((error) => {
        console.error("Erro: ", error);
      });
  }

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
        Olá usuário!<br></br> Para conseguir acessar o sistema e realizar seu
        agendamento, é necessario preencher as informações abaixo.
      </p>
      <div className={styles.formData}>
        <form>
          <div className={styles.blocopessoa}>
            <div style={{ transform: "translateY(-53px)" }}>
              <div className={styles.inputnome}>
                <label htmlFor="nome">Nome Completo</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="nome"
                  onChange={(e) => setNome(e.target.value)}
                  name="nome"
                />
              </div>
              <div className={styles.inputcpf}>
                <label htmlFor="cpf">CPF</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="cpf"
                  onChange={(e) => setCpf(e.target.value)}
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
                  onChange={(e) => setRg(e.target.value)}
                  name="rg"
                />
              </div>
              <div className={styles.inputcelular}>
                <label htmlFor="celular">Celular</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="celular"
                  onChange={(e) => setCelular(e.target.value)}
                  name="celular"
                />
              </div>
              <div className={styles.inputtelefone}>
                <label htmlFor="telefone">Telefone</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="telefone"
                  onChange={(e) => setTelFixo(e.target.value)}
                  name="telefone"
                />
              </div>
              <div className={styles.inputemail}>
                <label htmlFor="email">E-mail</label>
                <br />
                <input
                  type="email"
                  className={styles.input}
                  placeholder=""
                  id="email"
                  onChange={(e) => setEmail(e.target.value.toString())}
                  name="email"
                />
              </div>
            </div>

            <div
              style={{
                transform: "translate: translateY(4px)",
                marginLeft: "3.5rem",
              }}
            >
              <div className={styles.inputusername}>
                <label htmlFor="username">Usuário</label>
                <br />
                <input
                  type="username"
                  className={styles.input}
                  placeholder=""
                  id="text"
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                />
              </div>
              <div className={styles.inputpassword}>
                <label htmlFor="senha">Senha</label>
                <br />
                <input
                  type="password"
                  className={styles.input}
                  placeholder=""
                  id="senha"
                  onChange={(e) => setPassword(e.target.value)}
                  name="senha"
                />
              </div>

              <div className={styles.inputConfirmpassword}>
                <label htmlFor="confirmarSenha">Confirmar senha</label>
                <br />
                <input
                  type="password"
                  className={styles.input}
                  placeholder=""
                  id="confirmarSenha"
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  name="senha"
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
                  onChange={(e) => setDataNascimento(e.target.value)}
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
                  onChange={(e) => setProfissao(e.target.value)}
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
                  onChange={(e) => setEstadoCivil(e.target.value)}
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
              <div className={styles.inputnaturalidade}>
                <label htmlFor="naturalidade">Naturalidade</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="naturalidade"
                  onChange={(e) => setNaturalidade(e.target.value)}
                  name="naturalidade"
                />
              </div>
              <div className={styles.inputnacionalidade}>
                <label htmlFor="nacionalidade">Nacionalidade</label>
                <br />
                <input
                  type="text"
                  className={styles.input}
                  placeholder=""
                  id="nacionalidade"
                  onChange={(e) => setNacionalidade(e.target.value)}
                  name="nacionalidade"
                />
              </div>
            </div>
          </div>

          <div
            className={styles.blocoendereco}
            style={{ transform: "translateY(-6px)" }}
          >
            <h2 className={styles.h2}>Endereço</h2>
            <div className={styles.inputrua}>
              <label htmlFor="rua">Rua</label>
              <br />
              <input
                type="text"
                className={styles.input}
                placeholder=""
                id="rua"
                onChange={(e) => setRua(e.target.value)}
                name="rua"
              />
            </div>
            <div className={styles.inputnumero}>
              <label htmlFor="numero">Número</label>
              <br />
              <input
                type="text"
                className={styles.input}
                placeholder=""
                id="numero"
                onChange={(e) => setNumero(e.target.value)}
                name="numero"
              />
            </div>
            <div className={styles.inputcomplemento}>
              <label htmlFor="complmento">Complemento</label>
              <br />
              <input
                type="text"
                className={styles.input}
                placeholder="Ex: Casa ou Apto."
                id="complemento"
                onChange={(e) => setComplemento(e.target.value)}
                name="complemento"
              />
            </div>
            <div className={styles.inputbairro}>
              <label htmlFor="bairro">Bairro</label>
              <br />
              <input
                type="text"
                className={styles.input}
                placeholder=""
                id="bairro"
                onChange={(e) => setBairro(e.target.value)}
                name="bairro"
              />
            </div>
            <div className={styles.inputcidade}>
              <label htmlFor="cidade">Cidade</label>
              <br />
              <input
                type="text"
                className={styles.input}
                required
                placeholder=""
                id="cidade"
                onChange={(e) => setCidade(e.target.value)}
                name="cidade"
              />
            </div>
            <div className={styles.inputestado}>
              <label htmlFor="estado">Estado</label>
              <br />
              <input
                type="text"
                className={styles.input}
                required
                placeholder=""
                id="estado"
                onChange={(e) => setEstado(e.target.value)}
                name="estado"
              />
            </div>
            <div className={styles.inputcep}>
              <label htmlFor="cep">CEP</label>
              <br />
              <input
                type="text"
                className={styles.input}
                required
                placeholder=""
                id="cep"
                onChange={(e) => setCep(e.target.value)}
                name="cep"
              />
            </div>
            <div className={styles.inputreferencia}>
              <label htmlFor="referencia">Referência</label>
              <br />
              <input
                type="text"
                className={styles.input}
                required
                placeholder=""
                id="referencia"
                onChange={(e) => setReferencia(e.target.value)}
                name="referencia"
              />
            </div>
          </div>
        </form>
        {password === confirmarSenha && password != 0 ? (
          <button
            type="submit"
            className={styles.button}
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        ) : (
          <span
            data-tippy-content="As senhas estão diferentes, corrija para se cadastrar!"
            tabindex="0"
            id="tippy-button"
          >
            <button disabled type="submit" className={styles.button}>
              Cadastrar
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

export default Cadastro;
