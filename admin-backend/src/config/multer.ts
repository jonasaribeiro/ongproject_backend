import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { IMulterUploadFiles } from "../types/movieTypes";

// Caminho absoluto para a pasta "database" durante desenvolvimento
export const databasePath = path.resolve(__dirname, "../../../database");

const movieStorage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    const title = req.body.title.replace(/\s+/g, "_");
    let folderPath = path.join(databasePath, "movies", title);

    if (file.fieldname === "file") {
      folderPath = path.join(folderPath, "main");
    } else if (file.fieldname === "images_cartaz") {
      folderPath = path.join(folderPath, "images", "cartaz");
    } else if (file.fieldname === "images_thumbnails") {
      folderPath = path.join(folderPath, "images", "thumbnails");
    } else if (file.fieldname === "images_promo") {
      folderPath = path.join(folderPath, "images", "promo");
    }

    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
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
    const movieTitle = req.body.movieTitle.replace(/\s+/g, "_");
    const folderPath = path.join(
      databasePath,
      "movies",
      movieTitle,
      "trailers"
    );

    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
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
