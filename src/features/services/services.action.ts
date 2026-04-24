import { createServerFn } from "@tanstack/react-start";
import { requireAdmin, requireAuth } from "../auth/server/auth.guard.server";
import {
	canModifyService,
	getCurrentUser,
} from "../auth/server/auth.policy.server";
import {
	createService,
	deleteService,
	getAllServices,
	getServiceById,
	updateService,
} from "./services.service.server";
import {
	createServiceSchema,
	deleteServiceSchema,
	updateServiceSchema,
} from "./services.shema";

export const getServicesAction = createServerFn().handler(async () => {
	requireAuth();

	const user = getCurrentUser();

	if (user.role === "admin") {
		return getAllServices();
	}

	// User solo ve lo suyos
	return getAllServices().filter((s) => s.id === user.id);
});

export const createServiceAction = createServerFn()
	.inputValidator(createServiceSchema)
	.handler(async ({ data }) => {
		requireAuth();
		requireAdmin();

		const user = getCurrentUser();

		return createService(data, user.id);
	});

export const updateServiceAction = createServerFn()
	.inputValidator(updateServiceSchema)
	.handler(async ({ data }) => {
		requireAuth();
		requireAdmin();
		const service = getServiceById(data.id);

		if (!service) throw { code: "NOT_FOUND" };

		// Policy
		canModifyService(service);

		return updateService(data);
	});

export const deleteServiceAction = createServerFn()
	.inputValidator(deleteServiceSchema)
	.handler(async ({ data }: { data: { id: string } }) => {
		requireAuth();
		requireAdmin();
		const service = getServiceById(data.id);

		if (!service) throw { code: "NOT_FOUND" };

		// Policy
		canModifyService(service);

		return deleteService(data.id);
	});
