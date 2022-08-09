import { React, useState } from "react";
import ClientSignUp from "../components/contactUs/clientEnquiry/index";
import CarerSignUp from "../components/contactUs/carerEnquiry/index";
import Modal from "@material-ui/core/Modal";
import { Button, Grid, Container, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/aboutUs.module.css";
import ClearIcon from "@material-ui/icons/Clear";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundImage: "url(/images/floral.png)",
    overflow: "scroll",
    padding: "2em",
  },

  mWrapper: {
    backgroundImage: "url(/images/floral.png)",
    margin: "0 auto",
    padding: "2em 100px",
    [theme.breakpoints.down("sm")]: {
      padding: "1.2em",
    },
  },

  title: {
    margin: "0 0 0.5em 0",
    padding: "0",
    textAlign: "center",
    color: "#636e72",
    fontSize: "4em",
    letterSpacing: "5px",
    fontWeight: "200",

    [theme.breakpoints.down("sm")]: {
      margin: "0.5em 0 0.5em 0",
    },
  },

  row1: {
    margin: "1em",
    textAlign: "justify",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  row2: {
    textAlign: "justify",
    margin: "1em",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "center",
    },
  },
  row3: {
    margin: "1em",
    textAlign: "justify",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  vine: {
    objectFit: "contain",
    margin: "0",
  },
  img1: {
    objectFit: "cover",
    borderRadius: "5px",
  },
  img2: {
    objectFit: "cover",
    borderRadius: "5px",
    minHeight: "150px",
  },
  img3: {
    objectFit: "cover",
    borderRadius: "5px",
    minHeight: "150px",
  },
  text0: {
    textAlign: "center",
    maxWidth: "80%",
    lineHeight: "1.9",
    fontWeight: "300",
    fontSize: "1.1em",
    margin: "0 0 4em 0",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%",
      justifyContent: "center",
    },
  },

  text1: {
    textAlign: "left",
    maxWidth: "550px",
    lineHeight: "1.9",
    fontWeight: "300",
    fontSize: "1.1em",
  },
  text2: {
    textAlign: "left",
    maxWidth: "550px",
    lineHeight: "1.9",
    fontWeight: "300",
    fontSize: "1.1em",
  },
  text3: {
    textAlign: "left",
    maxWidth: "550px",
    lineHeight: "1.9",
    fontWeight: "300",
    fontSize: "1.1em",
  },

  heading1: {
    fontSize: "2.1em",
    fontWeight: "300",
    letterSpacing: "2px",
    textAlign: "left",
    maxWidth: "550px",
  },
  heading2: {
    fontSize: "2.1em",
    fontWeight: "300",
    letterSpacing: "2px",
    textAlign: "left",
    maxWidth: "550px",
  },
  heading3: {
    fontSize: "2.1em",
    fontWeight: "300",
    letterSpacing: "2px",
    textAlign: "left",
    maxWidth: "550px",
  },
  quote: {
    fontSize: "1.4em",
    fontFamily: "'Montez', cursive",
    letterSpacing: "2px",
    fontWeight: "100",
    textAlign: "center",
    lineHeight: "1.5",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  quote2: {
    fontSize: "2.2em",
    margin: "2em auto",
    fontFamily: "'Montez', cursive",
    letterSpacing: "2px",
    fontWeight: "100",
    textAlign: "center",
    lineHeight: "1.5",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  quote3: {
    fontSize: "1.4em",
    fontFamily: "'Montez', cursive",
    letterSpacing: "2px",
    fontWeight: "100",
    textAlign: "center",
    lineHeight: "1.5",
    margin: "1.2em 0 -0.5em 0",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  quote4: {
    fontSize: "2.2em",
    fontFamily: "'Montez', cursive",
    letterSpacing: "2px",
    fontWeight: "100",
    textAlign: "center",
    lineHeight: "1.5",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  join: {
    textTransform: "capitalize",
    fontSize: "1em",
    fontWeight: "300",
    marginTop: "1em",
    lineHeight: "1.4",
    backgroundColor: "#AF6B58",
    color: "#FFF",
    "&:hover": {
      color: "#FFF",
      backgroundColor: "#ba7f6f",
    },
  },
  joinBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: "1em 4em",
    [theme.breakpoints.down("sm")]: {
      margin: "1em 10px -0.5em 10px",
    },
  },
  close: {
    position: "absolute",
    top: "20px",
    right: "20px",
  },
  modalTitle: {
    textAlign: "center",
    color: "#FFF",
    fontSize: "2.1em",
    fontWeight: "300",
    letterSpacing: "2px",
  },
}));

const aboutus = () => {
  const router = useRouter();
  const classes = useStyles();
  const [openCarer, setOpenCarer] = useState(false);
  const [openClient, setOpenClient] = useState(false);

  const body = (
    <>
      <h3 className={classes.modalTitle}>Interested in booking a carer ?</h3>
      <IconButton
        className={classes.close}
        aria-label="close"
        onClick={() => {
          setOpenClient(false);
        }}
      >
        <ClearIcon fontSize="large" style={{ color: "red" }} />
      </IconButton>
      <ClientSignUp />
    </>
  );

  const body2 = (
    <>
      <h3 className={classes.modalTitle}>Interested in joining our team ?</h3>
      <IconButton
        className={classes.close}
        aria-label="close"
        onClick={() => {
          setOpenCarer(false);
        }}
      >
        <ClearIcon fontSize="large" style={{ color: "red" }} />
      </IconButton>
      <CarerSignUp />
    </>
  );

  return (
    <>
      <Modal
        className={classes.modal}
        open={openClient}
        aria-labelledby="Loading Screen"
      >
        {body}
      </Modal>

      <Modal
        className={classes.modal}
        open={openCarer}
        aria-labelledby="Loading Screen"
      >
        {body2}
      </Modal>

      <Container maxWidth="fixed" align="center" className={classes.mWrapper}>
        <h1 className={classes.title}>About Us</h1>
        <hr style={{ margin: "1em auto 3em auto" }} />
        <p className={classes.text0}>
          Quality live-in care to support you within the comfort of your own
          home. <br /> As you enter your golden years the reason for needing a
          carer can be varied, what does remain a constant are your home and the
          comfort it gives you. To enable you to stay at home we can introduce a
          kind, compassionate and experienced carer to help you retain your
          independence. We can offer experienced carers who can provide as much
          or as little personal, domestic.
        </p>

        <div className={styles.btn}>
          <div className={classes.joinBox}>
            <img
              className={styles.panelIcon}
              src={"/images/house.png"}
              alt="icon"
            />
            <Button
              className={classes.join}
              variant="contained"
              onClick={() => {
                setOpenClient(true);
              }}
            >
              Book a carer
            </Button>
          </div>
          <div className={classes.joinBox}>
            <img
              className={styles.panelIcon}
              src={"/images/angel.png"}
              alt="icon"
            />

            <Button
              variant="contained"
              className={classes.join}
              onClick={() => {
                setOpenCarer(true);
              }}
            >
              Join our team
            </Button>
          </div>
          <div className={classes.joinBox}>
            <img
              className={styles.panelIconSmall}
              src={"/images/phone.png"}
              alt="icon"
            />

            <Button
              variant="contained"
              className={classes.join}
              onClick={() => {
                router.push("/contactus");
              }}
            >
              Get In Touch
            </Button>
          </div>
        </div>
        <blockquote style={{ width: "100%" }} className={classes.quote4}>
          “When you are a caregiver, you know that everyday you will touch a
          life or a life will touch yours”
        </blockquote>
        <hr style={{ margin: "1em auto 2em auto" }} />
        <div className={styles.container}>
          <div className={styles.box1}>
            <h3 className={classes.heading1}>Our Vision</h3>
            <p className={classes.text1}>
              Quality live-in care to support you within the comfort of your own
              home. <br /> As you enter your golden years the reason for needing
              a carer can be varied, what does remain a constant are your home
              and the comfort it gives you. To enable you to stay at home we can
              introduce a kind, compassionate and experienced carer to help you
              retain your independence. We can offer experienced carers who can
              provide as much or as little personal, domestic and companionship
              support as you require.
            </p>
          </div>

          <div className={styles.box2}>
            <img
              className={classes.img2}
              src={"/images/cliff.jpeg"}
              alt="icon"
              width="100%"
              height="350px"
            />

            <blockquote className={classes.quote}>
              “One to one care Tailored to your lifestyle and needs”
            </blockquote>
          </div>

          <div className={styles.box3}>
            <img
              className={classes.img1}
              src={"/images/woman-dog.jpeg"}
              alt="icon"
              width="100%"
              height="350px"
            />
          </div>
          <div className={styles.box4}>
            <h3 className={classes.heading2}>How We Can Help</h3>
            <p className={classes.text2}>
              Quality live-in care to support you within the comfort of your own
              home. As you enter your golden years the reason for needing a
              carer can be varied, what does remain a constant are your home and
              the comfort it gives you. To enable you to stay at home we can
              introduce a kind, compassionate and experienced carer to help you
              retain your independence. We can offer experienced carers who can
              provide as much or as little personal, domestic and companionship
              support as you require.
            </p>
          </div>
          <div className={styles.box5}>
            <h3 className={classes.heading3}>Our Carers</h3>{" "}
            <p className={classes.text3}>
              Quality live-in care to support you within the comfort of your own
              home. As you enter your golden years the reason for needing a
              carer can be varied, what does remain a constant are your home and
              the comfort it gives you. To enable you to stay at home we can
              introduce a kind, compassionate and experienced carer to help you
              retain your independence. We can offer experienced carers who can
              provide as much or as little personal, domestic and companionship
              support as you require.
            </p>
          </div>
          <div className={styles.box6}>
            <img
              className={classes.img3}
              src={"/images/carer.jpeg"}
              alt="icon"
              width="100%"
              height="350px"
            />
            <blockquote className={classes.quote3}>
              “Even the smallest act of caring for another person is like a drop
              of water, it will make ripples throughout the entire pond”
            </blockquote>
          </div>
          <div className={styles.box7}>
            <img
              className={classes.img3}
              src={"/images/couple.jpeg"}
              alt="icon"
              width="100%"
              height="350px"
            />
          </div>
          <div className={styles.box8}>
            <h3 className={classes.heading3}>Placeholder</h3>{" "}
            <p className={classes.text3}>
              Quality live-in care to support you within the comfort of your own
              home. As you enter your golden years the reason for needing a
              carer can be varied, what does remain a constant are your home and
              the comfort it gives you. To enable you to stay at home we can
              introduce a kind, compassionate and experienced carer to help you
              retain your independence. We can offer experienced carers who can
              provide as much or as little personal, domestic and companionship
              support as you require.
            </p>
          </div>
          <div className={styles.box9}>
            <h3 className={classes.heading3}>Placeholder</h3>{" "}
            <p className={classes.text3}>
              Quality live-in care to support you within the comfort of your own
              home. As you enter your golden years the reason for needing a
              carer can be varied, what does remain a constant are your home and
              the comfort it gives you. To enable you to stay at home we can
              introduce a kind, compassionate and experienced carer to help you
              retain your independence. We can offer experienced carers who can
              provide as much or as little personal, domestic and companionship
              support as you require.
            </p>
          </div>
          <div className={styles.box10}>
            <img
              className={classes.img3}
              src={"/images/hands.jpeg"}
              alt="icon"
              width="100%"
              height="350px"
            />
          </div>
        </div>
        <blockquote className={classes.quote2}>
          “Even the smallest act of caring for another person is like a drop of
          water, it will make ripples throughout the entire pond”
        </blockquote>
        <hr style={{ margin: "1em auto 5em auto" }} />
        <div className={styles.btn}>
          <div className={classes.joinBox}>
            <img
              className={styles.panelIcon}
              src={"/images/house.png"}
              alt="icon"
            />
            <Button
              className={classes.join}
              variant="contained"
              onClick={() => {
                setOpenClient(true);
              }}
            >
              Book a carer
            </Button>
          </div>
          <div className={classes.joinBox}>
            <img
              className={styles.panelIcon}
              src={"/images/angel.png"}
              alt="icon"
            />

            <Button
              variant="contained"
              className={classes.join}
              onClick={() => {
                setOpenCarer(true);
              }}
            >
              Join our team
            </Button>
          </div>
          <div className={classes.joinBox}>
            <img
              className={styles.panelIconSmall}
              src={"/images/phone.png"}
              alt="icon"
            />

            <Button
              variant="contained"
              className={classes.join}
              onClick={() => {
                router.push("/contactus");
              }}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default aboutus;
