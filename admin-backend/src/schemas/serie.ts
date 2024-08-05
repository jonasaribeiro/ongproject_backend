import z from "zod";
import { SAgeRatingResponse } from "./ageRating";
import { SCategoryResponse } from "./category";

const SSerie = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  release: z.string().length(4),
  createdAt: z.date(),
  updatedAt: z.date(),
  active: z.boolean(),
});

const SSerieRequest = SSerie.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  categories: z.array(SCategoryResponse),
  ageRating: SAgeRatingResponse,
});

const SSerieResponse = SSerie;

const SSerieUpdate = SSerieRequest.partial();

type TSerie = z.infer<typeof SSerie>;
type TSerieRequest = z.infer<typeof SSerieRequest>;
type TSerieResponse = z.infer<typeof SSerieResponse>;
type TSerieUpdate = Partial<typeof SSerieUpdate>;

export {
  SSerie,
  SSerieRequest,
  SSerieResponse,
  SSerieUpdate,
  TSerie,
  TSerieRequest,
  TSerieResponse,
  TSerieUpdate,
};
