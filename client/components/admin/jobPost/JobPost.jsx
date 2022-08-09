import { React } from "react";
import bl from "./bl";
import styles from "../../../styles/admin.module.css";
import { makeStyles } from "@material-ui/core/styles";

import { Grid, TextField, InputLabel, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: "75px",
    margin: "0.5em 0.5em",
  },
  label: {
    textAlign: "left",
    color: "black",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "15px 0 0 6px",
  },
  container: {
    height: "auto",
    margin: "1em auto",
  },
  postGrid: {
    margin: "1em auto",
  },
  text: {
    [`& fieldset`]: {
      color: "black",
    },
    backgroundColor: "white",
    borderRadius: 8,
  },
  select: {
    [`& fieldset`]: {
      color: "black",
      border: "none",
    },
    backgroundColor: "white",
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "#496C59",
    color: "#FFF",
  }
}));

const JobPost = (props) => {
  const {
    handlePost,
    success,
    title,
    startDate,
    region,
    role,
    setTitle,
    setStartDate,
    setRegion,
    setRole,
    quillRef,
  } = bl();
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        className={classes.container}
        align="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sm={11}
          md={7}
          lg={7}
          xl={7}
          className={classes.gridItem}
        >
          <TextField
            className={classes.text}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Title"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {!title ? (
            <InputLabel className={classes.label}>Title</InputLabel>
          ) : null}
        </Grid>
        <Grid
          item
          xs={12}
          sm={11}
          md={3}
          lg={3}
          xl={3}
          className={classes.gridItem}
        >
          <TextField
            className={classes.text}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Date"
            value={startDate}
            name="startDate"
            onChange={(e) => setStartDate(e.target.value)}
          />
          {!startDate ? (
            <InputLabel className={classes.label}>Starting date</InputLabel>
          ) : null}
        </Grid>

        <Grid
          item
          xs={12}
          sm={11}
          md={4}
          lg={4}
          xl={4}
          className={classes.gridItem}
        >
          <FormControl size="small" fullWidth variant="outlined">
            {!region ? <InputLabel id="region">Enter region</InputLabel> : null}
            <Select
              className={classes.select}
              labelId="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <MenuItem value={"sydney"}>Sydney</MenuItem>
              <MenuItem value={"canberra"}>Canberra</MenuItem>
              <MenuItem value={"brisbane"}>Brisbane</MenuItem>
              <MenuItem value={"darwin"}>Darwin</MenuItem>
              <MenuItem value={"adelaide"}>Adelaide</MenuItem>
              <MenuItem value={"hobart"}>Hobart</MenuItem>
              <MenuItem value={"melbourne"}>Melbourne</MenuItem>
              <MenuItem value={"perth"}>Perth</MenuItem>
            </Select>
          </FormControl>
          {!region ? (
            <InputLabel className={classes.label}>Region</InputLabel>
          ) : null}
        </Grid>

        <Grid
          item
          xs={12}
          sm={11}
          md={6}
          lg={6}
          xl={6}
          className={classes.gridItem}
        >
          <TextField
            className={classes.text}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Enter role"
            value={role}
            name="role"
            onChange={(e) => setRole(e.target.value)}
          />
          {!role ? (
            <InputLabel className={classes.label}>Role</InputLabel>
          ) : null}
        </Grid>
      </Grid>

      <div
        className={styles.editor}
        style={{ width: "100%", backgroundColor: "white", height: 300 }}
        ref={quillRef}
      />

      <Grid
        align="center"
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.postGrid}
      >
        <Button className={classes.btn} variant="outlined" onClick={handlePost}>
          Post Job
        </Button>
        {success}
      </Grid>
    </>
  );
};

export default JobPost;
