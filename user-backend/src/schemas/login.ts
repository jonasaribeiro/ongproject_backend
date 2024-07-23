import { z } from "zod";

const SLoginRequest = z.object({
  email: z.string(),
  password: z.string(),
});

const SLoginResponse = z.object({
  token: z.string(),
});

type TLoginRequest = z.infer<typeof SLoginRequest>;
type TLoginResponse = z.infer<typeof SLoginResponse>;

export { SLoginRequest, SLoginResponse, TLoginRequest, TLoginResponse };
