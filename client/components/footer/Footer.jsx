import React from "react";
import styles from "./footer.module.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        

         
            
         
          <nav className={styles.footerMenu}>
          <img
              className={styles.logo}
              src="/images/ad200px400px.svg"
              alt="logo"
              width="auto"
              height="300"
            />
            <ul >
              <li>
             
              </li>
              <li>
                <a href="/jobsboard">Jobs Board</a>
              </li>
              <li>
                <a href="/blogs">Blogs</a>
              </li>
              <li>
                <a href="/aboutus">About Us</a>
              </li>
              <li>
                <a href="/contactus">Contact</a>
              </li>
            </ul>
          </nav>
      
        <div className={styles.copyRightCenter}>
          <small>&copy; 2021, Your Website. All Rights Reserved</small>
        </div>
        <ul className={styles.copyRightArea}>
          <li>
            <a href="#">Privacy Statment</a>
          </li>
          <li>
            <a href="#">Disclaimer</a>
          </li>
          <li>
            <a href="#">T & C's</a>
          </li>
          <li>
            <a href="#">Copyright</a>
          </li>

          <li>
            <a href="#">Acceptable Usage</a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
