import { React, useEffect, useState } from "react";
import { getJobPosts } from "../../../pages/api/jobPostApi";

const bl = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getJobPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return {posts, setPosts};
};

export default bl;
