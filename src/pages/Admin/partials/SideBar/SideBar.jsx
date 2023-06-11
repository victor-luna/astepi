import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

const Sidebar = ({ menuItems, selectedMenuItem, setSelectedMenuItem }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/login");
  };

  return (
    <div className={styles.sidebar}>
      {menuItems.map((item) => (
        <div
          key={item.label}
          className={`${styles.sidebarItem} ${
            selectedMenuItem === item.label ? styles.selected : ""
          }`}
          onClick={() => setSelectedMenuItem(item.label)}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={styles.sidebarIcon}
            style={{ color: item.color }}
          />
          {item.label}
        </div>
      ))}
      <div className={styles.sidebarItem} onClick={handleExit}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.sidebarIcon} />
        Sair
      </div>
    </div>
  );
};

export default Sidebar;
