import { NextFunction, Request, Response } from "express";
import stripe from "../config/stripe";
import { AppError } from "../errors/CustomErrors";
import { STRIPE_WEBHOOK_ENDPOINT_SECRET } from "../config/environment";

class WebhookMiddlewares {
  static validateWebhookRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      throw new AppError("Access Denied");
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        STRIPE_WEBHOOK_ENDPOINT_SECRET
      );
      req.body = event;
    } catch (err: any) {
      throw new AppError(`Webhook Error: ${err.message}`);
    }

    next();
  };
}

export default WebhookMiddlewares;
