import React from "react";
import LoginAdmin from "../components/signin/index";
import styles from "../styles/signin.module.css";

const signin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <div className={styles.wrapper}>
          <LoginAdmin />
        </div>
      </div>
    </div>
  );
};

export default signin;
