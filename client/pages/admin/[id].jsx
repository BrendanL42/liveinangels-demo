import React from "react";
import ProfileBar from "./ProfileBar";
import Dash from "../../components/admin/dash/index";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const getServerSideProps = async function ({ req, res }) {
  const token = req.cookies.LIA;
  const id = req.cookies.ID;

  var decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { id, jwt },
  };
};

const useStyles = makeStyles({
  controlsContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url(/images/loginImage.jpg)",
    height: "100%",
  },
  heading: {
    margin: "0 auto 0.8em auto",
    fontSize: "2em",
    textAlign: "center",
    fontWeight: "400",
    letterSpacing: "2px",
    color: "#496C59",
  },

  wrapper: {
    color: "#191919",
    height: "auto",
    padding: "0",
  },
  content: {
    padding: "2em",
    backgroundColor: "#F7F7F7",
  },
});

const dash = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row" className={classes.wrapper}>
      <ProfileBar />

      <Grid
        item
        className={classes.content}
        xs={12}
        sm={12}
        md={10}
        lg={10}
        xl={10}
      >
        <h1 className={classes.heading}>DASHBOARD</h1>

        <hr className={classes.lineHeading} />

        <Dash />
      </Grid>
    </Grid>
  );
};

export default dash;
