import React from "react";

import bl from "../../jopost[id]/contactForm/bl";
import { makeStyles } from "@material-ui/core/styles";

import { InputLabel, Grid, TextField, Button } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    color: "#FFF",
  },

  valError: {
    color: "red",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "10px 0 0 0px",
  },

  success: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    margin: "1em 0",
    fontSize: "1.2em",
    fontWeight: "400",
  },
  text: {
    [`& fieldset`]: {
      color: "black",
      borderRadius: 8,
    },
    [`& input`]: {
      borderRadius: 8,
    },
    ["& -webkit-autofill"]: {
      borderRadius: 8,
    },
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: "0px",
  },
  label: {
    textAlign: "left",
    color: "white",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "16px 0 16px 5px",
  },
  textModal: {
    lineHeight: "1.9",
    fontWeight: "300",
    fontSize: "1.1em",
    textAlign: "justify",
  },
  titleModal: {
    fontSize: "1.4em",
    fontWeight: "300",
    letterSpacing: "2px",
  },
  btn: {
    margin: "1em auto",
    backgroundColor: "#944E6C",
    border: "none",
    color: "#FFF",
    textTransform: "capitalize",
    width: "130px",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#af6685",
      border: "none"
    },
  },

  toDo: {
    opacity: "0.8",
    transform: "rotate(-5.5deg)",
    padding: "0 0 3em 0"
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
        className={classes.wrapper}
        container
        justifyContent="center"
        alignItems="center"
        spacing={8}
      >
        <Grid item xs={12} md={5}>
          <img
            className={classes.toDo}
            height="650px"
            width="100%"
            src={"/images/toDo.png"}
            alt={"checkList"}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            variant="outlined"
            className={classes.text}
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
          ) : (
            <InputLabel className={classes.label}>Name</InputLabel>
          )}

          <TextField
            variant="outlined"
            className={classes.text}
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
          ) : (
            <InputLabel className={classes.label}>Surname</InputLabel>
          )}
          <TextField
            fullWidth
            variant="outlined"
            className={classes.text}
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
          ) : (
            <InputLabel className={classes.label}>Email</InputLabel>
          )}
          <TextField
            variant="outlined"
            className={classes.text}
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
          ) : (
            <InputLabel className={classes.label}>Phone</InputLabel>
          )}

          <Grid align="center">
            <Button
              className={classes.btn}
              variant="outlined"
              color="primary"
              onClick={validate}
            >
              Show interest
            </Button>

            {success ? <p className={classes.success}>{success}</p> : null}
            {error ? <p className={classes.valError}>{error}</p> : null}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactForm;
