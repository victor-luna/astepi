import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import axios from "axios";

const CalendarContent = () => {
  const [calendar, setCalendar] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const getCalendarDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const days = [];

      for (let i = 1; i <= lastDay.getDate(); i++) {
        // Cria array representando o mês e dias da semana
        const date = new Date(year, month, i);
        const dayOfWeek = date.getDay();
        days.push({ day: i, dayOfWeek });
      }

      for (let i = 0; i < firstDay.getDay(); i++) {
        // Define o primeiro dia do mês, removendo dias do mês anterior
        days.unshift(null);
      }

      setCalendar(days);
    };

    getCalendarDays();
  }, [currentMonth]);

  const handleClick = (day) => {
    if (!day) {
      return;
    }

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const dayOfMonth = day.day;
    const dateString = `${year}-${month}-${dayOfMonth}`;

    setSelectedDate(dateString);

    axios
      .get("https://astepi-unicap.herokuapp.com/agendamentos")
      .then((response) => {
        console.log(response.data);
        setFetchedData(response.data);
      })
      .catch((error) => {
        console.error("Erro na requisição do calendário!", error);
      });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
        >
          Anterior
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <h2 className={styles.tituloCalendar}>
            {currentMonth.toLocaleString("default", {
              month: "long",
            })}
          </h2>{" "}
          <span className={styles.tituloAnoCalendar}>
            {currentMonth.toLocaleString("default", {
              year: "numeric",
            })}
          </span>
        </div>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
        >
          Próximo
        </button>
      </div>
      <div className={styles.daysOfWeek}>
        <span className={styles.daysOfWeek1}>D</span>
        <span className={styles.daysOfWeek2}>S</span>
        <span className={styles.daysOfWeek3}>T</span>
        <span className={styles.daysOfWeek4}>Q</span>
        <span className={styles.daysOfWeek5}>Q</span>
        <span className={styles.daysOfWeek6}>S</span>
        <span className={styles.daysOfWeek7}>S</span>
      </div>
      <div className={styles.days}>
        {calendar.map((day, index) => (
          <div
            key={index}
            className={`${styles.day} ${!day && styles.empty} ${
              selectedDate ===
              `${currentMonth.getFullYear()}-${currentMonth.getMonth() + 1}-${
                day?.day
              }`
                ? styles.selected
                : ""
            }`}
            onClick={() => handleClick(day)}
          >
            {day && day.day}
          </div>
        ))}
      </div>
      <div className={styles.fetchedData}>
        {fetchedData ? (
          <div className={styles.fetchedDataInner}>
            Agendamento em
            https://astepi-unicap.herokuapp.com/agendamentos/id-agendamento
          </div>
        ) : (
          <div>Agendamento do dia não disponível</div>
        )}
      </div>
    </div>
  );
};

export default CalendarContent;
