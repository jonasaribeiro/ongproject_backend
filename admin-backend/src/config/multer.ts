import multer from "multer";
import path from "path";
import { Request } from "express";
import FileHelper from "../utils/fileHelper";

export const databasePath = path.resolve(__dirname, "../../../database");

const unprocessedPath = path.join(databasePath, "unprocessed");

// Função para definir o destino do arquivo usando FileHelper
const setDestination = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, destination: string) => void
) => {
  FileHelper.createDirectory(unprocessedPath);
  cb(null, unprocessedPath);
};

// Função para definir o nome do arquivo, incluindo número do episódio se fornecido
const setFilename = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void,
  suffix: string
) => {
  const episodeNumber = req.body.episodeNumber || Date.now(); // Use o número do episódio se fornecido, caso contrário, use a data atual
  const filename =
    file.fieldname +
    "-" +
    episodeNumber +
    suffix +
    path.extname(file.originalname);
  cb(null, filename);
};

// Configuração de armazenamento para Movie
const movieStorage = multer.diskStorage({
  destination: setDestination,
  filename: (req, file, cb) => {
    const suffix = file.fieldname === "file" ? "_unprocessed" : "";
    setFilename(req, file, cb, suffix);
  },
});

// Configuração de armazenamento para Episode
const episodeStorage = multer.diskStorage({
  destination: setDestination,
  filename: (req, file, cb) => {
    const suffix = file.fieldname === "file" ? "_unprocessed" : "";
    setFilename(req, file, cb, suffix);
  },
});

// Filtro de arquivo comum para Movie e Episode
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.fieldname === "file" || file.fieldname === "poster") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Configuração do multer para Movie
const multerUploadMovie = multer({
  storage: movieStorage,
  fileFilter: fileFilter,
}).fields([
  { name: "file", maxCount: 1 },
  { name: "poster", maxCount: 1 },
]);

// Configuração do multer para upload de um único episódio e poster
const multerUploadSingleEpisode = multer({
  storage: episodeStorage,
  fileFilter: fileFilter,
}).fields([
  { name: "file", maxCount: 1 },
  { name: "poster", maxCount: 1 },
]);

export { multerUploadMovie, multerUploadSingleEpisode };
