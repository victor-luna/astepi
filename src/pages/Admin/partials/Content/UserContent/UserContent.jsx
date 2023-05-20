import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import { FaFolderOpen } from "react-icons/fa";

const UserContent = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ]);

  useEffect(() => {
    axios
      .get("https://astepi-unicap.herokuapp.com/usuarios")
      .then((response) => {
        console.log("get na rota https://astepi-unicap.herokuapp.com/usuarios");
        console.log(response.data);
        // setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2>Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <FaFolderOpen />
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserContent;
