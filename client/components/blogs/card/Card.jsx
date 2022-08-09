import React from "react";
import bl from "./bl";
import Link from "next/link";

import { Container, Grid, TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import styles from "./card.module.css";

const useStyles = makeStyles((theme) => ({
  ad: {
    objectFit: "contain",
    margin: "1em auto",
  },
  wrapper: {
    margin: "2em auto",
  },
}));

const Card = () => {
  const classes = useStyles();
  const { posts, search, active } = bl();

  return (
    <Container maxWidth="lg" className={classes.wrapper} spacing={6}>
      <Grid className={classes.search} item xs={12} align="center">
        <div className={styles.popularTags}>
          <h3 className={styles.heading1}>Popular Topics</h3>
          <TextField
            fullWidth
            className={classes.searchBar}
            name="search"
            type="text"
            size="small"
            placeholder="Search categories"
            onChange={(e) => search({ tags: e.target.value.toLowerCase() })}
          />
          <ul>
            <li
              style={{ backgroundColor: active.dementia }}
              onClick={() => search({ tags: "dementia" })}
            >
              Dementia
            </li>
            <li
              style={{ backgroundColor: active.alzheimers }}
              onClick={() => search({ tags: "alzheimers" })}
            >
              Alzheimer's
            </li>
            <li
              style={{ backgroundColor: active.disabilities }}
              onClick={() => search({ tags: "disabilities" })}
            >
              Disabilities
            </li>
            <li
              style={{ backgroundColor: active.agecare }}
              onClick={() => search({ tags: "age care" })}
            >
              Age Care
            </li>
            <li
              style={{ backgroundColor: active.faq }}
              onClick={() => search({ tags: "faq" })}
            >
              Faq
            </li>
          </ul>
        </div>
        <p className={styles.count}>
          {posts ? "Showing:" : null}{" "}
          {posts ? (posts.length === 14 ? "0" : posts.length) : null}{" "}
          {posts ? (posts.length > 1 ? "Posts" : "Post") : null}
        </p>
      </Grid>

      <Grid container spacing={1}>
        <Grid item md={2} lg={4} xl={3} className={classes.sideBar}>
          <img
            className={classes.ad}
            src={"/images/ad300px200px.svg"}
            alt="ad"
            width="100%"
            height="auto"
          />
        </Grid>
        <Grid sm={12} md={8} item className={classes.postWrapper}>
          {posts !== "Sorry no posts" ? (
            posts.map((post, i) => (
              <Link href="/blogs/[blogid]" as={`/blogs/${post._id}`}>
                <div className={styles.card} key={i}>
                  <p className={styles.when}>
                    Posted {moment(post.created).fromNow()}
                  </p>
                  <img
                    className={styles.photo}
                    src={post.coverPhotoUrl}
                    width="400px"
                    height="200px"
                  />

                  <div className={styles.content}>
                    <h4 className={styles.title}>{post.title}</h4>

                    <div
                      className={styles.body}
                      dangerouslySetInnerHTML={{
                        __html: post.body.substring(0, 300),
                      }}
                    ></div>
                    <div className={styles.tags}>
                      <ul>
                        <li>{post.tags[0]}</li>
                        <li>{post.tags[1]}</li>
                        <li>{post.tags[2]}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "1.5em",
                fontWeight: "200",
              }}
            >
              Sorry No Posts
            </p>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Card;
