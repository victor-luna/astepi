import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import logo from '../../assets/img/logo-normal.jpg'
//Components React Bootstrap
//import InputGroup from 'react-bootstrap/InputGroup';  //new
//import Button from 'react-bootstrap/Button';

function Cadastro(){

    const navigate = useNavigate();

return(

    
<div className={styles.container}>

<li className={styles.navItem}>
<img alt="logo" src={logo} className={styles.headerLogo}  width="100" height="100" />
</li>

<h1 className={styles.h1}>Cadastro de acesso</h1>


<p className={styles.p}>Olá usuário!<br></br> Para conseguir acessar o sistema para agendamento, é necessario preencher as informações abaixo.</p>



<div className={styles.linha1} />

<div className={styles.linha2} />

<div className={styles.primeirobloco}>

<div className={styles.inputnome}>
    Nome<br></br>
<input type="user" placeholder='' />
<br></br>
</div>

<div className={styles.inputsobrenome}>
Sobrenome<br></br>
<input type="user" placeholder='' />
<br></br>
</div>

</div>



<div className={styles.segundobloco}>

<div className={styles.inputemail}>
E-mail<br></br>  
<input type="email" placeholder='' />
<br></br>
</div>

<div className={styles.inputpass}>
Senha<br></br>
<input type="password" placeholder='' />
<br></br>
</div>

<div className={styles.inputconpass}>
Confirmar senha<br></br>
<input type="password" placeholder='' />
<br></br>
</div>


</div>



<div className={styles.terceirobloco}>

<div className={styles.inputcpf}>
CPF<br></br>
<input type="number" placeholder='' />
<br></br>
</div>

<div className={styles.inputrg}>
RG<br></br>
<input type="number" placeholder='' />
<br></br>
</div>

</div>



<div className={styles.quartobloco}>

<div className={styles.inputendereco}>
Endereço<br></br>
<input type="text" placeholder='' />
<br></br>
</div>

<div className={styles.inputcep}>
CEP<br></br>
<input type="number" placeholder='' />
</div>

</div>



<button  className={styles.button} onClick={(() => navigate("/Agendamento"))} >Cadastrar</button>


</div>



);




 }
 export default Cadastro;