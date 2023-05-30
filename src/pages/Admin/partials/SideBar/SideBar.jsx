import React from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ menuItems, selectedMenuItem, setSelectedMenuItem }) => {
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
    </div>
  );
};

export default Sidebar;
