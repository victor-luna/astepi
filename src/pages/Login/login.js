import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


function Login() {
    
  
  const navigate = useNavigate();

  return (
      <div className={styles.containerLogin} >        
        <div className={styles.modalCentral}>
          <div className={styles.modalConteudo}>
            <h1>Login</h1>

            <div className='input'>
              <input type="user" placeholder='Usuario' />
            </div>
            <br></br>
            <div className='input'>
              <input type="password" placeholder='Senha' />
            </div>
            <br></br>
            <div className='button-login'>
            <button className='button-inicio' onClick={(() => navigate("/"))} >Inicio</button>
            <button className='button-acessar'>Acessar</button>
            </div>
            <div className='cadastro'>
              <a href="/cadastro">Não possui conta?</a>
            </div>
          </div>
        </div>
      </div>


    );
  }
  
  export default Login;