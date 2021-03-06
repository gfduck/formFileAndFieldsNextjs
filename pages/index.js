import React, { useState } from "react";
import axios, { post } from "axios";

const SimpleReactFileUpload = () => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);

  const [titulo, setTitulo] = useState("");

  const [descripcion, setDescripcion] = useState("");

  function onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    fileUpload(file, titulo, descripcion).then((response) => {
      console.log(response.data);
    });
  }
  function onChange(e) {
    setFile(e.target.files[0]);
  }
  function onChange2(e) {
    setFile2(e.target.files[0]);
  }
  async function fileUpload(file, titulo, descripcion) {
    // const url = "http://localhost:3000/api/upload";
    const url = "https://next.qchars.com/api/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    // formData.append("file2", file2);
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    return post(url, formData, config);
  }

  return (
    <>
      <p>Hola2</p>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <h1>File Upload</h1>
        <div>
          Titulo:{" "}
          <input
            type="text"
            name="title"
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
            style={{ width: "200px", height: "100px" }}
          />
        </div>
        <br />
        <div>
          Descripcion:{" "}
          <textarea
            type="text"
            name="texto2"
            onChange={(e) => setDescripcion(e.target.value)}
            value={descripcion}
            style={{ width: "200px", height: "100px" }}
          ></textarea>
        </div>
        <input type="file" onChange={(e) => onChange(e)} />
        {/* <input type="file" onChange={(e) => onChange2(e)} /> */}
        <button type="submit">Upload</button>
      </form>
      {/* <img src="./upload_bd5c05c6e7b36845e343dfeab59cf53a.jpg" /> */}
    </>
  );
};

export default SimpleReactFileUpload;
