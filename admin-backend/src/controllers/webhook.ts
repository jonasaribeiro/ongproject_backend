import { Request, Response } from "express";

class WebhookController {
  static handle = async (req: Request, res: Response) => {
    const body = req.body;

    // Pagamento concluido com sucesso
    // invoice.payment.succeeded
    // payment_intent.succeeded

    res.send();
  };
}

export default WebhookController;
