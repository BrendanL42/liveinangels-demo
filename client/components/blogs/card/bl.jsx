import { React, useEffect, useState } from "react";
import { getBlogPosts, getBlogsByTag } from "../../../pages/api/blogPostApi";

const bl = () => {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState({
    dementia: "",
    alzheimers: "",
    faq: "",
    agecare: "",
    disabilities: "",
  });

  useEffect(() => {
    allPosts();
  }, []);

  const allPosts = () => {
    getBlogPosts()
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const search = (tag) => {
    if (!tag.tags) {
      setActive("");
      allPosts();
    } else {
      setActive("");
      switch (tag.tags) {
        case "dementia":
          setActive({ dementia: "#8E2E6A" });
          break;
        case "alzheimers":
          setActive({ alzheimers: "#8E2E6A" });
          break;
        case "faq":
          setActive({ faq: "#8E2E6A" });
          break;
        case "age care":
          setActive({ agecare: "#8E2E6A" });
          break;
        case "disabilities":
          setActive({ disabilities: "#8E2E6A" });
          break;
      }
      getBlogsByTag(tag)
        .then((data) => {
          setPosts(data);
          console.log(data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  return { posts, setPosts, search, active };
};

export default bl;
