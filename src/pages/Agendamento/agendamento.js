import HeaderAgendamento from "../partials/headerAgendamento";
import styles from "./styles.module.css";
import Calendario from "../../Calendar";
import 'react-calendar/dist/Calendar.css';

function Agendamento() {
  
  return (
    <div>
        <HeaderAgendamento />
        <h3 className={styles.h3Msg}>MARQUE SEU ATENDIMENTO ESCOLHENDO O MELHOR DIA E HORÁRIO:</h3>
    <div>
      <Calendario/>
    </div>
    </div>
  )
}


export default Agendamento;