import React from "react";
import styles from "./singleBlog.module.css";
import bl from "./bl";
import { Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles(() => ({}));

const singleBlog = () => {
  const classes = useStyles();
  const { post } = bl();

  return post ? (
    <Grid container justifyContent="center" className={styles.wrapper}>
      <Grid item xs={12} sm={12} md={9} className={classes.background}>
        <h1 className={styles.heading}>{post.title}</h1>

        <img
          className={styles.cover}
          src={post.coverPhotoUrl}
          alt="Cover Photo"
          width="100%"
          height="auto"
        />
        <hr className={styles.line1} />
        <div className={styles.tags}>
          <ul className={styles.tagUl}>
            <li>{post.tags[0]}</li>
            <li>{post.tags[1]}</li>
            <li>{post.tags[2]}</li>
            {/* <li>{post.tags[3]}</li>
            <li>{post.tags[4]}</li>
            <li>{post.tags[6]}</li> */}
          </ul>
        </div>

        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></div>
      </Grid>

      <Hidden mdUp>
        <Grid item xs={10} sm={12} className={styles.social}>
          <p>Find us on</p>
          <FacebookIcon fontSize="large" className={styles.facebook} />
          <p>Find us on</p>
          <InstagramIcon className={styles.insta} fontSize="large" />
        </Grid>
      </Hidden>
      <Grid
        item
        xs={12}
        sm={12}
        md={3}
        align="center"
        className={classes.sideBarRight}
      >
        <div className={styles.latest}>
          <div className={styles.sociallarge}>
            <FacebookIcon fontSize="large" className={styles.facebook} />
            <InstagramIcon className={styles.insta} fontSize="large" />
          </div>
          <h4>Archived Posts</h4>
          <hr className={styles.line2} />
          <ul>
            <li>January 2021</li>
            <li>February 2021</li>
            <li>March 2021</li>
            <li>April 2021</li>
            <li>June 2021</li>
            <li>July 2021</li>
            <li>August 2021</li>
            <li>September 2021</li>
            <li>October 2021</li>
            <li>November 2021</li>
            <li>December 2021</li>
          </ul>
        </div>
      </Grid>
    </Grid>
  ) : null;
};

export default singleBlog;
