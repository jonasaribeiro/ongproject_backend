import { Request, Response } from "express";

class WebhookController {
  static handle = async (req: Request, res: Response) => {
    const body = req.body;

    // invoice.paid
    //

    // Pagamento concluido com sucesso
    // status tem que estar "active"

    // Assinatura deletada
    // status diferente de "active"

    // Adicionar uma tabela para manipular informações sobre assinatura
    // Subscription
    // Status
    // ActiveTill

    res.send();
  };
}

export default WebhookController;
