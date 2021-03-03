import formidable from "formidable";
var path = require("path");
//sino anda usar formidable-serverless
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  //   form.uploadDir = "../public_html/imagenes";
  // form.uploadDir = "./public";
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

  form.on("fileBegin", (filename, file) => {
    let regex = /[^.]*/;
    let fileName = file.name.replace(regex, "123");
    file.path = path.join(__dirname + "/../uploads/", fileName);
    file.path = path.join("./public", fileName);
    console.log("nombre de la nueva foto es, ", fileName);
    // form.emit("data", { name: "fileBegin", filename, value: file });
    // file.path = path.join("./public", "prueba1");
    console.log("filname es, ", filename);
  });

  form.on("file", (filename, file) => {
    form.emit("data", { name: "file", key: filename, value: file });
    // console.log("filename es, ", filename);
  });

  form.on("field", (fieldName, fieldValue) => {
    form.emit("data", { name: "field", key: fieldName, value: fieldValue });
    console.log("filename es, ", filename);
  });

  form.once("end", () => {
    console.log("Done!");
  });

  //shortid.generate()
  // form.on("fileBegin", function (name, value) {
  //   file.path = path.join("./public", "archivo_prueba");
  // });

  // form.on("end", function (name, file) {
  //   console.log("finish parse");
  // });

  // form.parse(req, (err, fields, files) => {
  //   console.log("form es, ", form);

  //   if (!err) {
  //   }
  // });
};
