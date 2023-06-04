import React, { useState, useEffect } from "react";
import axios from "axios";
import UserModal from "./UserModal/UserModal";
import styles from "./styles.module.scss";
import { FaFolderOpen } from "react-icons/fa";

const UserContent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://astepi-unicap.herokuapp.com/usuarios")
      .then((response) => {
        console.log("get na rota https://astepi-unicap.herokuapp.com/usuarios");
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    console.log("clicou");
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h2>Usuários</h2>
      <ul>
        {users.content &&
          users.content.map((user) => (
            <li key={user.id} onClick={() => handleUserClick(user)}>
              <FaFolderOpen />
              <span>
                {`${user.cpf.slice(0, 3)}.${user.cpf.slice(
                  3,
                  6
                )}.${user.cpf.slice(6, 8)}`}
              </span>
              <span className={styles.asterisks}>*-**</span>
            </li>
          ))}
      </ul>
      {isModalOpen && (
        <UserModal
          selectedUser={selectedUser}
          handleCloseModal={handleModalClose}
        />
      )}
    </div>
  );
};

export default UserContent;
