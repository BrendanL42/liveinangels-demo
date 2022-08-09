import { React, useEffect } from "react";
import useState from "react-usestateref";
import { TextField, InputLabel, Button, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { submitRosters } from "../pages/api/formApi";
import { getAdmin, isAuthenticated } from "../pages/api/adminApi";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#616161",
    margin: "0",
    padding: "1em",
  },

  text: {
    [`& input`]: {
      color: "white",
    },
    margin: "1em 0",
  },
  label: {
    textAlign: "left",
    color: "white",
    fontSize: "1em",
    fontWeight: "300",
    letterSpacing: "1px",
  },
  btn: {
    margin: "1em auto",
    backgroundColor: "#944E6C",
    border: "none",
    color: "#FFF",
    textTransform: "capitalize",
    width: "130px",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#af6685",
      border: "none",
    },
  },

  form: {
    margin: "auto",
    display: "block",
    border: "1px solid #FFF",
    width: "auto",
    maxWidth: "500px",
    padding: "2em",
    borderRadius: "40px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1em",
    fontSize: "3em",
    color: "white",
    letterSpacing: "1px",
    fontWeight: "200",
  },
}));

const submitRoster = () => {
  const classes = useStyles();
  const router = useRouter();
  const [id, setId] = useState();
  const [km, setKm] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [price, setPrice, priceRef] = useState(0);

  let amount = 0;

  const carerid = router.query.carer;
  const roster = router.query.roster;
  const token = isAuthenticated().token;

  useEffect(() => {
    getAdmin(token)
      .then((data) => {
        setPrice(data.price);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleInput = (e) => {
    if (e.target.name === "id") {
      setId(e.target.value);
    }
    if (e.target.name === "km") {
      setKm(e.target.value);
    }
  };

  const handleSubmit = () => {
    setSuccess("");
    setError("");
    const data = {
      carerIDS: id,
      carerIDL: carerid,
      km: km,
      rosterMatch: roster,
      amount: amount,
    };

    submitRosters(carerid, data)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const calPrice = (km) => {
    const p = price * parseInt(km);
    amount = p;
    if (isNaN(p)) {
      return 0;
    } else {
      return p;
    }
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.heading}>Carer Portal</h1>
      <Grid
        container
        align="center"
        justifyContent="center"
        className={classes.form}
      >
        <Grid item xs={12}>
          <TextField
            className={classes.text}
            size="medium"
            type="number"
            fullWidth
            value={id}
            name="id"
            onChange={(e) => handleInput(e)}
          />
          <InputLabel className={classes.label}>ID</InputLabel>
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.text}
            size="medium"
            type="number"
            fullWidth
            value={km}
            name="km"
            onChange={(e) => handleInput(e)}
          />
          <InputLabel className={classes.label}>KM</InputLabel>
        </Grid>

        <Grid item xs={12}>
          <p style={{ color: "red" }}>{error}</p>
          <p style={{ color: "green" }}>{success}</p>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="primary"
            onClick={() => handleSubmit()}
            variant="outlined"
            className={classes.btn}
            component="label"
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <p style={{ color: "#FFF" }}>
            You will be reinbursed approximately: {calPrice(km).toFixed(2)}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default submitRoster;
