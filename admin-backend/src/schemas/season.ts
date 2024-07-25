import z from "zod";

const SSeason = z.object({
  id: z.string().uuid(),
  title: z.string(),
  release: z.string().length(4),
  active: z.boolean().default(false),
  seasonNumber: z.number(),
  serieId: z.string().uuid(),
});

const SSeasonRequest = SSeason.omit({
  id: true,
});

const SSeasonResponse = SSeason;

const SSeasonUpdate = SSeasonRequest.partial();

type TSeason = z.infer<typeof SSeason>;
type TSeasonRequest = z.infer<typeof SSeasonRequest>;
type TSeasonResponse = z.infer<typeof SSeasonResponse>;
type TSeasonUpdate = Partial<TSeasonRequest>;

export {
  SSeason,
  SSeasonRequest,
  SSeasonResponse,
  SSeasonUpdate,
  TSeason,
  TSeasonRequest,
  TSeasonResponse,
  TSeasonUpdate,
};
