import { useState, useEffect, React } from "react";
import styles from "./carers.module.css";
import bl from "./bl";
import { makeStyles } from "@material-ui/core/styles";
import { getCarers } from "../../../pages/api/adminApi";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  btns: {
    textTransform: "lowercase",
    fontWeight: "500",
  },
}));

const Carers = (props) => {
  const classes = useStyles();
  const {} = bl();
  const [user, setUser] = useState("");
  const [token, setToken] = useState(props.token);
  const [id, setId] = useState(props.id);
  const [error, setError] = useState("");

  useEffect(async () => {
    await getCarers(token)
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
        user.map((carer, i) => (
          <div className={styles.cards} key={i}>
            <div className={styles.card}>
              <div style={{ position: "relative" }}>
                <span className={styles.badge}>
                  {
                    carer.notes.filter((element) => element.completed === false)
                      .length
                  }
                </span>
                <span className={styles.badge2}>
                  <p>#{carer.carerNumber}</p>
                </span>
                <Link href={`/carer/${carer._id}`}>
                  <img
                    style={{ cursor: "pointer" }}
                    onError={(i) =>
                      (i.target.src = "/images/profileDefault.jpeg")
                    }
                    src={carer.photo}
                    alt={carer.fName}
                    width="160"
                    height="160"
                  />
                </Link>
              </div>

              <h4>
                {carer.fName} {carer.lName}
              </h4>

              <Button
                style={{ border: "none", backgroundColor: "transparent" }}
                className={classes.btns}
                color="default"
                onClick={() => {
                  window.location.href = `mailto:${carer.email}`;
                }}
              >
                {carer.email}
              </Button>
              <Button
                style={{ border: "none", backgroundColor: "transparent" }}
                className={classes.btns}
                color="default"
                onClick={() => {
                  window.location.href = `tel:${carer.phone}`;
                }}
              >
                {carer.phone}
              </Button>
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

export default Carers;
