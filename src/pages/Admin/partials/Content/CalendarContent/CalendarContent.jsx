import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalendarContent = () => {
  const [calendar, setCalendar] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
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
    cpf: "",
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
      console.error("Erro.", error);
    }
  };

  const handleOpenModal = (schedule) => {
    const user =
      searchResult.find((user) => user.id === schedule.usuario) || {};
    const userName = user.nome || "";

    setSelectedSchedule({ ...schedule, userName });
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

    if (searchResult) {
      setSearchResult(() => []);
    }

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
        console.error("Erro ao buscar os agendamentos.", error);
      }
    }
  };

  const handleSaveSchedule = async () => {
    try {
      const { id, dia, mes, ano, horario, observacao } = selectedSchedule;

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

      toast.success("Agendamento atualizado!");
    } catch (error) {
      console.error("Error updating schedule.", error);
      toast.error("An error occurred while updating the schedule.");
    }
  };

  const handleDeleteSchedule = async () => {
    const confirmed = window.confirm(
      "Você tem certeza que deseja deletar esse agendamento? Essa ação é irreversível."
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

      toast.success("Agendamento deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar agendamento.", error);
      toast.error("Erro ao deletar agendamento. Por favor, tente novamente."); // Show error toast notification
    }
  };

  const handleSearch = async () => {
    if (searchQuery.length < 3) {
      window.alert("Digite pelo menos 3 (três) caractéres.");
      setSearchQuery("");
      return;
    }

    if (isOpenSchedules) {
      setIsOpenSchedules((prevState) => !prevState);
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
      console.error("Erro:", error);
    }
  };

  const SearchResult = ({ users }) => {
    return (
      <div>
        <h4>Usuário(s) encontrado(s):</h4>
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
                      Editar agendamento
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
      const { cpf, ...payload } = newSchedule;
      const userResponse = await axios.get(
        `https://astepi-unicap.herokuapp.com/usuarios`
      );
      const user = userResponse?.data?.content;
      const selectedUser = user.map((usuarioSelecionado) => {
        return usuarioSelecionado.cpf;
      });
      const selectedUserIndex = selectedUser.findIndex(
        (userCPF) => userCPF === cpf
      );
      const foundUser = user[selectedUserIndex];

      console.log(foundUser.nome, "aqui");

      if (!foundUser) {
        toast.error("Usuário não encontrado. Verifique o CPF do usuário.");
        return;
      }

      const scheduleResponse = await axios.post(
        `https://astepi-unicap.herokuapp.com/usuarios/${foundUser.id}/agendamentos`,
        payload
      );

      const createdSchedule = scheduleResponse.data;

      setFetchedSchedules((prevSchedules) => [
        ...prevSchedules,
        {
          ...createdSchedule,
          usuario: foundUser.nome || "",
        },
      ]);

      setSearchCurrentNewSchedule(false);
      setNewSchedule({
        cpf: "",
        ano: "",
        dia: "",
        horario: "",
        mes: "",
        observacao: "",
      });

      toast.success("Agendamento criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar agendamento.", error);
      toast.error("Erro ao criar agendamento. Por favor, tente novamente.");
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
                    {[...new Set(fetchedUserNames)].map(
                      (userName, userIndex) => {
                        const userSchedules = fetchedData.content.filter(
                          (schedule) => {
                            const foundUser = fetchedData.content.some(
                              (data) => data.usuario === schedule.usuario
                            );

                            return foundUser;
                          }
                        );

                        return (
                          <li key={userIndex}>
                            {userName}

                            {userSchedules && (
                              <ul className={`${styles.scheduleList}`}>
                                {userSchedules.map(
                                  (schedule, scheduleIndex) => {
                                    const {
                                      dia,
                                      mes,
                                      ano,
                                      horario,
                                      observacao,
                                    } = schedule;
                                    const scheduleDate = `${ano}-${parseInt(
                                      mes
                                    )}-${dia}`;

                                    if (scheduleDate === selectedDate) {
                                      return (
                                        <li
                                          key={`${userName}-${scheduleIndex}`}
                                        >
                                          <span>{horario}</span> - {observacao}
                                        </li>
                                      );
                                    }

                                    return null;
                                  }
                                )}
                              </ul>
                            )}
                          </li>
                        );
                      }
                    )}
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
        <ToastContainer />
        <div
          className={styles.searchContainer}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <button onClick={() => handleOpenNewScheduleModal()}>
            Criar um agendamento
          </button>
          <button onClick={handleOpenSchedules}>
            {isOpenSchedules ? "Fechar agendamentos" : "Buscar agendamentos"}
          </button>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Digite o nome ou Id do usuário"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>
              Buscar por nome ou Id do Usuário
            </button>
          </div>
        </div>

        {searchCurrentNewSchedule && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <button
                className={styles.closeButton}
                onClick={handleCloseNewSchedule}
                style={{ left: "344px", top: "0", marginBottom: "0" }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <h3
                style={{
                  margin: 0,
                  marginBottom: "16px",
                  transform: "translate(-2px, -30px)",
                }}
              >
                Crie um Agendamento
              </h3>
              <form>
                <div className={styles.formRow}>
                  <label htmlFor="cpf">CPF do Usuário:</label>
                  <input
                    type="text"
                    id="cpf"
                    value={newSchedule?.cpf}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        cpf: e.target.value,
                      })
                    }
                    placeholder="CPF"
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="dia">Dia (ex: 12):</label>
                  <input
                    type="text"
                    id="dia"
                    value={newSchedule?.dia}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        dia: e.target.value,
                      })
                    }
                    placeholder="Dia"
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="mes">Mês (ex: 06):</label>
                  <input
                    type="text"
                    id="mes"
                    value={newSchedule?.mes}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        mes: e.target.value,
                      })
                    }
                    placeholder="Mês"
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="ano">Ano (ex: 2023):</label>
                  <input
                    type="text"
                    id="ano"
                    value={newSchedule?.ano}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        ano: e.target.value,
                      })
                    }
                    placeholder="Ano"
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="horario">Horário (ex: 15h):</label>
                  <input
                    type="text"
                    id="horario"
                    value={newSchedule?.horario}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        horario: e.target.value,
                      })
                    }
                    placeholder="Horario"
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="observacao">Observação:</label>
                  <input
                    type="text"
                    id="observacao"
                    value={newSchedule?.observacao}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        observacao: e.target.value,
                      })
                    }
                    placeholder="Observação"
                  />
                </div>

                <div className={styles.formRow}>
                  <button
                    onClick={(event) =>
                      handleCreateSchedule(event, newSchedule)
                    }
                  >
                    Criar agendamento
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isOpenSchedules && (
          <>
            <div className={styles.schedulesAll}>
              {fetchedSchedules.map((schedule, index) => (
                <div className={styles.schedule} key={index}>
                  <p>{schedule.usuario}</p>
                  <p>
                    {schedule.horario} ({schedule.dia}/{schedule.mes}/
                    {schedule.ano})
                  </p>
                  <p>{schedule.observacao}</p>
                  <button onClick={() => handleOpenModal(schedule)}>
                    Editar agendamento
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {searchResult.length > 0 && <SearchResult users={searchResult} />}

        {isModalOpen && (
          <div className={styles.modal}>
            {console.log("isModalOpen", selectedSchedule)}
            <div className={styles.modalContent}>
              <div style={{ display: "flex" }}>
                <button onClick={() => handleDeleteSchedule()}>
                  Deletar Agendamento
                </button>
                <button
                  className={styles.closeButton}
                  onClick={handleCloseModal}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <h2 style={{ marginTop: "35px" }}>
                {selectedSchedule.userName &&
                  `Agendamento de ${selectedSchedule.userName}`}
              </h2>
              {console.log(selectedSchedule, "selectedSchedule")}

              <form>
                <div className={styles.formRow}>
                  <label htmlFor="horario">Horário (ex: 19h):</label>
                  <input
                    type="text"
                    id="horario"
                    value={selectedSchedule.horario}
                    onChange={(e) =>
                      setSelectedSchedule({
                        ...selectedSchedule,
                        horario: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="dia">Dia (ex: 15):</label>
                  <input
                    type="text"
                    id="dia"
                    value={selectedSchedule.dia}
                    onChange={(e) =>
                      setSelectedSchedule({
                        ...selectedSchedule,
                        dia: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="mes">Mês (ex: 06):</label>
                  <input
                    type="text"
                    id="mes"
                    value={selectedSchedule.mes}
                    onChange={(e) =>
                      setSelectedSchedule({
                        ...selectedSchedule,
                        mes: e.target.value,
                      })
                    }
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="ano">Ano (ex: 2023):</label>
                  <input
                    type="text"
                    id="ano"
                    value={selectedSchedule.ano}
                    onChange={(e) =>
                      setSelectedSchedule({
                        ...selectedSchedule,
                        ano: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  className={styles.formRow}
                  style={{ marginBottom: "45px" }}
                >
                  <label htmlFor="observacao">Observação:</label>
                  <input
                    type="text"
                    id="observacao"
                    value={selectedSchedule.observacao}
                    onChange={(e) =>
                      setSelectedSchedule({
                        ...selectedSchedule,
                        observacao: e.target.value,
                      })
                    }
                  />
                </div>
              </form>

              <button
                onClick={handleSaveSchedule}
                className={styles.editSchedule}
              >
                Editar Agendamento
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CalendarContent;
