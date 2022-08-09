import { React, useState, useContext, useEffect } from "react";
import styles from "./navBar.module.css";
import { makeStyles } from "@material-ui/core/styles";

import { signout, isAuthenticated } from "../../pages/api/adminApi";
import { isAuth } from "../../context/index";

import { useRouter } from "next/router";
import Link from "next/link";
import cx from "classnames";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  modal: {
    backgroundColor: "#334257",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
  },

  LogoutBtn: {
    margin: "1.5em",
    fontSize: "0.7em",
    textAlign: "center",
    color: "white",
    backgroundColor: "#548CA8",
  },
});

const Navbar = () => {
  const router = useRouter();
  const classes = useStyles();

  const { auth, setAuth } = useContext(isAuth);
  const [open, setOpen] = useState(false);
  const [menuStatus, setMenu] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      signout();
      setAuth(isAuthenticated());
    }
  }, [isAuthenticated()]);

  const body = (
    <div className={styles.modalLogout}>
      <div>
        <Button
          variant="contained"
          className={classes.LogoutBtn}
          onClick={() => {
            router.push("/");
            setOpen(false);
            setMenu(!menuStatus);
            signout();
            setAuth(isAuthenticated());
          }}
        >
          Log Out
        </Button>
        <Button
          variant="contained"
          className={classes.LogoutBtn}
          onClick={() => {
            setOpen(false);
            setMenu(!menuStatus);
          }}
        >
          Cancel
        </Button>
      </div>
      <h4 className={styles.logoutText}>Are you sure you want to logout ?</h4>
    </div>
  );

  const handleClick = () => {
    setMenu(!menuStatus);
  };

  return (
    <nav
      className={
        menuStatus
          ? cx(styles.NavBarItems, styles.NavBarItemsActive)
          : cx(styles.NavBarItems)
      }
    >
      <Modal
        className={classes.modal}
        open={open}
        aria-labelledby="Loading Screen"
      >
        {body}
      </Modal>
      <Link href="/">
        <img
          className={styles.logo}
          src="/images/lotus.png"
          alt="logo"
          width="auto"
          height="120"
        />
      </Link>

      <div className={styles.menuicon} onClick={handleClick}>
        <i className={menuStatus ? "fa fa-times" : "fa fa-bars"}></i>
      </div>

      <ul
        className={
          menuStatus ? cx(styles.navMenu, styles.active) : cx(styles.navMenu)
        }
      >
        <li
          onClick={handleClick}
          className={
            router.pathname == "/jobsboard"
              ? styles.activeLink
              : styles.navLinks
          }
        >
          <Link href="/jobsboard">Jobs Board</Link>
        </li>

        <li
          onClick={handleClick}
          className={
            router.pathname == "/blogs" ? styles.activeLink : styles.navLinks
          }
        >
          <Link href="/blogs">Blogs</Link>
        </li>

        <li
          onClick={handleClick}
          className={
            router.pathname == "/aboutus" ? styles.activeLink : styles.navLinks
          }
        >
          <Link href="/aboutus">About Us</Link>
        </li>

        <li
          onClick={handleClick}
          className={
            router.pathname == "/contactus"
              ? styles.activeLink
              : styles.navLinks
          }
        >
          <Link href="/contactus">Contact</Link>
        </li>

        <>
          {auth ? (
            <li
              onClick={handleClick}
              className={
                router.pathname == "/admin/[adminid]"
                  ? styles.activeLink
                  : styles.navLinks
              }
            >
              {isAuthenticated() ? (
                <Link href={`/admin/${isAuthenticated().user._id}`}>Admin</Link>
              ) : null}
            </li>
          ) : null}

          {auth ? (
            <li className={styles.navLinks} onClick={() => setOpen(true)}>
              Log Out
            </li>
          ) : null}
        </>
      </ul>
    </nav>
  );
};

export default Navbar;
