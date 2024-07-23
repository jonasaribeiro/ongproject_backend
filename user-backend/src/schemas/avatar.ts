import z from "zod";

const SAvatar = z.object({
  id: z.string().uuid(),
  source: z.string(),
});

const SAvatarRequest = SAvatar.omit({
  id: true,
});

const SAvatarResponse = SAvatar;

const SAvatarUpdate = SAvatarRequest.partial();

type TAvatar = z.infer<typeof SAvatar>;
type TAvatarRequest = z.infer<typeof SAvatarRequest>;
type TAvatarResponse = z.infer<typeof SAvatarResponse>;
type TAvatarUpdate = Partial<TAvatarRequest>;

export {
  SAvatar,
  SAvatarRequest,
  SAvatarResponse,
  SAvatarUpdate,
  TAvatar,
  TAvatarRequest,
  TAvatarResponse,
  TAvatarUpdate,
};
