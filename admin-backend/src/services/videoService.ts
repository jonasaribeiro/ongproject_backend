import { Request, Response } from "express";
import upload from "../config/multer";
import path from "path";
import fs from "fs"
import prisma from "../config/prisma";
import { NotFoundError, ServerError, ValidationError } from "../errors/CustomErrors";
import ffmpegHelper from "../utils/ffmpegHelper";

class VideoService {
    static upload = (req: Request, res: Response): Promise<any> => {
        return new Promise((resolve, reject) => {
            upload(req, res, async (err) => {
                if (err) {
                    return reject(new ServerError("Failed to upload file"));
                }

                if (!req.file) {
                    return reject(new ValidationError("File is missing"));
                }

                const filePath = path.resolve(req.file.path);
                await ffmpegHelper.convertToStreamableFormat(filePath);
                const video = await prisma.video.create({
                    data: {
                        title: req.file.originalname,
                        path: filePath,
                    },
                });
                resolve(video);
            });
        });
    };

    static getAll = async () => {
        return await prisma.video.findMany();
    };

    static getDetail = async (id: string) => {
        const video = await prisma.video.findUnique({ where: { id: parseInt(id) } });
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

    static stream = async (req: Request, res: Response) => {
        const videoId = req.params.id;
        const video = await prisma.video.findUnique({ where: { id: parseInt(videoId) } });
        if (!video) {
            throw new NotFoundError("Video not found");
        }

        const videoPath = video.path;
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            if (start >= fileSize) {
                throw new ValidationError("Requested range not satisfiable");
            }

            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    };
}

export default VideoService