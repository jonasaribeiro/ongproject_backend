import z from "zod";

const SMyList = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  movieId: z.string().uuid(),
  serieId: z.string().uuid(),
});

const SMyListRequest = SMyList.omit({
  id: true,
});

const SMyListResponse = SMyList;

const SMyListUpdate = SMyListRequest.partial();

type TMyList = z.infer<typeof SMyList>;
type TMyListRequest = z.infer<typeof SMyListRequest>;
type TMyListResponse = z.infer<typeof SMyListResponse>;
type TMyListUpdate = Partial<TMyListRequest>;

export {
  SMyList,
  SMyListRequest,
  SMyListResponse,
  SMyListUpdate,
  TMyList,
  TMyListRequest,
  TMyListResponse,
  TMyListUpdate,
};
