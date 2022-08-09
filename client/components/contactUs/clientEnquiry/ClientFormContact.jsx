import React from "react";
import bl from "./bl";
import { makeStyles } from "@material-ui/core/styles";

import {
  TextField,
  Button,
  Grid,
  Container,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    color: "#FFF",
  },
  valError: {
    color: "red",
    fontSize: "1.2em",
    fontWeight: "400",
    letterSpacing: "1px",
    margin: "6px 0 0 6px",
  },

  success: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    margin: "1em 0",
    fontSize: "1.4em",
    fontWeight: "400",
  },

  label: {
    textAlign: "left",
    color: "white",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "16px 0 16px 5px",
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
  text: {
    [`& fieldset`]: {
      color: "black",
      borderRadius: 8,
    },
    [`& input`]: {
      borderRadius: 8,
    },
    ['& -webkit-autofill']: {
      borderRadius: 8,
      
    },
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: "0px",
  },
});

const ClientFormContact = () => {
  const classes = useStyles();
  const {
    guardianfName,
    setGuardianfName,
    guardianlName,
    setGuardianlName,
    guardianemail,
    setGuardianemail,
    guardianphone,
    setGuardianphone,
    handleSubmit,
    errors,
    validate,
    success,
    error,
    setErrors,
  } = bl();

  return (
    <Grid
      className={classes.wrapper}
      container
      justifyContent="center"
      alignItems="center"
      spacing={8}
    >
      <Grid item xs={12} md={5}>
        <h3 className={classes.titleModal}>What is Lorem Ipsum?</h3>
        <p className={classes.textModal}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries.
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </Grid>
      <Grid item xs={12} md={5}>
        <TextField
          fullWidth
          variant="outlined"
          className={classes.text}
          error={errors.guardianfName ? true : null}
          name="guardianfName"
          type="text"
          size="small"
          placeholder="Start Typing"
          value={guardianfName}
          onChange={(e) => {
            setErrors((prevState) => ({
              ...prevState,
              guardianfName: "",
            }));
            setGuardianfName(e.target.value);
          }}
        />
        {errors.guardianfName ? (
          <h5 className={classes.valError}>{errors.guardianfName}</h5>
        ) : (
          <InputLabel className={classes.label}>Name</InputLabel>
        )}
        <TextField
          fullWidth
          className={classes.text}
          variant="outlined"
          error={errors.guardianlName ? true : null}
          name="guardianlName"
          type="text"
          size="small"
          placeholder="Start Typing"
          value={guardianlName}
          onChange={(e) => {
            setErrors((prevState) => ({
              ...prevState,
              guardianlName: "",
            }));
            setGuardianlName(e.target.value);
          }}
        />
        {errors.guardianlName ? (
          <h5 className={classes.valError}>{errors.guardianlName}</h5>
        ) : (
          <InputLabel className={classes.label}>Surname</InputLabel>
        )}
        <TextField
          fullWidth
          variant="outlined"
          className={classes.text}
          name="guardianemail"
          type="email"
          size="small"
          placeholder="Start Typing"
          value={guardianemail}
          onChange={(e) => {
            setErrors((prevState) => ({
              ...prevState,
              guardianemail: "",
            }));
            setGuardianemail(e.target.value);
          }}
        />
        {errors.guardianemail ? (
          <h5 className={classes.valError}>{errors.guardianemail}</h5>
        ) : (
          <InputLabel className={classes.label}>Email</InputLabel>
        )}
        <TextField
          fullWidth
          variant="outlined"
          className={classes.text}
          name="guardianphone"
          type="tel"
          size="small"
          placeholder="Start Typing"
          value={guardianphone}
          onChange={(e) => {
            setErrors((prevState) => ({
              ...prevState,
              guardianphone: "",
            }));
            setGuardianphone(e.target.value);
          }}
        />
        {errors.guardianphone ? (
          <h5 className={classes.valError}>{errors.guardianphone}</h5>
        ) : (
          <InputLabel className={classes.label}>Phone</InputLabel>
        )}
        <Grid align="center">
          <Button className={classes.btn} variant="outlined" onClick={validate}>
            Show interest
          </Button>
          {success ? <p className={classes.success}>{success}</p> : null}
          {error ? <p className={classes.valError}>{error}</p> : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientFormContact;
