import z from "zod";

const SAgeRating = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

const SAgeRatingRequest = SAgeRating.omit({
  id: true,
});

const SAgeRatingResponse = SAgeRating;

const SAgeRatingUpdate = SAgeRatingRequest.partial();

type TAgeRating = z.infer<typeof SAgeRating>;
type TAgeRatingRequest = z.infer<typeof SAgeRatingRequest>;
type TAgeRatingResponse = z.infer<typeof SAgeRatingResponse>;
type TAgeRatingUpdate = Partial<TAgeRatingRequest>;

export {
  SAgeRating,
  SAgeRatingRequest,
  SAgeRatingResponse,
  SAgeRatingUpdate,
  TAgeRating,
  TAgeRatingRequest,
  TAgeRatingResponse,
  TAgeRatingUpdate,
};
