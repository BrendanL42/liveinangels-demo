import { React, useEffect } from "react";
import useState from "react-usestateref";
import { update, read } from "../../pages/api/formApi";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import { s3File } from "../../pages/api/helperApi";

import Documents from "./documents/Documents";

import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddIcon from "@material-ui/icons/Add";
import BackupIcon from "@material-ui/icons/Backup";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Button,
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "@material-ui/core";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "auto",
    padding: "0",
  },

  container: {
    minHeight: "auto",
    margin: "2em auto",
  },
  valError: {
    color: "red",
    fontSize: "0.9em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "15px 0 15px  6px",
    textAlign: "left",
  },

  valErrorCv: {
    color: "red",
    fontSize: "0.9em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "15px 0 15px  6px",
    textAlign: "center",
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
  gridItem: {
    height: "75px",
    margin: "0.5em 0.5em",
  },
  gridItemAboutMe: {
    height: "150px",
  },
  gridItemMedical: {
    height: "100%",
  },
  label: {
    textAlign: "left",
    color: "black",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
    margin: "15px 0 0 6px",
  },
  emergencyHeading: {
    margin: "0",
    fontSize: "1.3em",
    fontWeight: "100",
  },
  formHeading: {
    width: "100%",
    margin: "1em 0 1em 0",
    fontSize: "2em",
    fontWeight: "100",
  },
  weekdays: {
    margin: "1em",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    maxWidth: "890px",
  },
  iconWrapper: {
    margin: "1em",
  },
  accordionDetails: {
    display: "flex",
    flexDirection: "column",
  },
  accordion: {
    margin: "2em 0",
  },
  AccordionSummary: {
    width: "100% !important",
  },

  finishFormText: {
    fontSize: "2em",
    fontWeight: "100",
  },

  profilePhoto: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formTitles: {
    fontWeight: "200",
    letterSpacing: "2px",
  },

  box: {
    padding: "1em",
    margin: "0 auto",
    fontSize: "1.3em",
    fontWeight: "200",
    letterSpacing: "1px",
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },
  btn: {
    backgroundColor: "#496C59",
    color: "#FFF",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#d7b37c",
    },
  },
  btnSubmit: {
    backgroundColor: "#d7b37c",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#d7b37c",
      color: "#FFF",
    },
  },
}));

const Form = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [hobbieTwo, setHobbieTwo] = useState(false);
  const [hobbieThree, setHobbieThree] = useState(false);
  const [hobbieFour, setHobbieFour] = useState(false);
  const [cv, setCv] = useState(null);
  const [cvError, setCvError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto, profilePhotoRef] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const token = props.token;
  const steps = getSteps();
  let validationErrors = [];
  let validationSuccess = false;

  const [expanded, setExpanded] = useState(false);

  const handleAccordian = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const errorMessage = () => {
    return (
      <p className={classes.error}>An error occurred or your pdf is over 4mb</p>
    );
  };

  // errors state
  const [errors, setErrors] = useState({
    fName: "",
    lName: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    postcode: "",
    suburb: "",
    city: "",
    age: "",
    nationality: "",
    language: "",
    emergencyNumber: "",
    emergencyEmail: "",
    emergencyRelationship: "",
    emergencyName: "",
    aboutMe: "",
    hobbieOne: "",
    medical: "",
    workVisa: "",
    photo: "",

    refereeNameOne: "",
    refereeNameTwo: "",
    refereeNameThree: "",

    refereePhoneOne: "",
    refereePhoneTwo: "",
    refereePhoneThree: "",

    refereeEmailOne: "",
    refereeEmailTwo: "",
    refereeEmailThree: "",

    refereeRelOne: "",
    refereeRelTwo: "",
    refereeRelThree: "",
  });

  // form state
  const [user, setUser] = useState({
    relevantExp: "",
    fName: "",
    lName: "",
    phone: "",
    email: "",
    gender: "",
    address: "",
    city: "",
    postcode: "",
    suburb: "",
    state: "",
    age: "",
    language: "",
    nationality: "",
    emergencyName: "",
    emergencyNumber: "",
    emergencyEmail: "",
    emergencyRelationship: "",
    medical: "",
    aboutMe: "",
    hobbieOne: "",
    hobbieTwo: "",
    hobbieThree: "",
    hobbieFour: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    visaDetails: "",
    workersComp: "",
    sunday: "",
    refereeNameOne: "",
    refereeNameTwo: "",
    refereeNameThree: "",
    refereePhoneOne: "",
    refereePhoneTwo: "",
    refereePhoneThree: "",
    refereeEmailOne: "",
    refereeEmailTwo: "",
    refereeEmailThree: "",
    refereeRelOne: "",
    refereeRelTwo: "",
    refereeRelThree: "",
  });

  const [working, setWorking] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  useEffect(() => {
    setLoading(true);
    read(props.userID, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProfilePhoto(data.photo);
        setUser((prevState) => ({
          ...prevState,
          fName: data.fName,
          lName: data.lName,
          phone: data.phone,
          email: data.email,
        }));
      }
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    read(props.userID, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProfilePhoto(data.photo);
      }
    });
  }, [photo]);

  //handle input file capture
  const handleChangeCV = (e) => {
    const file = e.target.files[0];
    const size = e.target.files[0].size;
    if (size < 4000000) {
      setCv(file);
      setCvError("");
      setLoading(true);
      let user = new FormData();
      user.set("cv", file);
      update(props.userID, user, token)
        .then((data) => {
          setLoading(false);
          if (data.error) {
            error;
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("PDF - 4mb Max Size");
    }
  };

  // handle checkboxes
  const handleChangeChecklist = (event) => {
    setUser({ ...user, [event.target.name]: event.target.checked });
    console.log(user);
    setErrors((prevState) => ({
      ...prevState,
      [event.target.name]: "",
    }));
    if (event.target.name === "visaDetails" || "visa") {
      setErrors((prevState) => ({
        ...prevState,
        workVisa: "",
      }));
    }
  };

  //handle input capture
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handlePhoto = (event) => {
    setErrors((prevState) => ({
      ...prevState,
      photo: "",
    }));
    if (event.target.files[0].size < 4000000) {
      setPhoto(event.target.files[0]);
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    } else {
      alert("File size to be less than 4mb");
    }
  };

  const handleHobbies = () => {
    if (!hobbieTwo) {
      setHobbieTwo(true);
    } else if (!hobbieThree) {
      setHobbieThree(true);
    } else if (!hobbieFour) {
      setHobbieFour(true);
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      validationSuccess = true;
      if (!user.fName) {
        validationErrors.push({ fName: "First Required" });
        if (validationErrors.find((i) => i.fName === "First Required"))
          setErrors((prevState) => ({
            ...prevState,
            fName: "First name is Required",
          }));
        validationSuccess = false;
      }
      if (!user.lName) {
        validationErrors.push({ lName: "Last Required" });
        if (validationErrors.find((i) => i.lName === "Last Required"))
          setErrors((prevState) => ({
            ...prevState,
            lName: "Last name is Required",
          }));
        validationSuccess = false;
      }
      if (user.phone === "") {
        validationErrors.push({ phone: "enter a valid phone number" });

        if (
          validationErrors.find((i) => i.phone === "enter a valid phone number")
        )
          setErrors((prevState) => ({
            ...prevState,
            phone: "Valid phone Required",
          }));
        validationSuccess = false;
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
        validationErrors.push({ email: "A valid email is Required" });
        if (
          validationErrors.find((i) => i.email === "A valid email is Required")
        )
          setErrors((prevState) => ({
            ...prevState,
            email: "A valid email is Required",
          }));
        validationSuccess = false;
      }
      if (!user.age) {
        validationErrors.push({ age: "enter a valid birthdate" });

        if (validationErrors.find((i) => i.age === "enter a valid birthdate"))
          setErrors((prevState) => ({
            ...prevState,
            age: "Birthdate is Required",
          }));
        validationSuccess = false;
      }
      if (!user.nationality) {
        validationErrors.push({ nationality: "Nationality Required" });

        if (
          validationErrors.find((i) => i.nationality === "Nationality Required")
        )
          setErrors((prevState) => ({
            ...prevState,
            nationality: "Nationality Required",
          }));
        validationSuccess = false;
      }
      if (!user.language) {
        validationErrors.push({ language: "Language Required" });

        if (validationErrors.find((i) => i.language === "Language Required"))
          setErrors((prevState) => ({
            ...prevState,
            language: "Language Required",
          }));
        validationSuccess = false;
      }

      if (!user.gender) {
        validationErrors.push({ gender: "Gender Required" });

        if (validationErrors.find((i) => i.gender === "Gender Required"))
          setErrors((prevState) => ({
            ...prevState,
            gender: "Gender Required",
          }));
        validationSuccess = false;
      }
      if (!user.address) {
        validationErrors.push({ address: "Street Required" });

        if (validationErrors.find((i) => i.address === "Street Required"))
          setErrors((prevState) => ({
            ...prevState,
            address: "Street Required",
          }));
        validationSuccess = false;
      }

      if (!user.state) {
        validationErrors.push({ state: "State Required" });

        if (validationErrors.find((i) => i.state === "State Required"))
          setErrors((prevState) => ({
            ...prevState,
            state: "State Required",
          }));
        validationSuccess = false;
      }

      if (!user.postcode) {
        validationErrors.push({ postcode: "Postcode Required" });

        if (validationErrors.find((i) => i.postcode === "Postcode Required"))
          setErrors((prevState) => ({
            ...prevState,
            postcode: "Postcode Required",
          }));
        validationSuccess = false;
      }

      if (!user.suburb) {
        validationErrors.push({ suburb: "Suburb Required" });

        if (validationErrors.find((i) => i.suburb === "Suburb Required"))
          setErrors((prevState) => ({
            ...prevState,
            suburb: "Suburb Required",
          }));
        validationSuccess = false;
      }

      if (!user.city) {
        validationErrors.push({ city: "City Required" });

        if (validationErrors.find((i) => i.city === "City Required"))
          setErrors((prevState) => ({
            ...prevState,
            city: "City Required",
          }));
        validationSuccess = false;
      }

      if (!user.emergencyName) {
        validationErrors.push({ emergencyName: "Emergency Name Required" });

        if (
          validationErrors.find(
            (i) => i.emergencyName === "Emergency Name Required"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            emergencyName: "Emergency Name Required",
          }));
        validationSuccess = false;
      }
      if (!user.emergencyNumber) {
        validationErrors.push({ emergencyNumber: "Emergency Number Required" });

        if (
          validationErrors.find(
            (i) => i.emergencyNumber === "Emergency Number Required"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            emergencyNumber: "Emergency Number Required",
          }));
        validationSuccess = false;
      }

      if (!user.emergencyEmail) {
        validationErrors.push({ emergencyEmail: "Emergency Email Required" });

        if (
          validationErrors.find(
            (i) => i.emergencyEmail === "Emergency Email Required"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            emergencyEmail: "Emergency Email Required",
          }));
        validationSuccess = false;
      }

      if (!user.emergencyRelationship) {
        validationErrors.push({
          emergencyRelationship: "Relationship Required",
        });

        if (
          validationErrors.find(
            (i) => i.emergencyRelationship === "Relationship Required"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            emergencyRelationship: "Relationship Required",
          }));
        validationSuccess = false;
      }
      if (!user.ausCitizen && !user.visa) {
        validationErrors.push({
          workVisa: "Working Required",
        });

        if (validationErrors.find((i) => i.workVisa === "Working Required"))
          setErrors((prevState) => ({
            ...prevState,
            workVisa: "Working Rights Required",
          }));
        validationSuccess = false;
      }

      if (validationSuccess) {
        console.log(user.car);
        setLoading(true);
        let carer = new FormData();
        carer.set("fName", user.fName);
        carer.set("lName", user.lName);
        carer.set("gender", user.gender);
        carer.set("phone", user.phone);
        carer.set("email", user.email);
        carer.set("address", user.address);
        carer.set("state", user.state);
        carer.set("city", user.city);
        carer.set("postcode", user.postcode);
        carer.set("suburb", user.suburb);
        carer.set("age", user.age);
        carer.set("nationality", user.nationality);
        carer.set("language", user.language);
        carer.set("emergencyNumber", user.emergencyNumber);
        carer.set("emergencyEmail", user.emergencyEmail);
        carer.set("emergencyRelationship", user.emergencyRelationship);
        carer.set("emergencyName", user.emergencyName);
        carer.set("car", user.car ? true : false);
        carer.set("workersComp", user.workersComp);
        carer.set("ausCitizen", user.ausCitizen ? true : false);
        carer.set("visaDetails", user.visaDetails);
        update(props.userID, carer, token)
          .then((data) => {
            if (data.error) {
              setLoading(false);
              console.log(data.error);
            } else {
              setLoading(false);
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (activeStep === 2) {
      validationSuccess = true;
      if (!user.aboutMe) {
        validationErrors.push({ aboutMe: "aboutMe required" });
        if (validationErrors.find((i) => i.aboutMe === "aboutMe required"))
          setErrors((prevState) => ({
            ...prevState,
            aboutMe: "Required",
          }));
        validationSuccess = false;
      }
      if (!user.hobbieOne) {
        validationErrors.push({ hobbieOne: "hobbieOne required" });
        if (validationErrors.find((i) => i.hobbieOne === "hobbieOne required"))
          setErrors((prevState) => ({
            ...prevState,
            hobbieOne: "Hobbie required",
          }));
        validationSuccess = false;
      }
      if (!photo) {
        validationErrors.push({ photo: "photo required" });
        if (validationErrors.find((i) => i.photo === "photo required"))
          setErrors((prevState) => ({
            ...prevState,
            photo: "Required",
          }));
        validationSuccess = false;
      }
      if (validationSuccess) {
        setLoading(true);
        const spiltUrl = profilePhotoRef.current
          ? profilePhotoRef.current.split(".com/")
          : "";
        let form = new FormData();
        form.set("photo", photo);
        form.set("userId", props.userID);
        form.set("oldUrl", spiltUrl[1]);
        await s3File(token, form)
          .then((data) => {
            // update carer profile
            let carer = new FormData();
            carer.set("aboutMe", user.aboutMe);
            carer.set("hobbieOne", user.hobbieOne);
            carer.set("hobbieTwo", user.hobbieTwo);
            carer.set("hobbieThree", user.hobbieThree);
            carer.set("hobbieFour", user.hobbieFour);
            carer.set("medical", user.medical);
            carer.set("monday", user.monday);
            carer.set("tuesday", user.tuesday);
            carer.set("wednesday", user.wednesday);
            carer.set("thursday", user.thursday);
            carer.set("friday", user.friday);
            carer.set("saturday", user.saturday);
            carer.set("sunday", user.sunday);
            carer.set("photo", data);
            update(props.userID, carer, token)
              .then((data) => {
                if (data.error) {
                  setLoading(false);
                  console.log(data.error);
                } else {
                  setLoading(false);
                  setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    }
  };

  // step one
  const details = () => {
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

          <Grid xs={9}>
            <hr style={{ margin: "2em 0" }} />
            <h2 className={classes.formTitles}>Personal Details</h2>
          </Grid>

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={3}
            lg={3}
            xl={3}
          >
            <TextField
              inputProps={{
                autoCompleteFsu: "new-password",
                form: {
                  autoCompleteFsu: "off",
                },
              }}
              className={classes.text}
              error={errors.fName ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.fName}
              name="fName"
              onChange={handleChange}
            />

            {errors.fName ? (
              <h5 className={classes.valError}>{errors.fName}</h5>
            ) : (
              <InputLabel className={classes.label}>Name</InputLabel>
            )}
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={3}
            lg={3}
            xl={3}
          >
            <TextField
             inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              error={errors.lName ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.lName}
              onChange={handleChange}
              name="lName"
            />

            {errors.lName ? (
              <h5 className={classes.valError}>{errors.lName}</h5>
            ) : (
              <InputLabel className={classes.label}>Surname</InputLabel>
            )}
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={3}
            lg={3}
            xl={3}
          >
            <TextField
             inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              error={errors.phone ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.phone}
              onChange={handleChange}
              name="phone"
            />

            {errors.phone ? (
              <h5 className={classes.valError}>{errors.phone}</h5>
            ) : (
              <InputLabel className={classes.label}>Phone</InputLabel>
            )}
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={3}
            lg={3}
            xl={3}
          >
            <TextField
              inputProps={{
                autoCompleteFsu: "new-password",
                form: {
                  autoCompleteFsu: "off",
                },
              }}
              className={classes.text}
              error={errors.nationality ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.nationality}
              onChange={handleChange}
              name="nationality"
            />

            {errors.nationality ? (
              <h5 className={classes.valError}>{errors.nationality}</h5>
            ) : (
              <InputLabel className={classes.label}>Nationality</InputLabel>
            )}
          </Grid>

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={3}
            lg={3}
            xl={3}
          >
            <TextField
           inputProps={{
            autoCompleteFsu: "new-password",
            form: {
              autoCompleteFsu: "off",
            },
          }}
              className={classes.text}
              error={errors.age ? true : null}
              size="small"
              variant="outlined"
              type="date"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.age}
              onChange={handleChange}
              name="age"
            />

            {errors.age ? (
              <h5 className={classes.valError}>{errors.age}</h5>
            ) : (
              <InputLabel className={classes.label}>Birth Date</InputLabel>
            )}
          </Grid>

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={3}
            lg={3}
            xl={3}
          >
            <FormControl
              className={classes.formControl}
              fullWidth
              variant="outlined"
              size="small"
            >
              {!user.gender ? (
                <InputLabel id="Gender">Gender</InputLabel>
              ) : null}
              <Select
                labelId="Gender"
                value={user.gender}
                onChange={handleChange}
                name="gender"
              >
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>

            {errors.gender ? (
              <h5 className={classes.valError}>{errors.gender}</h5>
            ) : (
              <InputLabel className={classes.label}>Gender</InputLabel>
            )}
          </Grid>

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={5}
            lg={5}
            xl={5}
          >
            <TextField
             inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              error={errors.email ? true : null}
              size="small"
              variant="outlined"
              type="email"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.email}
              name="email"
              onChange={handleChange}
            />

            {errors.email ? (
              <h5 className={classes.valError}>{errors.email}</h5>
            ) : (
              <InputLabel className={classes.label}>Email</InputLabel>
            )}
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={4}
            lg={4}
            xl={4}
          >
            <TextField
            inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              error={errors.language ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.language}
              onChange={handleChange}
              name="language"
            />
            {errors.language ? (
              <h5 className={classes.valError}>{errors.language}</h5>
            ) : (
              <InputLabel className={classes.label}>Languages</InputLabel>
            )}
          </Grid>
          <Grid xs={9}>
            <hr style={{ margin: "2em 0" }} />
            <h2 className={classes.formTitles}>Address</h2>
          </Grid>

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={5}
            lg={5}
            xl={5}
          >
            <TextField
              inputProps={{
                autoCompleteFsu: "new-password",
                form: {
                  autoCompleteFsu: "off",
                },
              }}
              className={classes.text}
              error={errors.address ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.address}
              onChange={handleChange}
              name="address"
            />
            {errors.address ? (
              <h5 className={classes.valError}>{errors.address}</h5>
            ) : (
              <InputLabel className={classes.label}>No & Street</InputLabel>
            )}
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={4}
            lg={4}
            xl={4}
          >
            <TextField
             inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              error={errors.suburb ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.suburb}
              onChange={handleChange}
              name="suburb"
            />
            {errors.suburb ? (
              <h5 className={classes.valError}>{errors.suburb}</h5>
            ) : (
              <InputLabel className={classes.label}>Suburb</InputLabel>
            )}
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={3}
            lg={3}
            xl={3}
          >
            <TextField
            inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              error={errors.city ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.city}
              onChange={handleChange}
              name="city"
            />
            {errors.city ? (
              <h5 className={classes.valError}>{errors.city}</h5>
            ) : (
              <InputLabel className={classes.label}>City</InputLabel>
            )}
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={3}
            lg={3}
            xl={3}
          >
            <TextField
            inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              error={errors.state ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.state}
              onChange={handleChange}
              name="state"
            />
            {errors.state ? (
              <h5 className={classes.valError}>{errors.state}</h5>
            ) : (
              <InputLabel className={classes.label}>State</InputLabel>
            )}
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={3}
            lg={3}
            xl={3}
          >
            <TextField
              inputProps={{
                autoCompleteFsu: "new-password",
                form: {
                  autoCompleteFsu: "off",
                },
              }}
              className={classes.text}
              error={errors.postcode ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.postcode}
              onChange={handleChange}
              name="postcode"
            />
            {errors.postcode ? (
              <h5 className={classes.valError}>{errors.postcode}</h5>
            ) : (
              <InputLabel className={classes.label}>Postcode</InputLabel>
            )}
          </Grid>

          <Grid xs={9}>
            <hr style={{ margin: "2em 0" }} />
            <h2 className={classes.formTitles}>Miscellaneous</h2>
          </Grid>

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.car ? true : false}
                  checkedIcon={
                    <img
                      className={classes.night}
                      src={"/images/car.png"}
                      alt="icon"
                      width="24"
                      height="24"
                    />
                  }
                  name="car"
                  onChange={handleChangeChecklist}
                  value={user.car}
                />
              }
              label={
                <span style={{ fontSize: "1.1em", fontWeight: "100" }}>
                  Do you have a Car ?
                </span>
              }
            />
          </Grid>

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checkedIcon={
                    <img
                      className={classes.night}
                      src={"/images/firstAd.png"}
                      alt="icon"
                      width="24"
                      height="24"
                    />
                  }
                  name="workersCompStatus"
                  onChange={handleChangeChecklist}
                  value={user.workersCompStatus}
                />
              }
              label={
                <span style={{ fontSize: "1.1em", fontWeight: "100" }}>
                  Have you ever Claimed Workers Compensation ?
                </span>
              }
            />
          </Grid>
          {user.workersCompStatus ? (
            <Grid
              className={classes.gridItem}
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              xl={8}
            >
              <TextField
              inputProps={{
                autoCompleteFsu: "new-password",
                form: {
                  autoCompleteFsu: "off",
                },
              }}
                className={classes.text}
                error={errors.workersComp ? true : null}
                size="small"
                variant="outlined"
                type="text"
                fullWidth
                required
                placeholder="Please Provide Further Details"
                value={user.workersComp}
                onChange={handleChange}
                name="workersComp"
              />
            </Grid>
          ) : null}

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.ausCitizen ? true : false}
                  checkedIcon={
                    <img
                      src={"/images/ausFlag.png"}
                      alt="icon"
                      width="24"
                      height="24"
                    />
                  }
                  name="ausCitizen"
                  onChange={handleChangeChecklist}
                  value={user.ausCitizen}
                />
              }
              label={
                <span style={{ fontSize: "1.1em", fontWeight: "100" }}>
                  Are you an Australian Citizen ?
                </span>
              }
            />
          </Grid>

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="visa"
                  onChange={handleChangeChecklist}
                  value={user.visa}
                />
              }
              label={
                <span style={{ fontSize: "1.1em", fontWeight: "100" }}>
                  Or do you have a Work Visa ?
                </span>
              }
            />
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} alignItems="center">
            {errors.workVisa ? (
              <h5 className={classes.valError}>{errors.workVisa}</h5>
            ) : null}
          </Grid>
          {user.visa ? (
            <Grid className={classes.gridItem} item xs={12} sm={12} md={7}>
              <TextField
               inputProps={{
                autoCompleteFsu: "new-password",
                form: {
                  autoCompleteFsu: "off",
                },
              }}
                className={classes.text}
                size="small"
                type="date"
                variant="outlined"
                fullWidth
                required
                value={user.visaDetails}
                onChange={handleChange}
                name="visaDetails"
              />
              <InputLabel className={classes.label}>
                Date of Working Visa Expiry
              </InputLabel>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <h6 className={classes.emergencyHeading}></h6>

            <Grid xs={9}>
              <hr style={{ margin: "2em 0" }} />
              <h2 className={classes.formTitles}>Emergency Contact Details</h2>
            </Grid>
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <TextField
              inputProps={{
                autoCompleteFsu: "new-password",
                form: {
                  autoCompleteFsu: "off",
                },
              }}
              className={classes.text}
              error={errors.emergencyName ? true : null}
              size="small"
              variant="outlined"
              type="tel"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.emergencyName}
              onChange={handleChange}
              name="emergencyName"
            />

            {errors.emergencyName ? (
              <h5 className={classes.valError}>{errors.emergencyName}</h5>
            ) : (
              <InputLabel className={classes.label}>Full Name</InputLabel>
            )}
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <TextField
             inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              error={errors.emergencyNumber ? true : null}
              size="small"
              variant="outlined"
              type="tel"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.emergencyNumber}
              onChange={handleChange}
              name="emergencyNumber"
            />

            {errors.emergencyNumber ? (
              <h5 className={classes.valError}>{errors.emergencyNumber}</h5>
            ) : (
              <InputLabel className={classes.label}>Contact Number</InputLabel>
            )}
          </Grid>

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <TextField
            inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              error={errors.emergencyRelationship ? true : null}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.emergencyRelationship}
              onChange={handleChange}
              name="emergencyRelationship"
            />

            {errors.emergencyRelationship ? (
              <h5 className={classes.valError}>
                {errors.emergencyRelationship}
              </h5>
            ) : (
              <InputLabel className={classes.label}>Relationship</InputLabel>
            )}
          </Grid>

          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <TextField
             inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              error={errors.emergencyEmail ? true : null}
              size="small"
              variant="outlined"
              type="email"
              fullWidth
              required
              placeholder="Start Typing"
              value={user.emergencyEmail}
              onChange={handleChange}
              name="emergencyEmail"
            />

            {errors.emergencyEmail ? (
              <h5 className={classes.valError}>{errors.emergencyEmail}</h5>
            ) : (
              <InputLabel className={classes.label}>Email</InputLabel>
            )}
          </Grid>
        </Grid>
      </>
    );
  };

  // step two
  const essentialDocuments = () => {
    return <Documents userid={props.userID} token={props.token} />;
  };
  // step two
  const aboutMe = () => {
    return (
      <Grid
        container
        className={classes.container}
        direction="row"
        align="center"
        justifyContent="center"
        spacing={2}
      >
        <h6 className={classes.formHeading}>Carer's Application Form</h6>

        <Grid
          item
          xs={12}
          sm={11}
          md={8}
          lg={8}
          xl={8}
          className={classes.gridItemAboutMe}
        >
          <TextField
           inputProps={{
            autoCompleteFsu: "new-password",
            form: {
              autoCompleteFsu: "off",
            },
          }}
            className={classes.text}
            error={errors.aboutMe ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            multiline
            rows={4}
            placeholder="About Me"
            value={user.aboutMe}
            name="aboutMe"
            onChange={handleChange}
          />

          {errors.aboutMe ? (
            <h5 className={classes.valError}>{errors.aboutMe}</h5>
          ) : (
            <InputLabel className={classes.label}>
              A Little about Yourself
            </InputLabel>
          )}
        </Grid>
        <hr style={{ width: "80%", margin: "2em auto 2em auto" }} />
        <Grid
          className={classes.gridItemMedical}
          item
          xs={12}
          sm={11}
          md={4}
          lg={4}
          xl={4}
        >
          <TextField
           inputProps={{
            autoCompleteFsu: "new-password",
            form: {
              autoCompleteFsu: "off",
            },
          }}
            className={classes.text}
            error={errors.medical ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            multiline
            rows={4}
            placeholder="Medical Conditions"
            value={user.medical}
            name="medical"
            onChange={handleChange}
          />

          {errors.medical ? (
            <h5 className={classes.valError}>{errors.medical}</h5>
          ) : (
            <InputLabel className={classes.label}>
              Do you have any medical conditions ?
            </InputLabel>
          )}
        </Grid>
        <Grid
          className={classes.profilePhoto}
          item
          xs={12}
          sm={11}
          md={4}
          lg={4}
          xl={4}
        >
          <Button component="label">
            <AddAPhotoIcon />
            <input onChange={handlePhoto} type="file" accept="image/*" hidden />
          </Button>

          {photo ? (
            <img
              height="120"
              width="120"
              src={previewImage}
              onError={(i) => (i.target.src = "/images/profileDefault.jpeg")}
              alt={user.fName}
            />
          ) : (
            <img
              height="160px"
              width="160px"
              src={profilePhoto ? profilePhoto : "/images/profileDefault.jpeg"}
              onError={(i) => (i.target.src = "/images/profileDefault.jpeg")}
              alt={user.fName}
            />
          )}
          {errors.photo ? (
            <h5 className={classes.valError}>{errors.photo}</h5>
          ) : null}
        </Grid>
        <hr style={{ width: "80%", margin: "2em auto" }} />
        <Grid
          item
          xs={12}
          sm={11}
          md={4}
          lg={4}
          xl={4}
          className={classes.gridItem}
        >
          <TextField
            inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
            className={classes.text}
            error={errors.hobbieOne ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Hobbie One"
            value={user.hobbieOne}
            name="hobbieOne"
            onChange={handleChange}
          />

          {errors.hobbieOne ? (
            <h5 className={classes.valError}>{errors.hobbieOne}</h5>
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
          {hobbieTwo ? (
            <TextField
            inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Hobbie Two"
              value={user.hobbieTwo}
              name="hobbieTwo"
              onChange={handleChange}
            />
          ) : (
            <Button variant="default" component="label" onClick={handleHobbies}>
              hobbie
              <AddIcon />
            </Button>
          )}
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
          {hobbieThree ? (
            <TextField
            inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Hobbie Three"
              value={user.hobbieThree}
              name="hobbieThree"
              onChange={handleChange}
            />
          ) : (
            <Button variant="default" component="label" onClick={handleHobbies}>
              hobbie
              <AddIcon />
            </Button>
          )}
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
          {hobbieFour ? (
            <TextField
            inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
              className={classes.text}
              size="small"
              variant="outlined"
              type="text"
              fullWidth
              required
              placeholder="Hobbie Four"
              value={user.hobbieFour}
              name="hobbieFour"
              onChange={handleChange}
            />
          ) : (
            <Button variant="default" component="label" onClick={handleHobbies}>
              hobbie
              <AddIcon />
            </Button>
          )}
        </Grid>

        <Grid item xs={12}>
          <hr style={{ width: "80%", margin: "0em auto 4em auto" }} />
          <div className={classes.weekdays}>
            <div className={classes.iconWrapper}>
              <img
                style={{ cursor: "pointer" }}
                width="50px"
                height="50px"
                src={
                  working.monday
                    ? "/images/mondayDark.png"
                    : "/images/mondayLight.png"
                }
                alt="monday Calender"
                onClick={() => {
                  setWorking((prevState) => ({
                    ...prevState,
                    monday: working.monday ? false : true,
                  }));
                  setUser((prevState) => ({
                    ...prevState,
                    monday: "",
                  }));
                }}
              />

              <TextField
             inputProps={{
              autoCompleteFsu: "new-password",
              form: {
                autoCompleteFsu: "off",
              },
            }}
                className={classes.text}
                size="small"
                variant="outlined"
                type="text"
                fullWidth
                disabled={!working.monday ? true : false}
                placeholder="example.. 0900 - 1800"
                name="monday"
                onChange={handleChange}
                value={user.monday}
              />
            </div>
            <div className={classes.iconWrapper}>
              <img
                style={{ cursor: "pointer" }}
                width="50px"
                height="50px"
                src={
                  working.tuesday
                    ? "/images/tuesdayDark.png"
                    : "/images/tuesdayLight.png"
                }
                alt="tuesday Calender"
                onClick={() => {
                  setWorking((prevState) => ({
                    ...prevState,
                    tuesday: working.tuesday ? false : true,
                  }));
                  setUser((prevState) => ({
                    ...prevState,
                    tuesday: "",
                  }));
                }}
              />

              <TextField
               inputProps={{
                autoCompleteFsu: "new-password",
                form: {
                  autoCompleteFsu: "off",
                },
              }}
                className={classes.text}
                size="small"
                variant="outlined"
                type="text"
                fullWidth
                required
                disabled={!working.tuesday ? true : false}
                placeholder="example.. 0900 - 1800"
                name="tuesday"
                onChange={handleChange}
                value={user.tuesday}
              />
            </div>
            <div className={classes.iconWrapper}>
              <img
                style={{ cursor: "pointer" }}
                width="50px"
                height="50px"
                src={
                  working.wednesday
                    ? "/images/wednesdayDark.png"
                    : "/images/wednesdayLight.png"
                }
                alt="wednesday Calender"
                onClick={() => {
                  setWorking((prevState) => ({
                    ...prevState,
                    wednesday: working.wednesday ? false : true,
                  }));
                  setUser((prevState) => ({
                    ...prevState,
                    wednesday: "",
                  }));
                }}
              />

              <TextField
               inputProps={{
                autoCompleteFsu: "new-password",
                form: {
                  autoCompleteFsu: "off",
                },
              }}
                className={classes.text}
                size="small"
                variant="outlined"
                type="text"
                fullWidth
                disabled={!working.wednesday ? true : false}
                required
                placeholder="example.. 0900 - 1800"
                name="wednesday"
                onChange={handleChange}
                value={user.wednesday}
              />
            </div>
            <div className={classes.iconWrapper}>
              <img
                style={{ cursor: "pointer" }}
                width="50px"
                height="50px"
                src={
                  working.thursday
                    ? "/images/thursdayDark.png"
                    : "/images/thursdayLight.png"
                }
                alt="thursday calender"
                onClick={() => {
                  setWorking((prevState) => ({
                    ...prevState,
                    thursday: working.thursday ? false : true,
                  }));
                  setUser((prevState) => ({
                    ...prevState,
                    thursday: "",
                  }));
                }}
              />

              <TextField
                inputProps={{
                  autoCompleteFsu: "new-password",
                  form: {
                    autoCompleteFsu: "off",
                  },
                }}
                className={classes.text}
                size="small"
                variant="outlined"
                type="text"
                fullWidth
                disabled={!working.thursday ? true : false}
                required
                placeholder="example.. 0900 - 1800"
                name="thursday"
                onChange={handleChange}
                value={user.thursday}
              />
            </div>

            <div className={classes.iconWrapper}>
              <img
                style={{ cursor: "pointer" }}
                width="50px"
                height="50px"
                src={
                  working.friday
                    ? "/images/fridayDark.png"
                    : "/images/fridayLight.png"
                }
                alt="friday calender"
                onClick={() => {
                  setWorking((prevState) => ({
                    ...prevState,
                    friday: working.friday ? false : true,
                  }));
                  setUser((prevState) => ({
                    ...prevState,
                    friday: "",
                  }));
                }}
              />

              <TextField
                inputProps={{
                  autoCompleteFsu: "new-password",
                  form: {
                    autoCompleteFsu: "off",
                  },
                }}
                className={classes.text}
                size="small"
                variant="outlined"
                type="text"
                fullWidth
                disabled={!working.friday ? true : false}
                required
                placeholder="example.. 0900 - 1800"
                name="friday"
                onChange={handleChange}
                value={user.friday}
              />
            </div>
            <div className={classes.iconWrapper}>
              <img
                style={{ cursor: "pointer" }}
                width="50px"
                height="50px"
                src={
                  working.saturday
                    ? "/images/saturdayDark.png"
                    : "/images/saturdayLight.png"
                }
                alt="saturday Calender"
                onClick={() => {
                  setWorking((prevState) => ({
                    ...prevState,
                    saturday: working.saturday ? false : true,
                  }));
                  setUser((prevState) => ({
                    ...prevState,
                    saturday: "",
                  }));
                }}
              />

              <TextField
                inputProps={{
                  autoCompleteFsu: "new-password",
                  form: {
                    autoCompleteFsu: "off",
                  },
                }}
                className={classes.text}
                size="small"
                variant="outlined"
                type="text"
                disabled={!working.saturday ? true : false}
                fullWidth
                required
                placeholder="example.. 0900 - 1800"
                name="saturday"
                onChange={handleChange}
                value={user.saturday}
              />
            </div>
            <div className={classes.iconWrapper}>
              <img
                style={{ cursor: "pointer" }}
                width="50px"
                height="50px"
                src={
                  working.sunday
                    ? "/images/sundayDark.png"
                    : "/images/sundayLight.png"
                }
                alt="sunday Calender"
                onClick={() => {
                  setWorking((prevState) => ({
                    ...prevState,
                    sunday: working.sunday ? false : true,
                  }));
                  setUser((prevState) => ({
                    ...prevState,
                    sunday: "",
                  }));
                }}
              />
              <TextField
                inputProps={{
                  autoCompleteFsu: "new-password",
                  form: {
                    autoCompleteFsu: "off",
                  },
                }}
                className={classes.text}
                size="small"
                variant="outlined"
                type="text"
                fullWidth
                disabled={!working.sunday ? true : false}
                required
                placeholder="example.. 0900 - 1800"
                name="sunday"
                onChange={handleChange}
                value={user.sunday}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  };

  // step four
  const reference = () => {
    return (
      <Grid container className={classes.container}>
        <h6 className={classes.formHeading}>Carer's Application Form</h6>

        <Grid item align="center" xs={12} sm={12} md={7} lg={7} xl={7}>
          <Grid item xs={12} md={8}>
            <Accordion
              className={classes.accordion}
              expanded={expanded === "panel1"}
              onChange={handleAccordian("panel1")}
            >
              <AccordionSummary
                className={classes.AccordionSummary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="referee-content"
              >
                Referee 1
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <Grid item className={classes.gridItem}>
                  <TextField
                   inputProps={{
                    autoCompleteFsu: "new-password",
                    form: {
                      autoCompleteFsu: "off",
                    },
                  }}
                    className={classes.text}
                    error={errors.refereeNameOne ? true : null}
                    size="small"
                    type="text"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereeNameOne}
                    name="refereeNameOne"
                    onChange={handleChange}
                  />
                  {errors.refereeNameOne ? (
                    <h5 className={classes.valError}>
                      {errors.refereeNameOne}
                    </h5>
                  ) : (
                    <InputLabel className={classes.label}>Full Name</InputLabel>
                  )}
                </Grid>
                <Grid item className={classes.gridItem}>
                  <TextField
                   inputProps={{
                    autoCompleteFsu: "new-password",
                    form: {
                      autoCompleteFsu: "off",
                    },
                  }}
                    className={classes.text}
                    error={errors.refereePhoneOne ? true : null}
                    size="small"
                    type="tel"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereePhoneOne}
                    name="refereePhoneOne"
                    onChange={handleChange}
                  />

                  {errors.refereePhoneOne ? (
                    <h5 className={classes.valError}>
                      {errors.refereePhoneOne}
                    </h5>
                  ) : (
                    <InputLabel className={classes.label}>
                      Contact Number
                    </InputLabel>
                  )}
                </Grid>
                <Grid item className={classes.gridItem}>
                  <TextField
                    inputProps={{
                      autoCompleteFsu: "new-password",
                      form: {
                        autoCompleteFsu: "off",
                      },
                    }}
                    className={classes.text}
                    error={errors.refereeEmailOne ? true : null}
                    size="small"
                    type="email"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereeEmailOne}
                    name="refereeEmailOne"
                    onChange={handleChange}
                  />

                  {errors.refereeEmailOne ? (
                    <h5 className={classes.valError}>
                      {errors.refereeEmailOne}
                    </h5>
                  ) : (
                    <InputLabel className={classes.label}>Email</InputLabel>
                  )}
                </Grid>
                <Grid item className={classes.gridItem}>
                  <TextField
                   inputProps={{
                    autoCompleteFsu: "new-password",
                    form: {
                      autoCompleteFsu: "off",
                    },
                  }}
                    className={classes.text}
                    error={errors.refereeRelOne ? true : null}
                    size="small"
                    type="text"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereeRelOne}
                    name="refereeRelOne"
                    onChange={handleChange}
                  />

                  {errors.refereeRelOne ? (
                    <h5 className={classes.valError}>{errors.refereeRelOne}</h5>
                  ) : (
                    <InputLabel className={classes.label}>Position</InputLabel>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={8}>
            <Accordion
              className={classes.accordion}
              expanded={expanded === "panel2"}
              onChange={handleAccordian("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="referee-content"
              >
                Referee 2
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <Grid item className={classes.gridItem}>
                  <TextField
                   inputProps={{
                    autoCompleteFsu: "new-password",
                    form: {
                      autoCompleteFsu: "off",
                    },
                  }}
                    className={classes.text}
                    error={errors.refereeNameTwo ? true : null}
                    size="small"
                    type="text"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereeNameTwo}
                    name="refereeNameTwo"
                    onChange={handleChange}
                  />

                  {errors.refereeNameTwo ? (
                    <h5 className={classes.valError}>
                      {errors.refereeNameTwo}
                    </h5>
                  ) : (
                    <InputLabel className={classes.label}>Full Name</InputLabel>
                  )}
                </Grid>
                <Grid item className={classes.gridItem}>
                  <TextField
                   inputProps={{
                    autoCompleteFsu: "new-password",
                    form: {
                      autoCompleteFsu: "off",
                    },
                  }}
                    className={classes.text}
                    error={errors.refereePhoneTwo ? true : null}
                    size="small"
                    type="tel"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereePhoneTwo}
                    name="refereePhoneTwo"
                    onChange={handleChange}
                  />

                  {errors.refereePhoneTwo ? (
                    <h5 className={classes.valError}>
                      {errors.refereePhoneTwo}
                    </h5>
                  ) : (
                    <InputLabel className={classes.label}>
                      Contact Number
                    </InputLabel>
                  )}
                </Grid>
                <Grid item className={classes.gridItem}>
                  <TextField
                   inputProps={{
                    autoCompleteFsu: "new-password",
                    form: {
                      autoCompleteFsu: "off",
                    },
                  }}
                    className={classes.text}
                    error={errors.refereeEmailTwo ? true : null}
                    size="small"
                    type="email"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereeEmailTwo}
                    name="refereeEmailTwo"
                    onChange={handleChange}
                  />

                  {errors.refereeEmailTwo ? (
                    <h5 className={classes.valError}>
                      {errors.refereeEmailTwo}
                    </h5>
                  ) : (
                    <InputLabel className={classes.label}>Email</InputLabel>
                  )}
                </Grid>

                <Grid item className={classes.gridItem}>
                  <TextField
                    inputProps={{
                      autoCompleteFsu: "new-password",
                      form: {
                        autoCompleteFsu: "off",
                      },
                    }}
                    className={classes.text}
                    error={errors.refereeRelTwo ? true : null}
                    size="small"
                    type="text"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereeRelTwo}
                    name="refereeRelTwo"
                    onChange={handleChange}
                  />

                  {errors.refereeRelTwo ? (
                    <h5 className={classes.valError}>{errors.refereeRelTwo}</h5>
                  ) : (
                    <InputLabel className={classes.label}>Position</InputLabel>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={8}>
            <Accordion
              className={classes.accordion}
              expanded={expanded === "panel3"}
              onChange={handleAccordian("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="referee-content"
              >
                Referee 3
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <Grid item className={classes.gridItem}>
                  <TextField
                    inputProps={{
                      autoCompleteFsu: "new-password",
                      form: {
                        autoCompleteFsu: "off",
                      },
                    }}
                    className={classes.text}
                    error={errors.refereeNameThree ? true : null}
                    size="small"
                    type="text"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereeNameThree}
                    name="refereeNameThree"
                    onChange={handleChange}
                  />

                  {errors.refereeNameThree ? (
                    <h5 className={classes.valError}>
                      {errors.refereeNameThree}
                    </h5>
                  ) : (
                    <InputLabel className={classes.label}>Full Name</InputLabel>
                  )}
                </Grid>
                <Grid item className={classes.gridItem}>
                  <TextField
                   inputProps={{
                    autoCompleteFsu: "new-password",
                    form: {
                      autoCompleteFsu: "off",
                    },
                  }}
                    className={classes.text}
                    error={errors.refereePhoneThree ? true : null}
                    size="small"
                    type="tel"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereePhoneThree}
                    name="refereePhoneThree"
                    onChange={handleChange}
                  />

                  {errors.refereePhoneThree ? (
                    <h5 className={classes.valError}>
                      {errors.refereePhoneThree}
                    </h5>
                  ) : (
                    <InputLabel className={classes.label}>
                      Contact Number
                    </InputLabel>
                  )}
                </Grid>
                <Grid item className={classes.gridItem}>
                  <TextField
                    inputProps={{
                      autoCompleteFsu: "new-password",
                      form: {
                        autoCompleteFsu: "off",
                      },
                    }}
                    className={classes.text}
                    error={errors.refereeEmailThree ? true : null}
                    size="small"
                    type="email"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereeEmailThree}
                    name="refereeEmailThree"
                    onChange={handleChange}
                  />

                  {errors.refereeEmailThree ? (
                    <h5 className={classes.valError}>
                      {errors.refereeEmailThree}
                    </h5>
                  ) : (
                    <InputLabel className={classes.label}>Email</InputLabel>
                  )}
                </Grid>

                <Grid item className={classes.gridItem}>
                  <TextField
                    inputProps={{
                      autoCompleteFsu: "new-password",
                      form: {
                        autoCompleteFsu: "off",
                      },
                    }}
                    className={classes.text}
                    error={errors.refereeRelThree ? true : null}
                    size="small"
                    type="text"
                    fullWidth
                    required
                    placeholder="Start Typing"
                    value={user.refereeRelThree}
                    name="refereeRelThree"
                    onChange={handleChange}
                  />

                  {errors.refereeRelThree ? (
                    <h5 className={classes.valError}>
                      {errors.refereeRelThree}
                    </h5>
                  ) : (
                    <InputLabel className={classes.label}>Position</InputLabel>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
            
          </Grid>
          
        </Grid>

        <Grid item xs={12} sm={12} md={4} align="center">
          {cvError ? (
            <h5 className={classes.valErrorCv}>{cvError}</h5>
          ) : (
            <p>Resume</p>
          )}

          {loading ? <CircularProgress /> : null}
          <Button
            variant="default"
            className={classes.upload}
            component="label"
          >
            <BackupIcon />
            <input
              accept="application/pdf"
              onChange={handleChangeCV}
              type="file"
              name="cv"
              hidden
            />
          </Button>
          <Document
            file={
              cv
                ? cv
                : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/form/documents/${props.userID}?title=cv`
            }
            error={errorMessage}
          >
            <Page width="200" pageNumber={1} />
          </Document>
          <TextField
          style={{marginTop: "2em"}}
           inputProps={{
            autoCompleteFsu: "new-password",
            form: {
              autoCompleteFsu: "off",
            },
          }}
            className={classes.text}
            error={errors.relevantExp ? true : null}
            size="small"
            type="text"
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            required
            placeholder="Enter relevant experience"
            value={user.relevantExp}
            name="relevantExp"
            onChange={handleChange}
          />
          <InputLabel className={classes.label}>
            Have you any relevant experience
          </InputLabel>
        </Grid>
      </Grid>
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    validationSuccess = true;
    if (!user.refereeNameOne) {
      validationErrors.push({ refereeNameOne: "refereeNameOne required" });
      if (
        validationErrors.find(
          (i) => i.refereeNameOne === "refereeNameOne required"
        )
      )
        setErrors((prevState) => ({
          ...prevState,
          refereeNameOne: "Referee required",
        }));
      validationSuccess = false;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        user.refereeEmailOne
      )
    ) {
      validationErrors.push({ refereeEmailOne: "refereeEmailOne required" });
      if (
        validationErrors.find(
          (i) => i.refereeEmailOne === "refereeEmailOne required"
        )
      )
        setErrors((prevState) => ({
          ...prevState,
          refereeEmailOne: "Email required",
        }));
      validationSuccess = false;
    }
    if (!user.refereeNameTwo) {
      validationErrors.push({ refereeNameTwo: "refereeNameTwo required" });
      if (
        validationErrors.find(
          (i) => i.refereeNameTwo === "refereeNameTwo required"
        )
      )
        setErrors((prevState) => ({
          ...prevState,
          refereeNameTwo: "Referee required",
        }));
      validationSuccess = false;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        user.refereeEmailTwo
      )
    ) {
      validationErrors.push({ refereeEmailTwo: "refereeEmailTwo required" });
      if (
        validationErrors.find(
          (i) => i.refereeEmailTwo === "refereeEmailTwo required"
        )
      )
        setErrors((prevState) => ({
          ...prevState,
          refereeEmailTwo: "Email required",
        }));
      validationSuccess = false;
    }
    if (!user.refereeNameThree) {
      validationErrors.push({ refereeNameThree: "refereeNameThree required" });
      if (
        validationErrors.find(
          (i) => i.refereeNameThree === "refereeNameThree required"
        )
      )
        setErrors((prevState) => ({
          ...prevState,
          refereeNameThree: "Referee required",
        }));
      validationSuccess = false;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        user.refereeEmailThree
      )
    ) {
      validationErrors.push({
        refereeEmailThree: "refereeEmailThree required",
      });
      if (
        validationErrors.find(
          (i) => i.refereeEmailThree === "refereeEmailThree required"
        )
      )
        setErrors((prevState) => ({
          ...prevState,
          refereeEmailThree: "Email required",
        }));
      validationSuccess = false;
    }
    if (!cv) {
      validationErrors.push({ cv: "cv required" });
      if (validationErrors.find((i) => i.cv === "cv required"))
        setCvError("Cv required");
      validationSuccess = false;
    }

    if (validationSuccess) {
      setLoading(true);
      let carer = new FormData();
      carer.set("refereeNameOne", user.refereeNameOne);
      carer.set("refereeNameTwo", user.refereeNameTwo);
      carer.set("refereeNameThree", user.refereeNameThree);
      carer.set("refereePhoneOne", user.refereePhoneOne);
      carer.set("refereePhoneTwo", user.refereePhoneTwo);
      carer.set("refereePhoneThree", user.refereePhoneThree);
      carer.set("refereeEmailOne", user.refereeEmailOne);
      carer.set("refereeEmailTwo", user.refereeEmailTwo);
      carer.set("refereeEmailThree", user.refereeEmailThree);
      carer.set("refereeRelOne", user.refereeRelOne);
      carer.set("refereeRelTwo", user.refereeRelTwo);
      carer.set("refereeRelThree", user.refereeRelThree);
      carer.set("relevantExp", user.relevantExp);
      carer.set("form", true);
      // carer.set("activeToken", "");
      update(props.userID, carer, token)
        .then((data) => {
          if (data.error) {
            setLoading(false);
            console.log(data.error);
          } else {
            setLoading(false);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setTimeout(() => {
              document.cookie =
                "carerFormToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
              document.cookie = "id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
              router.push("/");
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function getSteps() {
    return ["", "", "", ""];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return details();
      case 1:
        return essentialDocuments();
      case 2:
        return aboutMe();
      case 3:
        return reference();
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <Box
      className={classes.box}
      boxShadow={3}
      bgcolor="background.paper"
      m={2}
      p={2}
    >
      <Container align="center" maxWidth="xl" className={classes.wrapper}>
        <div>
          {activeStep === steps.length ? (
            <div>
              <p className={classes.finishFormText}>
                All done, we will be in touch
              </p>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              {loading ? <CircularProgress style={{margin: "1em"}} /> : null}

              <div style={{ margin: "2em 0 1em 0" }}>
                <Button
                  style={{ margin: "0 1em 0 0" }}
                  variant="outlined"
                  color="default"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.btn}
                >
                  Back
                </Button>

                {activeStep === steps.length - 1 ? null : (
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    color="default"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}

                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="outlined"
                    color="default"
                    onClick={handleSubmit}
                    className={classes.btnSubmit}
                  >
                    Submit
                  </Button>
                ) : null}
              </div>
            </div>
          )}
        </div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  );
};

export default Form;
