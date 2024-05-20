import { Request, Response } from "express";
import VideoService from "../services/videoService";

class VideoController {
    static upload = async (req: Request, res: Response) => {
        const result = await VideoService.upload(req, res);
        res.status(201).json(result);
    };

    static getAll = async (req: Request, res: Response) => {
        const videos = await VideoService.getAll();
        res.status(200).json(videos);
    };

    static getDetail = async (req: Request, res: Response) => {
        const video = await VideoService.getDetail(req.params.id);
        res.status(200).json(video);
    };

    static update = async (req: Request, res: Response) => {
        const updatedVideo = await VideoService.update(req.params.id, req.body);
        res.status(200).json(updatedVideo);
    };

    static delete = async (req: Request, res: Response) => {
        await VideoService.delete(req.params.id);
        res.status(204).send();
    };

    static stream = async (req: Request, res: Response) => {
        await VideoService.stream(req, res);
    };
}

export default VideoController