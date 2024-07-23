import z from "zod";

const SSerieAgeRating = z.object({
  serieId: z.string().uuid(),
  ageRatingId: z.string().uuid(),
});

const SSerieAgeRatingRequest = SSerieAgeRating;

const SSerieAgeRatingResponse = SSerieAgeRating;

const SSerieAgeRatingUpdate = SSerieAgeRatingRequest.partial();

type TSerieAgeRating = z.infer<typeof SSerieAgeRating>;
type TSerieAgeRatingRequest = z.infer<typeof SSerieAgeRatingRequest>;
type TSerieAgeRatingResponse = z.infer<typeof SSerieAgeRatingResponse>;
type TSerieAgeRatingUpdate = Partial<TSerieAgeRatingRequest>;

export {
  SSerieAgeRating,
  SSerieAgeRatingRequest,
  SSerieAgeRatingResponse,
  SSerieAgeRatingUpdate,
  TSerieAgeRating,
  TSerieAgeRatingRequest,
  TSerieAgeRatingResponse,
  TSerieAgeRatingUpdate,
};
