import { Container } from "@material-ui/core";
import React from "react";
import SingleJob from "../../components/jopost[id]/index";

const singleJobPost = () => {
  return (
    <Container maxWidth="xl" style={{   backgroundImage: "url(/images/floral.png)", padding: "0" }}>
      <SingleJob />
    </Container>
  );
};

export default singleJobPost;
