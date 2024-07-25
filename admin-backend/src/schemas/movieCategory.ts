import z from "zod";

const SMovieCategory = z.object({
  movieId: z.string().uuid(),
  watchingId: z.string().uuid(),
});

const SMovieCategoryRequest = SMovieCategory;

const SMovieCategoryResponse = SMovieCategory;

const SMovieCategoryUpdate = SMovieCategoryRequest.partial();

type TMovieCategory = z.infer<typeof SMovieCategory>;
type TMovieCategoryRequest = z.infer<typeof SMovieCategoryRequest>;
type TMovieCategoryResponse = z.infer<typeof SMovieCategoryResponse>;
type TMovieCategoryUpdate = Partial<TMovieCategoryRequest>;

export {
  SMovieCategory,
  SMovieCategoryRequest,
  SMovieCategoryResponse,
  SMovieCategoryUpdate,
  TMovieCategory,
  TMovieCategoryRequest,
  TMovieCategoryResponse,
  TMovieCategoryUpdate,
};
