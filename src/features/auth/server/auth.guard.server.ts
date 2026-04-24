import { users } from "./auth.db.server";
import { getSession } from "./auth.session.server";

export function requireAuth() {
	const session = getSession();

	if (!session) {
		throw { code: "UNAUTHORIZED" };
	}

	return session;
}

export function requireAdmin() {
	const session = getSession();

	if (!session) {
		throw { code: "UNAUTHORIZED" };
	}

	const user = users.find((u) => u.id === session);

	if (!user) {
		throw { code: "UNAUTHORIZED" };
	}

	if (user.role !== "admin") {
		throw { code: "FORBIDDEN" };
	}

	return user;
}
