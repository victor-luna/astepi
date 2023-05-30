import React, { useState } from "react";
import HeaderAdmin from "./partials/HeaderAdmin/HeaderAdmin";
import Sidebar from "./partials/SideBar/SideBar";
import UserContent from "./partials/Content/UserContent/UserContent";
import CalendarContent from "./partials/Content/CalendarContent/CalendarContent";
import {
  faUsers,
  faCalendarDays,
  faGaugeHigh,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";

const Admin = () => {
  const [selectedMenuItem, setSelectedMenuItem] =
    useState("Painel de controle");

  const menuItems = [
    { label: "Painel de controle", icon: faGaugeHigh, color: "lightgray" },
    { label: "Usuários", icon: faUsers, color: "lightgray" },
    { label: "Calendário", icon: faCalendarDays, color: "lightgray" },
    { label: "Novo usuário", icon: faPlus, color: "lightgray" },
  ];

  const getContent = () => {
    switch (selectedMenuItem) {
      case "Painel de controle":
        return "Escolha uma opção ao lado";
      case "Usuários":
        return <UserContent />;
      case "Calendário":
        return <CalendarContent />;
      default:
        return null;
    }
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
        <div className={styles.content}>{getContent()}</div>
      </div>
    </>
  );
};

export default Admin;
