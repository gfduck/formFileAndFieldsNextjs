import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios, { post } from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { schema } from "../utils/schema";
const SimpleReactFileUpload = () => {
  const [file, setFile] = useState(null);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const registro = (objeto) => {
    // agregar_producto(dispatch, objeto);
    console.log("Click en submit");
    const { titulo, categoria, descripcion, precio } = objeto;
    fileUpload(file, titulo, categoria, descripcion, precio).then(
      (response) => {
        console.log(response.data);
      }
    );
    // console.log("objeto es, ", objeto.titulo);
    // reset({
    //   nombre: "",
    //   descripcion: "",
    //   precio: "",
    //   validacion: "",
    // });
  };
  // function onFormSubmit(e) {
  //   e.preventDefault(); // Stop form submit
  //   fileUpload(file, titulo, descripcion).then((response) => {
  //     console.log(response.data);
  //   });
  // }
  function onChange(e) {
    setFile(e.target.files[0]);
  }

  async function fileUpload(file, titulo, categoria, descripcion, precio) {
    const url = "http://localhost:3000/api/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("titulo", titulo);
    formData.append("categoria", categoria);
    formData.append("descripcion", descripcion);
    formData.append("precio", precio);
    // formData.append("file2", file2);
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    return await post(url, formData, config);
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <h3>Nuevo Producto</h3>
          <Form onSubmit={handleSubmit(registro)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                placeholder="Ingresar Titulo"
                // onChange={(e) => setTitulo(e.target.value)}
                // value={titulo}
                ref={register}
              />
              {errors.titulo && (
                <Alert variant="danger" className="mt-1 mb-1">
                  {errors.titulo?.message}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Categoria:</Form.Label>
              <Form.Control as="select" ref={register} name="categoria">
                <option>Categoria1</option>
                <option>Categoria2</option>
                <option>Categoria3</option>
                <option>Categoria4</option>
                <option>Categoria5</option>
              </Form.Control>
              {errors.categoria && (
                <Alert variant="danger" className="mt-1 mb-1">
                  {errors.categoria?.message}
                </Alert>
              )}
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descripcion:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={register}
                name="descripcion"
              />
              {errors.descripcion && (
                <Alert variant="danger" className="mt-1 mb-1">
                  {errors.descripcion?.message}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <InputGroup className="mb-1">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  aria-describedby="inputGroupPrepend"
                  ref={register}
                  name="precio"
                />
              </InputGroup>
              {errors.precio && (
                <Alert variant="danger" className="mt-1 mb-1">
                  {errors.precio?.message}
                </Alert>
              )}
            </Form.Group>
            <Form.Group>
              <Form.File id="formcheck-api-regular">
                <Form.File.Label>Imagen del producto:</Form.File.Label>
                <Form.File.Input onChange={(e) => onChange(e)} />
              </Form.File>
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SimpleReactFileUpload;
