import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../assets/img/logo-normal.jpg";

function Login() {
  const navigate = useNavigate();

  return (
   
    <>
    <div className={styles.container}>
        
     
      <div className={styles.container1}>

      <h2 className={styles.h2}>Login</h2>

        <div className={styles.input}>
          <label for="number">Digite seu Email ou CPF :</label>
          <input type="user" placeholder="Usuário"  id="usuario" name="usuario"/> 
        </div>
      
        <div className={styles.input}>
          <label for="number">Digite sua senha :</label>
          <input type="password" placeholder="Senha" id="senha" name="senha"/>
        </div>

        <div className={styles.buttom}>
       
          <button onClick={() => navigate("/Agendamento")}>Acessar</button>
        </div>

        <div className={styles.buttom}>
        
        <button onClick={()=> navigate("/")}>Início</button>
        </div>

        <div className={styles.cadastro}>
        <a href="/cadastro">Não possui cadastro?</a>
        </div>

      </div>
    
         <div className={styles.container2}>

         <li className={styles.navItem}>
            <img
              alt="logo"
              src={logo}
              className={styles.headerLogo}
              width="100"
              height="100"
            />
          </li>

            <h2 className={styles.h2}>Astepi</h2>
            <h3 className={styles.h2}>Assistencia Judiciária</h3>
         
         <div className={styles.container3}></div>
         
         </div>
    
       </div>
    
  
  
    </>
    
  );
}

export default Login;
