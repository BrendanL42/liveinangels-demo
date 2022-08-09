import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { update } from "../../../pages/api/formApi";

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import BackupIcon from "@material-ui/icons/Backup";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useStyles = makeStyles({
  input: {
    display: "none",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    height: "auto",
  },
  gridItem: {
    height: "auto",
  },
  upload: {
    margin: "0 1em 2em 0",
    backgroundColor: "#496C59",
    border: "none",
    color: "#FFF",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#d7b37c",
      border: "none",
    },
  },

  title: {
    marginTop: "2em",
    color: "grey",
    fontSize: "1.2em",
    fontWeight: "400",
    letterSpacing: "1px",
  },
  success: {
    display: "flex",
    justifyContent: "center",
    color: "#FFF",
    padding: "0.5em",
    borderRadius: "5px",
    textAlign: "center",
    margin: "1em auto",
    width: "200px",
    fontSize: "1.2em",
    fontWeight: "400",
    backgroundColor: "#00000083"
  },

  formHeading: {
    width: "100%",
    margin: "1em 0 1em 0",
    fontSize: "2em",
    fontWeight: "100",
  },
});

const Documents = (props) => {
  const classes = useStyles();
  const userId = props.userid;
  const token = props.token;

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState({
    wwc: false,
    policeCheck: false,
    firstAid: false,
    cpr: false,
    certOne: false,
    certTwo: false,
    certThree: false,
    certFour: false,
  });

  const [wwc, setWwc] = useState(null);
  const [policeCheck, setPoliceCheck] = useState(null);
  const [firstAid, setFirstAid] = useState(null);
  const [cpr, setCpr] = useState(null);
  const [certOne, setCertOne] = useState(null);
  const [certTwo, setCertTwo] = useState(null);
  const [certThree, setCertThree] = useState(null);
  const [certFour, setCertFour] = useState(null);

  //handle input capture
  const handleChange = (e) => {
    setError("");
    setSuccess("");
    const name = e.target.name;
    const file = e.target.files[0];
    const size = e.target.files[0] ? e.target.files[0].size : 0;

    if (size < 4000000) {
      switch (name) {
        case "wwc":
          setWwc(file);
          break;
        case "policeCheck":
          setPoliceCheck(file);
          break;
        case "firstAid":
          setFirstAid(file);
          break;
        case "cpr":
          setCpr(file);
          break;
        case "certOne":
          setCertOne(file);
          break;
        case "certTwo":
          setCertTwo(file);
          break;
        case "certThree":
          setCertThree(file);
          break;
        case "certFour":
          setCertFour(file);
          break;
      }

      setLoading((prevState) => ({
        ...prevState,
        [name]: true,
      }));

      let user = new FormData();
      name === "wwc" ? user.set("wwc", file) : null;
      name === "policeCheck" ? user.set("policeCheck", file) : null;
      name === "firstAid" ? user.set("firstAid", file) : null;
      name === "cpr" ? user.set("cpr", file) : null;
      name === "certOne" ? user.set("certOne", file) : null;
      name === "certTwo" ? user.set("certTwo", file) : null;
      name === "certThree" ? user.set("certThree", file) : null;
      name === "certFour" ? user.set("certFour", file) : null;

      update(userId, user, token)
        .then((data) => {
          if (data.error) {
            setLoading(false);
            setError(data.error);
          } else {
            setLoading(false);
            setSuccess("Upload Successful");
            setTimeout(() => {
              setSuccess("");
            }, 3000);
          }
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      alert("PDF - 4mb Max Size");
    }
  };

  return (
    <>
      <Grid
        container
        className={classes.container}
        direction="row"
        align="center"
        justifyContent="center"
        spacing={1}
      >
        <h6 className={classes.formHeading}>Carer's Application Form</h6>
        <Grid
          className={classes.gridItem}
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          xl={3}
        >
          <h3 className={classes.title}>Working With Children</h3>

          {loading.wwc ? <CircularProgress /> : null}
          <Button
            variant="default"
            className={classes.upload}
            component="label"
          >
            <BackupIcon />
            <input
              accept="application/pdf"
              onChange={handleChange}
              type="file"
              name="wwc"
              hidden
            />
          </Button>
          <Document
            file={
              wwc
                ? wwc
                : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/form/documents/${userId}?title=wwc`
            }
              >
            <Page width="100" pageNumber={1} />
          </Document>
        </Grid>

        <Grid
          className={classes.gridItem}
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          xl={3}
        >
          <h3 className={classes.title}>Police Check</h3>

          {loading.policeCheck ? <CircularProgress /> : null}
          <Button
            variant="default"
            className={classes.upload}
            component="label"
          >
            <BackupIcon />
            <input
              onChange={handleChange}
              type="file"
              name="policeCheck"
              hidden
              accept="application/pdf"
            />
          </Button>
          <Document
            file={
              policeCheck
                ? policeCheck
                : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/form/documents/${userId}?title=policeCheck`
            }
          >
            <Page width="100" pageNumber={1} />
          </Document>
        </Grid>

        <Grid
          className={classes.gridItem}
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          xl={3}
        >
          <h3 className={classes.title}>First Aid</h3>

          {loading.firstAid ? <CircularProgress /> : null}
          <Button
            variant="default"
            className={classes.upload}
            component="label"
          >
            <BackupIcon />
            <input
              accept="application/pdf"
              onChange={handleChange}
              type="file"
              name="firstAid"
              hidden
            />
          </Button>
          <Document
            file={
              firstAid
                ? firstAid
                : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/form/documents/${userId}?title=firstAid`
            }
            
          >
            <Page width="100" pageNumber={1} />
          </Document>
        </Grid>

        <Grid
          className={classes.gridItem}
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          xl={3}
        >
          <h3 className={classes.title}>CPR</h3>

          {loading.cpr ? <CircularProgress /> : null}
          <Button
            variant="default"
            className={classes.upload}
            component="label"
          >
            <BackupIcon />
            <input
              accept="application/pdf"
              onChange={handleChange}
              type="file"
              name="cpr"
              hidden
            />
          </Button>
          <Document
            file={
              cpr
                ? cpr
                : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/form/documents/${userId}?title=cpr`
            }
              >
            <Page width="100" pageNumber={1} />
          </Document>
        </Grid>

        <Grid
          className={classes.gridItem}
          item
          xs={12}
          sm={6}
          md={3}
          lg={3}
          xl={3}
        >
          <h3 className={classes.title}>Certificate 1</h3>

          {loading.certOne ? <CircularProgress /> : null}
          <Button
            variant="default"
            className={classes.upload}
            component="label"
          >
            <BackupIcon />
            <input
              accept="application/pdf"
              onChange={handleChange}
              type="file"
              name="certOne"
              hidden
            />
          </Button>
          <Document
            file={
              certOne
                ? certOne
                : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/form/documents/${userId}?title=certOne`
            }
                      >
            <Page width="100" pageNumber={1} />
          </Document>
        </Grid>

        {certOne ? (
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            xl={3}
          >
            <h3 className={classes.title}>Certificate 2</h3>

            {loading.certTwo ? <CircularProgress /> : null}
            <Button
              variant="default"
              className={classes.upload}
              component="label"
            >
              <BackupIcon />
              <input
                accept="application/pdf"
                onChange={handleChange}
                type="file"
                name="certTwo"
                hidden
              />
            </Button>
            <Document
              file={
                certTwo
                  ? certTwo
                  : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/form/documents/${userId}?title=certTwo`
              }
                          >
              <Page width="100" pageNumber={1} />
            </Document>
          </Grid>
        ) : null}

        {certTwo ? (
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            xl={3}
          >
            <h3 className={classes.title}>Certificate 3</h3>

            {loading.certThree ? <CircularProgress /> : null}
            <Button
              variant="default"
              className={classes.upload}
              component="label"
            >
              <BackupIcon />
              <input
                accept="application/pdf"
                onChange={handleChange}
                type="file"
                name="certThree"
                hidden
              />
            </Button>
            <Document
              file={
                certThree
                  ? certThree
                  : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/form/documents/${userId}?title=certThree`
              }
              
            >
              <Page width="100" pageNumber={1} />
            </Document>
          </Grid>
        ) : null}

        {certThree ? (
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={6}
            md={3}
            lg={3}
            xl={3}
          >
            <h3 className={classes.title}>Certificate 4</h3>

            {loading.certFour ? <CircularProgress /> : null}
            <Button
              variant="default"
              className={classes.upload}
              component="label"
            >
              <BackupIcon />
              <input
                accept="application/pdf"
                onChange={handleChange}
                type="file"
                name="certFour"
                hidden
              />
            </Button>
            <Document
              file={
                certFour
                  ? certFour
                  : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/form/documents/${userId}?title=certFour`
              }
              
            >
              <Page width="100" pageNumber={1} />
            </Document>
          </Grid>
        ) : null}
      </Grid>
      {success ? (
        <p className={classes.success}>{success}</p>
      ) : (
        <p className={classes.error}>{error}</p>
      )}
    </>
  );
};

export default Documents;
