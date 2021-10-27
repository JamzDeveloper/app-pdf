import path from "path";
import multer from "multer";
const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../documents"),

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-document-" + file.originalname);
    req.body.document = Date.now() + "-document-" + file.originalname;
  },
});

const fileUpload = multer({
  storage: diskstorage,
}).single("documents");

export default fileUpload;
