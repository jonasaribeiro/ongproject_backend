import path from "path";
import fs from "fs";
import FfmpegHelper from "./ffmpegHelper";

const processFile = async (
  file: Express.Multer.File,
  baseDir: string,
  subDir: string
): Promise<
  string | { sd: string | null; hd: string | null; _4k: string | null }
> => {
  console.log(
    `processFile - Iniciou para o arquivo baseDir:${baseDir}, subDir: ${subDir}`
  );

  const originalPath = path.resolve(file.path);
  const newDir = path.join(baseDir, subDir);

  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }

  if (subDir === "main") {
    const { width, height } = await FfmpegHelper.getVideoResolution(
      originalPath
    );
    const resolutions: {
      sd: string | null;
      hd: string | null;
      _4k: string | null;
    } = { sd: null, hd: null, _4k: null };

    try {
      if (width >= 3840 && height >= 2160) {
        const _4kDir = path.join(newDir, "4K");
        if (!fs.existsSync(_4kDir)) fs.mkdirSync(_4kDir);
        resolutions._4k = await FfmpegHelper.convertToM3U8(
          originalPath,
          "4K",
          _4kDir
        );
      }
      if (width >= 1280 && height >= 720) {
        const hdDir = path.join(newDir, "HD");
        if (!fs.existsSync(hdDir)) fs.mkdirSync(hdDir);
        resolutions.hd = await FfmpegHelper.convertToM3U8(
          originalPath,
          "HD",
          hdDir
        );
      }
      const sdDir = path.join(newDir, "SD");
      if (!fs.existsSync(sdDir)) fs.mkdirSync(sdDir);
      resolutions.sd = await FfmpegHelper.convertToM3U8(
        originalPath,
        "SD",
        sdDir
      );

      // Cria o master.m3u8
      FfmpegHelper.createMasterM3U8(newDir, resolutions);
    } catch (error) {
      console.error("Erro ao converter vídeo:", error);
      throw new Error("Failed to convert video to any resolution");
    }

    // Verifique se o arquivo original ainda existe antes de tentar excluí-lo
    if (fs.existsSync(originalPath)) {
      fs.unlinkSync(originalPath);
    }

    return resolutions;
  }

  const newFilePath = path.join(
    newDir,
    path.basename(originalPath).replace("_unprocessed", "")
  );
  fs.renameSync(originalPath, newFilePath);

  return path.relative(baseDir, newFilePath);
};

export default processFile;
