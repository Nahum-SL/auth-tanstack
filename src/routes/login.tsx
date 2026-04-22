import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#/features/auth/auth.ui";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
