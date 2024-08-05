import z from "zod";

const SWatching = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
});

const SWatchingRequest = SWatching.omit({
  id: true,
});

const SWatchingResponse = SWatching;

const SWatchingUpdate = SWatchingRequest.partial();

type TWatching = z.infer<typeof SWatching>;
type TWatchingRequest = z.infer<typeof SWatchingRequest>;
type TWatchingResponse = z.infer<typeof SWatchingResponse>;
type TWatchingUpdate = Partial<TWatchingRequest>;

export {
  SWatching,
  SWatchingRequest,
  SWatchingResponse,
  SWatchingUpdate,
  TWatching,
  TWatchingRequest,
  TWatchingResponse,
  TWatchingUpdate,
};
