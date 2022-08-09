import React, { useState } from "react";
import bl from "./bl";
import styles from "./roster.module.css";
import {
  Button,
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  TextField,
  Grid,
  ButtonGroup,
  IconButton,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles(() => ({
  btn1: {
    margin: "0 0 0 1em",
    textTransform: "capitalize",
    fontWeight: "500",
  },

  label: {
    padding: "0 0 0 1em",
    fontWeight: "900",
  },

  label2: {
    padding: "0 0 0 0.1em",
    fontWeight: "900",
  },

  text: {
    [`& input`]: {},
    backgroundColor: "rgb(255,255,255,0.9)",
    margin: "0 0 1em 0",
    borderRadius: "5px",
  },
  select: {
    [`& fieldset`]: {
      color: "black",
      border: "none",
    },
    backgroundColor: "white",
    borderRadius: 8,
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Roster = () => {
  const classes = useStyles();
  const [table, setTable] = useState("table");
  const [schedule, setSchedule] = useState("");

  const Table = () => {
    const {
      singleCarers,
      singleClient,
      cal,
      calDates,
      handleEdit,
      refSingleCarers,
      refSingleClient,
      handleDelete,
      handleEmail,
      pdf,
      refPdf,
    } = bl();

    return singleCarers ? (
      <>
        {refSingleCarers.current.rosters.map((item, i) => (
          <>
         
              <div
                
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
              >
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined primary button group"
                  style={{
                    border: "1px solid white",
                    margin: "0.8em"
                  }}
                >
                  <Button
                    style={{
                      textTransform: "capitalize",
                      color: "#FFF",
                      border: "none",
                    }}
                    startIcon={<EmailIcon />}
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      handleEmail(
                        item.match,
                        item.client.id,
                        singleCarers._id,
                        "carer",
                        singleCarers.email,
                        true
                      )
                    }
                  >
                    Carer
                  </Button>

                  <Button
                    style={{
                      textTransform: "capitalize",
                      color: "#FFF",
                      border: "none",
                    }}
                    startIcon={<EmailIcon />}
                    color="primary"
                    variant="outlined"
                    onClick={() =>
                      handleEmail(
                        item.match,
                        item.client.id,
                        singleCarers._id,
                        "client",
                        singleCarers.email,
                        true
                      )
                    }
                  >
                    Client
                  </Button>
                

                  {pdf ? (
                    <a
                      style={{ color: "#FFF", margin: "auto 0.3em auto auto" }}
                      href={refPdf.current}
                      target="_blank"
                      download
                    >
                      View
                    </a>
                  ) : (
                    <IconButton
                      fontSize="large"
                      style={{ color: "white"}}
                      aria-label="delete"
                    >

                      
                      <CloudDownloadIcon
                        onClick={() =>
                          handleEmail(
                            item.match,
                            item.client.id,
                            singleCarers._id,
                            "carer",
                            singleCarers.email,
                            false
                          )
                        }

                        
                      />
                    </IconButton>
                  )}
                </ButtonGroup>

                <IconButton
                    fontSize="large"
                    style={{ color: "red", padding: "1em", width: "50px", height: "50px", border: "1px solid #FFF", borderRadius: "50%"}}
                    aria-label="delete"
                  >
                    <DeleteIcon
                      onClick={() =>
                        handleDelete(
                          item.match,
                          item.client.id,
                          singleCarers._id
                        )
                      }
                    />
                  
                  </IconButton>
                  <div style={{display: "flex", color: "white" ,marginBottom: "0.7em"}}>
                  <div style={{ color: "red", padding: "1em", width: "60px", height: "60px", border: "1px solid #FFF", borderRadius: "50%",display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <p className={styles.km}>{item.km ? item.km : "N/A"}</p>
                  </div> 
                 <p style={{marginLeft: "0.4em"}}>km</p>
                  </div>
              
                 

                  

                  <div className={styles.whenWrapper}>
                  <TextField
                    className={classes.text}
                    fullWidth
                    size="small"
                    variant="outlined"
                    type="date"
                    placeholder="Roster starts on"
                    value={item.from}
                    name="from"
                    onChange={(e) => handleEdit(e, i, "from")}
                  />
                  <p className={styles.divider}>
                    -
                  </p>
                  <TextField
                    className={classes.text}
                    fullWidth
                    size="small"
                    variant="outlined"
                    type="date"
                    placeholder="Roster ends on"
                    value={item.to}
                    name="to"
                    onChange={(e) => handleEdit(e, i, "to")}
                  />
                </div>
                <h4 className={styles.name}>Client Name: {item.client.name}</h4>
              </div>

              
              <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <tr>
                  <th>Day</th>

                  <th>Start</th>
                  <th>Finish</th>
                  <th>Total</th>
                  <th>Notes</th>
                </tr>

                <tr>
                  <td>{calDates(item.from, item.to, 0)}</td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Start Time"
                      value={item.schedule.monday.start}
                      name="start"
                      onChange={(e) => handleEdit(e, i, "monday")}
                    />
                  </td>
                  <td>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      size="small"
                      placeholder="Finish Time"
                      value={item.schedule.monday.finish}
                      name="finish"
                      onChange={(e) => handleEdit(e, i, "monday")}
                    />
                  </td>
                  <td>
                    {cal(
                      item.schedule.monday.start,
                      item.schedule.monday.finish
                    )}
                  </td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Notes"
                      value={item.schedule.monday.notes}
                      name="notes"
                      onChange={(e) => handleEdit(e, i, "monday")}
                    />
                  </td>
                </tr>

                <tr>
                  <td>{calDates(item.from, item.to, 1)}</td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Start Time"
                      value={item.schedule.tuesday.start}
                      name="start"
                      onChange={(e) => handleEdit(e, i, "tuesday")}
                    />
                  </td>
                  <td>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      size="small"
                      placeholder="Finish Time"
                      value={item.schedule.tuesday.finish}
                      name="finish"
                      onChange={(e) => handleEdit(e, i, "tuesday")}
                    />
                  </td>
                  <td>
                    {cal(
                      item.schedule.tuesday.start,
                      item.schedule.tuesday.finish
                    )}
                  </td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Notes"
                      value={item.schedule.tuesday.notes}
                      name="notes"
                      onChange={(e) => handleEdit(e, i, "tuesday")}
                    />
                  </td>
                </tr>

                <tr>
                  <td>{calDates(item.from, item.to, 2)}</td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Start Time"
                      value={item.schedule.wednesday.start}
                      name="start"
                      onChange={(e) => handleEdit(e, i, "wednesday")}
                    />
                  </td>
                  <td>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      size="small"
                      placeholder="Finish Time"
                      value={item.schedule.wednesday.finish}
                      name="finish"
                      onChange={(e) => handleEdit(e, i, "wednesday")}
                    />
                  </td>
                  <td>
                    {cal(
                      item.schedule.wednesday.start,
                      item.schedule.wednesday.finish
                    )}
                  </td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Notes"
                      value={item.schedule.wednesday.notes}
                      name="notes"
                      onChange={(e) => handleEdit(e, i, "wednesday")}
                    />
                  </td>
                </tr>

                <tr>
                  <td>{calDates(item.from, item.to, 3)}</td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Start Time"
                      value={item.schedule.thursday.start}
                      name="start"
                      onChange={(e) => handleEdit(e, i, "thursday")}
                    />
                  </td>
                  <td>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      size="small"
                      placeholder="Finish Time"
                      value={item.schedule.thursday.finish}
                      name="finish"
                      onChange={(e) => handleEdit(e, i, "thursday")}
                    />
                  </td>
                  <td>
                    {cal(
                      item.schedule.thursday.start,
                      item.schedule.thursday.finish
                    )}
                  </td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Notes"
                      value={item.schedule.thursday.notes}
                      name="notes"
                      onChange={(e) => handleEdit(e, i, "thursday")}
                    />
                  </td>
                </tr>

                <tr>
                  <td>{calDates(item.from, item.to, 4)}</td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Start Time"
                      value={item.schedule.friday.start}
                      name="start"
                      onChange={(e) => handleEdit(e, i, "friday")}
                    />
                  </td>
                  <td>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      size="small"
                      placeholder="Finish Time"
                      value={item.schedule.friday.finish}
                      name="finish"
                      onChange={(e) => handleEdit(e, i, "friday")}
                    />
                  </td>
                  <td>
                    {cal(
                      item.schedule.friday.start,
                      item.schedule.friday.finish
                    )}
                  </td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Notes"
                      value={item.schedule.friday.notes}
                      name="notes"
                      onChange={(e) => handleEdit(e, i, "friday")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>{calDates(item.from, item.to, 5)}</td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Start Time"
                      value={item.schedule.saturday.start}
                      name="start"
                      onChange={(e) => handleEdit(e, i, "saturday")}
                    />
                  </td>
                  <td>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      size="small"
                      placeholder="Finish Time"
                      value={item.schedule.saturday.finish}
                      name="finish"
                      onChange={(e) => handleEdit(e, i, "saturday")}
                    />
                  </td>
                  <td>
                    {cal(
                      item.schedule.saturday.start,
                      item.schedule.saturday.finish
                    )}
                  </td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Notes"
                      value={item.schedule.saturday.notes}
                      name="notes"
                      onChange={(e) => handleEdit(e, i, "saturday")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>{calDates(item.from, item.to, 6)}</td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Start Time"
                      value={item.schedule.sunday.start}
                      name="start"
                      onChange={(e) => handleEdit(e, i, "sunday")}
                    />
                  </td>
                  <td>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      size="small"
                      placeholder="Finish Time"
                      value={item.schedule.sunday.finish}
                      name="finish"
                      onChange={(e) => handleEdit(e, i, "sunday")}
                    />
                  </td>
                  <td>
                    {cal(
                      item.schedule.sunday.start,
                      item.schedule.sunday.finish
                    )}
                  </td>
                  <td>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      type="text"
                      required
                      placeholder="Notes"
                      value={item.schedule.sunday.notes}
                      name="notes"
                      onChange={(e) => handleEdit(e, i, "sunday")}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </>
        )) }
      </>
    ) : singleClient ? (
      refSingleClient.current.rosters.map((item, i) => (
        <>
          <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
             <IconButton
                 fontSize="large"
                 style={{ margin: "0.8em", color: "red", padding: "1em", width: "50px", height: "50px", border: "1px solid #FFF", borderRadius: "50%"}}
                aria-label="delete"
              >
                <DeleteIcon
                  onClick={() =>
                    handleDelete(item.match, singleClient._id, item.carer.id)
                  }
                />
              </IconButton>


            <ButtonGroup
              variant="outlined"
              aria-label="outlined primary button group"
              style={{
                border: "1px solid white",
              }}
            >
             

              {pdf ? (
                <a
                  style={{ color: "#FFF", margin: "auto 0.3em auto auto", }}
                  href={refPdf.current}
                  target="_blank"
                  download
                >
                  View
                </a>
              ) : (
                <IconButton
                  fontSize="large"
                  style={{ color: "white" }}
                  aria-label="download"
                >
                  <CloudDownloadIcon
                    onClick={() =>
                      handleEmail(
                        item.match,
                        singleClient._id,
                        item.carer.id,
                        "client",
                        "email",
                        false
                      )
                    }

                  />
                </IconButton>
              )}
            </ButtonGroup>

            <div className={styles.whenWrapper}>
              <TextField
                fullWidth
                className={classes.text}
                size="small"
                variant="outlined"
                type="date"
                placeholder="Roster starts on"
                value={item.from}
                name="from"
                onChange={(e) => handleEdit(e, i, "from")}
              />
              <p className={styles.divider}>-</p>

              <TextField
                className={classes.text}
                fullWidth
                size="small"
                variant="outlined"
                type="date"
                placeholder="Roster ends on"
                value={item.to}
                name="to"
                onChange={(e) => handleEdit(e, i, "to")}
              />
            </div>
            <h4 className={styles.name}>Carer Name: {item.carer.name}</h4>
          </div>
          

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <tr>
                <th>Day</th>
                <th>Start</th>
                <th>Finish</th>
                <th>Total</th>
                <th>Notes</th>
              </tr>

              <tr>
                <td>{calDates(item.from, item.to, 0)}</td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Start Time"
                    value={item.schedule.monday.start}
                    name="start"
                    onChange={(e) => handleEdit(e, i, "monday")}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    size="small"
                    placeholder="Finish Time"
                    value={item.schedule.monday.finish}
                    name="finish"
                    onChange={(e) => handleEdit(e, i, "monday")}
                  />
                </td>
                <td>
                  {cal(item.schedule.monday.start, item.schedule.monday.finish)}
                </td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Notes"
                    value={item.schedule.monday.notes}
                    name="notes"
                    onChange={(e) => handleEdit(e, i, "monday")}
                  />
                </td>
              </tr>

              <tr>
                <td>{calDates(item.from, item.to, 1)}</td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Start Time"
                    value={item.schedule.tuesday.start}
                    name="start"
                    onChange={(e) => handleEdit(e, i, "tuesday")}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    size="small"
                    placeholder="Finish Time"
                    value={item.schedule.tuesday.finish}
                    name="finish"
                    onChange={(e) => handleEdit(e, i, "tuesday")}
                  />
                </td>
                <td>
                  {cal(
                    item.schedule.tuesday.start,
                    item.schedule.tuesday.finish
                  )}
                </td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Notes"
                    value={item.schedule.tuesday.notes}
                    name="notes"
                    onChange={(e) => handleEdit(e, i, "tuesday")}
                  />
                </td>
              </tr>

              <tr>
                <td>{calDates(item.from, item.to, 2)}</td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Start Time"
                    value={item.schedule.wednesday.start}
                    name="start"
                    onChange={(e) => handleEdit(e, i, "wednesday")}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    size="small"
                    placeholder="Finish Time"
                    value={item.schedule.wednesday.finish}
                    name="finish"
                    onChange={(e) => handleEdit(e, i, "wednesday")}
                  />
                </td>
                <td>
                  {cal(
                    item.schedule.wednesday.start,
                    item.schedule.wednesday.finish
                  )}
                </td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Notes"
                    value={item.schedule.wednesday.notes}
                    name="notes"
                    onChange={(e) => handleEdit(e, i, "wednesday")}
                  />
                </td>
              </tr>

              <tr>
                <td>{calDates(item.from, item.to, 3)}</td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Start Time"
                    value={item.schedule.thursday.start}
                    name="start"
                    onChange={(e) => handleEdit(e, i, "thursday")}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    size="small"
                    placeholder="Finish Time"
                    value={item.schedule.thursday.finish}
                    name="finish"
                    onChange={(e) => handleEdit(e, i, "thursday")}
                  />
                </td>
                <td>
                  {cal(
                    item.schedule.thursday.start,
                    item.schedule.thursday.finish
                  )}
                </td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Notes"
                    value={item.schedule.thursday.notes}
                    name="notes"
                    onChange={(e) => handleEdit(e, i, "thursday")}
                  />
                </td>
              </tr>

              <tr>
                <td>{calDates(item.from, item.to, 4)}</td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Start Time"
                    value={item.schedule.friday.start}
                    name="start"
                    onChange={(e) => handleEdit(e, i, "friday")}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    size="small"
                    placeholder="Finish Time"
                    value={item.schedule.friday.finish}
                    name="finish"
                    onChange={(e) => handleEdit(e, i, "friday")}
                  />
                </td>
                <td>
                  {cal(item.schedule.friday.start, item.schedule.friday.finish)}
                </td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Notes"
                    value={item.schedule.friday.notes}
                    name="notes"
                    onChange={(e) => handleEdit(e, i, "friday")}
                  />
                </td>
              </tr>
              <tr>
                <td>{calDates(item.from, item.to, 5)}</td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Start Time"
                    value={item.schedule.saturday.start}
                    name="start"
                    onChange={(e) => handleEdit(e, i, "saturday")}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    size="small"
                    placeholder="Finish Time"
                    value={item.schedule.saturday.finish}
                    name="finish"
                    onChange={(e) => handleEdit(e, i, "saturday")}
                  />
                </td>
                <td>
                  {cal(
                    item.schedule.saturday.start,
                    item.schedule.saturday.finish
                  )}
                </td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Notes"
                    value={item.schedule.saturday.notes}
                    name="notes"
                    onChange={(e) => handleEdit(e, i, "saturday")}
                  />
                </td>
              </tr>
              <tr>
                <td>{calDates(item.from, item.to, 6)}</td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Start Time"
                    value={item.schedule.sunday.start}
                    name="start"
                    onChange={(e) => handleEdit(e, i, "sunday")}
                  />
                </td>
                <td>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    size="small"
                    placeholder="Finish Time"
                    value={item.schedule.sunday.finish}
                    name="finish"
                    onChange={(e) => handleEdit(e, i, "sunday")}
                  />
                </td>
                <td>
                  {cal(item.schedule.sunday.start, item.schedule.sunday.finish)}
                </td>
                <td>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    type="text"
                    required
                    placeholder="Notes"
                    value={item.schedule.sunday.notes}
                    name="notes"
                    onChange={(e) => handleEdit(e, i, "sunday")}
                  />
                </td>
              </tr>
            </table>
          </div>
        </>
      ))
    ) : null;
  };

  const Schedule = () => {
    const classes = useStyles();
    const theme = useTheme();
    const {
      clientName,
      handleChange,
      carerName,
      clients,
      carers,
      day,
      setDay,
      setStart,
      start,
      setFinish,
      finish,
      handleDays,
      handleSave,
      refDay,
      note,
      setNote,
      success,
      error,
      from,
      setFrom,
      to,
      setTo,
      roster,
      completed,
      singleCarers,
      singleClient,
      cal,
      handleEdit,
      placeholder,
      setPlaceholder,
      refSingleCarers,
    } = bl();
    return (
      <div>
        <h6 className={styles.boxHeading}>Match People</h6>
        <div className={styles.carerContainer}>
          <FormControl fullWidth size="medium" className={classes.select}>
            <InputLabel className={classes.label} id="carer">
              Pick a Carer
            </InputLabel>
            <Select
              labelId="carer"
              value={carerName}
              onChange={(e) => handleChange(e, 0)}
              input={<OutlinedInput label="Chip" />}
              renderValue={(selected) => (
                <Box>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {carers
                ? carers.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, carerName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </div>
        <div className={styles.clientContainer}>
          <div>
            <FormControl fullWidth size="medium" className={classes.select}>
              <InputLabel className={classes.label} id="client">
                Match a Client
              </InputLabel>
              <Select
                labelId="client"
                value={clientName}
                onChange={(e) => handleChange(e, 1)}
                input={<OutlinedInput label="Chip" />}
                renderValue={(selected) => (
                  <Box>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {clients.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, clientName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <ul className={styles.selection}>
          {roster.monday.start ? (
            <li>{`Monday: ${roster.monday.start}${" -- "}${
              roster.monday.finish
            }${" -- "}${roster.monday.notes}`}</li>
          ) : null}

          {roster.tuesday.start ? (
            <li>{`Tuesday: ${roster.tuesday.start}${" -- "}${
              roster.tuesday.finish
            }${" -- "}${roster.tuesday.notes}`}</li>
          ) : null}

          {roster.wednesday.start ? (
            <li>{`Wednesday: ${roster.wednesday.start}${" -- "}${
              roster.wednesday.finish
            }${" -- "}${roster.wednesday.notes}`}</li>
          ) : null}

          {roster.thursday.start ? (
            <li>{`Thursday: ${roster.thursday.start}${" -- "}${
              roster.thursday.finish
            }${" -- "}${roster.thursday.notes}`}</li>
          ) : null}

          {roster.friday.start ? (
            <li>{`Friday: ${roster.friday.start}${" -- "}${
              roster.friday.finish
            }${" -- "}${roster.friday.notes}`}</li>
          ) : null}

          {roster.saturday.start ? (
            <li>{`Saturday: ${roster.saturday.start}${" -- "}${
              roster.saturday.finish
            }${" -- "}${roster.saturday.notes}`}</li>
          ) : null}

          {roster.sunday.start ? (
            <li>{`Sunday: ${roster.sunday.start}${" -- "}${
              roster.sunday.finish
            }${" -- "}${roster.sunday.notes}`}</li>
          ) : null}
        </ul>

        <div className={styles.daysContainer}>
          {!completed ? (
            <>
              <h6 className={styles.boxHeading}>Choose Hours</h6>

              <TextField
                className={classes.text}
                size="small"
                fullWidth
                variant="outlined"
                type="date"
                placeholder="Roster Starts From"
                value={from}
                name="from"
                onChange={(e) => setFrom(e.target.value)}
              />
              <TextField
                className={classes.text}
                size="small"
                fullWidth
                variant="outlined"
                type="date"
                required
                placeholder="Roster Ends On"
                value={to}
                name="to"
                onChange={(e) => setTo(e.target.value)}
              />
            </>
          ) : null}

          <div className={styles.day}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              className={classes.select}
            >
              {!day ? (
                <InputLabel className={classes.label2} id="day">
                  Select Day
                </InputLabel>
              ) : null}
              <Select
                labelId="day"
                value={refDay.current}
                onChange={(e) => setDay(e.target.value)}
              >
                <MenuItem value={"monday"}>Monday</MenuItem>
                <MenuItem value={"tuesday"}>Tuesday</MenuItem>
                <MenuItem value={"wednesday"}>Wednesday</MenuItem>
                <MenuItem value={"thursday"}>Thursday</MenuItem>
                <MenuItem value={"friday"}>Friday</MenuItem>
                <MenuItem value={"saturday"}>Saturday</MenuItem>
                <MenuItem value={"sunday"}>Sunday</MenuItem>
              </Select>
            </FormControl>
          </div>

          {day ? (
            <div className={styles.day}>
              <TextField
                className={classes.text}
                size="small"
                variant="outlined"
                type="text"
                fullWidth
                placeholder="Start Time"
                value={start}
                name="start"
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
          ) : null}

          {start ? (
            <div className={styles.day}>
              <TextField
                className={classes.text}
                size="small"
                variant="outlined"
                type="text"
                fullWidth
                placeholder="Finish Time"
                value={finish}
                name="finish"
                onChange={(e) => setFinish(e.target.value)}
              />
            </div>
          ) : null}

          {finish ? (
            <div className={styles.day}>
              <TextField
                className={classes.text}
                variant="outlined"
                type="text"
                fullWidth
                multiline
                minRows={2}
                placeholder="Notes"
                value={note}
                name="note"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          ) : null}

          {finish ? (
            <div className={styles.adContainer}>
              <Button
                style={{
                  textTransform: "capitalize",
                  color: "#FFF",
                  border: "1px solid #FFF",
                  marginTop: "1em",
                }}
                onClick={() =>
                  handleDays(carerName, clientName, start, finish, day)
                }
                variant="outlined"
              >
                <AddIcon /> Add Shift
              </Button>
            </div>
          ) : null}
          <Button
            style={{
              textTransform: "capitalize",
              color: "#FFF",
              border: "1px solid #FFF",
              marginTop: "1em",
            }}
            onClick={() => {
              handleSave(carerName, clientName);
              setSchedule("");
              setTable("table");
            }}
            className={classes.btn1}
            variant="outlined"
          >
            Create New Roster
          </Button>
          {success ? <p>{success}</p> : null}
          {error ? <p>{error}</p> : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.container}>
        {table ? (
          <Button
            style={{
              textTransform: "capitalize",
              color: "#FFF",
              border: "1px solid #FFF",
            }}
            onClick={() => {
              setSchedule("schedule"), setTable("");
            }}
            className={classes.btn1}
            color="primary"
            variant="outlined"
          >
            New Roster +
          </Button>
        ) : null}
        {table === "table" ? <Table /> : null}
        {schedule === "schedule" ? <Schedule /> : null}
      </div>
    </>
  );
};

export default Roster;
