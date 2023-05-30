import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import tippy from "tippy.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [celular, setCelular] = useState("");
  const [telFixo, setTelFixo] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  tippy("[data-tippy-content]");

  function formatDate(dateStr) {
    const dateParts = dateStr.split("-");
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    return `${day}-${month}-${year}`;
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      window.alert("As senhas não coincidem.");
    } else {
      setPasswordMatch(true);
    }
  };

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
        dataNascimento: formattedDate, // Envia a data formatada para o backend
        profissao,
        estadoCivil,
        nacionalidade,
        naturalidade,
      })
      .then((response) => {
        const usuarioId = response.data.id; // Extrai o ID do usuário gerado
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
            setCadastroSucesso(true);
            toast.success("Cadastro realizado com sucesso!"); // Exibe o alerta de sucesso
          })
          .catch((error) => {
            // Tratamento de erro do segundo POST
            console.error(error);
          });
      })
      .catch((error) => {
        // Tratamento de erro do primeiro POST
        console.error(error);
      });
  }

  return (
    <>
      <form className={styles.cadastroForm} onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <label>
          Nome completo:
          <input
            type="text"
            placeholder=""
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          CPF:
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          RG:
          <input
            type="text"
            value={rg}
            onChange={(e) => setRg(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Celular:
          <input
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Telefone Fixo:
          <input
            type="text"
            value={telFixo}
            onChange={(e) => setTelFixo(e.target.value)}
          />
        </label>
        <br />
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Login:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <br />
        <label>
          Confirmar Senha:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            required
          />
        </label>
        <br />
        <label>
          Data de Nascimento:
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
            placeholder="dd-mm-aaaa"
          />
        </label>
        <br />
        <label>
          Profissão:
          <input
            type="text"
            value={profissao}
            onChange={(e) => setProfissao(e.target.value)}
          />
        </label>
        <br />
        <label>
          Estado Civil:
          <select
            value={estadoCivil}
            onChange={(e) => setEstadoCivil(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="solteiro(a)">Solteiro(a)</option>
            <option value="casado(a)">Casado(a)</option>
            <option value="divorciado(a)">Divorciado(a)</option>
            <option value="viuvo(a)">Viúvo(a)</option>
          </select>
        </label>
        <br />
        <label>
          Naturalidade:
          <input
            type="text"
            value={naturalidade}
            onChange={(e) => setNaturalidade(e.target.value)}
          />
        </label>
        <br />
        <label>
          Nacionalidade:
          <input
            type="text"
            value={nacionalidade}
            onChange={(e) => setNacionalidade(e.target.value)}
          />
        </label>
        <br />
        <h3>Endereço</h3>
        <label>
          Rua:
          <input
            type="text"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
          />
        </label>
        <br />
        <label>
          Número:
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </label>
        <br />
        <label>
          Complemento:
          <input
            type="text"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </label>
        <br />
        <label>
          Bairro:
          <input
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </label>
        <br />
        <label>
          Cidade:
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </label>
        <br />
        <label>
          Estado:
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </label>
        <br />
        <label>
          CEP:
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </label>
        <br />
        <label>
          Referência:
          <input
            type="text"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />{" "}
      {/* Container para exibir os alertas */}
    </>
  );
};

export default Cadastro;
