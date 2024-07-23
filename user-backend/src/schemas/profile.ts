import { z } from "zod";

const SProfile = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  userId: z.string().uuid(),
  avatarId: z.string().uuid(),
  age: z.string().uuid(),
});

const SProfileRequest = SProfile.omit({
  id: true,
}).extend({ categories: z.array(z.string()) });

const SProfileResponse = SProfile;

const SProfileUpdate = SProfileRequest.partial();

type TProfile = z.infer<typeof SProfile>;
type TProfileRequest = z.infer<typeof SProfileRequest>;
type TProfileResponse = z.infer<typeof SProfileResponse>;
type TProfileUpdate = Partial<TProfileRequest>;

export {
  SProfile,
  SProfileRequest,
  SProfileResponse,
  SProfileUpdate,
  TProfile,
  TProfileRequest,
  TProfileResponse,
  TProfileUpdate,
};
