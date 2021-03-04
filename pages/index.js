import React, { useState } from "react";
import axios, { post } from "axios";

const SimpleReactFileUpload = () => {
  const [file, setFile] = useState(null);

  const [texto, setTexto] = useState("");

  const [texto2, setTexto2] = useState("");

  function onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    fileUpload(file, texto, texto2).then((response) => {
      console.log(response.data);
    });
  }
  function onChange(e) {
    setFile(e.target.files[0]);
  }
  async function fileUpload(file, texto, texto2) {
    const url = "http://localhost:3000/api/upload";
    // const url = "https://next.qchars.com/api/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("texto1", texto);
    formData.append("texto2", texto2);
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
        <div>
          Text field title:{" "}
          <input
            type="text"
            name="title"
            onChange={(e) => setTexto(e.target.value)}
            value={texto}
          />
        </div>
        <div>
          Text field title:{" "}
          <input
            type="text"
            name="texto2"
            onChange={(e) => setTexto2(e.target.value)}
            value={texto2}
          />
        </div>
        <input type="file" onChange={(e) => onChange(e)} />
        <button type="submit">Upload</button>
      </form>
      {/* <img src="./upload_bd5c05c6e7b36845e343dfeab59cf53a.jpg" /> */}
    </>
  );
};

export default SimpleReactFileUpload;
