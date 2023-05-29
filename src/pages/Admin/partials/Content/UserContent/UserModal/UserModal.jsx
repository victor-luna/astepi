import React, { useState } from "react";
import { FaFolderOpen } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";

const UserModal = ({ selectedUser, handleCloseModal }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [showFormSidebar, setShowFormSidebar] = useState(false);

  const formSidebarItems = [
    { label: "Análise Socioeconômica", icon: "chart-bar" },
    { label: "Declaração Inicial", icon: "file-alt" },
  ];

  const menuItems = [
    { label: "Formulários", icon: "dashboard", sidebarItems: formSidebarItems },
    { label: "Documentos", icon: "users" },
    { label: "Alterar cadastro", icon: "cog" },
  ];

  const handleMenuItemClick = (label) => {
    setSelectedMenuItem(label);

    if (label === "Formulários") {
      setShowFormSidebar(true);
    } else {
      setShowFormSidebar(false);
    }
  };

  const handleBackButtonClick = () => {
    setShowFormSidebar(false);
    setSelectedMenuItem("");
  };

  const handleCloseClick = () => {
    handleCloseModal();
  };

  const renderSidebarItems = () => {
    if (showFormSidebar) {
      return formSidebarItems.map((item) => (
        <div
          key={item.label}
          className={`${styles.sidebarItem} ${
            selectedMenuItem === item.label ? styles.selected : ""
          }`}
          onClick={() => setSelectedMenuItem(item.label)}
          style={{ cursor: "pointer" }}
        >
          <i className={`fas fa-${item.icon} ${styles.sidebarIcon}`}></i>
          {item.label}
        </div>
      ));
    }

    return menuItems.map((item) => (
      <div
        key={item.label}
        className={`${styles.sidebarItem} ${
          selectedMenuItem === item.label ? styles.selected : ""
        }`}
        onClick={() => handleMenuItemClick(item.label)}
        style={{ cursor: "pointer" }}
      >
        <i className={`fas fa-${item.icon} ${styles.sidebarIcon}`}></i>
        {item.label}
      </div>
    ));
  };

  const renderContent = () => {
    if (selectedMenuItem === "Formulários") {
      return window.alert("ABRE FORMULÁRIOS");
    } else if (selectedMenuItem === "Documentos") {
      return window.alert("ABRE DOCUMENTOS");
    } else if (selectedMenuItem === "Alterar cadastro") {
      return window.alert("ABRE ALTERAR CADASTRO");
    } else {
      // Render default content here
      return (
        <div>
          <h3>Welcome to the User Modal!</h3>
          <p>Select an option from the sidebar to view content.</p>
        </div>
      );
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.sidebarWrapper}>
          <div className={styles.userHeader}>
            <div style={{ display: "flex" }}>
              <FaFolderOpen
                style={{
                  color: "#c5882a",
                  fontSize: "30px",
                  transform: "translateY(-4px)",
                }}
              />
              <span style={{ letterSpacing: "0.12rem" }}>
                <span className={styles.selectedUserCPF}>
                  {selectedUser.cpf.replace(
                    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
                    "$1.$2.$3-$4"
                  )}
                </span>
              </span>
            </div>
            <div className={styles.selectedUserName}>{selectedUser.nome}</div>
          </div>

          <div className={styles.sidebar}>
            {renderSidebarItems()}
            {showFormSidebar && (
              <div
                className={`${styles.sidebarItem} ${styles.backButton}`}
                onClick={handleBackButtonClick}
                style={{ cursor: "pointer" }}
              >
                <BsArrowLeft
                  className={styles.sidebarIcon}
                  style={{ marginRight: "0.5rem" }}
                />
                Voltar
              </div>
            )}
          </div>
        </div>

        <div className={styles.content}>{renderContent()}</div>
      </div>

      <div className={styles.closeButton} onClick={handleCloseClick}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  );
};

export default UserModal;
