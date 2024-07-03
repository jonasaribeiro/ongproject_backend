import express, { Application } from "express";
import ErrorHandler from "../errors/handleError";
import path from "path";
import MovieController from "../controllers/movieController";
import SerieController from "../controllers/serieController";
import { multerUploadMovie, multerUploadSingleEpisode } from "./multer";
import Validators from "../common/middlewares/validators";
import { sMovieUploadReqBody } from "../schemas/movieSchemas";
import {
  sEpisodeUploadReqBody,
  sSeasonAddReqBody,
  sSerieCreateReqBody,
} from "../schemas/serieSchemas";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.raw());
app.use(express.static("public"));

// View para formulário de upload
app.get("/upload-movie", (req, res) => {
  res.render("upload-movie");
});

// Rotas de filmes
app.post(
  "/movies/upload",
  multerUploadMovie,
  Validators.bodyIsValid(sMovieUploadReqBody),
  MovieController.upload
);
app.patch("/movies/:movieId/activate", MovieController.activateMovie);

// Rotas de séries

// Cria Série Desativada (Sem enviar arquivo)
app.post(
  "/series",
  Validators.bodyIsValid(sSerieCreateReqBody),
  SerieController.createSerie
);
// Cria Season Desativada (Sem enviar arquivo)
app.post(
  "/series/:serieId/seasons",
  Validators.bodyIsValid(sSeasonAddReqBody),
  SerieController.addSeason
);

// Ativa uma série existente (active: true)
app.patch("/series/:serieId/activate", SerieController.activateSerie);
// Ativa uma season existente (active: true)
app.patch(
  "/series/:serieId/seasons/:seasonNumber/activate",
  SerieController.activateSeason
);

// Upa para uma season um único episódio
app.post(
  "/series/:serieId/seasons/:seasonNumber/single",
  multerUploadSingleEpisode,
  Validators.bodyIsValid(sEpisodeUploadReqBody),
  SerieController.uploadEpisode
);

app.use(express.json());
app.use(ErrorHandler.handle);

export default app;
