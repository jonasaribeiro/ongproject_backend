import z from "zod";

const SMovieAgeRating = z.object({
  movieId: z.string().uuid(),
  ageRatingId: z.string().uuid(),
});

const SMovieAgeRatingRequest = SMovieAgeRating;

const SMovieAgeRatingResponse = SMovieAgeRating;

const SMovieAgeRatingUpdate = SMovieAgeRatingRequest.partial();

type TMovieAgeRating = z.infer<typeof SMovieAgeRating>;
type TMovieAgeRatingRequest = z.infer<typeof SMovieAgeRatingRequest>;
type TMovieAgeRatingResponse = z.infer<typeof SMovieAgeRatingResponse>;
type TMovieAgeRatingUpdate = Partial<TMovieAgeRatingRequest>;

export {
  SMovieAgeRating,
  SMovieAgeRatingRequest,
  SMovieAgeRatingResponse,
  SMovieAgeRatingUpdate,
  TMovieAgeRating,
  TMovieAgeRatingRequest,
  TMovieAgeRatingResponse,
  TMovieAgeRatingUpdate,
};
