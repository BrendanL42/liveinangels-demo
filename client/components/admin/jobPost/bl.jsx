import { useState, useContext, useEffect } from "react";
import { newJob } from "../../../pages/api/adminApi";
import { isAuth } from "../../../context/index";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";


const bl = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { auth, userId } = useContext(isAuth);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [region, setRegion] = useState("");
  const [role, setRole] = useState("");
  const [once, setOnce] = useState(false);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link"],
      [{ color: [] }, { background: [] }],

      ["clean"],
    ],
  };
  const { quill, quillRef } = useQuill({ modules });


  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setBody(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill]);


  const handlePost = () => {
    if (!once) {
      setOnce(true);
      let blog = new FormData();
      blog.set("title", title);
      blog.set("body", body);
      blog.set("region", region);
      blog.set("role", role);
      blog.set("startDate", startDate);

      newJob(userId, auth.token, blog).then((data) => {
        if (data.error) {
          setError(data.error);
          setOnce(false);
        } else {
          setSuccess("Post Successful");
          setTitle("");
          setBody("");
          setRole("");
          setRegion("");
          setStartDate("");
          quill.setContents([])
          setTimeout(() => {
            setSuccess("");
            setOnce(false);
          }, 3000);
        }
      });
    }
  };

  return {
    body,
    handlePost,
    success,
    title,
    startDate,
    region,
    role,
    setTitle,
    setStartDate,
    setRegion,
    setRole,
    quillRef,
  };
};

export default bl;
