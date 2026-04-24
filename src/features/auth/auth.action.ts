import { createServerFn } from "@tanstack/react-start";
import { loginSchema } from "./auth.schema";
import { users } from "./server/auth.db.server";
import { loginService } from "./server/auth.service.server";
import {
	createSession,
	destroySession,
	getSession,
} from "./server/auth.session.server";

export const getMeAction = createServerFn().handler(async () => {
	const session = getSession();

	if (!session) return null;

	const user = users.find((u) => u.id === session);

	if (!user) return null;

	return {
		id: user.id,
		email: user.email,
		role: user.role,
	};
});

export const loginUser = createServerFn()
	.inputValidator(loginSchema)
	.handler(async ({ data }) => {
		const user = await loginService(data.email, data.password);

		createSession(user.id);

		return {
			id: user.id,
			email: user.email,
			role: user.role,
		};
	});

export const logoutAction = createServerFn().handler(async () => {
	destroySession();
	return { success: true };
});
