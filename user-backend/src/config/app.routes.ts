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
import cors from "cors";

const app: Application = express();

const whiteList = ["http://localhost:3000", "http://127.0.0.1:3000"];

const corsOptions = {
  origin(origin: string | undefined, cb: Function) {
    if (whiteList.indexOf(origin!) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static("public"));

app.get("/player", (req, res) => {
  res.render("player");
});

app.use(express.json());
app.use(cors(corsOptions));

app.get("/stream/movies/:id/master.m3u8", StreamController.movieGetMaster);
app.get("/stream/movies/:id/:folder/:fileName", StreamController.movieGetFile);

app.use("/users", userRouter);
app.use("/users/profile", profileRouter);
app.use("/users/profile/restriction", restrictionRouter);
app.use("/users/profile/myList", myListRouter);
app.use("/users/profile/watchingMovie", watchingMovieRouter);
app.use("/users/profile/watchingSerie", watchingSerieRouter);
app.use("/login", loginRouter);
app.use("/cards", cardRouter);

app.use("/ageRatings", ageRatingRouter);
app.use("/avatars", avatarRouter);
app.use("/categories", categoryRouter);
app.use("/resolutions", resolutionRouter);

app.use("/movies", movieRouter);
app.use("/series", serieRouter);
app.use("/series/:serieId/seasons", seasonRouter);
app.use("/series/:serieId/seasons/:seasonId/episodes", episodeRouter);

app.use(ErrorHandler.handle);

export default app;
