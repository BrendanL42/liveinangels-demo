import React from "react";

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
  InputLabel,
  Select,
  MenuItem,
  Button,
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "@material-ui/core";


const Reference = () => {
  return (
    <Grid container className={classes.container} spacing={1}>
      <h6 className={classes.formHeading}>Carer's Application Form</h6>

      <Grid item align="center" xs={12} sm={12} md={7} lg={7} xl={7}>
        <Grid item xs={10}>
          <Accordion
            className={classes.accordion}
            expanded={expanded === "panel1"}
            onChange={handleAccordian("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="referee-content"
            >
              Referee one
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereeNameOne ? true : null}
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  placeholder="Enter name of referee"
                  value={user.refereeNameOne}
                  name="refereeNameOne"
                  onChange={handleChange}
                />
                {!errors.refereeNameOne && !user.refereeNameOne ? (
                  <InputLabel className={classes.label}>
                    Name of 1st referee
                  </InputLabel>
                ) : null}

                {errors.refereeNameOne ? (
                  <h5 className={classes.valError}>{errors.refereeNameOne}</h5>
                ) : null}
              </Grid>
              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereePhoneOne ? true : null}
                  size="small"
                  variant="outlined"
                  type="tel"
                  fullWidth
                  required
                  placeholder="Enter phone of referee"
                  value={user.refereePhoneOne}
                  name="refereePhoneOne"
                  onChange={handleChange}
                />
                {!errors.refereePhoneOne && !user.refereePhoneOne ? (
                  <InputLabel className={classes.label}>
                    Phone of 2nd referee
                  </InputLabel>
                ) : null}

                {errors.refereePhoneOne ? (
                  <h5 className={classes.valError}>{errors.refereePhoneOne}</h5>
                ) : null}
              </Grid>
              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereeEmailOne ? true : null}
                  size="small"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  placeholder="Enter email of referee"
                  value={user.refereeEmailOne}
                  name="refereeEmailOne"
                  onChange={handleChange}
                />
                {!errors.refereeEmailOne && !user.refereeEmailOne ? (
                  <InputLabel className={classes.label}>
                    Email of 1st referee
                  </InputLabel>
                ) : null}

                {errors.refereeEmailOne ? (
                  <h5 className={classes.valError}>{errors.refereeEmailOne}</h5>
                ) : null}
              </Grid>
              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereeRelOne ? true : null}
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  placeholder="Enter relationship of referee"
                  value={user.refereeRelOne}
                  name="refereeRelOne"
                  onChange={handleChange}
                />
                {!errors.refereeRelOne && !user.refereeRelOne ? (
                  <InputLabel className={classes.label}>
                    Relationship of 1st referee
                  </InputLabel>
                ) : null}

                {errors.refereeRelOne ? (
                  <h5 className={classes.valError}>{errors.refereeRelOne}</h5>
                ) : null}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={10}>
          <Accordion
            className={classes.accordion}
            expanded={expanded === "panel2"}
            onChange={handleAccordian("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="referee-content"
            >
              Referee two
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereeNameTwo ? true : null}
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  placeholder="Enter name of referee"
                  value={user.refereeNameTwo}
                  name="refereeNameTwo"
                  onChange={handleChange}
                />
                {!errors.refereeNameTwo && !user.refereeNameTwo ? (
                  <InputLabel className={classes.label}>
                    Name of 2nd referee
                  </InputLabel>
                ) : null}

                {errors.refereeNameTwo ? (
                  <h5 className={classes.valError}>{errors.refereeNameTwo}</h5>
                ) : null}
              </Grid>
              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereePhoneTwo ? true : null}
                  size="small"
                  variant="outlined"
                  type="tel"
                  fullWidth
                  required
                  placeholder="Enter phone of referee"
                  value={user.refereePhoneTwo}
                  name="refereePhoneTwo"
                  onChange={handleChange}
                />
                {!errors.refereePhoneTwo && !user.refereePhoneTwo ? (
                  <InputLabel className={classes.label}>
                    Phone of 2nd referee
                  </InputLabel>
                ) : null}

                {errors.refereePhoneTwo ? (
                  <h5 className={classes.valError}>{errors.refereePhoneTwo}</h5>
                ) : null}
              </Grid>
              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereeEmailTwo ? true : null}
                  size="small"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  placeholder="Enter email of referee"
                  value={user.refereeEmailTwo}
                  name="refereeEmailTwo"
                  onChange={handleChange}
                />
                {!errors.refereeEmailTwo && !user.refereeEmailTwo ? (
                  <InputLabel className={classes.label}>
                    Email of 2nd referee
                  </InputLabel>
                ) : null}

                {errors.refereeEmailTwo ? (
                  <h5 className={classes.valError}>{errors.refereeEmailTwo}</h5>
                ) : null}
              </Grid>

              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereeRelTwo ? true : null}
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  placeholder="Enter relationship of referee"
                  value={user.refereeRelTwo}
                  name="refereeRelTwo"
                  onChange={handleChange}
                />
                {!errors.refereeRelTwo && !user.refereeRelTwo ? (
                  <InputLabel className={classes.label}>
                    Relationship of 2nd referee
                  </InputLabel>
                ) : null}

                {errors.refereeRelTwo ? (
                  <h5 className={classes.valError}>{errors.refereeRelTwo}</h5>
                ) : null}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={10}>
          <Accordion
            className={classes.accordion}
            expanded={expanded === "panel3"}
            onChange={handleAccordian("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="referee-content"
            >
              Referee three
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereeNameThree ? true : null}
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  placeholder="Enter name of referee"
                  value={user.refereeNameThree}
                  name="refereeNameThree"
                  onChange={handleChange}
                />
                {!errors.refereeNameThree && !user.refereeNameThree ? (
                  <InputLabel className={classes.label}>
                    Name of 3rd referee
                  </InputLabel>
                ) : null}

                {errors.refereeNameThree ? (
                  <h5 className={classes.valError}>
                    {errors.refereeNameThree}
                  </h5>
                ) : null}
              </Grid>
              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereePhoneThree ? true : null}
                  size="small"
                  variant="outlined"
                  type="tel"
                  fullWidth
                  required
                  placeholder="Enter phone of referee"
                  value={user.refereePhoneThree}
                  name="refereePhoneThree"
                  onChange={handleChange}
                />
                {!errors.refereePhoneThree && !user.refereePhoneThree ? (
                  <InputLabel className={classes.label}>
                    Phone of 3rd referee
                  </InputLabel>
                ) : null}

                {errors.refereePhoneThree ? (
                  <h5 className={classes.valError}>
                    {errors.refereePhoneThree}
                  </h5>
                ) : null}
              </Grid>
              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereeEmailThree ? true : null}
                  size="small"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  placeholder="Enter email of referee"
                  value={user.refereeEmailThree}
                  name="refereeEmailThree"
                  onChange={handleChange}
                />
                {!errors.refereeEmailThree && !user.refereeEmailThree ? (
                  <InputLabel className={classes.label}>
                    Email of 3rd referee
                  </InputLabel>
                ) : null}

                {errors.refereeEmailThree ? (
                  <h5 className={classes.valError}>
                    {errors.refereeEmailThree}
                  </h5>
                ) : null}
              </Grid>

              <Grid item className={classes.gridItem}>
                <TextField
                  className={classes.text}
                  error={errors.refereeRelThree ? true : null}
                  size="small"
                  variant="outlined"
                  type="text"
                  fullWidth
                  required
                  placeholder="Enter relationship of referee"
                  value={user.refereeRelThree}
                  name="refereeRelThree"
                  onChange={handleChange}
                />
                {!errors.refereeRelThree && !user.refereeRelThree ? (
                  <InputLabel className={classes.label}>
                    Relationship of 3rd referee
                  </InputLabel>
                ) : null}

                {errors.refereeRelThree ? (
                  <h5 className={classes.valError}>{errors.refereeRelThree}</h5>
                ) : null}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={5} xl={5} align="center">
        {cvError ? (
          <h5 className={classes.valErrorCv}>{cvError}</h5>
        ) : (
          <p>Resume</p>
        )}
        {confirm ? (
          <Button
            color="secondary"
            onClick={clickSubmitCv}
            variant="outlined"
            className={classes.upload}
            component="label"
          >
            Confirm
          </Button>
        ) : null}

        <Button variant="default" className={classes.upload} component="label">
          <BackupIcon />
          <input onChange={handleChangeCV} type="file" name="cv" hidden />
        </Button>
        <Document file={cv ? cv : cvUrl} error={errorMessage}>
          <Page width="200" pageNumber={1} />
        </Document>
      </Grid>
    </Grid>
  );
};

export default Reference;
