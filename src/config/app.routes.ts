import express, { Application } from "express";
import ErrorHandler from "../errors/handleError";

const app: Application = express();

app.use(express.json());

const holder = (_req: any, res: any) => {
  return res.status(200).json({ message: "Hello World!" });
};

app.post("", holder)
app.patch("", holder)
app.get("", holder)
app.delete("", holder)

app.use(ErrorHandler.handle);

export default app;
