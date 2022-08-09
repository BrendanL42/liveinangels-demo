import { React, useState, useRef, useContext } from "react";

import EditorJs from "react-editor-js";

import Table from "@editorjs/table";
import List from "@editorjs/list";
import ImageTool from '@editorjs/image';
import Header from "@editorjs/header";

import bl from './bl'
import { s3File, s3BatchDelete } from "../../../pages/api/helperApi";
import { isAuth } from "../../../context/index";


function MyEditor() {
  let data = {}
  const { auth, userId } = useContext(isAuth);
  const instanceRef = useRef(null)


  async function handleSave() {
    const savedData = await instanceRef.current.save()
    console.log(savedData)
   }
   const [imagesUploaded, setImagesUploaded] = useState([])



    // change handler
    const handleChange = () => {
       // get all current images in editor
       const currentImages = []
       document
         .querySelectorAll('.image-tool__image-picture')
         .forEach((x) => currentImages.push(x.src.match(/\/api.*$/g)[0]))
   
       if (imagesUploaded.length > currentImages.length) {
         imagesUploaded.forEach(async (img) => {
           if (!currentImages.includes(img)) {
             try {
               const res = await fetch('/api/upload', {
                 method: 'DELETE',
                 headers: {
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ path: img.match(/image.*$/g)[0] }),
               })
               const data = await res.text()
               console.log(data)
               setImagesUploaded((images) => images.filter((x) => x !== img))
             } catch (err) {
               console.log(err.message)
             }
           }
         })
       }
     }

  

  const EDITOR_JS_TOOLS = {
    table: Table,
    list: List,
    header: Header,
    image: {
    class: ImageTool,

    config: {
      uploader: {
          async uploadByFile(file) {
            let data = new FormData();
          data.set("photo", file);
          data.set("userId", userId);
          s3File(auth.token, data)
            .then((url) => {
              return {
                success: 1,
                file: {
                  url: url,
                }
              }

            })
            .catch((error) => {
              console.log("error", error);
            });



          }
      }
  }


  },



  };

  return (

    <EditorJs  onChange={handleChange}  tools={EDITOR_JS_TOOLS} data={data}  instanceRef={(instance) => (instanceRef.current = instance)} />

  );
}

export default MyEditor;