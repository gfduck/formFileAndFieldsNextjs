import React, { useState } from "react";
import axios, { post } from "axios";

const SimpleReactFileUpload = () => {
  const [file, setFile] = useState(null);

  function onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    fileUpload(file).then((response) => {
      console.log(response.data);
    });
  }
  function onChange(e) {
    setFile(e.target.files[0]);
  }
  async function fileUpload(file) {
    const url = "http://localhost:3000/api/upload";
    // const url = "https://next.qchars.com/api/upload";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    return post(url, formData, config);
  }

  return (
    <>
      <p>Hola</p>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <h1>File Upload</h1>
        <input type="file" onChange={(e) => onChange(e)} />
        <button type="submit">Upload</button>
      </form>
      {/* <img src="./upload_bd5c05c6e7b36845e343dfeab59cf53a.jpg" /> */}
    </>
  );
};

export default SimpleReactFileUpload;
