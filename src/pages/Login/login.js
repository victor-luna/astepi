import React, { useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LogoBranca from "../../assets/img/logo-branca-unicap.png";
import backgroundlogin from "../../assets/img/backgroundlogin.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function fetchUserId() {
    if (!username || !password) {
      toast.error("Por favor, digite o login e a senha.");
      return;
    }

    axios
      .get("https://astepi-unicap.herokuapp.com/usuarios", {
        params: {
          username: username,
        },
      })
      .then((response) => {
        const users = response.data;
        if (users.content && users.content.length > 0) {
          const user = users.content.find((user) => user.username === username);
          if (user) {
            authenticateUser(user.id);
          } else {
            toast.error("Usuário não encontrado.");
          }
        } else {
          toast.error("Usuário não encontrado.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar o ID do usuário: ", error);
        toast.error(
          "Erro ao buscar o ID do usuário. Por favor, tente novamente."
        );
      });
  }

  function authenticateUser(userId) {
    axios
      .get(`https://astepi-unicap.herokuapp.com/usuarios/${userId}`, {
        params: {
          password,
        },
      })
      .then((response) => {
        const user = response.data;
        if (user && user.password === password) {
          toast.success("Login realizado com sucesso!");
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        } else {
          toast.error("Senha incorreta.");
        }
      })
      .catch((error) => {
        console.error("Erro: ", error);
        toast.error("Erro ao fazer login. Por favor, tente novamente.");
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchUserId();
  }

  return (
    <>
      <div className={styles.container}>
          <ToastContainer />
          <h1 className={styles.h1}>Login</h1>
          <div className={styles.loginForm}>

          <div className={styles.input}>
            <label htmlFor="usuario">Digite o nome do Usuário:</label> <br></br>
            <input
              type="text"
              placeholder="Usuário"
              id="usuario"
              name="usuario"
              required
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputedit}
            />
          </div>

          <div className={styles.input}>
            <label htmlFor="senha">Digite sua senha :</label> <br></br>
            <input
              type="password"
              placeholder="Senha"
              id="senha"
              name="senha"
              required
              className={styles.inputedit}
            />
          </div>

          <div className={styles.divbuttom}>
            <div className={styles.buttom}>
              <button onClick={(e) => setPassword(e.target.value)}>Acessar</button>
            </div>

            <div className={styles.buttom}>
              <button onClick={() => navigate("/")}>Início</button>
            </div>
          </div>

          <br></br>
          <div className={styles.cadastro}>
            <a href="/cadastro">Não possui cadastro?</a>
          </div>
        </div>

        <div className={styles.container2}>
          <li className={styles.navItem}>
            <img alt="logo" src={LogoBranca} width="150" height="150" />
          </li>

          <h2 className={styles.h2}>Astepi</h2>
          <h2 className={styles.h2}>Assistencia Judiciária</h2>

          <img
            src={backgroundlogin}
            alt="backgroundlogin"
            className={styles.backgroundlogin}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
