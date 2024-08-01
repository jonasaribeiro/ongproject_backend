import z from "zod";
import { SCategoryResponse } from "./category";
import { SAgeRatingResponse } from "./ageRating";

const SMovie = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  release: z.string().length(4),
  createdAt: z.date(),
  updatedAt: z.date(),
  active: z.boolean(),
});

const SMovieRequest = SMovie.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  categories: z.array(SCategoryResponse),
  ageRating: SAgeRatingResponse,
});

const SMovieResponse = SMovie;

const SMovieUpdate = SMovie.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

type TMovie = z.infer<typeof SMovie>;
type TMovieRequest = z.infer<typeof SMovieRequest>;
type TMovieResponse = z.infer<typeof SMovieResponse>;
type TMovieUpdate = Partial<typeof SMovieUpdate>;

export {
  SMovie,
  SMovieRequest,
  SMovieResponse,
  SMovieUpdate,
  TMovie,
  TMovieRequest,
  TMovieResponse,
  TMovieUpdate,
};
