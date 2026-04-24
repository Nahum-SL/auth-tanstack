// auth.service.ts
import { findUserByEmail } from "./auth.db.server";

export async function loginService(email: string, password: string) {
	const user = findUserByEmail(email);

	if (!user) {
		throw { code: "USER_NOT_FOUND" };
	}

	if (user.password !== password) {
		throw { code: "INVALID_CREDENTIALS" };
	}

	return {
		id: user.id,
		email: user.email,
		role: user.role,
	};
}
