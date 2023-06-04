import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import LogoBranca from "../../assets/img/logo-branca-unicap.png";
import backgroundlogin from "../../assets/img/backgroundlogin.png";

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.userLoginPageContent}>
        <div className={styles.container1}>
          <h2 className={styles.h2}>Login</h2>

          <div className={styles.input}>
            <label htmlFor="usuario">Digite seu Email ou CPF :</label> <br></br>
            <input
              type="text"
              placeholder="Usuário"
              id="usuario"
              name="usuario"
              required
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
              <button onClick={() => navigate("/Agendamento")}>Acessar</button>
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
