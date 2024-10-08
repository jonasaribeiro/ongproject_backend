import { Request, Response } from "express";
import stripe from "../config/stripe";

class SubscriptionController {
  static generateCheckoutLink = async (req: Request, res: Response) => {
    const { successUrl, stripeId, priceId } = req.body;

    const session = await stripe.checkout.sessions.create({
      success_url: successUrl,
      line_items: [
        {
          price: priceId,
        },
      ],
      mode: "subscription",
    });

    res.json({ url: session.url });
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
