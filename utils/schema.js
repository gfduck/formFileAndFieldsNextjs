import * as yup from "yup";

export const schema = yup.object().shape({
  titulo: yup
    .string()
    .min(1, "el minimo es 1 caracter")
    .max(20, "Maximo")
    .required("Campo Nombre es obligatorio"),
  categoria: yup.string().required("Campo Categoria es obligatorio"),

  descripcion: yup.string().required("Campo Descripción es obligatorio"),

  precio: yup
    .number()
    .typeError("Campo Precio es obligatorio")
    .required("Campo Precio es obligatorio")
    .positive()
    .integer(),
});
