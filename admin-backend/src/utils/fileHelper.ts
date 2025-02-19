import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import FfmpegHelper from "./ffmpegHelper";
import sharp from "sharp";

class FileHelper {
  static createDirectory = (dir: string): void => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  };

  static moveFile = (originalPath: string, newFilePath: string): void => {
    fs.renameSync(originalPath, newFilePath);
  };

  static deleteTempMovie = async (filePath: string): Promise<void> => {
    if (fs.existsSync(filePath)) {
      try {
        await fsPromises.unlink(filePath);
      } catch {}
      console.log(
        `Arquivo de filme temporário excluído com sucesso: ${filePath}`
      );
    } else {
      console.warn(`Arquivo de filme temporário não encontrado: ${filePath}`);
    }
  };

  static deleteTempPoster = async (filePath: string): Promise<void> => {
    if (fs.existsSync(filePath)) {
      try {
        await fsPromises.unlink(filePath);
      } catch {}
      console.log(
        `Arquivo de poster temporário excluído com sucesso: ${filePath}`
      );
    } else {
      console.warn(`Arquivo de poster temporário não encontrado: ${filePath}`);
    }
  };

  static processVideoFile = async (
    file: { path: string; originalname: string },
    baseDir: string,
    subDir: string
  ): Promise<{ sd: boolean; hd: boolean; _4k: boolean }> => {
    console.log(
      `processVideoFile - Iniciou para o arquivo baseDir:${baseDir}, subDir: ${subDir}`
    );

    const originalPath = path.resolve(file.path);
    const newDir = path.join(baseDir, subDir);

    FileHelper.createDirectory(newDir);

    const resolutions = { sd: false, hd: false, _4k: false };

    if (subDir === "main") {
      const { width, height } = await FfmpegHelper.getVideoResolution(
        originalPath
      );

      if (width >= 3840 && height >= 2160) {
        const _4kDir = path.join(newDir, "4K");
        FileHelper.createDirectory(_4kDir);
        await FfmpegHelper.convertVideo(originalPath, "4K", _4kDir);
        resolutions._4k = true;
      }
      if (width >= 1280 && height >= 720) {
        const hdDir = path.join(newDir, "HD");
        FileHelper.createDirectory(hdDir);
        await FfmpegHelper.convertVideo(originalPath, "HD", hdDir);
        resolutions.hd = true;
      }
      const sdDir = path.join(newDir, "SD");
      FileHelper.createDirectory(sdDir);
      await FfmpegHelper.convertVideo(originalPath, "SD", sdDir);
      resolutions.sd = true;

      FfmpegHelper.createMasterM3U8(newDir, resolutions);
    }

    return resolutions;
  };

  static extractAudio = async (
    filePath: string,
    outputDir: string
  ): Promise<string> => {
    return FfmpegHelper.extractAudio(filePath, outputDir);
  };

  static deleteFolderRecursive = (folderPath: string): void => {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
        const curPath = path.join(folderPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          FileHelper.deleteFolderRecursive(curPath); // Recursively delete folder
        } else {
          try {
            fs.unlinkSync(curPath); // Delete file
          } catch {}
        }
      });
      fs.rmdirSync(folderPath); // Remove directory
    }
  };

  static optimizeImage = async (
    originalPath: string,
    outputPath: string
  ): Promise<void> => {
    await sharp(originalPath)
      .resize(500, 750) // Exemplo de redimensionamento, ajuste conforme necessário
      .jpeg({ quality: 80 }) // Configuração de qualidade da imagem otimizada
      .toFile(outputPath);

    await FileHelper.deleteTempPoster(originalPath);
  };
}

export default FileHelper;
