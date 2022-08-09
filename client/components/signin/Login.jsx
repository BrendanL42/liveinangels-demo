import React from "react";
import bl from "./bl";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./login.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  text: {
    [`& fieldset`]: {
      color: "black",
      border: "none",
    },
    backgroundColor: "rgba(999, 999, 999, 0.880)",
    borderRadius: 8,
    margin: "0 auto",
    minWidth: "300px",
    maxWidth: "400px",
  },
  submit: {
    padding: "0.2em",
    textTransform: "capitalize",
    letterSpacing: "3px",
    fontSize: "1.1em",
    borderRadius: 8,
    minWidth: "300px",
    maxWidth: "450px",
    color: "white",
    backgroundColor: "rgba(154, 105, 90, 0.82)",
  },

  valError: {
    padding: "0.3em 1em",
    minWidth: "300px",
    maxWidth: "400px",
    color: "red",
    fontSize: "1.2em",
    fontWeight: "400",
    letterSpacing: "1px",
    margin: "0px 0 0 2px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  helperText: {
    color: "white",
    fontSize: "1em",
    fontWeight: "400",
    letterSpacing: "1px",
    textAlign: "left",
  },

  gridItem: {
    height: "85px",
    width: "100%",
    margin: "0 auto"
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const {
    email,
    setEmail,
    password,
    setPassword,
    validate,
    rememberMe,
    setRememberMe,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    error,
    setError
  } = bl();

  return (
    <>
      <form className={styles.form} noValidate>
       
        
        <img
          className={styles.logo}
          src={"/images/lotus.png"}
          alt="logo"
          width="auto"
          height="160px"
        />

        <Grid className={classes.gridItem} align="center">
         
          <TextField
            size="small"
            className={classes.text}
            variant="outlined"
            margin="normal"
            required
            placeholder="Enter email"
            fullWidth
            label={!email ? "Email" : null}
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setError("")
            }}
          />
         
          {emailError ? (
            <h5 className={classes.valError}>{emailError}</h5>
          ) : null}
        </Grid>
        <Grid className={classes.gridItem} align="center">
          {" "}
          <TextField
            size="small"
            className={classes.text}
            value={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={!password ? "Password" : null}
            type="password"
            placeholder="Enter password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
              setError("")
            }}
          />
          {passwordError ? (
            <h5 className={classes.valError}>{passwordError}</h5>
          ) : null}
          {error ? <h5 className={classes.valError}>{error}</h5> : null}
        </Grid>
        
        <div className={styles.rememberMe}>
          <FormControlLabel
            style={{
              color: "#EEEEEE",
            }}
            control={
              <Checkbox
                style={{
                  color: "#EEEEEE",
                }}
                value={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
          />
        </div>

        <Button
          fullWidth
          variant="outlined"
          className={classes.submit}
          onClick={validate}
        >
          Sign In
        </Button>
    
      </form>
    </>
  );
};

export default LoginView;
