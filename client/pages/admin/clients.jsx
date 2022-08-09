import React from "react";
import ProfileBar from "./ProfileBar";
import Clients from "../../components/admin/clients/index";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";



export const getServerSideProps = async function ({ req, res }) {
  const jwt = req.cookies.LIA;
  const id = req.cookies.ID;

  if (!jwt) {
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

const clients = () => {
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
        <h1 className={classes.heading}>CLIENTS</h1>

        <hr className={classes.lineHeading} />

        <Clients />
      </Grid>
    </Grid>
  );
};

export default clients;
