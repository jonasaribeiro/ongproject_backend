import { Router } from "express";
import WebhookController from "../controllers/webhook";
import WebhookMiddlewares from "../middlewares/webhook";

const webhookRouter = Router();

// Webhook handler
webhookRouter.post(
  "",
  WebhookMiddlewares.validateWebhookRequest,
  WebhookController.handle
);

export { webhookRouter };
