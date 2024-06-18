import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

class StreamService {
  static async getMaster(videoId: string, type: string) {
    const masterPath = path.join(
      __dirname,
      `../../../database`,
      type,
      videoId,
      "main",
      "master.m3u8"
    );
    if (!fs.existsSync(masterPath)) {
      throw new Error("Master file not found");
    }
    console.log(masterPath);
    return fs.createReadStream(masterPath);
  }

  static async getFile(
    videoId: string,
    folder: string,
    fileName: string,
    type: string
  ) {
    const filePath = path.join(
      __dirname,
      `../../../database`,
      type,
      videoId,
      "main",
      folder,
      fileName
    );
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
      throw new Error("Video file not found");
    }
    return fs.createReadStream(filePath);
  }
}

export default StreamService;
