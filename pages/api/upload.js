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
  const pool = await funcionMysql();
  const form = new formidable.IncomingForm({ multiples: true });

  form.uploadDir = "./public";
  form.parse(req);

  form.keepExtensions = true;

  let archivo = "";
  let array_temporal = [];
  let array_archivos = [];
  let id_temporal = "";
  form.once("error", console.error);

  form.on("fileBegin", async (filename, file) => {
    let regex = /[^.]*/;
    id_temporal = nanoid();
    let fileName = file.name.replace(regex, id_temporal);
    // file.path = path.join(__dirname + "/../uploads/", fileName);
    file.path = path.join("./public", fileName);
    console.log("nombre de la nueva foto es, ", fileName);
    array_temporal.push(id_temporal);

    // form.emit("data", { name: "fileBegin", filename, value: file });
    // file.path = path.join("./public", "prueba1");
  });

  form.on("file", async (filename, file) => {
    form.emit("data", { name: "file", key: filename, value: file });
    console.log("filename es, ", filename);
    let regex = /[^.]*/;

    console.log("array temporal es, ", array_temporal);

    array_temporal.map(async (item) => {
      const newFileName = file.name.replace(regex, `${item}_thumb`);
      console.log("newfileName es, ", newFileName);
      await main(file.path, newFileName);
    });
    // archivo = file.path;
    // await main(archivo, newFileName);
    //Guardar en la base de datos el nombre
  });

  form.on("field", (fieldName, fieldValue) => {
    console.log("se ejecuta field");
    form.emit("data", { name: "field", key: fieldName, value: fieldValue });
    console.log("fieldName es, ", fieldValue);
  });

  form.once("end", async () => {
    console.log("Done!");
  });
};

async function main(path, newFileName) {
  // Read the image.
  console.log("se ejecuta una vez");
  console.log("path es, ", path);
  const image = await jimp.read(path);

  // Resize the image to width 150 and auto height.
  await image.resize(150, jimp.AUTO);

  // Save and overwrite the image
  await image.writeAsync(`./public/${newFileName}`);
}
