import z from "zod";

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
});

const SMovieResponse = SMovie;

const SMovieUpdate = SMovieRequest.partial();

type TMovie = z.infer<typeof SMovie>;
type TMovieRequest = z.infer<typeof SMovieRequest>;
type TMovieResponse = z.infer<typeof SMovieResponse>;
type TMovieUpdate = Partial<TMovieRequest>;

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
