import React from "react";
import bl from "./bl";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import MinimizeIcon from "@material-ui/icons/Minimize";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(3),
      width: "300px",
      height: "200px",
      borderRadius: "5px",
    },
  },
  price: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "0 0 2em 0",
  },
  imgFuel: {
    marginLeft: "10px",
    cursor: "pointer",
  },
  signUpTitle: {
    textAlign: "center",
    fontSize: "1.2em",
    fontWeight: "200",
    letterSpacing: "1px",
  },
  signUpList: {
    listStyleType: "none",
    fontWeight: "200",
    letterSpacing: "1px",
    overflow: "scroll",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  },
  tickCross: {
    marginLeft: "5px",
  },
}));

const Dash = () => {
  const classes = useStyles();
  const {
    admin,
    handleIncrementPrice,
    handleDecrementPrice,
    priceCounter,
    update_Price,
    clients,
    carer,
  } = bl();
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.price}>
        <p style={{ fontSize: "1.2em" }}>
          {admin
            ? priceCounter
              ? priceCounter.toFixed(2)
              : admin.price
            : null}
        </p>
        <div>
          <MinimizeIcon
            fontSize="medium"
            style={{ cursor: "pointer" }}
            onClick={handleDecrementPrice}
          />

          <img
            onClick={() => update_Price(priceCounter.toFixed(2))}
            className={classes.imgFuel}
            src={"/images/fuel.png"}
            alt="icon moon"
            height={40}
            width={40}
          />
          <AddIcon
            fontSize="medium"
            style={{ cursor: "pointer" }}
            onClick={handleIncrementPrice}
          />
        </div>
      </Paper>
      <Paper elevation={3}>
        <p className={classes.signUpTitle}>New Clients</p>
        {clients.map((client, i) => (
          <ul key={i} className={classes.signUpList}>
            <li>
              <a
                className={classes.listItem}
                href={` ${process.env.NEXT_PUBLIC_REACT_APP_URL}/client/${client._id}`}
              >
                {client.clientfName} {client.clientlName}
                {moment().diff(client.created, "days")} day(s) ago
                {!client.form ? (
                  <img
                    className={classes.tickCross}
                    src={"/images/cross.png"}
                    alt="icon"
                    width="19"
                    height="19"
                  />
                ) : (
                  <img
                    className={classes.tickCross}
                    src={"/images/tick.png"}
                    alt="icon"
                    width="24"
                    height="24"
                  />
                )}
              </a>
            </li>
            <li>
              <a
                className={classes.listItem}
                href={` ${
                  process.env.NEXT_PUBLIC_REACT_APP_URL
                }/client/${"61bf0b167bdbb5b417b6f7b4"}`}
              >
                Claudia Janus 1 day(s) ago
                {!client.form ? (
                  <img
                    className={classes.tickCross}
                    src={"/images/cross.png"}
                    alt="icon"
                    width="19"
                    height="19"
                  />
                ) : (
                  <img
                    className={classes.tickCross}
                    src={"/images/tick.png"}
                    alt="icon"
                    width="24"
                    height="24"
                  />
                )}
              </a>
            </li>
          </ul>
        ))}
      </Paper>
      <Paper elevation={3}>
        <p className={classes.signUpTitle}>New Carers</p>
        {carer.map((carer, i) => (
          <ul key={i} className={classes.signUpList}>
            <li>
              <a
                className={classes.listItem}
                href={` ${process.env.NEXT_PUBLIC_REACT_APP_URL}/carer/${carer._id}`}
              >
                {carer.fName} {carer.lName}{" "}
                {moment().diff(carer.created, "days")} day(s) ago
                {!carer.form ? (
                  <img
                    className={classes.tickCross}
                    src={"/images/cross.png"}
                    alt="icon"
                    width="19"
                    height="19"
                  />
                ) : (
                  <img
                    className={classes.tickCross}
                    src={"/images/tick.png"}
                    alt="icon"
                    width="24"
                    height="24"
                  />
                )}
              </a>
            </li>
            <li>
              <a
                className={classes.listItem}
                href={` ${
                  process.env.NEXT_PUBLIC_REACT_APP_URL
                }/carer/${"61bf01017bdbb5b417b6f71c"}`}
              >
                John Smith 3 day(s) ago
                {!carer.form ? (
                  <img
                    className={classes.tickCross}
                    src={"/images/cross.png"}
                    alt="icon"
                    width="19"
                    height="19"
                  />
                ) : (
                  <img
                    className={classes.tickCross}
                    src={"/images/tick.png"}
                    alt="icon"
                    width="24"
                    height="24"
                  />
                )}
              </a>
            </li>
          </ul>
        ))}
      </Paper>
      <Paper elevation={3}></Paper>
      <Paper elevation={3}></Paper>
      <Paper elevation={3}></Paper>
    </div>
  );
};

export default Dash;
