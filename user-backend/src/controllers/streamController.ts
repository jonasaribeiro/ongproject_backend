import { Request, Response } from "express";
import StreamService from "../services/streamService";

class StreamController {
  static async movieGetMaster(req: Request, res: Response) {
    const videoId = req.params.id;
    const stream = await StreamService.getMaster(videoId, "movies");
    stream.pipe(res);
  }

  static async movieGetFile(req: Request, res: Response) {
    const videoId = req.params.id;
    const resolution = req.params.resolution;
    const fileName = req.params.fileName;
    const stream = await StreamService.getFile(
      videoId,
      resolution,
      fileName,
      "movies"
    );
    stream.pipe(res);
  }

  static async serieGetMaster(req: Request, res: Response) {
    const videoId = req.params.id;
    const stream = await StreamService.getMaster(videoId, "series");
    stream.pipe(res);
  }

  static async serieGetFile(req: Request, res: Response) {
    const videoId = req.params.id;
    const resolution = req.params.resolution;
    const fileName = req.params.fileName;
    const stream = await StreamService.getFile(
      videoId,
      resolution,
      fileName,
      "series"
    );
    stream.pipe(res);
  }

  static async trailerGetMaster(req: Request, res: Response) {
    const videoId = req.params.id;
    const stream = await StreamService.getMaster(videoId, "trailers");
    stream.pipe(res);
  }

  static async trailerGetFile(req: Request, res: Response) {
    const videoId = req.params.id;
    const resolution = req.params.resolution;
    const fileName = req.params.fileName;
    const stream = await StreamService.getFile(
      videoId,
      resolution,
      fileName,
      "trailers"
    );
    stream.pipe(res);
  }
}

export default StreamController;
