import { Router } from "express";
import checkIP from "../config/checkIP";
import { ASAAS_IP_ADDRESSES } from "../config/environment";

const webhookRouter = Router();

webhookRouter.use(checkIP(ASAAS_IP_ADDRESSES));

// PAYMENT_CONFIRMED = Liberar acesso a plataforma
webhookRouter.post("/accepted");

// PAYMENT_REFUNDED = Bloquear acesso a plataforma
webhookRouter.post("/cancel");

export { webhookRouter };
