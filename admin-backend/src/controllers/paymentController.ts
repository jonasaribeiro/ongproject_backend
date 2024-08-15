import { Request, Response } from "express";

class PaymentController {
  createCheckoutLink(req: Request, res: Response): void {
    // Implemente o código para criar o link de checkout com o Stripe aqui
    // e retorne o link para o usuário
  }

  createProfileLink(req: Request, res: Response): void {
    // Implemente o código para criar o link para o cliente visualizar dados
    // sobre o perfil dentro do Stripe aqui e retorne o link
  }

  handleSubscriptionWebhook(req: Request, res: Response): void {
    // Implemente o código para receber o webhook de atualizações de assinaturas
    // de clientes aqui e atualize o status de assinatura conforme necessário
  }

  checkSubscriptionStatus(req: Request, res: Response): void {
    // Implemente o código para verificar o status atual da assinatura do cliente
    // aqui e retorne a resposta adequada
  }
}

export default PaymentController;
