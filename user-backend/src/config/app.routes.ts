import express, { Application } from "express";
import ErrorHandler from "../errors/handleError";
import StreamController from "../controllers/streamController";
import path from "path";
import {
  userRouter,
  ageRatingRouter,
  avatarRouter,
  cardRouter,
  categoryRouter,
  episodeRouter,
  loginRouter,
  movieRouter,
  myListRouter,
  profileRouter,
  resolutionRouter,
  restrictionRouter,
  seasonRouter,
  serieRouter,
  watchingMovieRouter,
  watchingSerieRouter,
} from "../routes";

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

//app.get("/movies", MoviesController.getMovies);
//app.get("/movies/category/:category", MoviesController.getMoviesByCategory);
//app.get("/movies/ageRating/:ageRating", MoviesController.getMoviesByAgeRating);
//app.get("/movies/category/:category/ageRating/:ageRating",MoviesController.getMoviesByCategoryAndAgeRating);
app.get("/movies/:movieId/poster");

app.use("/user", userRouter);
app.use("/user/profile", profileRouter);
app.use("/user/profile/restriction", restrictionRouter);
app.use("/user/profile/myList", myListRouter);
app.use("/user/profile/watchingMovie", watchingMovieRouter);
app.use("/user/profile/watchingSerie", watchingSerieRouter);
app.use("/login", loginRouter);
app.use("/card", cardRouter);

app.use("/avatar", avatarRouter);
app.use("/resolution", resolutionRouter);
app.use("/category", categoryRouter);
app.use("/ageRating", ageRatingRouter);

app.use("/movie", movieRouter);
app.use("/serie", serieRouter);
app.use("/serie/:serieId/season", seasonRouter);
app.use("/serie/:serieId/season/:seasonId/episode", episodeRouter);

// Rota Para Filtrar por genero
//
// Rota para Filtrar aleatórios
//

app.use(ErrorHandler.handle);

export default app;
