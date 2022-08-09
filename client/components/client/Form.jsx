import { React, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useState from "react-usestateref";
import { useRouter } from "next/router";

import { updateClient, updateNotes, readClient } from "../../pages/api/formApi";

import {
  Container,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MinimizeIcon from "@material-ui/icons/Minimize";
import InputAdornment from "@material-ui/core/InputAdornment";
import Chip from "@material-ui/core/Chip";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import PanToolIcon from "@material-ui/icons/PanTool";
import NotesIcon from "@material-ui/icons/Notes";
import Box from "@material-ui/core/Box";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EmailIcon from "@material-ui/icons/Email";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "auto",
  },
  valError: {
    color: "red",
    fontSize: "1em",
    fontWeight: "400",
    letterSpacing: "1px",
    margin: "15px 0 0 6px",
    textAlign: "left",
  },
  valErrorCare: {
    width: "100%",
    margin: "0 auto 1em auto",
    color: "red",
    fontSize: "1em",
    fontWeight: "400",
  },
  box: {
    margin: "0 auto",
    fontSize: "1.3em",
    fontWeight: "200",
    letterSpacing: "1px",
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },

  box2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1em",
    textAlign: "left",
    fontWeight: "200",
    width: "70%",
    borderRadius: "0.4em",
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
    },
    backgroundColor: "white",
    borderRadius: 8,
  },
  gridItem: {
    height: "auto",
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

  formHeading: {
    width: "200%",
    fontSize: "2em",
    fontWeight: "100",
    letterSpacing: "2px",
  },
  formSubHeading: {
    width: "100%",
    fontSize: "1.4em",
    fontWeight: "200",
  },
  checkList: {
    fontSize: "2em",
  },
  notesWrapper: {
    margin: "0em auto",
    padding: "2em",
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    
  },
  chip: {
    margin: "1em",
    fontSize: "1.1em",
    fontWeight: "200",
    padding: "0.1em",
    
  },
  chipBox: {
    margin: "0 auto 2em auto",
    display: "flex",
    flexWrap: "wrap",
    
  },
  billingWrapper: {
    margin: "4em auto",
  },
  finishFormText: {
    textAlign: "center",
    fontSize: "1.7em",
    fontWeight: "100",
  },
  formTitles: {
    fontWeight: "200",
    letterSpacing: "2px",
  },
  subtext: {
    fontWeight: "200",
    margin: "0 auto 2.2em auto",
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
  const steps = getSteps();
  const [activeStep, setActiveStep] = useState(0);
  const [once, setOnce] = useState(false);
  let onceV2 = false;

  let validationSuccess = false;
  let validationErrors = [];

  const [listItem, setListItem] = useState([]);
  const [notesList, setNotesList] = useState();
  const [daysReq, setDaysReq] = useState(0);
  const [nightsReq, setNightsReq] = useState(0);

  // errors state
  const [errors, setErrors] = useState({
    guardianfName: "",
    guardianlName: "",
    guardianphone: "",
    guardianemail: "",
    guardianaddress: "",
    guardianCity: "",
    guardianState: "",
    guardianPostcode: "",
    guardianrelationship: "",

    clientfName: "",
    clientlName: "",
    clientaddress: "",
    clientCity: "",
    clientState: "",
    clientPostcode: "",
    clientPhone: "",
    clientGender: "",
    clientAge: "",
    care: "",
  });

  const [checkList, setCheckList] = useState({
    wheelChair: false,
    walkingAid: false,
    hoist: false,
    bedConfined: false,
    deaf: false,
    blind: false,
  });

  // form state step one
  const [guardianDetails, setGuardianDetails, refGuardianDetails] = useState({
    manualHandling: "",
    outings: "",
    shopping: "",
    houseDuties: "",
    personalCare: "",
    guardianaddress: "",
    guardianState: "",
    guardianPostcode: "",
    guardianSuburb: "",
    guardianCity: "",
    guardianSuburb: "",
    guardianrelationship: "",
    clientNationality: "",
    clientfName: "",
    clientlName: "",
    clientEmail: "",
    clientaddress: "",
    clientState: "",
    clientPostcode: "",
    clientSuburb: "",
    clientCity: "",
    clientPhone: "",
    clientGender: "",
    clientAge: "",
    guardianfName: "",
    guardianlName: "",
    guardianphone: "",
    guardianemail: "",
  });

  const [notes, setNotes, refNotes] = useState({
    personalCare: "",
    manualHandling: "",
    houseDuties: "",
    shopping: "",
    outings: "",
    other: "",
  });



  const handleSaveNote = (value, name) => {
    if (!onceV2 && value) {
      onceV2 = true;
      updateNotes(props.userId, value, name, props.token)
        .then((data) => {
          if (data.error) {
            error;
          } else {
            setListItem([]);
            setTimeout(() => {
              onceV2 = false;
            }, 5000);
          }
        })
        .catch((error) => {
          error;
        });
    }
  };

  useEffect(() => {
    readClient(props.userId, props.token).then((data, error) => {
      if (error) {
        console.log(error);
      } else {
        setGuardianDetails((prevState) => ({
          ...prevState,
          guardianfName: data.guardianfName,
          guardianlName: data.guardianlName,
          guardianphone: data.guardianphone,
          guardianemail: data.guardianemail,
        }));
        
      }
    });
  }, []);

  useEffect(() => {
    readClient(props.userId, props.token).then((data, error) => {
      if (error) {
        console.log(error);
      } else {
        setNotesList(data);
      }
    });
  }, [listItem]);

  // Create handleIncrement event handler
  const handleIncrementDays = () => {
    daysReq < 7 ? setDaysReq((prevCount) => prevCount + 1) : setDaysReq(7);
    setErrors((prevState) => ({
      ...prevState,
      care: "",
    }));
  };

  // handle checkboxes
  const handleChangeChecklist = (event) => {
    setCheckList({ ...checkList, [event.target.name]: event.target.checked });
  };
  //Create handleDecrement event handler
  const handleDecrementDays = () => {
    setDaysReq((prevCount) => (prevCount !== 0 ? prevCount - 1 : prevCount));
    setErrors((prevState) => ({
      ...prevState,
      care: "",
    }));
  };
  // Create handleIncrement event handler
  const handleIncrementNights = () => {
    nightsReq < 7
      ? setNightsReq((prevCount) => prevCount + 1)
      : setNightsReq(7);
    setErrors((prevState) => ({
      ...prevState,
      care: "",
    }));
  };
  //Create handleDecrement event handler
  const handleDecrementNights = () => {
    setNightsReq((prevCount) => (prevCount !== 0 ? prevCount - 1 : prevCount));
    setErrors((prevState) => ({
      ...prevState,
      care: "",
    }));
  };
  //handle input capture
  const handleChangeGuardian = (e) => {
    const { name, value } = e.target;
    setGuardianDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handlePost = () => {
    let user = new FormData();
    user.set("billingEmail", guardianDetails.billingEmail);
    user.set("billingPostAddress", guardianDetails.billingPostAddress);
    user.set("billingPostCity", guardianDetails.billingPostCity);
    user.set("billingPostPostcode", guardianDetails.billingPostPostcode);
    user.set("billingPostState", guardianDetails.billingPostState);
    user.set("billingSuburb", guardianDetails.billingSuburb);

    user.set(
      "preferedContactEmail",
      guardianDetails.preferredContact === "guardian"
        ? guardianDetails.guardianemail
        : guardianDetails.clientEmail
    );
    user.set(
      "preferedContactPhone",
      guardianDetails.preferredContact === "guardian"
        ? guardianDetails.guardianphone
        : guardianDetails.clientPhone
    );

    user.set("form", true);
    updateClient(props.userId, user, props.token)
      .then((data) => {
        if (data.error) {
          error;
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setTimeout(() => {
            document.cookie =
              "clientToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = "id= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            router.push("/");
          }, 3000);
        }
      })
      .catch((error) => {
        error;
      });
  };

  const handleSelectNote = (value) => {
    switch (value) {
      case "personalCare":
        setListItem((listItem) => [
          ...listItem,
          <TextField
            variant="outlined"
            size="small"
            placeholder="Press + to add note"
            fullWidth
            multiline
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FavoriteIcon style={{ color: "red" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleSaveNote(
                        refNotes.current.personalCare,
                        "personalCare"
                      )
                    }
                    fontSize="large"
                  />
                </InputAdornment>
              ),
            }}
            value={refNotes.personalCare}
            onChange={(e) =>
              setNotes((prevState) => ({
                ...prevState,
                personalCare: e.target.value,
              }))
            }
            name="personalCare"
          />,
        ]);
        break;
      case "houseDuties":
        setListItem((listItem) => [
          ...listItem,
          <TextField
            size="small"
            variant="outlined"
            placeholder="Press + to add note"
            fullWidth
            multiline
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalLaundryServiceIcon style={{ color: "blue" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleSaveNote(
                        refNotes.current.houseDuties,
                        "houseDuties"
                      )
                    }
                    fontSize="large"
                  />
                </InputAdornment>
              ),
            }}
            value={refNotes.houseDuties}
            onChange={(e) =>
              setNotes((prevState) => ({
                ...prevState,
                houseDuties: e.target.value,
              }))
            }
            name="houseDuties"
          />,
        ]);
        break;
      case "shopping":
        setListItem((listItem) => [
          ...listItem,
          <TextField
            size="small"
            variant="outlined"
            placeholder="Press + to add note"
            fullWidth
            multiline
            name="shopping"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShoppingCartIcon style={{ color: "orange" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleSaveNote(refNotes.current.shopping, "shopping")
                    }
                    fontSize="large"
                  />
                </InputAdornment>
              ),
            }}
            value={refNotes.shopping}
            onChange={(e) =>
              setNotes((prevState) => ({
                ...prevState,
                shopping: e.target.value,
              }))
            }
          />,
        ]);
        break;
      case "outings":
        setListItem((listItem) => [
          ...listItem,
          <TextField
            size="small"
            variant="outlined"
            placeholder="Press + to add note"
            value={refNotes.outings}
            onChange={(e) =>
              setNotes((prevState) => ({
                ...prevState,
                outings: e.target.value,
              }))
            }
            fullWidth
            multiline
            name="outings"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DirectionsWalkIcon style={{ color: "green" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleSaveNote(refNotes.current.outings, "outings")
                    }
                    fontSize="large"
                  />
                </InputAdornment>
              ),
            }}
          />,
        ]);
        break;
      case "manualHandling":
        setListItem((listItem) => [
          ...listItem,
          <TextField
            size="small"
            variant="outlined"
            name="manualHandling"
            placeholder="Press + to add note"
            onChange={(e) =>
              setNotes((prevState) => ({
                ...prevState,
                manualHandling: e.target.value,
              }))
            }
            value={refNotes.manualHandling}
            fullWidth
            multiline
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PanToolIcon style={{ color: "purple" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleSaveNote(
                        refNotes.current.manualHandling,
                        "manualHandling"
                      )
                    }
                    fontSize="large"
                  />
                </InputAdornment>
              ),
            }}
          />,
        ]);
        break;
      case "other":
        setListItem((listItem) => [
          ...listItem,
          <TextField
            size="small"
            variant="outlined"
            name="other"
            placeholder="Press + to add note"
            onChange={(e) =>
              setNotes((prevState) => ({
                ...prevState,
                other: e.target.value,
              }))
            }
            value={refNotes.other}
            fullWidth
            multiline
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NotesIcon style={{ color: "pink" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleSaveNote(refNotes.current.other, "other")
                    }
                    fontSize="large"
                  />
                </InputAdornment>
              ),
            }}
          />,
        ]);
    }
  };
  // step one
  const GuardianDetails = () => {
    return (
      <Grid
        container
        className={classes.container}
        direction="row"
        align="center"
        justifyContent="center"
        spacing={1}
      >
        <h1 className={classes.formHeading}>Client Registration Form</h1>

        <Grid item xs={9}>
          <hr style={{ margin: "2em 0" }} />
          <h2 className={classes.formTitles}>Family or Guardian Details</h2>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.guardianfName ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.guardianfName}
            name="guardianfName"
            onChange={handleChangeGuardian}
          />

          {errors.guardianfName ? (
            <h5 className={classes.valError}>{errors.guardianfName}</h5>
          ) : (
            <InputLabel className={classes.label}>Name</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.guardianlName ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.guardianlName}
            onChange={handleChangeGuardian}
            name="guardianlName"
          />

          {errors.guardianlName ? (
            <h5 className={classes.valError}>{errors.guardianlName}</h5>
          ) : (
            <InputLabel className={classes.label}>Surname</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.guardianphone ? true : null}
            size="small"
            variant="outlined"
            type="tel"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.guardianphone}
            onChange={handleChangeGuardian}
            name="guardianphone"
          />

          {errors.guardianphone ? (
            <h5 className={classes.valError}>{errors.guardianphone}</h5>
          ) : (
            <InputLabel className={classes.label}>Contact Number</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.guardianemail ? true : null}
            size="small"
            variant="outlined"
            type="email"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.guardianemail}
            name="guardianemail"
            onChange={handleChangeGuardian}
          />

          {errors.guardianemail ? (
            <h5 className={classes.valError}>{errors.guardianemail}</h5>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.guardianrelationship ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.guardianrelationship}
            onChange={handleChangeGuardian}
            name="guardianrelationship"
          />

          {errors.guardianrelationship ? (
            <h5 className={classes.valError}>{errors.guardianrelationship}</h5>
          ) : (
            <InputLabel className={classes.label}>
              Relationship to Client
            </InputLabel>
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
          md={4}
          lg={4}
          xl={4}
        >
          <TextField
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.guardianaddress ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.guardianaddress}
            onChange={handleChangeGuardian}
            name="guardianaddress"
          />
          {errors.guardianaddress ? (
            <h5 className={classes.valError}>{errors.guardianaddress}</h5>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.guardianCity ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.guardianCity}
            onChange={handleChangeGuardian}
            name="guardianCity"
          />
          {errors.guardianCity ? (
            <h5 className={classes.valError}>{errors.guardianCity}</h5>
          ) : (
            <InputLabel className={classes.label}>City</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.guardianSuburb ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.guardianSuburb}
            onChange={handleChangeGuardian}
            name="guardianSuburb"
          />
          {errors.guardianSuburb ? (
            <h5 className={classes.valError}>{errors.guardianSuburb}</h5>
          ) : (
            <InputLabel className={classes.label}>Suburb</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.guardianState ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.guardianState}
            onChange={handleChangeGuardian}
            name="guardianState"
          />
          {errors.guardianState ? (
            <h5 className={classes.valError}>{errors.guardianState}</h5>
          ) : (
            <InputLabel className={classes.label}>State</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.guardianPostcode ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.guardianPostcode}
            onChange={handleChangeGuardian}
            name="guardianPostcode"
          />

          {errors.guardianPostcode ? (
            <h5 className={classes.valError}>{errors.guardianPostcode}</h5>
          ) : (
            <InputLabel className={classes.label}>Postcode</InputLabel>
          )}
        </Grid>
      </Grid>
    );
  };
  // step two
  const ClientDetails = () => {
    return (
      <Grid
        container
        className={classes.container}
        direction="row"
        align="center"
        justifyContent="center"
        spacing={1}
      >
        <h1 className={classes.formHeading}>Client Registration Form</h1>

        <Grid xs={9}>
          <hr style={{ margin: "2em 0" }} />
          <h2 className={classes.formTitles}>Client Details</h2>
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
              autoComplete: 'new-password',
              form: {
                autoComplete: 'off',
              },
            }}
            className={classes.text}
            error={errors.clientfName ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientfName}
            name="clientfName"
            onChange={handleChangeGuardian}
          />

         
          {errors.clientfName ? (
            <h5 className={classes.valError}>{errors.clientfName}</h5>
          ) : (
            <InputLabel className={classes.label}>Name</InputLabel>
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
              autoComplete: 'new-password',
              form: {
                autoComplete: 'off',
              },
            }}
            className={classes.text}
            error={errors.clientlName ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientlName}
            onChange={handleChangeGuardian}
            name="clientlName"
          />

          {errors.clientlName ? (
            <h5 className={classes.valError}>{errors.clientlName}</h5>
          ) : (
            <InputLabel className={classes.label}>Surname</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.clientNationality ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientNationality}
            onChange={handleChangeGuardian}
            name="clientNationality"
          />

          {errors.clientNationality ? (
            <h5 className={classes.valError}>{errors.clientNationality}</h5>
          ) : (
            <InputLabel className={classes.label}>Nationality</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.clientPhone ? true : null}
            size="small"
            variant="outlined"
            type="tel"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientPhone}
            onChange={handleChangeGuardian}
            name="clientPhone"
          />

          {errors.clientPhone ? (
            <h5 className={classes.valError}>{errors.clientPhone}</h5>
          ) : (
            <InputLabel className={classes.label}>Contact Number</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.clientEmail ? true : null}
            size="small"
            variant="outlined"
            type="email"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientEmail}
            name="clientEmail"
            onChange={handleChangeGuardian}
          />

          {errors.clientEmail ? (
            <h5 className={classes.valError}>{errors.clientEmail}</h5>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.clientAge ? true : null}
            variant="outlined"
            size="small"
            type="date"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientAge}
            onChange={handleChangeGuardian}
            name="clientAge"
          />

          {errors.clientAge ? (
            <h5 className={classes.valError}>{errors.clientAge}</h5>
          ) : (
            <InputLabel className={classes.label}>Date of Birth</InputLabel>
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
          <FormControl
            size="small"
            fullWidth
            variant="outlined"
            error={errors.clientGender ? true : null}
          >
            {!refGuardianDetails.current.clientGender ? (
              <InputLabel>Gender</InputLabel>
            ) : null}
            <Select
              inputProps={{ MenuProps: { disableScrollLock: true } }}
              value={refGuardianDetails.current.clientGender}
              name="clientGender"
              onChange={handleChangeGuardian}
              className={classes.select}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Non-Binary</MenuItem>
            </Select>
          </FormControl>

          {errors.clientGender ? (
            <h5 className={classes.valError}>{errors.clientGender}</h5>
          ) : (
            <InputLabel className={classes.label}>Gender</InputLabel>
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
          md={4}
          lg={4}
          xl={4}
        >
          <TextField
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.clientaddress ? true : null}
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientaddress}
            onChange={handleChangeGuardian}
            name="clientaddress"
          />

          {errors.clientaddress ? (
            <h5 className={classes.valError}>{errors.clientaddress}</h5>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.clientCity ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientCity}
            onChange={handleChangeGuardian}
            name="clientCity"
          />
          {errors.clientCity ? (
            <h5 className={classes.valError}>{errors.clientCity}</h5>
          ) : (
            <InputLabel className={classes.label}>City</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.clientSuburb ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientSuburb}
            onChange={handleChangeGuardian}
            name="clientSuburb"
          />
          {errors.clientSuburb ? (
            <h5 className={classes.valError}>{errors.clientSuburb}</h5>
          ) : (
            <InputLabel className={classes.label}>Suburb</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.clientState ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientState}
            onChange={handleChangeGuardian}
            name="clientState"
          />
          {errors.clientState ? (
            <h5 className={classes.valError}>{errors.clientState}</h5>
          ) : (
            <InputLabel className={classes.label}>State</InputLabel>
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
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            className={classes.text}
            error={errors.clientPostcode ? true : null}
            size="small"
            variant="outlined"
            type="text"
            fullWidth
            required
            placeholder="Start Typing"
            value={guardianDetails.clientPostcode}
            onChange={handleChangeGuardian}
            name="clientPostcode"
          />

          {errors.clientPostcode ? (
            <h5 className={classes.valError}>{errors.clientPostcode}</h5>
          ) : (
            <InputLabel className={classes.label}>Postcode</InputLabel>
          )}
        </Grid>
      </Grid>
    );
  };

  // step three
  const requirements = () => {
    return (
      <Grid
        container
        className={classes.container}
        direction="row"
        align="center"
        justifyContent="center"
        spacing={4}
      >
        <h1 className={classes.formHeading}>Client Registration Form</h1>
        <h2 className={classes.formSubHeading}>Client Requirements</h2>

        <Grid item xs={12} sm={10} md={4} lg={3} xl={3}>
          <p style={{ fontSize: "2em" }}>{daysReq}</p>

          <MinimizeIcon
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={handleDecrementDays}
          />

          <img
            className={classes.night}
            src={"/images/sun.png"}
            alt="icon sun"
            width="100"
            height="100"
          />
          <AddIcon
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={handleIncrementDays}
          />
          <p style={{ fontSize: "1em" }}>Days of care required per week</p>
        </Grid>

        <Grid item xs={12} sm={10} md={4} lg={4} xl={4}>
          <p style={{ fontSize: "2em" }}>{nightsReq}</p>
          <MinimizeIcon
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={handleDecrementNights}
          />

          <img
            className={classes.night}
            src={"/images/night.png"}
            alt="icon moon"
            width="100"
            height="100"
          />
          <AddIcon
            fontSize="large"
            style={{ cursor: "pointer" }}
            onClick={handleIncrementNights}
          />
          <p style={{ fontSize: "1em" }}>Nights of care required per week</p>
        </Grid>
        {errors.care ? (
          <h5 className={classes.valErrorCare}>{errors.care}</h5>
        ) : null}

        <Grid item xs={10} sm={10} md={7} lg={7} xl={7}>
          <hr style={{ margin: "0 auto 2em auto" }} />
          <h5
            style={{
              textAlign: "center",
              fontSize: "1.3em",
              fontWeight: "200",
              margin: "0",
            }}
          >
            Does Client Need or Use Any of the Following ?
          </h5>
        </Grid>
        <Grid item xs={12} sm={10} md={7}>
          <FormControlLabel
            control={
              <Checkbox
                checkedIcon={
                  <img
                    className={classes.night}
                    src={"/images/wheelchair.png"}
                    alt="icon"
                    width="24"
                    height="24"
                  />
                }
                name="wheelChair"
                onChange={handleChangeChecklist}
                value={checkList.wheelChair}
              />
            }
            label={
              <span style={{ fontSize: "1.1em", fontWeight: "100" }}>
                Wheelchair
              </span>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checkedIcon={
                  <img
                    className={classes.night}
                    src={"/images/walker.png"}
                    alt="icon"
                    width="24"
                    height="24"
                  />
                }
                name="walkingAid"
                onChange={handleChangeChecklist}
                value={checkList.walkingAid}
              />
            }
            label={
              <span style={{ fontSize: "1.1em", fontWeight: "100" }}>
                Walking Aids (e.g frame)
              </span>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                className={classes.checkList}
                checkedIcon={
                  <img
                    className={classes.night}
                    src={"/images/stretcher.png"}
                    alt="icon"
                    width="24"
                    height="24"
                  />
                }
                name="bedConfined"
                onChange={handleChangeChecklist}
                value={checkList.bedConfined}
              />
            }
            label={
              <span style={{ fontSize: "1.1em", fontWeight: "100" }}>
                Confined to bed
              </span>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checkedIcon={
                  <img
                    className={classes.night}
                    src={"/images/hoist.png"}
                    alt="icon"
                    width="24"
                    height="24"
                  />
                }
                name="hoist"
                onChange={handleChangeChecklist}
                value={checkList.hoist}
              />
            }
            label={
              <span style={{ fontSize: "1.1em", fontWeight: "100" }}>
                Hoist
              </span>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checkedIcon={
                  <img
                    className={classes.night}
                    src={"/images/deaf.png"}
                    alt="icon"
                    width="24"
                    height="24"
                  />
                }
                name="deaf"
                onChange={handleChangeChecklist}
                value={checkList.deaf}
              />
            }
            label={
              <span style={{ fontSize: "1.1em", fontWeight: "100" }}>Deaf</span>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checkedIcon={
                  <img
                    className={classes.night}
                    src={"/images/blind.png"}
                    alt="icon"
                    width="24"
                    height="24"
                  />
                }
                name="blind"
                onChange={handleChangeChecklist}
                value={checkList.blind}
              />
            }
            label={
              <span style={{ fontSize: "1.1em", fontWeight: "100" }}>
                Vision Impaired
              </span>
            }
          />
        </Grid>

        <Grid item xs={12} sm={10} md={7} lg={7} xl={7}>
          <hr style={{ margin: "0 auto 2em auto" }} />

          <h5
            style={{
              textAlign: "center",
              fontSize: "1.3em",
              fontWeight: "200",
              marginBottom: "1em",
            }}
          >
            Are there any Pets in the Home
          </h5>

          <FormControl size="small" fullWidth variant="outlined">
            {!guardianDetails.pets ? (
              <InputLabel id="region">Select From List</InputLabel>
            ) : null}
            <Select
              labelId="pets"
              value={guardianDetails.pets}
              onChange={handleChangeGuardian}
              name="pets"
            >
              <MenuItem value={"dog"}>Dog</MenuItem>
              <MenuItem value={"cat"}>Cat</MenuItem>
              <MenuItem value={"bird"}>Bird</MenuItem>
              <MenuItem value={"rabit"}>Rabbit</MenuItem>
              <MenuItem value={"fish"}>Fish</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={9}>
          <hr style={{ margin: "2em 0" }} />
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.3em",
              fontWeight: "200",
            }}
          >
            List any Further Specfic Requirements Below
          </h2>
        </Grid>

        <Grid
          className={classes.notesWrapper}
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <div className={classes.chipBox}>
            <Chip
              className={classes.chip}
              avatar={<FavoriteIcon style={{ color: "red" }} />}
              label="Personal care"
              onDelete={() => handleSelectNote("personalCare")}
              variant="outlined"
              deleteIcon={<AddIcon />}
            />
            <Chip
              className={classes.chip}
              avatar={<LocalLaundryServiceIcon style={{ color: "blue" }} />}
              label="Light house duties"
              onDelete={() => handleSelectNote("houseDuties")}
              variant="outlined"
              deleteIcon={<AddIcon />}
            />
            <Chip
              className={classes.chip}
              avatar={<ShoppingCartIcon style={{ color: "orange" }} />}
              label="Shopping"
              onDelete={() => handleSelectNote("shopping")}
              variant="outlined"
              deleteIcon={<AddIcon />}
            />

            <Chip
              className={classes.chip}
              avatar={<DirectionsWalkIcon style={{ color: "green" }} />}
              label="Outings"
              onDelete={() => handleSelectNote("outings")}
              variant="outlined"
              deleteIcon={<AddIcon />}
            />
            <Chip
              className={classes.chip}
              avatar={<PanToolIcon style={{ color: "purple" }} />}
              label="Manual handling"
              onDelete={() => handleSelectNote("manualHandling")}
              variant="outlined"
              deleteIcon={<AddIcon />}
            />
            <Chip
              className={classes.chip}
              avatar={<NotesIcon style={{ color: "pink" }} />}
              label="Other"
              onDelete={() => handleSelectNote("other")}
              variant="outlined"
              deleteIcon={<AddIcon />}
            />
          </div>

          {listItem.map((item, i) => (
            <div
              style={{
                width: "100%",
              }}
              key={i}
            >
              <p style={{ margin: "1em 0" }}>{item}</p>
            </div>
          ))}

          {notesList
            ? notesList.personalCare.map((item, i) => (
                <Box
                  className={classes.box2}
                  key={i}
                  boxShadow={3}
                  bgcolor="background.paper"
                  m={1}
                  p={1}
                >
                  {item}
                  <FavoriteIcon style={{ color: "red" }} />
                </Box>
              ))
            : null}
          {notesList
            ? notesList.houseDuties.map((item, i) => (
                <Box
                  className={classes.box2}
                  key={i}
                  boxShadow={3}
                  bgcolor="background.paper"
                  m={1}
                  p={1}
                >
                  {item}
                  <LocalLaundryServiceIcon style={{ color: "blue" }} />
                </Box>
              ))
            : null}
          {notesList
            ? notesList.shopping.map((item, i) => (
                <Box
                  className={classes.box2}
                  key={i}
                  boxShadow={3}
                  bgcolor="background.paper"
                  m={1}
                  p={1}
                >
                  {item}
                  <ShoppingCartIcon style={{ color: "orange" }} />
                </Box>
              ))
            : null}

          {notesList
            ? notesList.outings.map((item, i) => (
                <Box
                  className={classes.box2}
                  key={i}
                  boxShadow={3}
                  bgcolor="background.paper"
                  m={1}
                  p={1}
                >
                  {item}
                  <DirectionsWalkIcon style={{ color: "green" }} />
                </Box>
              ))
            : null}
          {notesList
            ? notesList.manualHandling.map((item, i) => (
                <Box
                  className={classes.box2}
                  key={i}
                  boxShadow={3}
                  bgcolor="background.paper"
                  m={1}
                  p={1}
                >
                  {item}
                  <PanToolIcon style={{ color: "purple" }} />
                </Box>
              ))
            : null}
          {notesList
            ? notesList.other.map((item, i) => (
                <Box
                  className={classes.box2}
                  key={i}
                  boxShadow={3}
                  bgcolor="background.paper"
                  m={1}
                  p={1}
                >
                  {item}
                  <NotesIcon style={{ color: "pink" }} />
                </Box>
              ))
            : null}
        </Grid>
      </Grid>
    );
  };

  const billing = () => {
    return (
      <>
        <Grid
          container
          className={classes.container}
          direction="row"
          align="center"
          justifyContent="center"
        >
          <h1 className={classes.formHeading}>Client Registration Form</h1>

          <Grid item xs={9}>
            <hr style={{ margin: "2em 0" }} />
            <h2 className={classes.formTitles}>Billing Information</h2>
            <p className={classes.subtext}>
              (where invoices for payment will be sent)
            </p>
          </Grid>
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={10}
            md={10}
            lg={4}
            xl={4}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Who is the preferred contact
              </FormLabel>
              <RadioGroup
                aria-label="preferred contact"
                name="preferredContact"
                onChange={handleChangeGuardian}
              >
                <FormControlLabel
                  value="guardian"
                  control={<Radio />}
                  label={guardianDetails.guardianfName}
                />
                <FormControlLabel
                  value="client"
                  control={<Radio />}
                  label={guardianDetails.clientfName}
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid className={classes.gridItem} item xs={12} sm={10} md={6}>
            <TextField
               inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              className={classes.text}
              size="small"
              placeholder="Start Typing"
              fullWidth
              variant="outlined"
              value={guardianDetails.billingEmail}
              onChange={handleChangeGuardian}
              name="billingEmail"
            />
            <InputLabel className={classes.label}>Billing Email</InputLabel>
          </Grid>
          <Grid item xs={9}>
            <hr style={{ margin: "2em 0" }} />
            <p className={classes.subtext}>
              Or If You Prefer Your Invoice To Be Posted To You
            </p>
          </Grid>

          <Grid className={classes.gridItem} item xs={12} sm={10} md={5}>
            <TextField
               inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              className={classes.text}
              placeholder="Start typing"
              fullWidth
              size="small"
              variant="outlined"
              value={guardianDetails.billingPostAddress}
              onChange={handleChangeGuardian}
              name="billingPostAddress"
            />
            <InputLabel className={classes.label}>Street or PO Box</InputLabel>
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
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              size="small"
              className={classes.text}
              placeholder="Start typing"
              fullWidth
              variant="outlined"
              value={guardianDetails.billingSuburb}
              onChange={handleChangeGuardian}
              name="billingSuburb"
            />

            <InputLabel className={classes.label}>Suburb</InputLabel>
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
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              size="small"
              className={classes.text}
              placeholder="Start typing"
              fullWidth
              variant="outlined"
              value={guardianDetails.billingPostCity}
              onChange={handleChangeGuardian}
              name="billingPostCity"
            />
            <InputLabel className={classes.label}>City</InputLabel>
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
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              size="small"
              className={classes.text}
              placeholder="Start typing"
              fullWidth
              variant="outlined"
              value={guardianDetails.billingPostState}
              onChange={handleChangeGuardian}
              name="billingPostState"
            />
            <InputLabel className={classes.label}>State</InputLabel>
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
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              size="small"
              className={classes.text}
              placeholder="Start typing"
              fullWidth
              variant="outlined"
              value={guardianDetails.billingPostPostcode}
              onChange={handleChangeGuardian}
              name="billingPostPostcode"
            />
            <InputLabel className={classes.label}>Postcode</InputLabel>
          </Grid>
        </Grid>
      </>
    );
  };

  const handleNext = () => {
    if (activeStep === 0) {
      validationSuccess = true;
      if (!guardianDetails.guardianfName) {
        validationErrors.push({ guardianfName: "First required" });
        if (validationErrors.find((i) => i.guardianfName === "First required"))
          setErrors((prevState) => ({
            ...prevState,
            guardianfName: "First name is required",
          }));
        validationSuccess = false;
      }
      if (!guardianDetails.guardianlName) {
        validationErrors.push({ guardianlName: "Last required" });
        if (validationErrors.find((i) => i.guardianlName === "Last required"))
          setErrors((prevState) => ({
            ...prevState,
            guardianlName: "Last name is required",
          }));
        validationSuccess = false;
      }
      if (guardianDetails.guardianphone === "") {
        validationErrors.push({ guardianphone: "enter a valid phone number" });

        if (
          validationErrors.find(
            (i) => i.guardianphone === "enter a valid phone number"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            guardianphone: "Valid phone required",
          }));
        validationSuccess = false;
      }

      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          guardianDetails.guardianemail
        )
      ) {
        validationErrors.push({ guardianemail: "A valid email is required" });
        if (
          validationErrors.find(
            (i) => i.guardianemail === "A valid email is required"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            guardianemail: "A valid email is required",
          }));
        validationSuccess = false;
      }

      if (!guardianDetails.guardianrelationship) {
        validationErrors.push({
          guardianrelationship: "Relationship required",
        });

        if (
          validationErrors.find(
            (i) => i.guardianrelationship === "Relationship required"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            guardianrelationship: "Relationship required",
          }));
        validationSuccess = false;
      }
      if (!guardianDetails.guardianaddress) {
        validationErrors.push({ guardianaddress: "Address required" });

        if (
          validationErrors.find((i) => i.guardianaddress === "Address required")
        )
          setErrors((prevState) => ({
            ...prevState,
            guardianaddress: "Address required",
          }));
        validationSuccess = false;
      }

      if (!guardianDetails.guardianCity) {
        validationErrors.push({ guardianCity: "City required" });

        if (validationErrors.find((i) => i.guardianCity === "City required"))
          setErrors((prevState) => ({
            ...prevState,
            guardianCity: "City required",
          }));
        validationSuccess = false;
      }

      if (!guardianDetails.guardianState) {
        validationErrors.push({ guardianState: "State required" });

        if (validationErrors.find((i) => i.guardianState === "State required"))
          setErrors((prevState) => ({
            ...prevState,
            guardianState: "State required",
          }));
        validationSuccess = false;
      }

      if (!guardianDetails.guardianPostcode) {
        validationErrors.push({ guardianPostcode: "Postcode required" });

        if (
          validationErrors.find(
            (i) => i.guardianPostcode === "Postcode required"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            guardianPostcode: "Postcode required",
          }));
        validationSuccess = false;
      }
      if (!guardianDetails.guardianSuburb) {
        validationErrors.push({ guardianSuburb: "Suburb required" });

        if (
          validationErrors.find((i) => i.guardianSuburb === "Suburb required")
        )
          setErrors((prevState) => ({
            ...prevState,
            guardianSuburb: "Suburb required",
          }));
        validationSuccess = false;
      }

      if (validationSuccess) {
        if (!once) {
          let user = new FormData();
          user.set("guardianfName", guardianDetails.guardianfName);
          user.set("guardianlName", guardianDetails.guardianlName);
          user.set("guardianphone", guardianDetails.guardianphone);
          user.set("guardianemail", guardianDetails.guardianemail);
          user.set("guardianaddress", guardianDetails.guardianaddress);

          user.set("guardianCity", guardianDetails.guardianCity);
          user.set("guardianPostcode", guardianDetails.guardianPostcode);
          user.set("guardianState", guardianDetails.guardianState);
          user.set("guardianSuburb", guardianDetails.guardianSuburb);
          user.set(
            "guardianrelationship",
            guardianDetails.guardianrelationship
          );
          updateClient(props.userId, user, props.token)
            .then((data) => {
              if (data.error) {
                error;
              } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                validationSuccess = false;
              }
            })
            .catch((error) => {
              error;
            });
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          validationSuccess = false;
        }
      }
    }
    if (activeStep === 1) {
      validationSuccess = true;
      if (!guardianDetails.clientfName) {
        validationErrors.push({ clientfName: "First required" });
        if (validationErrors.find((i) => i.clientfName === "First required"))
          setErrors((prevState) => ({
            ...prevState,
            clientfName: "First name is required",
          }));
        validationSuccess = false;
      }
      if (!guardianDetails.clientlName) {
        validationErrors.push({ clientlName: "Last required" });
        if (validationErrors.find((i) => i.clientlName === "Last required"))
          setErrors((prevState) => ({
            ...prevState,
            clientlName: "Last name is required",
          }));
        validationSuccess = false;
      }

      if (!guardianDetails.clientGender) {
        validationErrors.push({
          clientGender: "Gender required",
        });

        if (validationErrors.find((i) => i.clientGender === "Gender required"))
          setErrors((prevState) => ({
            ...prevState,
            clientGender: "Gender required",
          }));
        validationSuccess = false;
      }

      if (guardianDetails.clientNationality === "") {
        validationErrors.push({ clientNationality: "Nationality Required" });
        if (
          validationErrors.find(
            (i) => i.clientNationality === "Nationality Required"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            clientNationality: "Nationality Required",
          }));
        validationSuccess = false;
      }

      if (!guardianDetails.clientaddress) {
        validationErrors.push({ clientaddress: "Address required" });

        if (
          validationErrors.find((i) => i.clientaddress === "Address required")
        )
          setErrors((prevState) => ({
            ...prevState,
            clientaddress: "Address required",
          }));
        validationSuccess = false;
      }

      if (!guardianDetails.clientCity) {
        validationErrors.push({ clientCity: "City required" });

        if (validationErrors.find((i) => i.clientCity === "City required"))
          setErrors((prevState) => ({
            ...prevState,
            clientCity: "City required",
          }));
        validationSuccess = false;
      }

      if (!guardianDetails.clientState) {
        validationErrors.push({ clientState: "State required" });

        if (validationErrors.find((i) => i.clientState === "State required"))
          setErrors((prevState) => ({
            ...prevState,
            clientState: "State required",
          }));
        validationSuccess = false;
      }

      if (!guardianDetails.clientPostcode) {
        validationErrors.push({ clientPostcode: "Postcode required" });

        if (
          validationErrors.find((i) => i.clientPostcode === "Postcode required")
        )
          setErrors((prevState) => ({
            ...prevState,
            clientPostcode: "Postcode required",
          }));
        validationSuccess = false;
      }
      if (!guardianDetails.clientSuburb) {
        validationErrors.push({ clientSuburb: "Suburb required" });

        if (validationErrors.find((i) => i.clientSuburb === "Suburb required"))
          setErrors((prevState) => ({
            ...prevState,
            clientSuburb: "Suburb required",
          }));
        validationSuccess = false;
      }

      if (!guardianDetails.clientAge) {
        validationErrors.push({ clientAge: "Age required" });

        if (validationErrors.find((i) => i.clientAge === "Age required"))
          setErrors((prevState) => ({
            ...prevState,
            clientAge: "Age required",
          }));
        validationSuccess = false;
      }
      if (validationSuccess) {
        let user = new FormData();

        user.set("clientfName", guardianDetails.clientfName);
        user.set("clientAge", guardianDetails.clientAge);
        user.set("clientlName", guardianDetails.clientlName);
        user.set("clientaddress", guardianDetails.clientaddress);
        user.set("clientGender", guardianDetails.clientGender);
        user.set("clientNationality", guardianDetails.clientNationality);
        user.set("clientState", guardianDetails.clientState);
        user.set("clientPostcode", guardianDetails.clientPostcode);
        user.set("clientSuburb", guardianDetails.clientSuburb);
        user.set("clientCity", guardianDetails.clientCity);
        user.set("clientEmail", guardianDetails.clientEmail);
        user.set("clientPhone", guardianDetails.clientPhone);
        updateClient(props.userId, user, props.token)
          .then((data) => {
            if (data.error) {
              error;
            } else {
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
              validationSuccess = false;
            }
          })
          .catch((error) => {
            error;
          });
      }
    }
    if (activeStep === 2) {
      validationSuccess = true;
      if (daysReq === 0 && nightsReq === 0) {
        validationErrors.push({ care: "care required" });
        if (validationErrors.find((i) => i.care === "care required"))
          setErrors((prevState) => ({
            ...prevState,
            care: "Please select at least one day",
          }));
        validationSuccess = false;
      }

      if (validationSuccess) {
        let user = new FormData();
        user.set("nightsReq", nightsReq);
        user.set("daysReq", daysReq);
        user.set("wheelChair", checkList.wheelChair);
        user.set("walkingAid", checkList.walkingAid);
        user.set("hoist", checkList.hoist);
        user.set("blind", checkList.blind);
        user.set("deaf", checkList.deaf);
        user.set("bedConfined", checkList.bedConfined);
        user.set("pets", guardianDetails.pets);
        updateClient(props.userId, user, props.token)
          .then((data) => {
            if (data.error) {
              error;
            } else {
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
              validationSuccess = false;
              setErrors((prevState) => ({
                ...prevState,
                care: "",
              }));
            }
          })
          .catch((error) => {
            error;
          });
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getSteps() {
    return ["", "", "", ""];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return GuardianDetails();

      case 1:
        return ClientDetails();
      case 2:
        return requirements();

      case 3:
        return billing();

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
      <Container maxWidth="xl" style={{ padding: "0" }}>
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
                    className={classes.btnSubmit}
                    variant="outlined"
                    color="default"
                    onClick={handlePost}
                  >
                    Submit
                  </Button>
                ) : null}
              </div>
            </div>
          )}
        </div>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={classes.stepper}
        >
          {steps.map((label) => (
            <Step className={classes.location} key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Box>
  );
};

export default Form;
