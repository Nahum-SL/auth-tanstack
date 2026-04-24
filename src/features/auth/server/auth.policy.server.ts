import { type Service, services } from "#/features/services/services.db.server";
import { users } from "./auth.db.server";
import { getSession } from "./auth.session.server";

export function getCurrentUser() {
	const session = getSession();

	if (!session) {
		throw { code: "UNAUTHORIZED" };
	}

	const user = users.find((u) => u.id === session);

	if (!user) {
		throw { code: "UNAUTHORIZED" };
	}

	return user;
}

export function canModifyService(service: Service) {
	const user = getCurrentUser();

	// Admin puede todo
	if (user.role === "admin") return true;

	// user solo su propio recurso
	if (service.ownerId === user.id) return true;

	throw { code: "UNAUTHORIZED" };
}
