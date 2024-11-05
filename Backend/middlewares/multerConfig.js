
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = './uploads';
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 

});


