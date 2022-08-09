import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Client from '../../components/client/singleClient/index'


const useStyles = makeStyles(() => ({
  wrapper: {
    margin: "0 auto",
    padding: "0",
    
  }
}));


const clientPage = () => {
  const classes = useStyles();


  return (
      <Container className={classes.wrapper} maxWidth="xl">
      <Client/>
    </Container>
  );
};

export default clientPage;
