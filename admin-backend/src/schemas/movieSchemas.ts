import { z } from "zod";

const sMovie = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  pubYear: z.string().min(4, "Publication year is required").max(4),
  categories: z
    .array(z.object({ name: z.string().min(1) }))
    .nonempty("At least one category is required"),
  resolutions: z.array(z.object({ name: z.string().min(1) })).optional(),
  ageRating: z.object({ name: z.string().min(1) }).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  active: z.boolean().default(false),
});

const sMovieUploadReqBody = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  pubYear: z
    .string()
    .min(4, { message: "Publication year is required" })
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

export { sMovie, sMovieUploadReqBody };
