import { React } from "react";
import { Container } from "@material-ui/core";
import HomePage from "../components/index/index";

const Home = () => {
  return (
    <Container maxWidth="xl" style={{backgroundImage: "url(/images/floral.png)", margin: "0", padding: "0"}}>
      <HomePage />
    </Container>
  );
};

export default Home;
