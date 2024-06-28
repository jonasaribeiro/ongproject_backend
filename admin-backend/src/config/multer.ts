import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

export const databasePath = path.resolve(__dirname, "../../../database");

const unprocessedPath = path.join(databasePath, "unprocessed");

const movieStorage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    fs.mkdirSync(unprocessedPath, { recursive: true });
    cb(null, unprocessedPath);
  },
  filename: function (req: Request, file, cb) {
    let suffix = "";

    if (file.fieldname === "file") {
      suffix = "_unprocessed";
    }

    const filename =
      file.fieldname +
      "-" +
      Date.now() +
      suffix +
      path.extname(file.originalname);
    cb(null, filename);
  },
});

const multerUploadMovie = multer({
  storage: movieStorage,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "file" || file.fieldname === "poster") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).fields([
  { name: "file", maxCount: 1 },
  { name: "poster", maxCount: 1 },
]);

export { multerUploadMovie };
