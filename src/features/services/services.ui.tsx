"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getMeAction } from "../auth/auth.action";
import type { Service } from "./services.db.server";
import { useServices } from "./services.hook";

export function ServicesContent() {
	const { getServicesAction, createServiceAction, deleteServiceAction } =
		useServices();
	const [services, setServices] = useState<Service[]>([]);

	const [user, setUsers] = useState<any>(null);

	useEffect(() => {
		getMeAction().then(setUsers);
	}, []);

	useEffect(() => {
		getServicesAction().then(setServices);
	}, [getServicesAction]);

	const handleCreate = async () => {
		try {
			const newService = await createServiceAction({
				data: {
					name: "Nuevo servicio",
					price: 100,
					category: "web",
				},
			});
			setServices((prev) => [...prev, newService]);
		} catch (err: any) {
			if (err?.code === "FORBIDDEN") {
				toast.error("You don't have permmision for create services");
			} else {
				toast.error("Unexpected Error");
			}
		}
	};

	const handleDelete = async (id: string) => {
		await deleteServiceAction({ data: { id } });
		setServices((prev) => prev.filter((s) => s.id !== id));
	};

	return (
		<div>
			{user.role === "admin" && (
				<button type="button" onClick={handleCreate}>
					Crear
				</button>
			)}

			{services.map((s) => (
				<div key={s.id}>
					{s.name} - ${s.price}
					<button type="button" onClick={() => handleDelete(s.id)}>
						Eliminar
					</button>
				</div>
			))}
		</div>
	);
}
