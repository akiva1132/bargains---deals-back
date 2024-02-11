import multer from 'multer';
import path from 'path';
import { Request } from "express";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req: Request,file, cb) {
      const name = Date.now() + path.extname(file.originalname)
      cb(null, name);
      req.body = name
    }

  });
  
  export const upload = multer({ storage: storage });