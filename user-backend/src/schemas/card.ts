import { z } from "zod";

const SCard = z.object({
  id: z.string(),
  number: z.string().min(13).max(19),
  expireDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      return new Date(arg);
    }
  }, z.date()),
  cvv: z.string().min(3).max(4),
  ownerName: z.string(),
  cpf: z.string().length(11),
  method: z.enum(["credit", "debit"]),
  userId: z.string(),
});

const SCardRequest = SCard.omit({
  id: true,
});

const SCardResponse = SCard.transform((card) => ({
  ...card,
  number: card.number.slice(-4),
}));

const SCardUpdate = SCardRequest.omit({ userId: true }).partial();

type TCard = z.infer<typeof SCard>;
type TCardRequest = z.infer<typeof SCardRequest>;
type TCardResponse = z.infer<typeof SCardResponse>;
type TCardUpdate = Omit<Partial<TCardRequest>, "userId">;

export {
  SCard,
  SCardRequest,
  SCardResponse,
  SCardUpdate,
  TCard,
  TCardRequest,
  TCardResponse,
  TCardUpdate,
};
