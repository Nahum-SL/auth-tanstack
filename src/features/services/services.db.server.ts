export type Service = {
	id: string;
	name: string;
	price: number;
	category: string;
	ownerId: string;
};

export const services: Service[] = [
	{
		id: "1",
		name: "Landing Page",
		price: 300,
		category: "web",
		ownerId: "1",
	},
];
