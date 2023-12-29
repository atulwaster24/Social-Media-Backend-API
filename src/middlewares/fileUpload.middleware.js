import multer from "multer";
import path from'path';


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(path.resolve('Uploads')));
    },
    filename: (req, file, cb)=>{
        const name = new Date().getTime()+ "-"+ file.originalname;
        cb(null, name)
    }
});



export const upload = multer({storage: storage});
