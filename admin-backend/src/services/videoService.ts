import { Request, Response } from "express";
import upload from "../config/multer";
import path from "path";
import fs from "fs";
import prisma from "../config/prisma";
import {
  AppError,
  NotFoundError,
  ServerError,
  ValidationError,
} from "../errors/CustomErrors";
import ffmpegHelper from "../utils/ffmpegHelper";

class VideoService {
  static upload = (req: Request, res: Response): Promise<any> => {
    return new Promise((resolve, reject) => {
      upload.single("video")(req, res, async (err) => {
        if (err) {
          return reject(new ServerError("Failed to upload file"));
        }

        if (!req.file) {
          return reject(new ValidationError("File is missing"));
        }

        const { title } = req.body;
        if (!title) {
          return reject(new ValidationError("Title is required"));
        }

        try {
          const filePath = path.resolve(req.file.path);
          const videoDir = path.join("../videos", title);

          if (!fs.existsSync(videoDir)) {
            fs.mkdirSync(videoDir, { recursive: true });
          }

          const newFilePath = path.join(videoDir, path.basename(filePath));
          fs.renameSync(filePath, newFilePath);

          const convertedPath = await ffmpegHelper.convertToStreamableFormat(
            newFilePath
          );
          fs.unlinkSync(newFilePath);

          const video = await prisma.video.create({
            data: {
              title,
              path: path.relative(videoDir, convertedPath), // Ajuste o caminho relativo
            },
          });
          resolve(video);
        } catch (err) {
          reject(new ServerError("Failed to process file"));
        }
      });
    });
  };

  static getAll = async () => {
    return await prisma.video.findMany();
  };

  static getDetail = async (id: string) => {
    const video = await prisma.video.findUnique({
      where: { id: parseInt(id) },
    });
    if (!video) {
      throw new NotFoundError("Video not found");
    }
    return video;
  };

  static update = async (id: string, data: any) => {
    const updatedVideo = await prisma.video.update({
      where: { id: parseInt(id) },
      data,
    });
    return updatedVideo;
  };

  static delete = async (id: string) => {
    await prisma.video.delete({ where: { id: parseInt(id) } });
  };

  static async getPlaylist(req: Request, res: Response) {
    const { id: videoId } = req.params;

    try {
      const videoIdNumber = parseInt(videoId, 10);
      if (isNaN(videoIdNumber)) {
        console.error("ID do vídeo inválido getPlaylist:", videoId);
        return res.status(400).send("Invalid video ID");
      }

      const video = await prisma.video.findUnique({
        where: { id: videoIdNumber },
      });

      console.log("==================");
      console.log(video);
      console.log("==================");

      if (!video) {
        throw new NotFoundError("Video not found");
      }

      const videoPath = path.join(
        __dirname,
        "../../../videos",
        video.title,
        video.path // Nome do arquivo armazenado na chave 'path'
      );

      if (!fs.existsSync(videoPath)) {
        console.error("Arquivo .m3u8 não encontrado:", videoPath);
        return res.status(404).send("Video not found");
      }

      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;

      const head = {
        "Content-Length": fileSize,
        "Content-Type": "application/vnd.apple.mpegurl",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    } catch (error) {
      console.error("Erro ao processar a requisição de vídeo:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getSegment(req: Request, res: Response) {
    const { id: videoId, fileName } = req.params;
    console.log(fileName);

    if (!fileName) {
      return res.status(400).send("File name is required");
    }

    try {
      const videoIdNumber = parseInt(videoId, 10);
      if (isNaN(videoIdNumber)) {
        console.error("ID do vídeo inválido:", videoId);
        return res.status(400).send("Invalid video ID");
      }

      const video = await prisma.video.findUnique({
        where: { id: videoIdNumber },
      });

      if (!video) {
        throw new NotFoundError("Video not found");
      }

      const videoSegmentPath = path.join(
        __dirname,
        "../../../videos",
        video.title,
        fileName
      );

      if (!fs.existsSync(videoSegmentPath)) {
        console.error("Arquivo não encontrado:", videoSegmentPath);
        return res.status(404).send("Segment not found");
      }

      const stat = fs.statSync(videoSegmentPath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (fileName.endsWith(".ts")) {
        if (range) {
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

          if (start >= fileSize) {
            console.error("Requested range not satisfiable:", range);
            return res.status(416).send("Requested range not satisfiable");
          }

          const chunksize = end - start + 1;
          const file = fs.createReadStream(videoSegmentPath, { start, end });
          const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/MP2T",
          };

          res.writeHead(206, head);
          file.pipe(res);
        } else {
          const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/MP2T",
          };
          res.writeHead(200, head);
          fs.createReadStream(videoSegmentPath).pipe(res);
        }
      } else {
        console.error("Formato de arquivo não suportado:", fileName);
        return res.status(400).send("Unsupported file format");
      }
    } catch (error) {
      console.error("Erro ao processar a requisição de segmento:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default VideoService;
