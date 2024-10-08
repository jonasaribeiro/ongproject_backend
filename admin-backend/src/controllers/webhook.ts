import { Request, Response } from "express";

class WebhookController {
  static handle = async (req: Request, res: Response) => {
    const body = req.body;

    res.send();
  };
}

export default WebhookController;
