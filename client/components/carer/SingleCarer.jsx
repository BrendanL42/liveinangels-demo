import { React, useState } from "react";
import styles from "./singleCarer.module.css";
import { makeStyles } from "@material-ui/core/styles";
import bl from "./bl";
import Roster from "../../components/roster/index";
import Notes from "../../components/notes/index";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";

import {
  TextField,
  InputLabel,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Button,
  IconButton,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CircularProgress from "@material-ui/core/CircularProgress";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    width: "100%",
    color: "#FFF",
    margin: "0 0 0.5em 0",
    backgroundColor: "#1f1f1f",
    padding: "1em",
  },

  text: {
    [`& input`]: {
      color: "#FFF",
    },
    backgroundColor: "#1f1f1f",
    margin: "0.4em 0",
  },
  text1: {
    [`& input`]: {
      color: "#FFF",
    },
    backgroundColor: "#1f1f1f",
    margin: "0.4em 1em 0.4em",
  },

  label: {
    fontSize: "0.7em",
    textAlign: "left",
    color: "#d7b37c",
    fontWeight: "100",
    letterSpacing: "1px",
    margin: "0.5em 0.5em 0.5em 0",
  },
  refereeWrapper: {
    color: "#FFF",
    backgroundColor: "#1f1f1f",
    padding: "1em",
    width: "100%",
    margin: "0.5em 0",
    borderRadius: "10px !important",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },

  documentWrapper: {
    borderRadius: "10px",
    padding: "1.5em",
    margin: "0.5em auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    alignItems: "center",
    color: "#FFF",
    backgroundColor: "#1f1f1f",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },
  emergencyWrapper: {
    width: "100%",
    margin: "0.5em auto",
    color: "#FFF",
    backgroundColor: "#1f1f1f",
    padding: "1.3em",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },

  notesWrapper: {
    padding: "1.5em",
    width: "100%",
    margin: "0.5em auto",
    backgroundColor: "#1f1f1f",
    borderRadius: "10px",
    color: "#FFF",
    minHeight: "490px !important",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },

  avalability: {
    width: "100%",
    margin: "0.5em auto",
    backgroundColor: "#1f1f1f",
    padding: "1.5em",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },

  rosterWrapper: {
    width: "100%",
    margin: "0.5em auto",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0 !important",
    },
  },
}));

const SingleCarer = () => {
  const classes = useStyles();
  const {
    carer,
    loading,
    documents,
    getFile,
    expanded,
    handleAccordian,
    handleChange,
    carerUpdate,
    handleSave,
    uploadFile,
    submitFile,
    handleVisaState,
    handleAgeState,
  } = bl();

  return carer ? (
    <>
      <Grid
        className={classes.detailsContainer}
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Grid item xs={12} sm={12} md={3} className={styles.profileImgWrapper}>
          <div className={styles.imgWrapper}>
            <img
              className={styles.profileImg}
              src={carer.photo}
              height={"auto"}
              width={"auto"}
            />

            <p className={styles.created}>
              Updated: {moment(carer.updated).fromNow()}
            </p>
          </div>

          <div className={styles.ageBox}>
            <p
              style={{
                color: "#E11D74",
                fontWeight: "bold",
                fontSize: "1.4em",
              }}
            >
              #{carer.carerNumber}
            </p>
            <IconButton onClick={handleSave} aria-label="save">
              <SaveIcon fontSize="large" style={{ color: "green" }} />
            </IconButton>

            <div className={styles.ageWrapper}>
              <p>{moment().diff(carerUpdate.age, "years")}</p>
            </div>

            <div className={styles.ageWrapper}>
              {carer.ausCitizen ? (
                <img
                  src={"/images/ausFlag.png"}
                  alt="icon"
                  width="20"
                  height="20"
                />
              ) : (
                <img
                  src={"/images/alien.png"}
                  alt="icon"
                  width="20"
                  height="20"
                />
              )}
            </div>

            <div className={styles.ageWrapper}>
              <p>
                {carerUpdate.car ? (
                  <img
                    style={{ cursor: "pointer" }}
                    src={"/images/car.png"}
                    alt="icon"
                    width="23"
                    height="23"
                    onClick={handleChange}
                    name="car"
                  />
                ) : (
                  <img
                    style={{ cursor: "pointer" }}
                    name="car"
                    onClick={handleChange}
                    src={"/images/walk.png"}
                    width="23"
                    height="23"
                  />
                )}
              </p>
            </div>
          </div>
        </Grid>
        <hr className={styles.line} />

        <Grid item xs={12} sm={12} md={2}>
          <h6 style={{ margin: "1em auto" }} className={styles.detailsHeading}>
            Personal Details
          </h6>
          <TextField
           
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="First name"
            value={carerUpdate.fName}
            name="fName"
            onChange={handleChange}
          />

          <InputLabel className={classes.label}>Name</InputLabel>

          <TextField
           
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Last name"
            value={carerUpdate.lName}
            name="lName"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>Surname</InputLabel>

          <TextField
         
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Email"
            value={carerUpdate.email}
            name="email"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>Email</InputLabel>

          <TextField
          
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Phone"
            value={carerUpdate.phone}
            name="phone"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>Phone</InputLabel>
        </Grid>

        <hr className={styles.line} />

        <Grid item xs={12} sm={12} md={2}>
          <h6 style={{ margin: "1em auto" }} className={styles.detailsHeading}>
            Visa Status
          </h6>
          <TextField
          
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Start Typing"
            value={
              handleAgeState
                ? carerUpdate.age
                : moment(carer.age).format("DD/MM/YYYY")
            }
            name="age"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>Birthdate</InputLabel>
          <p>{carerUpdate.gender}</p>
          <p className={classes.label}>Gender</p>

          <TextField
         
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Start Typing"
            value={carerUpdate.nationality}
            name="nationality"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>Nationality</InputLabel>

          <TextField
      
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Start Typing"
            value={carerUpdate.language}
            name="language"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>Languages</InputLabel>

          {carer.visaDetails === "" ? (
            <TextField
              className={classes.text}
              size="small"
              type="text"
              fullWidth
              value={"No Visa"}
            />
          ) : (
            <TextField
              className={classes.text}
              size="small"
              type="text"
              fullWidth
              placeholder="Start Typing"
              value={
                handleVisaState
                  ? carerUpdate.visaDetails
                  : moment(carer.visaDetails).format("DD/MM/YYYY")
              }
              name="visaDetails"
              onChange={handleChange}
            />
          )}

          <InputLabel className={classes.label}>Visa Expiry</InputLabel>
        </Grid>
        <hr className={styles.line} />
        <Grid item xs={12} sm={12} md={2}>
          <h6 style={{ margin: "1em auto" }} className={styles.detailsHeading}>
            Address
          </h6>
          <TextField
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Start Typing"
            value={carerUpdate.address}
            name="address"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>Street</InputLabel>
          <TextField
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Start Typing"
            value={carerUpdate.suburb}
            name="suburb"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>Suburb</InputLabel>

          <TextField
          
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Start Typing"
            value={carerUpdate.city}
            name="city"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>City</InputLabel>
          <TextField
           
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Start Typing"
            value={carerUpdate.state}
            name="state"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>State</InputLabel>
          <TextField
         
            className={classes.text}
            size="small"
            type="text"
            fullWidth
            placeholder="Start Typing"
            value={carerUpdate.postcode}
            name="postcode"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>Postcode</InputLabel>
        </Grid>
      </Grid>

      <Grid container justifyContent="space-around">
        <Grid item xs={12} sm={12} md={5}>
          <Accordion
            className={classes.refereeWrapper}
            expanded={expanded === "panel3"}
            onChange={handleAccordian("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#FFF" }} />}
              aria-controls="referee-content"
            >
              <h6 className={styles.boxHeading}>Work</h6>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid container align="center">
                <Grid item xs={12}>
                  <h6
                    style={{
                      borderBottom: "1px solid #d7b37c",
                      paddingBottom: "0.5em",
                      width: "80%",
                    }}
                    className={styles.title}
                  >
                    APPLIED ROLES
                  </h6>
                  {carer.applications ? (
                    carer.applications.map((app) => (
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>
                          <a
                            href={`/jobsboard/${app.jobPostId}`}
                            style={{ color: "#FFF" }}
                          >
                            View Job
                          </a>
                          {" --- "}

                          <p
                            style={{
                              color: "#d7b37c",
                              display: "inline",
                              margin: "0 1em 0 0",
                            }}
                          >
                            {moment(app.date).fromNow()}
                          </p>
                        </li>
                      </ul>
                    ))
                  ) : (
                    <p style={{ marginTop: "1em", color: "red" }}>
                      No Active Applications
                    </p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <h6 className={styles.title}>Referee 1</h6>
                  <p>{carer.refereeNameOne}</p>
                  <p>{carer.refereeRelOne}</p>
                  <p>{carer.refereePhoneOne}</p>
                  <p>{carer.refereeEmailOne}</p>
                </Grid>
                <Grid item xs={12}>
                  <h6 className={styles.title}>Referee 2</h6>
                  <p>{carer.refereeNameTwo}</p>
                  <p>{carer.refereeRelTwo}</p>
                  <p>{carer.refereePhoneTwo}</p>
                  <p>{carer.refereeEmailTwo}</p>
                </Grid>
                <Grid item xs={12}>
                  <h6 className={styles.title}>Referee 3</h6>
                  <p>{carer.refereeNameThree}</p>
                  <p>{carer.refereeRelThree}</p>
                  <p>{carer.refereePhoneThree}</p>
                  <p>{carer.refereeEmailThree}</p>
                </Grid>

                <Grid item xs={12}>
                  <h6 className={styles.title}>Experience</h6>
                  <p>
                    {carer.relevantExp === "undefined"
                      ? "No Experience Provided"
                      : carer.relevantExp}
                  </p>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Accordion
            className={classes.refereeWrapper}
            expanded={expanded === "panel2"}
            onChange={handleAccordian("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#FFF" }} />}
              aria-controls="referee-content"
            >
              <h6 className={styles.boxHeading}>About Me</h6>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid container align="center">
                <Grid item xs={12}>
                  <p style={{ textAlign: "justify" }}>{carer.aboutMe}</p>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <h6 className={styles.boxHeading}>Hobbies</h6>
                  <ul className={styles.hobbies}>
                    {carer.hobbieOne === "undefined" ? (
                      ""
                    ) : (
                      <li>{carer.hobbieOne}</li>
                    )}

                    {carer.hobbieTwo === "undefined" ? (
                      ""
                    ) : (
                      <li>{carer.hobbieTwo}</li>
                    )}

                    {carer.hobbieThree === "undefined" ? (
                      ""
                    ) : (
                      <li>{carer.hobbieThree}</li>
                    )}

                    {carer.hobbieFour === "undefined" ? (
                      ""
                    ) : (
                      <li>{carer.hobbieFour}</li>
                    )}
                  </ul>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Accordion
            className={classes.refereeWrapper}
            expanded={expanded === "panel1"}
            onChange={handleAccordian("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#FFF" }} />}
              aria-controls="referee-content"
            >
              <h6 className={styles.boxHeading}>Emergency Contact</h6>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid container align="center">
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                  
                    className={classes.text}
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="First name"
                    value={carerUpdate.emergencyName}
                    name="emergencyName"
                    onChange={handleChange}
                  />
                  <InputLabel className={classes.label}>Full Name</InputLabel>

                  <TextField
                
                    className={classes.text}
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Relationship"
                    value={carerUpdate.emergencyRelationship}
                    name="emergencyRelationship"
                    onChange={handleChange}
                  />
                  <InputLabel className={classes.label}>
                    Relationship
                  </InputLabel>
                  <TextField
                
                    className={classes.text}
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Phone Number"
                    value={carerUpdate.emergencyNumber}
                    name="emergencyNumber"
                    onChange={handleChange}
                  />
                  <InputLabel className={classes.label}>Phone</InputLabel>
                  <TextField
                  
                    className={classes.text}
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Email"
                    value={carerUpdate.emergencyEmail}
                    name="emergencyEmail"
                    onChange={handleChange}
                  />
                  <InputLabel className={classes.label}>Email</InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <h6
                    style={{ margin: "1em auto" }}
                    className={styles.boxHeading}
                  >
                    Medical Notes
                  </h6>

                  <TextField
                  
                    className={classes.text}
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Medical notes"
                    value={
                      carerUpdate.medical === "undefined"
                        ? "No medical conditions"
                        : carerUpdate.medical
                    }
                    name="medical"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <h6
                    style={{ margin: "1em auto" }}
                    className={styles.boxHeading}
                  >
                    Workers Compensation
                  </h6>

                  <TextField
                  
                    className={classes.text}
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Compensation"
                    value={
                      carerUpdate.workersComp === "undefined"
                        ? "No claims"
                        : carerUpdate.workersComp
                    }
                    name="workersComp"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <Accordion
            className={classes.refereeWrapper}
            expanded={expanded === "panel4"}
            onChange={handleAccordian("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#FFF" }} />}
              aria-controls="document"
            >
              <h6 className={styles.boxHeading}>Documents</h6>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <div className={classes.documentWrapper}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h6 className={styles.docHeading}>CV</h6>

                  {carer.cv ? (
                    <>
                      {documents.cv ? (
                        <a href={documents.cv} target="_blank" download>
                          View
                        </a>
                      ) : (
                        <>
                          <CloudDownloadIcon onClick={() => getFile("cv")} />
                        </>
                      )}
                    </>
                  ) : null}

                  {loading.cv ? <CircularProgress /> : null}
                  {!loading.cv ? (
                    <Button
                      variant="default"
                      className={classes.upload}
                      component="label"
                    >
                      <AddIcon style={{ color: "#FFF" }} />
                      <input
                        accept="application/pdf"
                        onChange={uploadFile}
                        type="file"
                        name="cv"
                        hidden
                      />
                    </Button>
                  ) : null}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h6 className={styles.docHeading}>WWC</h6>
                  {carer.wwc ? (
                    <>
                      {documents.wwc ? (
                        <a href={documents.wwc} target="_blank" download>
                          View
                        </a>
                      ) : (
                        <>
                          <CloudDownloadIcon onClick={() => getFile("wwc")} />
                        </>
                      )}
                    </>
                  ) : null}

                  {loading.wwc ? <CircularProgress /> : null}
                  {!loading.wwc ? (
                    <Button
                      variant="default"
                      className={classes.upload}
                      component="label"
                    >
                      <AddIcon style={{ color: "#FFF" }} />
                      <input
                        accept="application/pdf"
                        onChange={uploadFile}
                        type="file"
                        name="wwc"
                        hidden
                      />
                    </Button>
                  ) : null}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h6 className={styles.docHeading}>PC</h6>
                  {carer.policeCheck ? (
                    <>
                      {documents.pc ? (
                        <a href={documents.pc} target="_blank" download>
                          View
                        </a>
                      ) : (
                        <>
                          <CloudDownloadIcon onClick={() => getFile("pc")} />
                        </>
                      )}
                    </>
                  ) : null}

                  {loading.pc ? <CircularProgress /> : null}
                  {!loading.pc ? (
                    <Button
                      variant="default"
                      className={classes.upload}
                      component="label"
                    >
                      <AddIcon style={{ color: "#FFF" }} />
                      <input
                        accept="application/pdf"
                        onChange={uploadFile}
                        type="file"
                        name="pc"
                        hidden
                      />
                    </Button>
                  ) : null}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h6 className={styles.docHeading}>FA</h6>
                  {carer.firstAid ? (
                    <>
                      {documents.fa ? (
                        <a href={documents.fa} target="_blank" download>
                          View
                        </a>
                      ) : (
                        <>
                          <CloudDownloadIcon onClick={() => getFile("fa")} />
                        </>
                      )}
                    </>
                  ) : null}

                  {loading.fa ? <CircularProgress /> : null}
                  {!loading.fa ? (
                    <Button
                      variant="default"
                      className={classes.upload}
                      component="label"
                    >
                      <AddIcon style={{ color: "#FFF" }} />
                      <input
                        accept="application/pdf"
                        onChange={uploadFile}
                        type="file"
                        name="fa"
                        hidden
                      />
                    </Button>
                  ) : null}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h6 className={styles.docHeading}>CPR</h6>
                  {carer.cpr ? (
                    <>
                      {documents.cpr ? (
                        <a href={documents.cpr} target="_blank" download>
                          View
                        </a>
                      ) : (
                        <>
                          <CloudDownloadIcon onClick={() => getFile("cpr")} />
                        </>
                      )}
                    </>
                  ) : null}

                  {loading.cpr ? <CircularProgress /> : null}
                  {!loading.cpr ? (
                    <Button
                      variant="default"
                      className={classes.upload}
                      component="label"
                    >
                      <AddIcon style={{ color: "#FFF" }} />
                      <input
                        accept="application/pdf"
                        onChange={uploadFile}
                        type="file"
                        name="cpr"
                        hidden
                      />
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className={classes.documentWrapper}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h6 className={styles.docHeading}>Doc 1</h6>
                  {carer.certOne ? (
                    <>
                      {documents.c1 ? (
                        <a href={documents.c1} target="_blank" download>
                          View
                        </a>
                      ) : (
                        <>
                          <CloudDownloadIcon onClick={() => getFile("c1")} />
                        </>
                      )}
                    </>
                  ) : null}

                  {loading.c1 ? <CircularProgress /> : null}
                  {!loading.c1 ? (
                    <Button
                      variant="default"
                      className={classes.upload}
                      component="label"
                    >
                      <AddIcon style={{ color: "#FFF" }} />
                      <input
                        accept="application/pdf"
                        onChange={uploadFile}
                        type="file"
                        name="c1"
                        hidden
                      />
                    </Button>
                  ) : null}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h6 className={styles.docHeading}>Doc 2</h6>
                  {carer.certTwo ? (
                    <>
                      {documents.c2 ? (
                        <a href={documents.c2} target="_blank" download>
                          View
                        </a>
                      ) : (
                        <>
                          <CloudDownloadIcon onClick={() => getFile("c2")} />
                        </>
                      )}
                    </>
                  ) : null}

                  {loading.c2 ? <CircularProgress /> : null}
                  {!loading.c2 ? (
                    <Button
                      variant="default"
                      className={classes.upload}
                      component="label"
                    >
                      <AddIcon style={{ color: "#FFF" }} />
                      <input
                        accept="application/pdf"
                        onChange={uploadFile}
                        type="file"
                        name="c2"
                        hidden
                      />
                    </Button>
                  ) : null}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h6 className={styles.docHeading}>Doc 3</h6>
                  {carer.certThree ? (
                    <>
                      {documents.c3 ? (
                        <a href={documents.c3} target="_blank" download>
                          View
                        </a>
                      ) : (
                        <>
                          <CloudDownloadIcon onClick={() => getFile("c3")} />
                        </>
                      )}
                    </>
                  ) : null}

                  {loading.c3 ? <CircularProgress /> : null}
                  {!loading.c3 ? (
                    <Button
                      variant="default"
                      className={classes.upload}
                      component="label"
                    >
                      <AddIcon style={{ color: "#FFF" }} />
                      <input
                        accept="application/pdf"
                        onChange={uploadFile}
                        type="file"
                        name="c3"
                        hidden
                      />
                    </Button>
                  ) : null}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h6 className={styles.docHeading}>Doc 4</h6>
                  {carer.certFour ? (
                    <>
                      {documents.c4 ? (
                        <a href={documents.c4} target="_blank" download>
                          View
                        </a>
                      ) : (
                        <>
                          <CloudDownloadIcon onClick={() => getFile("c4")} />
                        </>
                      )}
                    </>
                  ) : null}

                  {loading.c4 ? <CircularProgress /> : null}
                  {!loading.c4 ? (
                    <Button
                      variant="default"
                      className={classes.upload}
                      component="label"
                    >
                      <AddIcon style={{ color: "#FFF" }} />
                      <input
                        onChange={uploadFile}
                        type="file"
                        name="c4"
                        hidden
                      />
                    </Button>
                  ) : null}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid
          align="left"
          item
          xs={12}
          sm={12}
          md={4}
          className={classes.emergencyWrapper}
        >
          <h6 className={styles.boxHeading}>Avalability</h6>

          <div className={styles.daysWrapper}>
            <div className={styles.avalWrapper}>
              <p>Mon</p>
            </div>

            <TextField
           
              className={classes.text1}
              size="small"
              type="text"
              fullWidth
              placeholder="Not Available"
              value={
                carerUpdate.monday === "undefined" ? "" : carerUpdate.monday
              }
              name="monday"
              onChange={handleChange}
            />
          </div>

          <div className={styles.daysWrapper}>
            <div className={styles.avalWrapper}>
              <p>Tue</p>
            </div>
            <TextField
            
              className={classes.text1}
              size="small"
              type="text"
              fullWidth
              placeholder="Not Available"
              value={
                carerUpdate.tuesday === "undefined" ? "" : carerUpdate.tuesday
              }
              name="tuesday"
              onChange={handleChange}
            />
          </div>
          <div className={styles.daysWrapper}>
            <div className={styles.avalWrapper}>
              <p>Wed</p>
            </div>
            <TextField
           
              className={classes.text1}
              size="small"
              type="text"
              fullWidth
              placeholder="Not Available"
              value={
                carerUpdate.wednesday === "undefined"
                  ? ""
                  : carerUpdate.wednesday
              }
              name="wednesday"
              onChange={handleChange}
            />
          </div>
          <div className={styles.daysWrapper}>
            <div className={styles.avalWrapper}>
              <p>Thu</p>
            </div>
            <TextField
            
              className={classes.text1}
              size="small"
              type="text"
              fullWidth
              placeholder="Not Available"
              value={
                carerUpdate.thursday === "undefined" ? "" : carerUpdate.thursday
              }
              name="thursday"
              onChange={handleChange}
            />
          </div>

          <div className={styles.daysWrapper}>
            <div className={styles.avalWrapper}>
              <p>Fri</p>
            </div>
            <TextField
            
              className={classes.text1}
              size="small"
              type="text"
              fullWidth
              placeholder="Not Available"
              value={
                carerUpdate.friday === "undefined" ? "" : carerUpdate.friday
              }
              name="friday"
              onChange={handleChange}
            />
          </div>

          <div className={styles.daysWrapper}>
            <div className={styles.avalWrapper}>
              <p>Sat</p>
            </div>
            <TextField
           
              className={classes.text1}
              size="small"
              type="text"
              fullWidth
              placeholder="Not Available"
              value={
                carerUpdate.saturday === "undefined" ? "" : carerUpdate.saturday
              }
              name="saturday"
              onChange={handleChange}
            />
          </div>

          <div className={styles.daysWrapper}>
            <div className={styles.avalWrapper}>
              <p>Sun</p>
            </div>
            <TextField
            
              className={classes.text1}
              size="small"
              type="text"
              fullWidth
              placeholder="Not Available"
              value={
                carerUpdate.sunday === "undefined" ? "" : carerUpdate.sunday
              }
              name="sunday"
              onChange={handleChange}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={7} className={classes.notesWrapper}>
          <h6 className={styles.boxHeading}>Notes</h6>
          <Notes />
        </Grid>

        <Grid align="center" item xs={12} className={classes.rosterWrapper}>
          <Roster />
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

export default SingleCarer;
