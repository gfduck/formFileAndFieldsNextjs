import formidable from "formidable";
var path = require("path");
import { nanoid } from "nanoid";
import jimp from "jimp";
//sino anda usar formidable-serverless
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: true });

  // console.log("req body es ,", req.body);
  // formidable({ multiples: true });
  //   form.uploadDir = "../public_html/imagenes";
  form.uploadDir = "./public";
  form.parse(req);
  // form.uploadDir = path.join(__dirname, "/public");

  form.keepExtensions = true;

  // form.once("error", console.error);

  // form.on("fileBegin", function (field, file) {
  //   console.log("File incoming");
  //   fs.rename(file.path, path.join(form.uploadDir, file.name));
  // });
  // form.on("error", function (err) {
  //   console.log("An error has occured: \n" + err);
  // });
  // form.on("end", function () {
  //   console.log("success");
  // });

  //este ejemplo anda
  let archivo = "";
  form.on("fileBegin", async (filename, file) => {
    let regex = /[^.]*/;
    let fileName = file.name.replace(regex, nanoid());
    // file.path = path.join(__dirname + "/../uploads/", fileName);
    file.path = path.join("./public", fileName);
    console.log("nombre de la nueva foto es, ", fileName);
    // form.emit("data", { name: "fileBegin", filename, value: file });
    // file.path = path.join("./public", "prueba1");
  });

  form.on("file", async (filename, file) => {
    form.emit("data", { name: "file", key: filename, value: file });
    // console.log("filename es, ", filename);
    console.log("form emit es, ");
    archivo = file.path;
    await main(archivo);
  });

  form.on("field", (fieldName, fieldValue) => {
    console.log("se ejecuta field");
    form.emit("data", { name: "field", key: fieldName, value: fieldValue });
    console.log("fieldName es, ", fieldValue);
  });

  form.once("end", async () => {
    console.log("Done!");
  });

  //fin ejemplo anda

  //shortid.generate()
  // form.on("fileBegin", function (name, value) {
  //   file.path = path.join("./public", "archivo_prueba");
  // });

  // form.on("end", function (name, file) {
  //   console.log("finish parse");
  // });

  // form.parse(req, (err, fields, files) => {
  //   console.log("field es, ", fields);

  //   if (!err) {
  //   }
  // });
};

async function main(path) {
  // Read the image.
  console.log("se ejecuta una vez");
  const image = await jimp.read(path);

  // Resize the image to width 150 and auto height.
  await image.resize(300, jimp.AUTO);

  // Save and overwrite the image
  await image.writeAsync(path);
}
