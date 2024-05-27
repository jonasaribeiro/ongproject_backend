import express, { Application } from "express";
import ErrorHandler from "../errors/handleError";
import path from "path";
import MoviesController from "../controllers/movieController";
import SeriesController from "../controllers/serieController";
import { multerUploadMovie } from "./multer";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.raw());
app.use(express.static("public"));

app.get("/upload-form", (req, res) => {
  res.render("upload-form");
});

app.post("/movies/upload", multerUploadMovie, MoviesController.upload);
app.get("/movies", MoviesController.getAll);
app.get("/movies/:id", MoviesController.getDetail);
app.patch("/movies/:id", MoviesController.update);

app.post("/series/upload", SeriesController.upload);
app.get("/series", SeriesController.getAll);
app.get("/series/:id", SeriesController.getDetail);
app.patch("/series/:id", SeriesController.update);

app.use(express.json());
app.delete("/movies/:id", MoviesController.delete);
app.delete("/series/:id", SeriesController.delete);

app.use(ErrorHandler.handle);

export default app;
