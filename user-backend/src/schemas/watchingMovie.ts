import z from "zod";

const SWatchingMovie = z.object({
  id: z.string().uuid(),
  date: z.date(),
  complete: z.boolean(),
  movieId: z.string().uuid(),
  profileId: z.string().uuid(),
});

const SWatchingMovieRequest = SWatchingMovie.omit({
  id: true,
});

const SWatchingMovieResponse = SWatchingMovie;

const SWatchingMovieUpdate = SWatchingMovieRequest.partial();

type TWatchingMovie = z.infer<typeof SWatchingMovie>;
type TWatchingMovieRequest = z.infer<typeof SWatchingMovieRequest>;
type TWatchingMovieResponse = z.infer<typeof SWatchingMovieResponse>;
type TWatchingMovieUpdate = Partial<TWatchingMovieRequest>;

export {
  SWatchingMovie,
  SWatchingMovieRequest,
  SWatchingMovieResponse,
  SWatchingMovieUpdate,
  TWatchingMovie,
  TWatchingMovieRequest,
  TWatchingMovieResponse,
  TWatchingMovieUpdate,
};
