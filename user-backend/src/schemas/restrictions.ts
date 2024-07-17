import z from "zod";

const SRestrictions = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  movieId: z.string().uuid(),
  serieId: z.string().uuid(),
});

const SRestrictionsRequest = SRestrictions.omit({
  id: true,
});

const SRestrictionsResponse = SRestrictions;

const SRestrictionsUpdate = SRestrictionsRequest.partial();

type TRestrictions = z.infer<typeof SRestrictions>;
type TRestrictionsRequest = z.infer<typeof SRestrictionsRequest>;
type TRestrictionsResponse = z.infer<typeof SRestrictionsResponse>;
type TRestrictionsUpdate = Partial<TRestrictionsRequest>;

export {
  SRestrictions,
  SRestrictionsRequest,
  SRestrictionsResponse,
  SRestrictionsUpdate,
  TRestrictions,
  TRestrictionsRequest,
  TRestrictionsResponse,
  TRestrictionsUpdate,
};
