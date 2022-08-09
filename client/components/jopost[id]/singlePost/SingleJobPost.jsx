import { React, useState } from "react";
import styles from "./singleJobPost.module.css";
import bl from "./bl";
import Form from "../contactForm/ContactForm";
import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Paper,
  Container,
} from "@material-ui/core";

import moment from "moment";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import TimerIcon from "@material-ui/icons/Timer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const SingleJobPost = () => {
  const { post } = bl();
  const [expanded, setExpanded] = useState(false);

  const handleAccordian = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return post ? (
    <Container maxWidth="lg" style={{padding: "0"}}>
      <div className={styles.wrapper}>
        <div className={styles.rowOneHeader}>
          <h1>{post.title}</h1>
          <img
            className={styles.logo}
            height="auto"
            width="150px"
            src={"/images/lotus.png"}
            alt={"Company logo"}
          />
        </div>

        <hr style={{ margin: "3em 0" }} />
        <div className={styles.detailsWrapper}>
          <p style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <TimerIcon
              style={{ marginRight: "0.5em", color: "#9a695a" }}
            />{" "}
            {post.startDate}
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon
              style={{ marginRight: "0.3em", color: "#9a695a" }}
            />{" "}
            {post.region}
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <WorkIcon style={{ marginRight: "0.4em", color: "#9a695a" }} />
            {post.role}
          </p>

          <p className={styles.who}>Posted {moment(post.created).fromNow()}</p>
        </div>

        <hr style={{ margin: "3em 0" }} />
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleAccordian("panel1")}
          className={styles.accordion}
          style={{ borderLeft: expanded ? "none" : "5px solid var(--grey)" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="body of job post"
          >
            {!expanded ? (
              <p className={styles.accHeader}>View description ....</p>
            ) : (
              <p className={styles.accHeader}>View less ....</p>
            )}
          </AccordionSummary>
          <AccordionDetails>
            {" "}
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: post.body }}
            ></div>
          </AccordionDetails>
        </Accordion>
        <p className={styles.formTitle}>
          If you think your suitable for this position please let us know by
          filling in your details below ?
        </p>
        <Form />
      </div>
    </Container>
  ) : null;
};

export default SingleJobPost;
