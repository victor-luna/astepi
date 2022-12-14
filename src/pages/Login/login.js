import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../assets/img/logo-normal.jpg";

function Login() {
  const navigate = useNavigate();

  return (
    <div className={styles.containerLogin}>
      <div className={styles.modalCentral}>
        <div className={styles.modalConteudo}>
          <h1 className={styles.h1}>Login</h1>

          <li className={styles.navItem}>
            <img
              alt="logo"
              src={logo}
              className={styles.headerLogo}
              width="100"
              height="100"
            />
          </li>

          <div className="input">
            <h5 className={styles.h5}>
              {" "}
              Digite seu email ou cpf :<br></br>
            </h5>
            <input type="user" className={styles.input} placeholder="Usuário" />
          </div>

          <div className="input">
            <h5 className={styles.h5}>
              Digite sua senha :<br></br>
            </h5>
            <input
              type="password"
              className={styles.input}
              placeholder="Senha"
            />
          </div>
          <br></br>
          <div className="button-login">
            <button
              className={styles.buttoninicio}
              onClick={() => navigate("/")}
            >
              Início
            </button>
            <button
              className={styles.buttonacessar}
              onClick={() => navigate("/Agendamento")}
            >
              Acessar
            </button>
          </div>
          <div className={styles.cadastro}>
            <a href="/cadastro">Não possui conta?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
