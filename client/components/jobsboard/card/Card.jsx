import { React, useState } from "react";
import bl from "./bl";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { Paper, Container, Grid, Button } from "@material-ui/core";
import styles from "./card.module.css";
import moment from "moment";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import TimerIcon from "@material-ui/icons/Timer";

const useStyles = makeStyles((theme) => ({
  btn: {
    textTransform: "capitalize",
    fontSize: "1em",
    fontWeight: "300",
    marginTop: "1em",
    lineHeight: "1.4",
    backgroundColor: "#AF6B58",
    color: "#FFF",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#ba7f6f",
    },
  },
  btnLink: {
    color: "#FFF",
    fontSize: "0.9em",
  },
  ad: {
    objectFit: "contain",
    margin: "1em auto",
  },
  ad1: {
    objectFit: "contain",
    margin: "1em auto",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  wrapper: {
    padding: "0",
  },
  postWrapper: {
    margin: "1em auto",
  },
  sideBar: {
    margin: "0 auto",
  }
}));

const Card = () => {
  const classes = useStyles();
  const { posts, setPosts } = bl();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Container maxWidth="lg" className={classes.wrapper}>
      <Grid container>
        <Grid item xs={12}>
          <ul className={styles.links}>
            <li>
              <Button
                className={classes.btn}
                aria-describedby={"CV"}
                variant="contained"
                onClick={handleClick}
              >
                <a className={classes.btnLink} href="/jobsboard/[jobid]">
                  Links
                </a>
              </Button>
            </li>
            <li>
              <Button
                className={classes.btn}
                aria-describedby={"CV"}
                variant="contained"
                onClick={handleClick}
              >
                <a className={classes.btnLink} href="/jobsboard/[jobid]">
                Links
                </a>
              </Button>
            </li>
            <li>
              <Button
                className={classes.btn}
                aria-describedby={"CV"}
                variant="contained"
                onClick={handleClick}
              >
                <a className={classes.btnLink} href="/jobsboard/[jobid]">
                Links
                </a>
              </Button>
            </li>
            <li>
              <Button
                className={classes.btn}
                aria-describedby={"CV"}
                variant="contained"
                onClick={handleClick}
              >
                <a className={classes.btnLink} href="/jobsboard/[jobid]">
                Links
                </a>
              </Button>
            </li>
          </ul>
          <hr style={{ margin: "2em auto 2em auto" }} />
        </Grid>

        <Grid item sm={3} md={3} lg={3} xl={3} className={classes.sideBar}>
          <img
            className={classes.ad}
            src={"/images/ad400px600px.svg"}
            alt="ad"
            width="100%"
            height="auto"
          />
          <img
            className={classes.ad1}
            src={"/images/ad400px600px.svg"}
            alt="ad"
            width="100%"
            height="auto"
          />
        </Grid>
        <Grid  xs={12} sm={8} md={8} lg={9} xl={9} item className={classes.postWrapper}>
          {posts ? (
            posts.length ? (
              posts.map((post, i) => (
                <Paper elevation={3} className={styles.card} key={i}>
                  <h4 className={styles.title}>{post.title}</h4>
                  <div className={styles.detailsWrapper}>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <LocationOnIcon style={{ marginRight: "0.3em" }} />{" "}
                      {post.region}{" "}
                    </p>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <WorkIcon style={{ marginRight: "0.4em" }} />
                      {post.role}
                    </p>
                    <p style={{ display: "flex", alignItems: "center" }}>
                      {" "}
                      <TimerIcon style={{ marginRight: "0.5em" }} />{" "}
                      {post.startDate}
                    </p>
                  </div>

                  <div
                    className={styles.body}
                    dangerouslySetInnerHTML={{
                      __html: post.body.substring(0, 300),
                    }}
                  ></div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <p>Posted {moment(post.created).fromNow()}</p>
                    <Link
                      href="/jobsboard/[jobid]"
                      as={`/jobsboard/${post._id}`}
                    >
                      View Job
                    </Link>
                  </div>
                </Paper>
              ))
            ) : (
              <p className={styles.count}>Showing: {posts.length} jobs</p>
            )
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "1.5em",
                fontWeight: "200",
              }}
            >
              No jobs to display
            </p>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Card;
