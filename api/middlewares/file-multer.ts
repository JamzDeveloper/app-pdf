import path from "path";
import multer from "multer";
const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../documents"),

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-document-" + file.originalname);
    req.body.document = Date.now() + "-document-" + file.originalname;
  },
});

const fileUpload = multer({
  fileFilter:(req,file,cb)=>{
    if(file.mimetype==="application/pdf"){
      cb(null,true)
    }else{
      cb(null,false)
    }
  },
  storage: diskstorage,
  
}).single("documents");

export default fileUpload;
