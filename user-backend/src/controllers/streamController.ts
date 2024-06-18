import { Request, Response } from "express";
import StreamService from "../services/streamService";
import path from "path";

class StreamController {
  static async movieGetMaster(req: Request, res: Response) {
    const videoId = req.params.id;
    console.log(`Request for master playlist: ${videoId}`); // Debugging line
    const stream = await StreamService.getMaster(videoId, "movies");
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    stream.pipe(res);
  }

  static async movieGetFile(req: Request, res: Response) {
    const videoId = req.params.id;
    const folder = req.params.folder;
    const fileName = req.params.fileName;
    console.log(`Request for video file: ${videoId}, ${folder}, ${fileName}`); // Debugging line
    const stream = await StreamService.getFile(
      videoId,
      folder,
      fileName,
      "movies"
    );
    const ext = path.extname(fileName);
    const contentType =
      ext === ".ts" ? "video/MP2T" : "application/vnd.apple.mpegurl";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);
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
