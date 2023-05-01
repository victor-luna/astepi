import React from "react";
import styles from "./styles.module.scss";

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
          <i className={`fas fa-${item.icon} ${styles.sidebarIcon}`}></i>
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
