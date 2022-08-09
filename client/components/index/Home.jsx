import { React, useState } from "react";
import bl from "./bl";
import ClientSignUp from "../../components/contactUs/clientEnquiry/index";
import CarerSignUp from "../../components/contactUs/carerEnquiry/index";
import styles from "./home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { Grid, Paper, Button, IconButton, Modal } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundImage: "url(/images/floral.png)",
    overflow: "scroll",
    padding: "2em",
  },
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.466)",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gridColumnGap: "1px",
    gridRowGap: "1px",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(1, 1fr)",
    },
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(4, 1fr)",
      width: "230px",
      height: "100%",
      margin: "auto 0 auto 0em",
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto 0 auto 3em",
    },
    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(1, 1fr)",
      width: "100%",
      margin: "0",
    },
  },

  iconGrid: {
    margin: "1em",
  },
  wrapper: {
    padding: "1.5em",
    margin: "0em auto 1em auto",
  },
  wrapper2: {
    margin: "1em 0",
  },
  panelIconText: {
    width: "60%",
    maxWidth: "220px",
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
  iconLinks: {
    margin: "1em auto 2em auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  whyChooseUsCheckboxes: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center !important",
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

const Home = () => {
  const classes = useStyles();
  const router = useRouter();
  const [openCarer, setOpenCarer] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const { handleOpen, handleClose, open } = bl();

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
      

     
      <div className={styles.overlay}>

        <Grid
          container
          align="center"
          justifyContent="center"
          className={classes.background}
        >
          <Grid item align="center" className={classes.iconGrid}>
            <img
              className={styles.icons}
              src={"/images/handicap-wheelchair.svg"}
              alt="icon"
            />
            <p className={styles.iconText}>Disability Care</p>
          </Grid>
          <Grid item align="center" className={classes.iconGrid}>
            <img
              className={styles.icons}
              src={"/images/noun_Walking .svg"}
              alt="icon"
            />
            <p className={styles.iconText}>Aged Care</p>
          </Grid>
          <Grid item align="center" className={classes.iconGrid}>
            <img className={styles.icons} src={"/images/care.svg"} alt="icon" />
            <p className={styles.iconText}>Companionship</p>
          </Grid>
          <Grid item align="center" className={classes.iconGrid}>
            <img
              className={styles.icons}
              src={"/images/sun_moon.svg"}
              alt="icon"
            />
            <p className={styles.iconText}>Daily Care</p>
          </Grid>

        
          
        </Grid>
        
<div className={styles.backgroundSlogan}>
 <h2 className={styles.slogan}>Caring For You At Home</h2>
</div>
       
       
       
      
      </div>
      <h2 className={styles.infoHeader}>Why Choose Us</h2>
      <hr style={{ width: "80%", margin: "0 auto" }} />
      <Grid
        direction="row"
        container
        className={classes.wrapper}
        justifyContent="center"
        align="center"
      >
        <Grid
          item
          xs={12}
          md={5}
          align="left"
          className={classes.whyChooseUsCheckboxes}
        >
          <ul className={styles.tickBoxes}>
            <li>Lorem Ipsum is that it has more</li>
            <li>Lorem Ipsum is that it has more</li>
            <li>Lorem Ipsum is that it has more</li>
            <li>Lorem Ipsum is that it has more</li>
          </ul>
        </Grid>
        <Grid item xs={12} md={4}>
          <p className={styles.infoText2}>
            Why do we use it? It is a long established fact that a reader will
            be distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum is that it has a more-or-less
            normal distribution of letters.
          </p>
        </Grid>

        <Grid container className={classes.wrapper2}>
          <Grid xs={12} sm={6} md={4} item className={classes.iconLinks}>
            <img
              className={styles.panelIcon}
              src={"/images/house.png"}
              alt="icon"
              width="50px"
              height="50px"
            />
            <Button
              className={classes.panelIconText}
              variant="outlined"
              onClick={() => {
                setOpenClient(true);
              }}
            >
              Book A Carer
            </Button>
          </Grid>
          <Grid xs={12} sm={6} md={4} item className={classes.iconLinks}>
            <img
              className={styles.panelIcon}
              src={"/images/angel.png"}
              alt="icon"
              width="50px"
              height="50px"
            />
            <Button
              className={classes.panelIconText}
              variant="outlined"
              onClick={() => {
                setOpenCarer(true);
              }}
            >
              Join Our Team
            </Button>
          </Grid>

          <Grid xs={12} sm={12} md={4} item className={classes.iconLinks}>
            <img
              className={styles.panelIcon}
              src={"/images/phone.png"}
              alt="icon"
              width="49px"
              height="49px"
            />
            <Button
              className={classes.panelIconText}
              variant="outlined"
              onClick={() => {
                router.push("/contactus");
              }}
            >
              Get In Touch
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid xs={12} align="center">
        <img
          className={styles.SeniorsPhoto}
          src={"/images/seniorTitles.jpg"}
          alt="SeniorsPhoto"
          width="100%"
          height="auto"
        />
      </Grid>

      <h2 className={styles.infoHeaderSecondary}>
        The Benefits of Live-in Care
      </h2>
      <div className={styles.fourBox}>
        <Paper elevation={5}>
          <h6 className={styles.infoHeaderSmall}>Staying together</h6>
          <img
            width="100%"
            height="15px"
            className={styles.lineIcon}
            src={"/images/lineIcon.png"}
            alt="icon"
          />
          <p className={styles.infoText}>
            Live-in Care is a great option for couples who wish to keep their
            independence, which allows both partners to age with dignity whilst
            still having the companionship of someone they love in the comfort
            of their own home.
          </p>
        </Paper>
        <Paper elevation={5}>
          <h6 className={styles.infoHeaderSmall}>Companionship </h6>
          <img
            width="100%"
            height="100%"
            className={styles.lineIcon}
            src={"/images/lineIcon.png"}
            alt="icon"
          />
          <p className={styles.infoText}>
            A live-in Carer provides a loved one someone to talk to, which can
            help them feel less isolated which benefits their emotional and
            mental state and physical health. Also, enjoying outdoor activities
            together.
          </p>
        </Paper>

        <Paper elevation={5}>
          <h6 className={styles.infoHeaderSmall}>Familiarity</h6>
          <img
            width="100%"
            height="15px"
            className={styles.lineIcon}
            src={"/images/lineIcon.png"}
            alt="icon"
          />
          <p className={styles.infoText}>
            Having a live-in Carer allows loved ones to remain in familiar
            surroundings not just in their own home but the surrounding area
            like shops, cafes, friends and family etc. Making them feel
            comfortable and safe.
          </p>
        </Paper>
        <Paper elevation={5}>
          <h6 className={styles.infoHeaderSmall}> Pets</h6>
          <img
            width="100%"
            height="100%"
            className={styles.lineIcon}
            src={"/images/lineIcon.png"}
            alt="icon"
          />
          <p className={styles.infoText}>
            This isn’t an issue with live-in care as separation from your pet
            can be distressing for pet owners and for the pet. Carers can look
            after your pets in your own home as many care homes don’t allow pets
            to stay. 
          </p>
        </Paper>
      </div>
    </>
  );
};

export default Home;
