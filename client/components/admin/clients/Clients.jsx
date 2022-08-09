import { useState, useEffect, React, useRef } from "react";
import styles from "./clients.module.css";
import bl from "./bl";
import { makeStyles } from "@material-ui/core/styles";
import { getClient } from "../../../pages/api/adminApi";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  btns: {
    textTransform: "lowercase",
    fontWeight: "500",
  },
}));

const Clients = (props) => {
  const classes = useStyles();
  const {} = bl();
  const [user, setUser] = useState([]);
  const [carers, setCarers] = useState([]);
  const [token, setToken] = useState(props.token);
  const [id, setId] = useState(props.id);
  const [error, setError] = useState("");

  const inputRef = useRef();

  useEffect(async () => {
    await getClient(token)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      {user.length ? (
        user.map((client, i) => (
          <div className={styles.cards} key={i}>
            <div className={styles.card}>
              <div style={{ position: "relative", display: "block" }}>
                <h4 className={styles.name}>
                  {client.clientfName} {client.clientlName}
                </h4>
                <span className={styles.badgeNum}>#{client.clientNumber}</span>
                <span className={styles.badge}>
                  {
                    client.notes.filter(
                      (element) => element.completed === false
                    ).length
                  }
                </span>

                <Link href={`/client/${client._id}`}>
                  <img
                    className={styles.img}
                    onError={(i) =>
                      (i.target.src = "/images/profileDefault.jpeg")
                    }
                    src={
                      client.clientGender === "female"
                        ? "/images/oldGirl.png"
                        : "/images/oldMan.png"
                    }
                    alt={client.clientfName}
                    width="170"
                    height="200"
                  />
                </Link>
              </div>

              <Button
                style={{ border: "none", backgroundColor: "transparent" }}
                className={classes.btns}
                color="default"
                onClick={() => {
                  window.location.href = `mailto:${client.email}`;
                }}
              >
                {client.preferedContactEmail === client.guardianemail
                  ? client.guardianemail
                  : client.clientEmail}
              </Button>
              <Button
                style={{ border: "none", backgroundColor: "transparent" }}
                className={classes.btns}
                color="default"
                onClick={() => {
                  window.location.href = `tel:${client.phone}`;
                }}
              >
                {client.preferedContactPhone === client.guardianphone
                  ? client.guardianphone
                  : client.clientPhone}
              </Button>
              <div className={styles.carersListWrapper}>
                <div className={styles.carersList}>
                  {client.rosters.length
                    ? [
                        ...new Set(
                          client.rosters.map(
                            (item, i) => `${"  "}${item.carer.name}${"  "}`
                          )
                        ),
                      ]
                    : "No Roster"}
                </div>
              </div>
            </div>
          </div>
        ))
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
      )}
    </div>
  );
};

export default Clients;
