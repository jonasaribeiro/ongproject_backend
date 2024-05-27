import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

class StreamService {
  static async getMaster(videoId: string, type: string) {
    let video;

    switch (type) {
      case "movies":
        video = await prisma.movie.findUnique({
          where: { id: videoId },
        });
        break;
      case "trailers":
        video = await prisma.trailer.findUnique({
          where: { id: videoId },
        });
        break;
      case "series":
        video = await prisma.serie.findUnique({
          where: { id: videoId },
        });
        break;
      default:
        throw new Error("Invalid type");
    }

    if (!video) {
      throw new Error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} not found`
      );
    }

    const masterPath = path.join(
      __dirname,
      `../../../database/${type}`,
      video.title.replace(/\s+/g, "_"),
      "main",
      "master.m3u8"
    );

    if (!fs.existsSync(masterPath)) {
      throw new Error("Master file not found");
    }

    return fs.createReadStream(masterPath);
  }

  static async getFile(
    videoId: string,
    resolution: string,
    fileName: string,
    type: string
  ) {
    let video;

    switch (type) {
      case "movies":
        video = await prisma.movie.findUnique({
          where: { id: videoId },
        });
        break;
      case "trailers":
        video = await prisma.trailer.findUnique({
          where: { id: videoId },
        });
        break;
      case "series":
        video = await prisma.serie.findUnique({
          where: { id: videoId },
        });
        break;
      default:
        throw new Error("Invalid type");
    }

    if (!video) {
      throw new Error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} not found`
      );
    }

    const videoPath = path.join(
      __dirname,
      `../../../database/${type}`,
      video.title.replace(/\s+/g, "_"),
      resolution,
      fileName
    );

    if (!fs.existsSync(videoPath)) {
      throw new Error("Video file not found");
    }

    return fs.createReadStream(videoPath);
  }
}

export default StreamService;
