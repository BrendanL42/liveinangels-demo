import React from "react";

import styles from "./singleClient.module.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import bl from "./bl";

import moment from "moment";
import Notes from "../../../components/notes/index";
import Roster from "../../../components/roster/index";

import {
  Grid,
  CircularProgress,
  IconButton,
  TextField,
  InputLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import MinimizeIcon from "@material-ui/icons/Minimize";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import PanToolIcon from "@material-ui/icons/PanTool";
import NotesIcon from "@material-ui/icons/Notes";
import Box from "@material-ui/core/Box";
import ClearIcon from "@material-ui/icons/Clear";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  clientContainer: {
    width: "100%",
    color: "#FFF",
    margin: "0 0 1em 0",
    backgroundColor: "#1f1f1f",
    padding: "1em",
  },

  notesWrapper: {
    margin: "1em auto",
  },

  rosterWrapper: {
    margin: "1em auto",
  },

  notesWrapper1: {
    width: "100%",
    margin: "1em auto",
    color: "#FFF",
    backgroundColor: "#1f1f1f",
    padding: "1.3em",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },

  notesWrapper2: {
    backgroundColor: "#1f1f1f",
    padding: "1.5em",
    borderRadius: "10px",
    margin: "1em auto",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },

  billingGuardianWrapper1: {
    backgroundColor: "#1f1f1f",
    padding: "1.5em",
    borderRadius: "10px",
    margin: "1em auto",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },

  billingGuardianWrapper2: {
    backgroundColor: "#1f1f1f",
    padding: "1.5em",
    borderRadius: "10px",
    margin: "1em auto",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },

  text: {
    [`& input`]: {
      color: "#FFF",
    },
    backgroundColor: "#1f1f1f",
    margin: "0.4em 0",
  },
  label: {
    fontSize: "0.8em",
    textAlign: "left",
    color: "#d7b37c",
    fontWeight: "100",
    letterSpacing: "1px",
    marginBottom: "0.5em",
  },
  chipBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflowX: "auto",
  },
  chip: {
    color: "#FFF",
    margin: "0.5em",
    fontSize: "1.1em",
    fontWeight: "200",
    padding: "0.1em",
  },
  box2: {
    boxShadow: "none",
    borderBottom: "1px solid rgb(255, 255, 255, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1em",
    textAlign: "left",
    fontWeight: "200",
    width: "100%",
    margin: "1em auto",
    color: "#FFF",
  },
}));

const SingleClient = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const {
    client,
    handleSave,
    handleChange,
    clientUpdate,
    handleDelete,
    handleDecrementDays,
    handleIncrementDays,
    handleIncrementNights,
    handleDecrementNights,
    nightsReq,
    daysReq,
    handleSelectNote,
    listItem,
    clientUpdateRef,
    checkPets,
  } = bl();

  return client ? (
    <>
      <Grid container className={classes.clientContainer}>
        <Grid xs={12} md={6} item>
          <FormControl
            style={{ color: "#FFF", marginBottom: "-0.5em", marginLeft: "1em" }}
            component="fieldset"
            variant="standard"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={clientUpdateRef.current.preferred ? true : false}
                  onChange={handleChange}
                  name="preferred"
                />
              }
              label={clientUpdateRef.current.preferred ? "Client" : "Guardian"}
            />
            <FormLabel style={{ color: "#d7b37c" }} component="legend">
              Preferred Contact
            </FormLabel>
          </FormControl>

          <div className={styles.wrapper1}>
            <p className={styles.clientNumber}>#{client.clientNumber}</p>
            <IconButton onClick={handleSave} aria-label="save">
              <SaveIcon fontSize="large" style={{ color: "green" }} />
              <p style={{ color: "#FFF", fontSize: "0.6em" }}>
                {moment(client.updated).fromNow()}
              </p>
            </IconButton>
          </div>
          <p className={styles.clientHeaderName}>
            {client.clientfName} {client.clientlName}{" "}
            {moment().diff(client.clientAge, "years")}{" "}
            <span className={styles.yrs}>yrs</span> {client.clientGender}
          </p>
          <div className={styles.wrapper3}>
            <div className={styles.careWrapper}>
              <p style={{ fontSize: "1.2em" }}>
                {nightsReq ? nightsReq : client.nightsReq}
              </p>
              <div>
                <MinimizeIcon
                  fontSize="medium"
                  style={{ cursor: "pointer" }}
                  onClick={handleDecrementNights}
                />

                <img
                  className={classes.night}
                  src={"/images/night.png"}
                  alt="icon moon"
                  height={40}
                  width={40}
                />
                <AddIcon
                  fontSize="medium"
                  style={{ cursor: "pointer" }}
                  onClick={handleIncrementNights}
                />
              </div>
            </div>

            <div className={styles.careWrapper}>
              <p style={{ fontSize: "1.2em" }}>
                {daysReq ? daysReq : client.daysReq}
              </p>

              <div>
                <MinimizeIcon
                  fontSize="medium"
                  style={{ cursor: "pointer" }}
                  onClick={handleDecrementDays}
                />

                <img
                  className={classes.night}
                  src={"/images/sun.png"}
                  alt="icon sun"
                  height={40}
                  width={40}
                />
                <AddIcon
                  fontSize="medium"
                  style={{ cursor: "pointer" }}
                  onClick={handleIncrementDays}
                />
              </div>
            </div>
          </div>
          <div className={styles.wrapper2}>
            <div className={styles.circleWrapper}>
              {clientUpdate.wheelChair ? (
                <img
                  name="wheelChair"
                  onClick={handleChange}
                  src={"/images/wheelchair.png"}
                  height={40}
                  width={40}
                />
              ) : (
                <img
                  name="wheelChair"
                  onClick={handleChange}
                  className={styles.imgReq}
                  src={"/images/wheelchair.png"}
                  height={40}
                  width={40}
                />
              )}
            </div>

            <div className={styles.circleWrapper}>
              {clientUpdate.walkingAid ? (
                <img
                  name="walkingAid"
                  onClick={handleChange}
                  src={"/images/walker.png"}
                  height={40}
                  width={40}
                />
              ) : (
                <img
                  name="walkingAid"
                  onClick={handleChange}
                  className={styles.imgReq}
                  src={"/images/walker.png"}
                  height={40}
                  width={40}
                />
              )}
            </div>
            <div className={styles.circleWrapper}>
              {clientUpdate.hoist ? (
                <img
                  name="hoist"
                  onClick={handleChange}
                  src={"/images/hoist.png"}
                  height={40}
                  width={40}
                />
              ) : (
                <img
                  name="hoist"
                  onClick={handleChange}
                  className={styles.imgReq}
                  src={"/images/hoist.png"}
                  height={40}
                  width={40}
                />
              )}
            </div>
            <div className={styles.circleWrapper}>
              {clientUpdate.bedConfined ? (
                <img
                  name="bedConfined"
                  onClick={handleChange}
                  src={"/images/stretcher.png"}
                  height={40}
                  width={40}
                />
              ) : (
                <img
                  name="bedConfined"
                  onClick={handleChange}
                  className={styles.imgReq}
                  src={"/images/stretcher.png"}
                  height={40}
                  width={40}
                />
              )}
            </div>
            <div className={styles.circleWrapper}>
              {clientUpdate.blind ? (
                <img
                  name="blind"
                  onClick={handleChange}
                  src={"/images/blind.png"}
                  height={40}
                  width={40}
                />
              ) : (
                <img
                  name="blind"
                  onClick={handleChange}
                  className={styles.imgReq}
                  src={"/images/blind.png"}
                  height={40}
                  width={40}
                />
              )}
            </div>

            <div className={styles.circleWrapper}>
              {clientUpdate.deaf ? (
                <img
                  name="deaf"
                  onClick={handleChange}
                  src={"/images/deaf.png"}
                  height={40}
                  width={40}
                />
              ) : (
                <img
                  name="deaf"
                  onClick={handleChange}
                  className={styles.imgReq}
                  src={"/images/deaf.png"}
                  height={40}
                  width={40}
                />
              )}
            </div>
            <div className={styles.circleWrapper}>
              <img name="pets" src={checkPets()} height={40} width={40} />
            </div>
          </div>
        </Grid>
        <hr className={styles.line} />
        <Grid item xs={12} md={6}>
        <h6 style={{ margin: "0 0 1em 0"}} className={styles.detailsHeading}>
              Personal Details
            </h6>
          <Grid container alignItems="right" justifyContent="center">
            <Grid item xs={12} md={5}>
              <TextField
                className={classes.text}
                size="small"
                type="text"
                fullWidth
                placeholder="Start Typing"
                value={clientUpdate.clientfName}
                name="clientfName"
                onChange={handleChange}
              />

              <InputLabel className={classes.label}>Name</InputLabel>

              <TextField
                className={classes.text}
                size="small"
                type="text"
                fullWidth
                placeholder="Start Typing"
                value={clientUpdate.clientlName}
                name="clientlName"
                onChange={handleChange}
              />
              <InputLabel className={classes.label}>Surname</InputLabel>

              <TextField
                className={classes.text}
                size="small"
                type="text"
                fullWidth
                placeholder="Start Typing"
                value={clientUpdate.clientEmail}
                name="clientEmail"
                onChange={handleChange}
              />
              <InputLabel className={classes.label}>Email</InputLabel>

              <TextField
                className={classes.text}
                size="small"
                type="text"
                fullWidth
                placeholder="Start Typing"
                value={clientUpdate.clientPhone}
                name="clientPhone"
                onChange={handleChange}
              />

              <InputLabel className={classes.label}>Phone</InputLabel>

              <TextField
                className={classes.text}
                size="small"
                type="text"
                fullWidth
                placeholder="Start Typing"
                value={clientUpdate.clientNationality}
                name="clientNationality"
                onChange={handleChange}
              />
              <InputLabel className={classes.label}>Nationality</InputLabel>


            </Grid>
            <hr className={styles.line} />
           
            <Grid item xs={12} md={5}>
            <h6 style={{ margin: "0 0 1em 0"}} className={styles.detailsHeading}>
              Address
            </h6>
              <TextField
                className={classes.text}
                size="small"
                type="text"
                fullWidth
                placeholder="Start Typing"
                value={clientUpdate.clientaddress}
                name="clientaddress"
                onChange={handleChange}
              />
              <InputLabel className={classes.label}>Street</InputLabel>
              <TextField
                className={classes.text}
                size="small"
                type="text"
                fullWidth
                placeholder="Start Typing"
                value={clientUpdate.clientSuburb}
                name="clientSuburb"
                onChange={handleChange}
              />
              <InputLabel className={classes.label}>Suburb</InputLabel>
              <TextField
                className={classes.text}
                size="small"
                type="text"
                fullWidth
                placeholder="Start Typing"
                value={clientUpdate.clientCity}
                name="clientCity"
                onChange={handleChange}
              />
              <InputLabel className={classes.label}>City</InputLabel>
              <TextField
                className={classes.text}
                size="small"
                type="text"
                fullWidth
                placeholder="Start Typing"
                value={clientUpdate.clientState}
                name="clientState"
                onChange={handleChange}
              />
              <InputLabel className={classes.label}>State</InputLabel>
              <TextField
                className={classes.text}
                size="small"
                type="text"
                fullWidth
                placeholder="Start Typing"
                value={clientUpdate.clientPostcode}
                name="clientPostcode"
                onChange={handleChange}
              />
              <InputLabel className={classes.label}>Postcode</InputLabel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid justify="space-evenly" container className={classes.notesWrapper}>
        <Grid className={classes.notesWrapper1} item xs={12} sm={12} md={5}>
          <h6 style={{ margin: "0 0 1em 0" }} className={styles.boxHeading}>
            Notes
          </h6>
          <Notes />
        </Grid>

        <Grid className={classes.notesWrapper2} item xs={12} sm={12} md={5}>
          <h6 style={{ margin: "0 0 1em 0" }} className={styles.boxHeading}>
            Services Needed
          </h6>
          <div className={classes.chipBox}>
            <Chip
              className={classes.chip}
              avatar={<FavoriteIcon />}
              label="Personal Care"
              onDelete={() => handleSelectNote("personalCare")}
              variant="outlined"
              deleteIcon={<AddIcon style={{ color: "#FFF" }} />}
            />
            <Chip
              className={classes.chip}
              avatar={<LocalLaundryServiceIcon />}
              label="Light House Duties"
              onDelete={() => handleSelectNote("houseDuties")}
              variant="outlined"
              deleteIcon={<AddIcon style={{ color: "#FFF" }} />}
            />
            <Chip
              className={classes.chip}
              avatar={<ShoppingCartIcon />}
              label="Shopping"
              onDelete={() => handleSelectNote("shopping")}
              variant="outlined"
              deleteIcon={<AddIcon style={{ color: "#FFF" }} />}
            />

            <Chip
              className={classes.chip}
              avatar={<DirectionsWalkIcon />}
              label="Outings"
              onDelete={() => handleSelectNote("outings")}
              variant="outlined"
              deleteIcon={<AddIcon style={{ color: "#FFF" }} />}
            />
            <Chip
              className={classes.chip}
              avatar={<PanToolIcon />}
              label="Manual Handling"
              onDelete={() => handleSelectNote("manualHandling")}
              variant="outlined"
              deleteIcon={<AddIcon style={{ color: "#FFF" }} />}
            />
            <Chip
              className={classes.chip}
              avatar={<NotesIcon />}
              label="Other"
              onDelete={() => handleSelectNote("other")}
              variant="outlined"
              deleteIcon={<AddIcon style={{ color: "#FFF" }} />}
            />
          </div>

          {listItem.map((item, i) => (
            <div style={{ margin: "1em auto", width: "100%" }} key={i}>
              <p>{item}</p>
            </div>
          ))}
          <div style={{ overflowY: "scroll", maxHeight: "300px" }}>
            {client
              ? client.personalCare.map((item, i) => (
                  <Box
                    className={classes.box2}
                    key={i}
                    boxShadow={3}
                    m={1}
                    p={1}
                  >
                    <div>
                      <IconButton aria-label="delete">
                        <ClearIcon
                          style={{ color: "red" }}
                          onClick={() =>
                            handleDelete(client.personalCare[i], "personalCare")
                          }
                        />
                      </IconButton>
                      {item}
                    </div>
                    <FavoriteIcon />
                  </Box>
                ))
              : null}
            {client
              ? client.houseDuties.map((item, i) => (
                  <Box
                    className={classes.box2}
                    key={i}
                    boxShadow={3}
                    m={1}
                    p={1}
                  >
                    <div>
                      <IconButton aria-label="delete">
                        <ClearIcon
                          style={{ color: "red" }}
                          onClick={() =>
                            handleDelete(client.houseDuties[i], "houseDuties")
                          }
                        />
                      </IconButton>
                      {item}
                    </div>
                    <LocalLaundryServiceIcon />
                  </Box>
                ))
              : null}
            {client
              ? client.shopping.map((item, i) => (
                  <Box
                    className={classes.box2}
                    key={i}
                    boxShadow={3}
                    m={1}
                    p={1}
                  >
                    <div>
                      <IconButton aria-label="delete">
                        <ClearIcon
                          style={{ color: "red" }}
                          onClick={() =>
                            handleDelete(client.shopping[i], "shopping")
                          }
                        />
                      </IconButton>
                      {item}
                    </div>
                    <ShoppingCartIcon />
                  </Box>
                ))
              : null}

            {client
              ? client.outings.map((item, i) => (
                  <Box
                    className={classes.box2}
                    key={i}
                    boxShadow={3}
                    m={1}
                    p={1}
                  >
                    <div>
                      <IconButton aria-label="delete">
                        <ClearIcon
                          style={{ color: "red" }}
                          onClick={() =>
                            handleDelete(client.outings[i], "outings")
                          }
                        />
                      </IconButton>
                      {item}
                    </div>
                    <DirectionsWalkIcon />
                  </Box>
                ))
              : null}
            {client
              ? client.manualHandling.map((item, i) => (
                  <Box
                    className={classes.box2}
                    key={i}
                    boxShadow={3}
                    m={1}
                    p={1}
                  >
                    <div>
                      <IconButton aria-label="delete">
                        <ClearIcon
                          style={{ color: "red" }}
                          onClick={() =>
                            handleDelete(
                              client.manualHandling[i],
                              "manualHandling"
                            )
                          }
                        />
                      </IconButton>
                      {item}
                    </div>
                    <PanToolIcon />
                  </Box>
                ))
              : null}
            {client
              ? client.other.map((item, i) => (
                  <Box
                    className={classes.box2}
                    key={i}
                    boxShadow={3}
                    m={1}
                    p={1}
                  >
                    <div>
                      <IconButton aria-label="delete">
                        <ClearIcon
                          style={{ color: "red" }}
                          onClick={() => handleDelete(client.other[i], "other")}
                        />
                      </IconButton>
                      {item}
                    </div>
                    <NotesIcon />
                  </Box>
                ))
              : null}
          </div>
        </Grid>

        <Grid
          container
          justify="space-evenly"
          className={classes.billingGuardianWrapper}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            className={classes.billingGuardianWrapper1}
          >
            <h6
              style={{ margin: "0 0 1.5em 0", fontWeight: "bold" }}
              className={styles.boxHeading}
            >
              GUARDIAN
            </h6>
            <Grid container>
            
              <Grid xs={12} md={6} item>
              <h6 style={{ margin: "0 0 1em 0"}} className={styles.detailsHeading}>
              Personal Details
            </h6>
                <TextField
                  className={classes.text}
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="First name"
                  value={clientUpdate.guardianfName}
                  name="guardianfName"
                  onChange={handleChange}
                />

                <InputLabel className={classes.label}>Name</InputLabel>

                <TextField
                  className={classes.text}
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Last name"
                  value={clientUpdate.guardianlName}
                  name="guardianlName"
                  onChange={handleChange}
                />
                <InputLabel className={classes.label}>Surname</InputLabel>

                <TextField
                  className={classes.text}
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Enter relationship"
                  value={clientUpdate.guardianrelationship}
                  name="guardianrelationship"
                  onChange={handleChange}
                />
                <InputLabel className={classes.label}>Relationship</InputLabel>
                <TextField
                  className={classes.text}
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Email"
                  value={clientUpdate.guardianemail}
                  name="guardianemail"
                  onChange={handleChange}
                />

                <InputLabel className={classes.label}>Email</InputLabel>

                <TextField
                  className={classes.text}
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Phone"
                  value={clientUpdate.guardianphone}
                  name="guardianphone"
                  onChange={handleChange}
                />
                <InputLabel className={classes.label}>Phone</InputLabel>
              </Grid>
              <hr className={styles.line} />
              <Grid item md={6}>
              <h6 style={{ margin: "0 0 1em 0"}} className={styles.detailsHeading}>
             Address
            </h6>
                <TextField
                  className={classes.text}
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Address"
                  value={clientUpdate.guardianaddress}
                  name="guardianaddress"
                  onChange={handleChange}
                />
                <InputLabel className={classes.label}>Street</InputLabel>
                <TextField
                  className={classes.text}
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Enter suburb"
                  value={clientUpdate.guardianSuburb}
                  name="guardianSuburb"
                  onChange={handleChange}
                />
                <InputLabel className={classes.label}>Suburb</InputLabel>

                <TextField
                  className={classes.text}
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Enter city"
                  value={clientUpdate.guardianCity}
                  name="guardianCity"
                  onChange={handleChange}
                />
                <InputLabel className={classes.label}>City</InputLabel>

                <TextField
                  className={classes.text}
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Enter state"
                  value={clientUpdate.guardianState}
                  name="guardianState"
                  onChange={handleChange}
                />
                <InputLabel className={classes.label}>State</InputLabel>

                <TextField
                  className={classes.text}
                  size="small"
                  type="text"
                  fullWidth
                  placeholder="Enter Postcode"
                  value={clientUpdate.guardianPostcode}
                  name="guardianPostcode"
                  onChange={handleChange}
                />
                <InputLabel className={classes.label}>Postcode</InputLabel>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} md={5} item className={classes.billingGuardianWrapper2}>
            <h6
              style={{ margin: "0 0 1em 0", fontWeight: "bold" }}
              className={styles.boxHeading}
            >
              Billing
            </h6>

            <TextField
              className={classes.text}
              size="small"
              type="text"
              fullWidth
              placeholder="Address"
              value={clientUpdate.billingPostAddress}
              name="billingPostAddress"
              onChange={handleChange}
            />
            <InputLabel className={classes.label}>Street or PO Box</InputLabel>

            <TextField
              className={classes.text}
              size="small"
              type="text"
              fullWidth
              placeholder="Enter suburb"
              value={clientUpdate.billingSuburb}
              name="billingSuburb"
              onChange={handleChange}
            />
            <InputLabel className={classes.label}>Suburb</InputLabel>
            <TextField
              className={classes.text}
              size="small"
              type="text"
              fullWidth
              placeholder="Enter city"
              value={clientUpdate.billingPostCity}
              name="billingPostCity"
              onChange={handleChange}
            />
            <InputLabel className={classes.label}>City</InputLabel>
            <TextField
              className={classes.text}
              size="small"
              type="text"
              fullWidth
              placeholder="Enter state"
              value={clientUpdate.billingPostState}
              name="billingPostState"
              onChange={handleChange}
            />
            <InputLabel className={classes.label}>State</InputLabel>
            <TextField
              className={classes.text}
              size="small"
              type="text"
              fullWidth
              placeholder="Enter postcode"
              value={clientUpdate.billingPostPostcode}
              name="billingPostPostcode"
              onChange={handleChange}
            />
            <InputLabel className={classes.label}>Postcode</InputLabel>
            <TextField
              className={classes.text}
              size="small"
              type="text"
              fullWidth
              placeholder="Enter email"
              value={clientUpdate.billingEmail}
              name="billingEmail"
              onChange={handleChange}
            />

            <InputLabel className={classes.label}>Email</InputLabel>
          </Grid>
          <Grid item xs={12} className={classes.rosterWrapper}>
            <Roster />
          </Grid>
        </Grid>
      </Grid>
    </>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default SingleClient;
