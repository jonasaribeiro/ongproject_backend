import z from "zod";

const SCategory = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

const SCategoryRequest = SCategory.omit({
  id: true,
});

const SCategoryResponse = SCategory;

const SCategoryUpdate = SCategoryRequest.partial();

type TCategory = z.infer<typeof SCategory>;
type TCategoryRequest = z.infer<typeof SCategoryRequest>;
type TCategoryResponse = z.infer<typeof SCategoryResponse>;
type TCategoryUpdate = Partial<TCategoryRequest>;

export {
  SCategory,
  SCategoryRequest,
  SCategoryResponse,
  SCategoryUpdate,
  TCategory,
  TCategoryRequest,
  TCategoryResponse,
  TCategoryUpdate,
};
