import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import axios from "axios";

const CalendarContent = () => {
  const [calendar, setCalendar] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [fetchedUserNames, setFetchedUserNames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedSchedules, setFetchedSchedules] = useState([]);
  const [isOpenSchedules, setIsOpenSchedules] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchCurrentNewSchedule, setSearchCurrentNewSchedule] =
    useState(false);
  const [newSchedule, setNewSchedule] = useState({
    userId: "",
    ano: "",
    dia: "",
    horario: "",
    mes: "",
    observacao: "",
  });

  useEffect(() => {
    const getCalendarDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const days = [];

      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(year, month, i);
        const dayOfWeek = date.getDay();
        days.push({ day: i, dayOfWeek });
      }

      for (let i = 0; i < firstDay.getDay(); i++) {
        days.unshift(null);
      }

      setCalendar(days);
    };

    getCalendarDays();
  }, [currentMonth]);

  const handleClick = async (day) => {
    if (!day) {
      return;
    }

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    const dayOfMonth = day.day;
    const dateString = `${year}-${month}-${dayOfMonth}`;

    setSelectedDate(dateString);

    try {
      const response = await axios.get(
        "https://astepi-unicap.herokuapp.com/agendamentos"
      );
      setFetchedData(response.data);
      console.log(response);
      const userIds = response.data.content.map((item) => item.usuario);
      const usersPromises = userIds.map((userId) =>
        axios.get(`https://astepi-unicap.herokuapp.com/usuarios/${userId}`)
      );

      const usersResponses = await Promise.all(usersPromises);
      const userNames = usersResponses.map((userResponse) => {
        const matchingAgendamentos = userResponse.data.agendamentos;

        const hasScheduledAppointments = matchingAgendamentos.some(
          (agendamento) => {
            const agendamentoDia = parseInt(agendamento.dia, 10);
            const agendamentoMes = parseInt(agendamento.mes, 10);

            return (
              agendamentoDia === dayOfMonth &&
              agendamentoMes === month &&
              agendamento.ano === year.toString()
            );
          }
        );

        if (hasScheduledAppointments) {
          return userResponse.data.nome;
        }

        return null;
      });

      const filteredUserNames = userNames.filter(Boolean);
      setFetchedUserNames(filteredUserNames);
      console.log(usersResponses, "usersResponses");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenModal = (schedule) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseNewSchedule = () => {
    setSearchCurrentNewSchedule(false);
  };

  const handleOpenSchedules = async () => {
    setIsOpenSchedules((prevState) => !prevState);

    if (!isOpenSchedules) {
      try {
        const response = await axios.get(
          "https://astepi-unicap.herokuapp.com/agendamentos"
        );

        const schedules = response?.data?.content || [];
        const userIds = schedules.map((schedule) => schedule.usuario);

        const userPromises = userIds.map((userId) =>
          axios.get(`https://astepi-unicap.herokuapp.com/usuarios/${userId}`)
        );

        const usersResponses = await Promise.all(userPromises);
        const users = usersResponses.map(
          (userResponse) => userResponse?.data || {}
        );

        const formattedSchedules = schedules.map((schedule) => {
          const { id, dia, mes, ano, horario, observacao, usuario } = schedule;
          const user = users.find((user) => user.id === usuario) || {};

          return {
            id,
            dia,
            mes,
            ano,
            horario,
            observacao,
            usuario: user.nome || "",
          };
        });

        setFetchedSchedules(formattedSchedules || []);
      } catch (error) {
        console.error("Erro ao buscar os agendamentos: ", error);
      }
    }
  };

  const handleSaveSchedule = async () => {
    try {
      const { id, dia, mes, ano, horario, observacao } = selectedSchedule;

      // Make the PUT request to update the schedule
      await axios.put(
        `https://astepi-unicap.herokuapp.com/agendamentos/${id}`,
        {
          dia,
          mes,
          ano,
          horario,
          observacao,
        }
      );

      // Update the necessary state variables
      // Close the modal, reset form fields, or perform any other required actions
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const handleDeleteSchedule = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const { id } = selectedSchedule;

      await axios.delete(
        `https://astepi-unicap.herokuapp.com/agendamentos/${id}`
      );

      setFetchedSchedules((prevSchedules) =>
        prevSchedules.filter((schedule) => schedule.id !== id)
      );

      handleCloseModal();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.length < 3) {
      window.confirm("Digite pelo menos 3 (três) caractéres.");
      setSearchQuery("");
      return;
    }

    try {
      const response = await axios.get(
        `https://astepi-unicap.herokuapp.com/usuarios`
      );

      const matchingUsers = response.data.content;

      const filteredUsers = matchingUsers.filter((user) => {
        const name = user.nome.toLowerCase();
        const id = user.id.toLowerCase();
        const query = searchQuery.toLowerCase();

        return name.includes(query) || id.includes(query);
      });

      setSearchResult(filteredUsers);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const SearchResult = ({ users }) => {
    return (
      <div>
        <h4>Matching Users:</h4>
        {users.length > 0 ? (
          <ul className={styles.userList}>
            {users.map((user, index) => (
              <div className={styles.schedule} key={index}>
                <p>{user.nome}</p>
                {user.agendamentos.map((schedule, scheduleIndex) => (
                  <div key={scheduleIndex}>
                    <p>
                      {schedule.horario} ({schedule.dia}/{schedule.mes}/
                      {schedule.ano})
                    </p>
                    <p>{schedule.observacao}</p>
                    <button onClick={() => handleOpenModal(schedule)}>
                      Edit Schedule
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </ul>
        ) : (
          <p>No matching users found!</p>
        )}
      </div>
    );
  };

  const handleOpenNewScheduleModal = () => {
    setSearchCurrentNewSchedule((prevState) => !prevState);
  };

  const handleCreateSchedule = async (event, newSchedule) => {
    event.preventDefault();

    try {
      const { userId, ...payload } = newSchedule;
      // Make the POST request to create a new schedule
      const response = await axios.post(
        `https://astepi-unicap.herokuapp.com/usuarios/${newSchedule.userId}/agendamentos`,
        payload
      );

      const createdSchedule = response.data;

      setFetchedSchedules((prevSchedules) => [
        ...prevSchedules,
        createdSchedule,
      ]);
      setSearchCurrentNewSchedule(false);
      setNewSchedule({
        userId: "",
        ano: "",
        dia: "",
        horario: "",
        mes: "",
        observacao: "",
      });
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  return (
    <>
      <div className={styles.calendar}>
        <div className={styles.header}>
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1
                )
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
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1
                )
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
        <div className={`${styles.fetchedData}`}>
          {fetchedData ? (
            <div className={`${styles.fetchedDataInner}`}>
              {fetchedUserNames.length > 0 ? (
                <div>
                  <h4>Usuários:</h4>
                  <ul className={`${styles.userList}`}>
                    {fetchedUserNames.map((userName, userIndex) => (
                      <li key={userIndex}>{userName}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <p className={`${styles.emptyListMessage}`}>
                    Não há agendamentos para este dia!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.WelcomeMessage}>
              <p>Selecione a data para ver os agendamentos!</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.crudMenu}>
        <div
          className={styles.searchContainer}
          style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
        >
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search by name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <button onClick={handleOpenSchedules}>
            {isOpenSchedules ? "Fechar agendamentos" : "Buscar agendamentos"}
          </button>
          <button onClick={() => handleOpenNewScheduleModal()}>Create</button>
        </div>
        {searchResult.length > 0 && <SearchResult users={searchResult} />}

        {searchCurrentNewSchedule && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <button
                className={styles.closeButton}
                onClick={handleCloseNewSchedule}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <form>
                <input
                  type="text"
                  value={newSchedule?.userId}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      userId: e.target.value,
                    })
                  }
                  placeholder="User Id"
                />
                <input
                  type="text"
                  value={newSchedule?.ano}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      ano: e.target.value,
                    })
                  }
                  placeholder="Ano"
                />
                <input
                  type="text"
                  value={newSchedule?.dia}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      dia: e.target.value,
                    })
                  }
                  placeholder="Dia"
                />
                <input
                  type="text"
                  value={newSchedule?.horario}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      horario: e.target.value,
                    })
                  }
                  placeholder="Horario"
                />
                <input
                  type="text"
                  value={newSchedule?.mes}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      mes: e.target.value,
                    })
                  }
                  placeholder="Mês"
                />
                <input
                  type="text"
                  value={newSchedule?.observacao}
                  onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      observacao: e.target.value,
                    })
                  }
                  placeholder="Observação"
                />

                <button
                  onClick={(event) => handleCreateSchedule(event, newSchedule)}
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        )}

        {isOpenSchedules && (
          <>
            {fetchedSchedules.map((schedule, index) => (
              <div className={styles.schedule} key={index}>
                <p>{schedule.usuario}</p>
                <p>
                  {schedule.horario} ({schedule.dia}/{schedule.mes}/
                  {schedule.ano})
                </p>
                <p>{schedule.observacao}</p>
                <button onClick={() => handleOpenModal(schedule)}>
                  Edit Schedule
                </button>
              </div>
            ))}
          </>
        )}
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              {<h2>Agendamento de {selectedSchedule.usuario}</h2>}
              {console.log(selectedSchedule, "selectedSchedule")}

              <form>
                <input
                  type="text"
                  value={selectedSchedule.horario}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      horario: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={selectedSchedule.dia}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      dia: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={selectedSchedule.mes}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      mes: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={selectedSchedule.ano}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      ano: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={selectedSchedule.observacao}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      observacao: e.target.value,
                    })
                  }
                />
              </form>

              {/* Save/Update Button */}
              <button onClick={handleSaveSchedule}>Save/Update Schedule</button>

              {/* Delete Button */}
              <button onClick={() => handleDeleteSchedule()}>
                Delete Schedule
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CalendarContent;
