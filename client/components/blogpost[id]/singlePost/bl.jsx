import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSingleBlogPost } from "../../../pages/api/blogPostApi";

const bl = () => {
  const router = useRouter();
  const [post, setPost] = useState();
  const postId = router.query.blogid;

  useEffect(() => {
    if (!router.isReady) return;

    getSingleBlogPost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPost(data);
        console.log(data)
      }
    });
  }, [router.isReady]);

  return { post };
};

export default bl;
