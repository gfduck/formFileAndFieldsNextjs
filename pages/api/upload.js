import formidable from "formidable";
var path = require("path");
import { nanoid } from "nanoid";
import jimp from "jimp";
import { funcionMysql } from "./../../config/mysql";
//sino anda usar formidable-serverless
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === "POST") {
    const pool = await funcionMysql();
    const form = new formidable.IncomingForm({ multiples: true });

    form.uploadDir = "./public";
    form.parse(req);

    form.keepExtensions = true;

    let array_temporal = [];

    let id_temporal = "";

    let arrayProducto = {};

    let objetoFotos = {};

    form.on("fileBegin", (filename, file) => {
      let regex = /[^.]*/;
      id_temporal = nanoid();
      let fileName = file.name.replace(regex, id_temporal);
      // file.path = path.join(__dirname + "/../uploads/", fileName);
      file.path = path.join("./public", fileName);
      // console.log("nombre de la nueva foto es, ", fileName);
      const newFileName = file.name.replace(regex, `${id_temporal}_thumb`);
      objetoFotos["foto_original"] = fileName;
      objetoFotos["foto_thumb"] = newFileName;

      let valueToPush = {};
      valueToPush.filePath = file.path;
      // valueToPush.nombreTemporal = id_temporal;
      valueToPush.newFileName = newFileName;

      array_temporal.push(valueToPush);

      // console.log("array temporal es, ", array_temporal);
      // form.emit("data", { name: "fileBegin", filename, value: file });
      // file.path = path.join("./public", "prueba1");
    });

    form.on("file", async (filename, file) => {
      form.emit("data", { name: "file", key: filename, value: file });
      // console.log("filename es, ", filename);
      //let regex = /[^.]*/;

      // console.log("array temporal es, ", array_temporal);

      // archivo = file.path;
      // await main(archivo, newFileName);
      //Guardar en la base de datos el nombre
    });

    form.on("field", (fieldName, fieldValue) => {
      form.emit("data", { name: "field", key: fieldName, value: fieldValue });

      arrayProducto[fieldName] = fieldValue;

      // field_temporal.field = fieldName;
      // field_temporal.value = fieldValue;
      // arrayProducto.push(field_temporal);
    });

    form.on("error", (err) => {
      console.log("error en form", err);
      res.status(500).json({ message: "hubo un error" });
    });

    form.on("end", async () => {
      console.log("cuantas veces se ejecuta");
      array_temporal.map(async (item) => {
        await main(item.filePath, item.newFileName);
      });
      console.log("arrayProducto es, ", arrayProducto);
      console.log("objeto fotos es, ", objetoFotos);
      await pool.query(
        `INSERT INTO productos (titulo, descripcion, categoria, precio,  foto_original, foto_thumb) VALUES ( '${arrayProducto.titulo}', '${arrayProducto.descripcion}', '${arrayProducto.categoria}', '${arrayProducto.precio}', '${objetoFotos.foto_original}', '${objetoFotos.foto_thumb}')`,
        (error, result) => {
          // if (error) throw error;
          if (!error && result) {
            console.log("se registro producto nuevo");
            res.status(200).json({ message: "ok" });
            // res.json({ message: "Se agrego usuario" });
          } else {
            console.log("error es, ", error);
            res.status(405).json({ message: "Ups, algo salio mal..." });
          }
        }
      );
    });
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
};

async function main(path, newFileName) {
  // Read the image.

  const image = await jimp.read(path);

  // Resize the image to width 150 and auto height.
  await image.resize(150, jimp.AUTO);

  // Save and overwrite the image
  await image.writeAsync(`./public/${newFileName}`);
}
