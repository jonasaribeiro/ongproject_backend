import { Request, Response } from "express";
import stripe from "../config/stripe";

class SubscriptionController {
  static generateCheckoutLink = async (req: Request, res: Response) => {
    //
  };

  static generateClientLink = async (req: Request, res: Response) => {
    const customerId = req.body.stripeCustomerId;

    const { url } = await stripe.billingPortal.sessions.create({
      customer: customerId,
    });
    res.json({ url });
  };
}

export default SubscriptionController;
