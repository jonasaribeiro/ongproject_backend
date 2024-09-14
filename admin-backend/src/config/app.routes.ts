import express, { Application } from "express";
import ErrorHandler from "../errors/handleError";
import path from "path";
import {
  avatarRouter,
  resolutionRouter,
  categoryRouter,
  ageRatingRouter,
  movieRouter,
  serieRouter,
  seasonRouter,
  episodeRouter,
  webhookRouter,
} from "../routes";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.raw());
app.use(express.static("public"));

// View para formulário de upload
app.get("/upload-movie", (req, res) => {
  res.render("upload-movie");
});

// Webhook TODO:
// Aceitar Pagamento ativar user
// Recusar / Cancelar pagamento desativar user
// Autenticar conexão para segurança
// Bloquear firewall para rota apenas recebendo do asaas
app.use("/webhook", webhookRouter);

app.use("/ageRating", ageRatingRouter);
app.use("/avatar", avatarRouter);
app.use("/category", categoryRouter);
app.use("/resolution", resolutionRouter);

app.use("/movies", movieRouter);
app.use("/series", serieRouter);
app.use("/series/:serieId/seasons", seasonRouter);
app.use("/series/:serieId/seasons/:seasonId/episodes", episodeRouter);

app.use(express.json());
app.use(ErrorHandler.handle);

export default app;
