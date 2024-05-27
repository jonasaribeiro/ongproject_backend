import express, { Application } from "express";
import ErrorHandler from "../errors/handleError";
import StreamController from "../controllers/streamController";

const app: Application = express();

app.use(express.json());

app.get("/stream/movie/:id", StreamController.movieGetMaster);
app.get(
  "/stream/movie/:id/:resolution/:fileName",
  StreamController.movieGetFile
);
app.get("/stream/serie/:id", StreamController.serieGetMaster);
app.get(
  "/stream/serie/:id/:resolution/:fileName",
  StreamController.serieGetFile
);
app.get("/stream/trailer/:id", StreamController.trailerGetMaster);
app.get(
  "/stream/trailer/:id/:resolution/:fileName",
  StreamController.trailerGetFile
);

app.use(ErrorHandler.handle);

export default app;
