import React from "react";

import bl from "./bl";
import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  valError: {
    color: "red",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "10px 0 0 0px",
  },

  helperText: {
    color: "black",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "12px 0 12px 0px",
  },

  success: {
    display: "flex",
    justifyContent: "center",
    color: "green",
    textAlign: "center",
    margin: "1em 0",
    fontSize: "1.2em",
    fontWeight: "400",
  },
  submit: {
    textTransform: "capitalize",
    fontSize: "1em",
    fontWeight: "300",
    marginTop: "1em",
    lineHeight: "1.4",
    backgroundColor: "#944E6C",
    color: "#FFF",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#af6685",
    },
  },
});

const ContactForm = () => {
  const classes = useStyles();
  const {
    phone,
    setPhone,
    email,
    setEmail,
    lName,
    setLname,
    fName,
    setFnameError,
    setFname,
    setLnameError,
    handleSubmit,
    fNameError,
    lNameError,
    phoneError,
    setPhoneError,
    emailError,
    setEmailError,
    validate,
    success,
    error,
  } = bl();

  return (
    <>
      <Grid
        container
        justifyContent="center"
        spacing={6}
        style={{ borderTop: "3px solid #496C59", padding: "2em 0" }}
      >
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            error={fNameError ? true : null}
            name="fName"
            type="text"
            size="small"
            placeholder="First Name"
            value={fName}
            onChange={(e) => {
              setFnameError("");
              setFname(e.target.value);
            }}
          />
          {fNameError ? (
            <h5 className={classes.valError}>{fNameError}</h5>
          ) : null}
        </Grid>

        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            name="lName"
            type="text"
            size="small"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => {
              setLnameError("");
              setLname(e.target.value);
            }}
          />
          {lNameError ? (
            <h5 className={classes.valError}>{lNameError}</h5>
          ) : null}
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            name="email"
            type="email"
            size="small"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmailError("");
              setEmail(e.target.value);
            }}
          />
          {emailError ? (
            <h5 className={classes.valError}>{emailError}</h5>
          ) : null}
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            name="phone"
            type="tel"
            size="small"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => {
              setPhoneError("");
              setPhone(e.target.value);
            }}
          />
          {phoneError ? (
            <h5 className={classes.valError}>{phoneError}</h5>
          ) : null}
        </Grid>
        <Grid item xs={12} md={12} align="center">
          <Button
            className={classes.submit}
            variant="outlined"
            color="primary"
            onClick={validate}
          >
            Show interest
          </Button>
        </Grid>
        {success ? <p className={classes.success}>{success}</p> : null}
        {error ? <p className={classes.valError}>{error}</p> : null}
      </Grid>
    </>
  );
};

export default ContactForm;
