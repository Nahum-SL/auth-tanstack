import { createServerFn } from "@tanstack/react-start";
import { users } from "./auth.db";
import { loginSchema } from "./auth.schema";
import { AuthError } from "./auth.type";

function findUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}

export const loginUser = createServerFn()
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    const { email, password } = data;

    const user = findUserByEmail(email);

    if (!user) {
      throw new AuthError("USER_NOT_FOUND", "User not found");
    }

    if (password !== user.password) {
      throw new AuthError("INVALID_CREDENTIALS", "Invalid credentials");
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  });
