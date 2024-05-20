import express, { Application } from "express";
import ErrorHandler from "../errors/handleError";
import VideoController from "../controllers/videoController";
import path from "path";

const app: Application = express();

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../views"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/videos/:id", (req, res) => {
    res.render("videos", { id: req.params.id });
});

app.use(express.raw());
app.use(express.static('public'));

app.post("/upload", VideoController.upload)
app.get("/videos", VideoController.getAll);
app.get("/videos/:id", VideoController.getDetail);
app.patch("/videos/:id", VideoController.update);
app.delete("/videos/:id", VideoController.delete);
// Apenas para ambiente dev
app.get("/stream/:id", VideoController.stream)

app.use(ErrorHandler.handle);

export default app;
