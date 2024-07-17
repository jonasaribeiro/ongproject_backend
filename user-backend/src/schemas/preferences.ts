import z from "zod";

const SPreferences = z.object({
  id: z.string().uuid(),
  profileId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

const SPreferencesRequest = SPreferences.omit({
  id: true,
});

const SPreferencesResponse = SPreferences;

type TPreferences = z.infer<typeof SPreferences>;
type TPreferencesRequest = z.infer<typeof SPreferencesRequest>;
type TPreferencesResponse = z.infer<typeof SPreferencesResponse>;

export {
  SPreferences,
  SPreferencesRequest,
  SPreferencesResponse,
  TPreferences,
  TPreferencesRequest,
  TPreferencesResponse,
};
