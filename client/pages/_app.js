import { React, useState, useEffect } from "react";
import "../styles/globals.css";
import "../styles/design_tokens.css";
import { makeStyles } from "@material-ui/core/styles";
import { isAuth } from "../context/index";
import { isAuthenticated, signout } from "../pages/api/adminApi";
import NavBar from "../components/navBar/index";
import Footer from "../components/footer/index";

import ErrorBoundary from "../components/ErrorBoundary"


import { useRouter } from "next/router";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function MyApp({ Component, pageProps }) {
  const classes = useStyles();
  const router = useRouter();
  const userId = isAuthenticated() ? isAuthenticated().user._id : null;
  const [auth, setAuth] = useState(isAuthenticated());
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    router.events.on("routeChangeStart", () => {
      setOpen(true);
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
      setOpen(false);
    });
    router.events.on("routeChangeError", () => {
      setLoading(false);
      setOpen(false);
    });
    setAuth(isAuthenticated());
  }, []);

  if (process.browser) {
    window.onbeforeunload = () => {
      return "Are you sure you want to leave?";
    }
  }

  return (
    <>
    <ErrorBoundary>
      <isAuth.Provider
        value={{
          auth,
          setAuth,
          userId,
        }}
      >
        <NavBar />
        {isLoading ? (
          <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Component {...pageProps} />
        )}
        <Footer />
      </isAuth.Provider>
 </ErrorBoundary>
    </>
  );
}

export default MyApp;
