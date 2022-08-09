import React from "react";
import styles from "../../styles/jobsboard.module.css";
import Card from "../../components/blogs/card/index";

import { Grid, Container } from "@material-ui/core";

const blogs = () => {
  return (
    <Container
      maxWidth="xl"
      style={{
        padding: "1em",
        backgroundImage: "url(/images/floral.png)",
        minHeight: "100vh",
      }}
    >
      <Card />
    </Container>
  );
};

export default blogs;
