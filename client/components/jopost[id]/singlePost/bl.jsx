import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSingleJobPost } from "../../../pages/api/jobPostApi";

const bl = () => {
  const router = useRouter();
  const [post, setPost] = useState();
  const postId = router.query.jobid;

  useEffect(() => {
    if (!router.isReady) return;

    getSingleJobPost(postId).then((data) => {
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
