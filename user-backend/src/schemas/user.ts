import { hashSync } from "bcrypt";
import { z } from "zod";

const SUser = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100)
    .transform((password) => hashSync(password, 10)),
  phone: z.string().min(10).max(15),
  active: z.boolean().default(true),
  reset_password: z.string().default(""),
  registration: z.date().default(() => new Date()),
  membership: z.enum(["plus", "standard", "test"]),
  role: z.enum(["user", "admin"]),
});

const SUserRequest = SUser.omit({
  id: true,
  active: true,
  reset_password: true,
  registration: true,
  role: true,
});

const SUserResponse = SUser.omit({
  password: true,
  role: true,
});

const SUserUpdate = SUserRequest.omit({
  email: true,
  membership: true,
}).partial();

type TUser = z.infer<typeof SUser>;
type TUserRequest = z.infer<typeof SUserRequest>;
type TUserResponse = z.infer<typeof SUserResponse>;
type TUserUpdate = Omit<
  Partial<TUserRequest>,
  "active" | "email" | "membership"
>;

export {
  SUser,
  SUserRequest,
  SUserResponse,
  SUserUpdate,
  TUser,
  TUserRequest,
  TUserResponse,
  TUserUpdate,
};
