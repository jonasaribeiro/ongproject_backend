import { z } from "zod";

const sSerie = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  releaseYear: z.string().min(4, "Release year is required").max(4),
  categories: z
    .array(z.object({ name: z.string().min(1) }))
    .nonempty("At least one category is required"),
  ageRating: z.object({ name: z.string().min(1) }).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  active: z.boolean().default(false),
});

const sSerieCreateReqBody = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  releaseYear: z
    .string()
    .min(4, { message: "Release year is required" })
    .max(4),
  ageRating: z.string().min(1, { message: "Age rating is required" }),
  categories: z.preprocess((val) => {
    if (typeof val === "string") {
      return [{ name: val }];
    }
    if (Array.isArray(val)) {
      return val.map((name) => ({ name }));
    }
    return val;
  }, z.array(z.object({ name: z.string().min(1, { message: "Category name is required" }) }))),
});
const sSeasonAddReqBody = z.object({
  seasonNumber: z
    .number()
    .int()
    .positive({ message: "Season number must be a positive integer" }),
});

const sEpisodeUploadReqBody = z.object({
  episodeNumber: z
    .number()
    .int()
    .positive({ message: "Episode number must be a positive integer" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export {
  sSerie,
  sSerieCreateReqBody,
  sSeasonAddReqBody,
  sEpisodeUploadReqBody,
};
