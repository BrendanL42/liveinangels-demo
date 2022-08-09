import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import bl from "./bl";
import CircularProgress from "@material-ui/core/CircularProgress";


import {
  Grid,
  TextField,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundImage: "url(/images/floral.png)",
    height: "100%",
    width: "100%",
    padding: " 0 0 5em 0",
    
  },

  background: {
    margin: "0 auto",
    borderRadius: "1em",
    backgroundColor: "#616161",
    display: "block",
    maxWidth: "900px",
    position: "relative",
    padding: "1em",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },
  text: {
    [`& fieldset`]: {
      color: "black",
    },
    backgroundColor: "white",
    borderRadius: 8,
    margin: "1em 0",
  },
  label: {
    textAlign: "left",
    color: "white",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "0px 0 0 6px",
  },

  labelMargin: {
    textAlign: "left",
    color: "white",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "1em auto",
  },

  btn: {
    margin: "1em auto",
    backgroundColor: "#944E6C",
    color: "#FFF",
    textTransform: "capitalize",
    width: "120px",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#af6685",
    },
  },

  success: {
    color: "white",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
  },
  honey: {
    opacity: "0",
  },
  banner: {
    objectFit: "cover",
    opacity: "0.5",
    maxWidth: "1920px !important",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "270px",
    },
  },
  overlay: {
    height: "400px",
   
    maxWidth: "1920px !important",
    background: "black",
    overflow: "hidden",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "270px",
    },
  },
  title: {
    textAlign: "center",
    color: "white",
    position: "absolute",
    opacity: "0.9",
    zIndex: "1",
    fontSize: "5em",
    letterSpacing: "5px",
    fontWeight: "200",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -25%)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3em",
    },
  },
  quote: {
    fontSize: "2.2em",
    fontFamily: "'Montez', cursive",
    letterSpacing: "2px",
    fontWeight: "100",
    textAlign: "center",
    lineHeight: "1.5",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4em",
    },
  },

  info: {
    textAlign: "center",
    maxWidth: "85%",
    fontSize: "1.3em",
    fontWeight: "200",
    lineHeight: "1.9",
    color: "white",
  },
  textWrapper: {
    padding: "3em 0 1em 0",
  },
  logo: {
    marginTop: "1em",
    position: "absolute",
    top: "-11%",
    left: "50%",
    transform: "translate(-50%, -11%)",
    opacity: "0.9"
  },
}));

const ContactForm = () => {
  const classes = useStyles();
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    message,
    setMessage,
    contactEmail,
    setContactEmail,
    contactPhone,
    setContactPhone,
    handleSubmit,
    success,
    error,
    honey,
    setHoney,
    loading,
    setLoading,
  } = bl();

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.overlay}>
          <h1 className={classes.title}>Contact Us</h1>
          <img
            className={classes.banner}
            src={"/images/contactUs.jpeg"}
            alt="icon"
            width="100%"
            height="400px"
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2em auto 4em auto",
          }}
        >
         <blockquote className={classes.quote}>
            " One small act of caring can turn someones day around "
          </blockquote>
        </div>

        <Grid container className={classes.form}>
          <Grid item xs={12} sm={12}>
            <Grid container align="center" className={classes.background}>
              <img
                className={classes.logo}
                src={"/images/lotus.png"}
                width={170}
                height={170}
              />
              <Grid item xs={12} className={classes.textWrapper}>
                <p className={classes.info}>
                  If you would like any further information please don't
                  hesitate to use the contact form below.
                  <br />
                  We look forward to hearing from you.
                </p>
              </Grid>

              <Grid item xs={12} sm={11}>
                <TextField
                  className={classes.text}
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  placeholder="Start Typing"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <InputLabel className={classes.label}>Name</InputLabel>

                <TextField
                  className={classes.text}
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  placeholder="Start Typing"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputLabel className={classes.label}>Email</InputLabel>
                <TextField
                  className={classes.text}
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  placeholder="Start Typing"
                  value={phone}
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <InputLabel className={classes.label}>Phone</InputLabel>

                <p className={classes.labelMargin}>
                  {" "}
                  Preferred Method of Contact:
                </p>

                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkList}
                      name="contactPhone"
                      onChange={(e) => setContactPhone(true)}
                      value={contactPhone}
                    />
                  }
                  label={<span className={classes.label}>Phone</span>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.checkList}
                      name="contactEmail"
                      onChange={(e) => setContactEmail(true)}
                      value={contactEmail}
                    />
                  }
                  label={<span className={classes.label}>Email</span>}
                />

                <TextField
                  className={classes.text}
                  size="small"
                  variant="outlined"
                  type="text"
                  multiline
                  rows={5}
                  fullWidth
                  required
                  placeholder="Start Typing"
                  value={message}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <InputLabel className={classes.label}>
                  Brief Message:
                </InputLabel>
              </Grid>
              <Grid item xs={8}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    className={classes.btn}
                  >
                    Submit
                  </Button>
                )}
                <p className={classes.success}>
                  {success ? success : null}
                  {error ? error : null}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Checkbox
            className={classes.honey}
            name="honey"
            onChange={() => setHoney(true)}
            value={honey}
          />
        </Grid>
      </div>
    </>
  );
};

export default ContactForm;
