import express, { Application } from "express";
import ErrorHandler from "../errors/handleError";
import path from "path";
import MoviesController from "../controllers/movieController";
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

app.use(express.json());

app.use(ErrorHandler.handle);

export default app;
