import { Request, Response } from "express";

class WebhookController {
  static acceptSubscription = async (req: Request, res: Response) => {
    res.json({ reseived: true });
  };

  static cancelSubscription = async (req: Request, res: Response) => {
    res.json({ reseived: true });
  };
}

export default WebhookController;
