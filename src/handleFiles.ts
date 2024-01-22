import multer from 'multer';
import path from 'path';
import { Request } from "express";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req: Request,file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
      req.body = Date.now() + path.extname(file.originalname)
    }

  });
  
  export const upload = multer({ storage: storage });