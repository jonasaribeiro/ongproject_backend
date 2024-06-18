import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { IMulterUploadFiles } from "../types/movieTypes";

// Caminho absoluto para a pasta "database" durante desenvolvimento
export const databasePath = path.resolve(__dirname, "../../../database");

const unprocessedPath = path.join(databasePath, "unprocessed");

const movieStorage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    // Garantindo que a pasta unprocessed exista
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

const trailerStorage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    // Garantindo que a pasta unprocessed exista
    fs.mkdirSync(unprocessedPath, { recursive: true });
    cb(null, unprocessedPath);
  },
  filename: function (req: Request, file, cb) {
    const trailerFiles = (req.files as IMulterUploadFiles)?.trailers || [];
    const trailerIndex = trailerFiles.indexOf(file);
    const filename = `trailer-${Date.now()}_${trailerIndex}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

const multerUploadMovie = multer({
  storage: movieStorage,
  fileFilter: function (req, file, cb) {
    cb(null, true);
  },
}).fields([
  { name: "file", maxCount: 1 },
  { name: "images_cartaz", maxCount: 5 },
  { name: "images_thumbnails", maxCount: 10 },
  { name: "images_promo", maxCount: 10 },
]);

const multerUploadTrailer = multer({
  storage: trailerStorage,
  fileFilter: function (req, file, cb) {
    cb(null, true);
  },
}).fields([{ name: "trailers", maxCount: 5 }]);

export { multerUploadMovie, multerUploadTrailer };
