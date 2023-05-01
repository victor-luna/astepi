import React, { useState } from "react";
import HeaderAdmin from "./partials/HeaderAdmin/HeaderAdmin";
import Sidebar from "./partials/SideBar/SideBar";
import Content from "./partials/Content/Content";
import styles from "./styles.module.scss";

const Admin = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");

  const menuItems = [
    { label: "Painel de controle", icon: "dashboard" },
    { label: "Usuários", icon: "users" },
    { label: "Calendário", icon: "cog" },
  ];

  const contents = {
    "Painel de controle": <p>Conteúdo Painel de controle</p>,
    Usuários: <p>Conteúdo usuário</p>,
    Calendário: <p>Conteúdo calendário</p>,
  };

  return (
    <>
      <HeaderAdmin />
      <div className={styles.adminWrapper}>
        <Sidebar
          menuItems={menuItems}
          selectedMenuItem={selectedMenuItem}
          setSelectedMenuItem={setSelectedMenuItem}
        />
        <Content selectedMenuItem={selectedMenuItem} contents={contents} />
      </div>
    </>
  );
};

export default Admin;
