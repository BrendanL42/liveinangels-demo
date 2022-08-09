import { React, useState, useRef, useEffect } from "react";
import bl from "./bl";

import "@pathofdev/react-tag-input/build/index.css";
import { makeStyles } from "@material-ui/core/styles";

import ReactTagInput from "@pathofdev/react-tag-input";
import { Grid, TextField, InputLabel, Button } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const useStyles = makeStyles(() => ({
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
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  select: {
    [`& fieldset`]: {
      color: "black",
      border: "none",
    },
    backgroundColor: "#F4F9F9",
    borderRadius: 8,
  },
  blogThumbnail: {
    objectFit: "contain",
    height: "400px",
    width: "100%",

  },
  btn: {
    backgroundColor: "#496C59",
    color: "#FFF",
  }
}));

const JobPost = () => {
  const {
    body,
    handlePost,
    success,
    title,
    setTitle,
    setBody,
    setTags,
    tags,
    quillRef,
    handleChange,
    photo,
    previewImage,
    errorPhoto,
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
        <Grid item align="center" xs={12}>
          <Button component="label">
            <AddAPhotoIcon />
            <input
              name="photo"
              onChange={handleChange}
              type="file"
              hidden
              accept="image/*"
            />
          </Button>

          {photo ? (
            <img
              className={classes.blogThumbnail}
              height="400px"
              width="100%"
              src={previewImage}
              alt={title}
            />
          ) : null}
          {errorPhoto ? (
            <p className={classes.valErrorCover}>{errorPhoto}</p>
          ) : null}
        </Grid>

        <Grid
          item
          xs={12}
          sm={11}
          md={5}
          className={classes.gridItem}
        >
          <TextField
            className={classes.text}
            size="small"
            variant="outlined"
            type="text"
            multiline
            fullWidth
            required
            placeholder="Start Typing"
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
          md={5}
          className={classes.gridItem}
        >
          <ReactTagInput tags={tags} onChange={(newTags) => setTags(newTags)} />
          {tags ? (
            <InputLabel className={classes.label}>Tags</InputLabel>
          ) : null}
        </Grid>
      </Grid>

      <div
        style={{ width: "100%", backgroundColor: "white", height: 300 }}
        ref={quillRef}
      />

      <Grid
        align="center"
        item
        xs={12}
        className={classes.postGrid}
      >
        <Button className={classes.btn} variant="outlined" onClick={handlePost}>
          Post Blog
        </Button>
        <p>{success}</p>
      </Grid>
    </>
  );
};

export default JobPost;
