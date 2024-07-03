import path from "path";
import { Request, Response } from "express";
import FileHelper from "../utils/fileHelper";
import { databasePath } from "../config/multer";
import { ValidationError } from "../errors/CustomErrors";
import { IMulterUploadFiles } from "../types/movieTypes";

class MediaServiceHelper {
  static async uploadPoster(
    posterFile: Express.Multer.File,
    mediaDir: string
  ): Promise<void> {
    if (!posterFile) return;

    const unprocessedDir = path.join(databasePath, "unprocessed");
    FileHelper.createDirectory(unprocessedDir);

    const imagesDir = path.join(mediaDir, "images");
    FileHelper.createDirectory(imagesDir);

    const posterFilePath = path.join(
      unprocessedDir,
      Date.now() + "_" + posterFile.originalname
    );
    await FileHelper.moveFile(posterFile.path, posterFilePath);

    // Optimize and move the poster file to the images directory
    const optimizedPosterPath = path.join(imagesDir, "poster.jpg");
    await FileHelper.optimizeImage(posterFilePath, optimizedPosterPath);

    // Delete the temporary file after processing
    await FileHelper.deleteTempPoster(posterFilePath);
  }

  static async processMediaFile(
    mainFile: Express.Multer.File,
    mediaDir: string,
    mainDir: string
  ): Promise<{ sd: boolean; hd: boolean; _4k: boolean }> {
    if (!mainFile) return { sd: false, hd: false, _4k: false };

    const unprocessedDir = path.join(databasePath, "unprocessed");
    FileHelper.createDirectory(unprocessedDir);

    const tempFilePath = path.join(
      unprocessedDir,
      Date.now() + "_" + mainFile.originalname
    );
    await FileHelper.moveFile(mainFile.path, tempFilePath);

    const resolutions = await FileHelper.processVideoFile(
      { path: tempFilePath, originalname: mainFile.originalname },
      mediaDir,
      "main"
    );

    const audioDir = path.join(mainDir, "audio");
    FileHelper.createDirectory(audioDir);
    await FileHelper.extractAudio(tempFilePath, audioDir);

    // Delete the temporary file after processing
    await FileHelper.deleteTempMovie(tempFilePath);

    return resolutions;
  }

  static async uploadFiles(
    req: Request,
    _res: Response,
    mediaId: string,
    mediaType: "movie" | "serie"
  ): Promise<any> {
    if (!req.files) {
      throw new ValidationError("Files are missing");
    }

    const { title } = req.body;
    if (!title) {
      throw new ValidationError("Title is required");
    }

    const mediaDir = path.join(databasePath, `${mediaType}s`, mediaId);
    const mainDir = path.join(mediaDir, "main");
    FileHelper.createDirectory(mediaDir);
    FileHelper.createDirectory(mainDir);

    const files = req.files as IMulterUploadFiles;
    const mainFile = files.file ? files.file[0] : null;
    const posterFile = files.poster ? files.poster[0] : null;

    if (posterFile) {
      await MediaServiceHelper.uploadPoster(posterFile, mediaDir);
    }

    const resolutions = mainFile
      ? await MediaServiceHelper.processMediaFile(mainFile, mediaDir, mainDir)
      : { sd: false, hd: false, _4k: false };

    return {
      message: "Files uploaded successfully",
      resolutions,
    };
  }
}

export default MediaServiceHelper;
