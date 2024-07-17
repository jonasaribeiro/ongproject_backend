import z from "zod";

const SWatchingSerie = z.object({
  id: z.string().uuid(),
  date: z.date(),
  complete: z.boolean(),
  serieId: z.string().uuid(),
  episodeId: z.string().uuid(),
  profileId: z.string().uuid(),
});

const SWatchingSerieRequest = SWatchingSerie.omit({
  id: true,
});

const SWatchingSerieResponse = SWatchingSerie;

const SWatchingSerieUpdate = SWatchingSerieRequest.partial();

type TWatchingSerie = z.infer<typeof SWatchingSerie>;
type TWatchingSerieRequest = z.infer<typeof SWatchingSerieRequest>;
type TWatchingSerieResponse = z.infer<typeof SWatchingSerieResponse>;
type TWatchingSerieUpdate = Partial<TWatchingSerieRequest>;

export {
  SWatchingSerie,
  SWatchingSerieRequest,
  SWatchingSerieResponse,
  SWatchingSerieUpdate,
  TWatchingSerie,
  TWatchingSerieRequest,
  TWatchingSerieResponse,
  TWatchingSerieUpdate,
};
