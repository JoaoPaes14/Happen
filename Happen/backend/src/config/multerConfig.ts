import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination:(req, file ,cb)=>{
        cb(null, "uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);

    },

});

const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido. Apenas JPG, PNG são permitidos."), false);
    }
  };
  
  export const upload = multer({ storage, fileFilter });