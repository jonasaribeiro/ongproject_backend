import z from "zod";

const SSerieCategory = z.object({
  serieId: z.string().uuid(),
  watchingId: z.string().uuid(),
});

const SSerieCategoryRequest = SSerieCategory;

const SSerieCategoryResponse = SSerieCategory;

const SSerieCategoryUpdate = SSerieCategoryRequest.partial();

type TSerieCategory = z.infer<typeof SSerieCategory>;
type TSerieCategoryRequest = z.infer<typeof SSerieCategoryRequest>;
type TSerieCategoryResponse = z.infer<typeof SSerieCategoryResponse>;
type TSerieCategoryUpdate = Partial<TSerieCategoryRequest>;

export {
  SSerieCategory,
  SSerieCategoryRequest,
  SSerieCategoryResponse,
  SSerieCategoryUpdate,
  TSerieCategory,
  TSerieCategoryRequest,
  TSerieCategoryResponse,
  TSerieCategoryUpdate,
};
