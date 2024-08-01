import z from "zod";
import { SSeasonResponse } from "./season";

const SEpisode = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  episodeNumber: z.number(),
  seasonId: z.string().uuid(),
});

const SEpisodeRequest = SEpisode.omit({
  id: true,
});

const SEpisodeResponse = SEpisode.extend({ season: SSeasonResponse });

const SEpisodeUpdate = SEpisodeRequest.partial();

type TEpisode = z.infer<typeof SEpisode>;
type TEpisodeRequest = z.infer<typeof SEpisodeRequest>;
type TEpisodeResponse = z.infer<typeof SEpisodeResponse>;
type TEpisodeUpdate = Partial<TEpisodeRequest>;

export {
  SEpisode,
  SEpisodeRequest,
  SEpisodeResponse,
  SEpisodeUpdate,
  TEpisode,
  TEpisodeRequest,
  TEpisodeResponse,
  TEpisodeUpdate,
};
