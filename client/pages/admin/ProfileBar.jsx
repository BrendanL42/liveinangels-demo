import { React, useEffect, useState } from "react";
import bl from "../../components/admin/bl";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/admin.module.css";
import { isAuthenticated } from "../api/adminApi.js";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import moment from "moment";

import EqualizerIcon from "@material-ui/icons/Equalizer";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

import { useRouter } from "next/router";

import DateRangeIcon from "@material-ui/icons/DateRange";
import BookIcon from "@material-ui/icons/Book";

const useStyles = makeStyles({
  controlsContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundImage: "url(/images/loginImage.jpg)",
    height: "auto",
  },

  btns: {
    fontSize: "1em",
    padding: "0.5em",
    color: "#9a695a",
    width: "100%",
    margin: "0.8em 0",
    borderRadius: "0",
    border: "none",
    textTransform: "capitalize",
    color: "#fff",
    "&:focus": {
      backgroundColor: "rgba(240, 242, 247)",
      color: "#9a695a",
      transition: "0.5s",
      borderRight: "1px solid #d7b37c",
      borderLeft: "1px solid #d7b37c",
    },
  },
});

const ProfileBar = ({ id, jwt }) => {
  const [token, setToken, refToken] = useState("");
  const [adminId, setAdminId, refAdminId] = useState("");
  const classes = useStyles();
  const {
    handleCarers,
    handleDash,
  } = bl();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setToken(jwt);
    setAdminId(id);
  }, []);

  const CurrentDate = moment().format("dddd, MMMM Do");

  return (
    <>
      <Grid
        className={classes.controlsContainer}
        xs={12}
        sm={12}
        md={3}
        lg={2}
        xl={2}
      >
        <div className={styles.overlay}>
         
          <img
            className={styles.profilePic}
            height="auto"
            width="180px"
            src={"/images/profile.png"}
            onError={(i) => (i.target.src = "/images/profile.jpeg")}
            id="raised-button-file"
            alt={"katrina Profile"}
          />
          <p className={styles.name}>Hello, User</p>
          <Button
            startIcon={<EqualizerIcon fontSize="large" />}
            className={classes.btns}
            onClick={handleDash}
            onClick={() => router.push(`/admin/${isAuthenticated().user._id}`)}
          >
            Dashboard
          </Button>

          <Button
            startIcon={<PeopleAltIcon fontSize="large" />}
            className={classes.btns}
            variant="outlined"
            onClick={handleCarers}
            onClick={() => router.push("/admin/carers")}
          >
            Carers
          </Button>
          <Button
            startIcon={<EqualizerIcon fontSize="large" />}
            className={classes.btns}
            onClick={() => router.push("/admin/clients")}
          >
            Clients
          </Button>
          <Button
            startIcon={<DateRangeIcon fontSize="large" />}
            className={classes.btns}
            onClick={() => router.push("/admin/jobpost")}
          >
            Job Post
          </Button>
          <Button
            startIcon={<BookIcon fontSize="large" />}
            className={classes.btns}
            onClick={() => router.push("/admin/blog")}
          >
            Blog
          </Button>
        </div>
        <div className={styles.date}>{CurrentDate}</div>
      </Grid>
    </>
  );
};

export default ProfileBar;
