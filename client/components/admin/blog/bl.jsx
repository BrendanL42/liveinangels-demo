import { useState, useContext, useEffect } from "react";
import { newBlog } from "../../../pages/api/adminApi";
import { isAuth } from "../../../context/index";
import { s3File, s3BatchDelete } from "../../../pages/api/helperApi";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const bl = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { auth, userId } = useContext(isAuth);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState("");
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  const [once, setOnce] = useState(false);
  const [photo, setPhoto] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [errorPhoto, setErrorPhoto] = useState("");
  let spilts3Url = "";

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],

      ["clean"],
    ],
  };


  const { quill, quillRef } = useQuill({ modules });

    // cover photo
    const handleChange = (event) => {
      setErrorPhoto("");
      setPhoto(undefined);
      if (event.target.files[0].size <= 2000000) {
        saveToServer(event.target.files[0], true)
        setPhoto(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
      } else {
        setErrorPhoto("too large, must be smaller than 2mb");
      }
    };

  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };

  // Upload Image to Image Server such as AWS S3
  const saveToServer = async (file, cover) => {
    let data = new FormData();
    data.set("photo", file);
    data.set("userId", userId);
    s3File(auth.token, data)
      .then((url) => {
        if(!cover) {
          insertToEditor(url);
        } else {
          setCoverPhotoUrl(url)
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  useEffect(() => {
    if (quill) {
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
      quill.on("text-change", (delta, oldDelta, source) => {
        setBody(quillRef.current.firstChild.innerHTML);
        if (source === "user") {
          try {
            const arr2 = quill.getContents().ops;
            const arr1 = oldDelta.ops;
            var uniqueResultOne = arr1.filter(function (obj) {
              return !arr2.some(function (obj2) {
                return obj.insert.image == obj2.insert.image;
              });
            });

            spilts3Url = uniqueResultOne[0].insert.image;

            const url = spilts3Url.split(".com/");
            let data = new FormData();
            data.set("url", url[1]);
            s3BatchDelete(auth.token, data)
              .then(() => {})
              .catch((error) => {
                console.log("could not delete", error);
              });
          } catch (_error) {}
        }
      });
    }
  }, [quill]);

  const handlePost = () => {
    const lowercased = tags.map(name => name.toLowerCase());
    if (!once  && title) {
      setOnce(true);
      const blog = {
        title: title,
        body: body,
        tags: lowercased,
        coverPhotoUrl: coverPhotoUrl,
      }
      newBlog(userId, auth.token, blog).then((data) => {
        if (data.error) {
          setError(data.error);
          setOnce(false);
        } else {
          setSuccess("Post Successful");
          setTitle("");
          setBody("");
          setTags([]);
          setPhoto(undefined)
          setPreviewImage(undefined);
          setCoverPhotoUrl("");
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
    setBody,
    body,
    handlePost,
    success,
    title,
    setTitle,
    tags,
    setTags,
    quillRef,
    handleChange,
    photo,
    previewImage,
    errorPhoto,
  };
};

export default bl;
