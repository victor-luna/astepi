import React, { useState } from "react";
import Calendar from "react-calendar";
import styles from "./styles.module.css";

function Calendario() {
  const [date, setDate] = useState(new Date());

  function noclique() {
    if (date) {
      alert("Marcado com Sucesso");
    } else {
      alert("Selecione uma data disponivel");
    }
  }

  return (
    <div className={styles.estilo}>
      <Calendar locale={"PT-BR"} onChange={setDate} value={date} />
      {date.toString()}
      <button className={styles.buttoninicio} onClick={noclique}>
        AGENDAR ATENDIMENTO
      </button>
    </div>
  );
}
export default Calendario;
