"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLogin } from "./auth";
import { type LoginFormValues, loginSchema } from "./auth.schema";
import { AuthError } from "./auth.type";

export function LoginForm() {
  const { login } = useLogin();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    if (isSubmitting) return;

    const toastId = toast.loading("Logging in...");
    try {
      await login({ data });
      toast.success("Login successful", { id: toastId });
    } catch (err) {
      if (err instanceof AuthError) {
        const errMessages: Record<string, string> = {
          USER_NOT_FOUND: "User not found",
          INVALID_CREDENTIALS: "Invalid credentials",
          VALIDATION_ERROR: "Validation error",
        };
        const message = errMessages[err.code] || "An unexpected error occurred";
        toast.error(message, { id: toastId });
        if (err.code === "INVALID_CREDENTIALS") {
          setError("password", { message });
          setFocus("password");
        } else if (err.code === "USER_NOT_FOUND") {
          setError("email", { message });
          setFocus("email");
        }
      } else {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center">
      <div>
        <input
          {...register("email")}
          placeholder="Email"
          disabled={isSubmitting}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          disabled={isSubmitting}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
