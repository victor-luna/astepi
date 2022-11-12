import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";


function Cadastro(){

    const navigate = useNavigate();

return(

    
<div className={styles.container}>

<h1 className={styles.h1}>Cadastro de acesso</h1>

<p className={styles.p}>Olá usuário!<br></br> Para conseguir acessar o sistema para agendamento, é necessario preencher as informações abaixo.</p>

<div className={styles.inputnome}>
<input type="user" placeholder='Nome' />
<br></br>
<input type="user" placeholder='Sobrenome' />
<br></br>
</div>

<div className={styles.inputconectar}>
<input type="email" placeholder='E-mail' />
<br></br>
<input type="password" placeholder='Senha' />
<br></br>
<input type="password" placeholder='Confirmar senha' />
<br></br>
</div>

<div className={styles.inputdocumentos}>
<input type="number" placeholder='CPF' />
<br></br>
<input type="number" placeholder='RG' />
<br></br>
</div>

<div className={styles.inputendereco}>
<input type="text" placeholder='Endereço' />
<br></br>
<input type="number" placeholder='CEP' />
</div>


<button className={styles.button} onClick={(() => navigate("/Agendamento"))} >Cadastrar</button>

</div>




);




 }
 export default Cadastro;