import { Request, Response } from "express";

class SubscriptionController {
  static generateCheckoutLink = async (req: Request, res: Response) => {
    //
  };

  static generateClientLink = async (req: Request, res: Response) => {
    // stripe.billingPortal.sessions.create
  };
}

export default SubscriptionController;
