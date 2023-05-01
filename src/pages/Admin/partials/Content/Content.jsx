import React from "react";
import styles from "./styles.module.scss";

const Content = ({ selectedMenuItem, contents }) => {
  return <div className={styles.content}>{contents[selectedMenuItem]}</div>;
};

export default Content;
