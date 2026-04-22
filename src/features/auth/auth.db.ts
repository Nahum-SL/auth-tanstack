import type { User } from "./auth.type";

export const users: User[] = [
  {
    id: "1",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  },
  {
    id: "2",
    email: "user@test.com",
    password: "123456",
    role: "user",
  },
];
