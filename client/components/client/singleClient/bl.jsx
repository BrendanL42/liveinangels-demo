import { useEffect } from "react";
import { useRouter } from "next/router";
import useState from "react-usestateref";
import { singleClients, isAuthenticated } from "../../../pages/api/adminApi";
import { updateClient, updateNotes } from "../../../pages/api/formApi";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import AddIcon from "@material-ui/icons/Add";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PanToolIcon from "@material-ui/icons/PanTool";
import NotesIcon from "@material-ui/icons/Notes";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    [`& input`]: {
      color: "#FFF",
    },
    backgroundColor: "#FFF",
  },
}));

const bl = () => {
  const classes = useStyles();
  const router = useRouter();
  const [client, setClient] = useState();
  const clientid = router.query.clientid;
  const [clientUpdate, setClientUpdate, clientUpdateRef] = useState({});
  const [daysReq, setDaysReq, daysReqRef] = useState(0);
  const [nightsReq, setNightsReq, nightsReqRef] = useState(0);
  const [listItem, setListItem] = useState([]);

  const [notes, setNotes, refNotes] = useState({
    personalCare: "",
    manualHandling: "",
    houseDuties: "",
    shopping: "",
    outings: "",
    other: "",
  });

  let onceV2 = false;

  useEffect(() => {
    if (!router.isReady) return;
    singleClients(clientid).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setClient(data);
        setNightsReq(data.nightsReq);
        setDaysReq(data.daysReq);
        setClientUpdate((prevState) => ({
          ...prevState,
          guardianfName: data.guardianfName,
          preferedContactEmail: data.preferedContactEmail,
          preferedContactPhone: data.preferedContactPhone,
          guardianlName: data.guardianlName,
          guardianphone: data.guardianphone,
          guardianaddress: data.guardianaddress,
          guardianState: data.guardianState,
          guardianPostcode: data.guardianPostcode,
          guardianSuburb: data.guardianSuburb,
          guardianCity: data.guardianCity,
          guardianemail: data.guardianemail,
          guardianrelationship: data.guardianrelationship,
          clientfName: data.clientfName,
          clientlName: data.clientlName,
          clientaddress: data.clientaddress,
          clientNationality: data.clientNationality,
          clientState: data.clientState,
          clientEmail: data.clientEmail,
          clientPostcode: data.clientPostcode,
          clientSuburb: data.clientSuburb,
          clientCity: data.clientCity,
          clientPhone: data.clientPhone,
          clientGender: data.clientGender,
          nightsReq: data.nightsReq,
          daysReq: data.daysReq,
          billingEmail: data.billingEmail,
          billingPostAddress: data.billingPostAddress,
          billingPostCity: data.billingPostCity,
          billingSuburb: data.billingSuburb,
          billingPostPostcode: data.billingPostPostcode,
          billingPostState: data.billingPostState,
          preferedContactEmail: data.preferedContactEmail,
          preferedContactPhone: data.preferedContactPhone,

          wheelChair: data.wheelChair,
          walkingAid: data.walkingAid,
          hoist: data.hoist,
          deaf: data.deaf,
          blind: data.blind,
          bedConfined: data.bedConfined,
          preferred:
           data.preferedContactEmail === data.clientEmail ? true : false,
        }));
      }
    });
  }, [router.isReady, listItem]);

  //handle input capture
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(name, value);

    switch (e.target.name) {
      case "preferred":
        setClientUpdate((prevState) => ({
          ...prevState,
          preferedContactEmail: e.target.checked
            ? clientUpdateRef.current.clientEmail
            : clientUpdateRef.current.guardianemail,
          preferedContactPhone: e.target.checked
            ? clientUpdateRef.current.clientPhone
            : clientUpdateRef.current.guardianphone,
          preferred: e.target.checked,
        }));

        break;

      case "wheelChair":
        setClientUpdate((prevState) => ({
          ...prevState,
          [name]: clientUpdate.wheelChair ? false : true,
        }));
        break;
      case "bedConfined":
        setClientUpdate((prevState) => ({
          ...prevState,
          [name]: clientUpdate.bedConfined ? false : true,
        }));
        break;
      case "walkingAid":
        setClientUpdate((prevState) => ({
          ...prevState,
          [name]: clientUpdate.walkingAid ? false : true,
        }));
        break;
      case "hoist":
        setClientUpdate((prevState) => ({
          ...prevState,
          [name]: clientUpdate.hoist ? false : true,
        }));
        break;
      case "deaf":
        setClientUpdate((prevState) => ({
          ...prevState,
          [name]: clientUpdate.deaf ? false : true,
        }));
        break;
      case "blind":
        setClientUpdate((prevState) => ({
          ...prevState,
          [name]: clientUpdate.blind ? false : true,
        }));
        break;
    }
  };

  const handleSave = () => {
    let user = new FormData();
    user.set("guardianfName", clientUpdate.guardianfName);
    user.set("guardianlName", clientUpdate.guardianlName);
    user.set("guardianphone", clientUpdate.guardianphone);
    user.set("guardianaddress", clientUpdate.guardianaddress);
    user.set("guardianState", clientUpdate.guardianState);
    user.set("guardianPostcode", clientUpdate.guardianPostcode);
    user.set("guardianSuburb", clientUpdate.guardianSuburb);
    user.set("guardianCity", clientUpdate.guardianCity);
    user.set("guardianemail", clientUpdate.guardianemail);
    user.set("guardianrelationship", clientUpdate.guardianrelationship);

    user.set("clientfName", clientUpdate.clientfName);
    user.set("clientlName", clientUpdate.clientlName);
    user.set("clientEmail", clientUpdate.clientEmail);
    user.set("clientaddress", clientUpdate.clientaddress);
    user.set("clientNationality", clientUpdate.clientNationality);
    user.set("clientState", clientUpdate.clientState);
    user.set("clientPostcode", clientUpdate.clientPostcode);
    user.set("clientSuburb", clientUpdate.clientSuburb);
    user.set("clientCity", clientUpdate.clientCity);
    user.set("clientPhone", clientUpdate.clientPhone);
    user.set("clientSuburb", clientUpdate.clientSuburb);

    user.set("billingEmail", clientUpdate.billingEmail);
    user.set("billingPostAddress", clientUpdate.billingPostAddress);
    user.set("billingPostCity", clientUpdate.billingPostCity);
    user.set("billingPostPostcode", clientUpdate.billingPostPostcode);
    user.set("billingPostState", clientUpdate.billingPostState);
    user.set("billingSuburb", clientUpdate.billingSuburb);

    user.set("preferedContactEmail", clientUpdate.preferedContactEmail);
    user.set("preferedContactPhone", clientUpdate.preferedContactPhone);

    user.set("daysReq", clientUpdate.daysReq);
    user.set("nightsReq", clientUpdate.nightsReq);

    user.set("wheelChair", clientUpdate.wheelChair);
    user.set("walkingAid", clientUpdate.walkingAid);
    user.set("hoist", clientUpdate.hoist);
    user.set("bedConfined", clientUpdate.bedConfined);
    user.set("deaf", clientUpdate.deaf);
    user.set("blind", clientUpdate.blind);

    updateClient(clientid, user, isAuthenticated().token)
      .then((data) => {
        if (data.error) {
          error;
        } else {
          router.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Create handleIncrement event handler
  const handleIncrementDays = () => {
    daysReqRef.current < 7
      ? setDaysReq((prevCount) => prevCount + 1)
      : setDaysReq(7);
    setClientUpdate((prevState) => ({
      ...prevState,
      daysReq: daysReqRef.current,
    }));
  };

  //Create handleDecrement event handler
  const handleDecrementDays = () => {
    setDaysReq((prevCount) => (prevCount !== 0 ? prevCount - 1 : prevCount));
    setClientUpdate((prevState) => ({
      ...prevState,
      daysReq: daysReqRef.current,
    }));
  };

  // Create handleIncrement event handler
  const handleIncrementNights = () => {
    nightsReqRef.current < 7
      ? setNightsReq((prevCount) => prevCount + 1)
      : setNightsReq(7);
    setClientUpdate((prevState) => ({
      ...prevState,
      nightsReq: nightsReqRef.current,
    }));
  };
  //Create handleDecrement event handler
  const handleDecrementNights = () => {
    setNightsReq((prevCount) => (prevCount !== 0 ? prevCount - 1 : prevCount));
    setClientUpdate((prevState) => ({
      ...prevState,
      nightsReq: nightsReqRef.current,
    }));
  };

  const handleSaveNote = (value, name) => {
    if (!onceV2 && value) {
      onceV2 = true;
      updateNotes(clientid, value, name, isAuthenticated().token, false)
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

  const handleSelectNote = (value) => {
    switch (value) {
      case "personalCare":
        setListItem((listItem) => [
          ...listItem,
          <TextField
            className={classes.text}
            variant="outlined"
            size="small"
            placeholder="Press + to save note"
            fullWidth
            multiline
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FavoriteIcon />
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
            className={classes.text}
            size="small"
            variant="outlined"
            placeholder="Press + to save note"
            fullWidth
            multiline
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalLaundryServiceIcon />
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
            className={classes.text}
            size="small"
            variant="outlined"
            placeholder="Press + to save note"
            fullWidth
            multiline
            name="shopping"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShoppingCartIcon />
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
            className={classes.text}
            size="small"
            variant="outlined"
            placeholder="Press + to save note"
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
                  <DirectionsWalkIcon />
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
            className={classes.text}
            size="small"
            variant="outlined"
            name="manualHandling"
            placeholder="Press + to save note"
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
                  <PanToolIcon />
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
            className={classes.text}
            size="small"
            variant="outlined"
            name="other"
            placeholder="Press + to save note"
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
                  <NotesIcon />
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

  const handleDelete = (value, name) => {
    if (!onceV2 && value) {
      onceV2 = true;
      updateNotes(clientid, value, name, isAuthenticated().token, true)
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

  const checkPets = () => {
    switch (client.pets) {
      case "bird":
        return "/images/bird.png";
        break;
      case "dog":
        return "/images/dog.png";
        break;
      case "fish":
        return "/images/fish.png";
        break;
      case "rabit":
        return "/images/rabit.png";
        break;
      case "cat":
        return "/images/cat.png";
        break;
      case "":
        return "/images/question-mark.png";
        break;
      case "undefined":
        return "/images/question-mark.png";
        break;
      case null:
        return "/images/question-mark.png";
        break;
      case "null":
        return "/images/question-mark.png";
        break;
    }
  };

  return {
    client,
    handleChange,
    handleSave,
    clientUpdate,
    handleDecrementDays,
    handleIncrementDays,
    handleIncrementNights,
    handleDecrementNights,
    nightsReq,
    daysReq,
    handleSelectNote,
    listItem,
    refNotes,
    notes,
    handleDelete,
    clientUpdateRef,
    checkPets,
  };
};

export default bl;
