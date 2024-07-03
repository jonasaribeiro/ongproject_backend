import express, { Application } from "express";
import ErrorHandler from "../errors/handleError";
import StreamController from "../controllers/streamController";
import path from "path";
import MoviesController from "../controllers/moviesController";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static("public"));

app.get("/player", (req, res) => {
  res.render("player");
});

app.use(express.json());

app.get("/stream/movie/:id/master.m3u8", StreamController.movieGetMaster);
app.get("/stream/movie/:id/:folder/:fileName", StreamController.movieGetFile);

app.get("/movies", MoviesController.getMovies);
app.get("/movies/category/:category", MoviesController.getMoviesByCategory);
app.get("/movies/ageRating/:ageRating", MoviesController.getMoviesByAgeRating);
app.get(
  "/movies/category/:category/ageRating/:ageRating",
  MoviesController.getMoviesByCategoryAndAgeRating
);
app.get("/movies/:movieId/poster");

// Rota Para Filtrar por genero
//
// Rota para Filtrar aleatórios
//

app.use(ErrorHandler.handle);

export default app;
