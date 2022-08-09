import React from "react";
import bl from "./bl";
import styles from "./notes.module.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import ClearIcon from "@material-ui/icons/Clear";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  text: {
    [`& fieldset`]: {
      color: "#FFF",
    },
    backgroundColor: "#FFF",
    margin: "0.4em auto",
    borderRadius: "8px",
  },
  delete: {
    color: "#FFF",
    cursor: "pointer",
  },
}));

const Notes = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const {
    note,
    setNote,
    priority,
    setPriority,
    handleSubmit,
    singleClient,
    singleCarers,
    handleCheck,
    completed,
    handleDelete,
  } = bl();

  return (
    <>
      <TextField
        className={classes.text}
        multiline
        rows={4}
        variant="outlined"
        size="small"
        type="text"
        fullWidth
        placeholder="Enter Note"
        value={note}
        name="note"
        onChange={(e) => setNote(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => handleSubmit(router)}>
            <AddIcon fontSize="large" style={{ color: "#FFF" }} />
          </Button>
          <Button
            onClick={(e) => setPriority("high")}
            style={
              priority === "high"
                ? {
                    borderBottom: "3px solid #9a695a",
                    borderRadius: 0,
                  }
                : null
            }
          >
            <img
              src={"/images/prioritize.png"}
              alt="high priority"
              width="37"
              height="37"
            />
            
          </Button>
          <Button
            onClick={(e) => setPriority("low")}
            style={
              priority === "low"
                ? {
                    borderBottom: "3px solid #9a695a",
                    borderRadius: 0,
                  }
                : null
            }
          >
            <img
              style={{ marginRight: "0.6em" }}
              src={"/images/low-priority.png"}
              alt="low priority"
              width="36"
              height="36"
            />
          </Button>
        </div>
      </div>
      <Grid>
        <ul className={styles.notesList}>
          {singleClient
            ? singleClient.notes
                .slice(0)
                .reverse()
                .map((note) => (
                  <li>
                     <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={
                              <img
                                src={"/images/circle.png"}
                                alt="icon"
                                width="30"
                                height="30"
                              />
                            }
                            checked={note.completed ? true : null}
                            checkedIcon={
                              <img
                                src={"/images/check.png"}
                                alt="icon"
                                width="30"
                                height="30"
                              />
                            }
                            onChange={(e) => handleCheck(e, note._id)}
                            value={completed}
                          />
                        }
                      />
                      <p
                        style={{
                          marginLeft: "0.3em",
                          padding: "0.4em 1em",
                          textAlign: "justify",
                        }}
                      >
                        {note.note}
                      </p>
                    </div>

                    {note.priority === "high" ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          style={{ marginRight: "1em" }}
                          src={"/images/prioritize.png"}
                          alt="high priority"
                          width="37"
                          height="37"
                        />

                        <IconButton aria-label="delete">
                          <ClearIcon
                       style={{ color: "yellow" }}
                            className={classes.delete}
                            onClick={() => handleDelete(note._id)}
                          />
                        </IconButton>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          style={{ marginRight: "1em" }}
                          className={classes.night}
                          src={"/images/low-priority.png"}
                          alt="low priority"
                          width="36"
                          height="36"
                        />
                        <IconButton aria-label="delete">
                          <ClearIcon
                          style={{ color: "yellow" }}
                            className={classes.delete}
                            onClick={() => handleDelete(note._id)}
                          />
                        </IconButton>
                      </div>
                    )}
                  </li>
                ))
            : null}
          {singleCarers
            ? singleCarers.notes
                .slice(0)
                .reverse()
                .map((note) => (
                  <li>
                       <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={
                              <img
                                src={"/images/circle.png"}
                                alt="icon"
                                width="30"
                                height="30"
                              />
                            }
                            checked={note.completed ? true : null}
                            checkedIcon={
                              <img
                                src={"/images/check.png"}
                                alt="icon"
                                width="30"
                                height="30"
                              />
                            }
                            onChange={(e) => handleCheck(e, note._id)}
                            value={completed}
                          />
                        }
                      />
                      <p
                        style={{
                          marginLeft: "0.3em",
                          padding: "0.4em 1em",
                          textAlign: "justify",
                        }}
                      >
                        {note.note}
                      </p>
                    </div>

                    {note.priority === "high" ? (
                       <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
                        <img
                          style={{ marginRight: "1em" }}
                          src={"/images/prioritize.png"}
                          alt="high priority"
                          width="37"
                          height="37"
                        />

                        <IconButton aria-label="delete">
                          <ClearIcon
                            style={{ color: "yellow" }}
                            onClick={() => handleDelete(note._id)}
                          />
                         
                        </IconButton>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
                        <img
                          style={{ marginRight: "1em" }}
                          className={classes.night}
                          src={"/images/low-priority.png"}
                          alt="low priority"
                          width="36"
                          height="36"
                        />
                        <IconButton aria-label="delete">
                          <ClearIcon
                           style={{ color: "yellow" }}
                            onClick={() => handleDelete(note._id)}
                          />
                        </IconButton>
                      </div>
                    )}
                  </li>
                ))
            : null}
        </ul>
      </Grid>
    </>
  );
};

export default Notes;
