// Composer demo data
// ------------
// NOTE • Estimates and notes come from the PeckDay prototype where it has
// them (eggs on toast; the chicken thigh, basmati and broccoli meal sheet;
// the salmon dinner), and are kept plausible elsewhere

export type Slot = 'breakfast' | 'snack' | 'lunch' | 'dinner';

export interface Item {
	name: string;
	amount: string;
	kcal: number;
}

export interface Example {
	/** What goes in the bar: typed words, or a snapped photo (a Plus feature) */
	source: 'words' | 'photo';
	typed: string;
	title: string;
	detail: string;
	/** Per-item breakdown — the more specific the words, the sharper this gets */
	items: Item[];
	kcal: number;
	protein: number;
	carbs: number;
	fat: number;
	slot: Slot;
	time: string;
	note: string;
}

export const EXAMPLES: Example[] = [
	{
		source: 'words',
		typed: 'two eggs scrambled in butter on toasted granary bread',
		title: 'Scrambled eggs on granary toast',
		detail: '2 eggs scrambled in butter, 2 slices of toasted granary',
		items: [
			{ name: 'Eggs, scrambled', amount: '2 large', kcal: 143 },
			{ name: 'Butter, for scrambling', amount: '10 g', kcal: 72 },
			{ name: 'Granary bread, toasted', amount: '2 slices', kcal: 190 },
		],
		kcal: 405,
		protein: 21,
		carbs: 35,
		fat: 20,
		slot: 'breakfast',
		time: '07:51',
		note: "Eggs before nine. That's a proper protein head start.",
	},
	{
		source: 'words',
		typed: 'roast chicken thigh, a bowl of basmati, steamed broccoli',
		title: 'Chicken, rice and broccoli',
		detail: 'Chicken thigh, basmati rice, broccoli',
		items: [
			{ name: 'Chicken thigh, roasted', amount: '180 g', kcal: 286 },
			{ name: 'Basmati rice, cooked', amount: '150 g', kcal: 195 },
			{ name: 'Broccoli, steamed', amount: '80 g', kcal: 28 },
		],
		kcal: 509,
		protein: 42,
		carbs: 58,
		fat: 13,
		slot: 'lunch',
		time: '13:20',
		note: 'A balanced plate. The chicken did most of the protein work.',
	},
	{
		source: 'words',
		typed: 'a sneaky milk chocolate digestive',
		title: 'Chocolate digestive',
		detail: '1 milk chocolate digestive',
		items: [{ name: 'Milk chocolate digestive', amount: '1 biscuit', kcal: 84 }],
		kcal: 84,
		protein: 1,
		carbs: 10,
		fat: 4,
		slot: 'snack',
		time: '15:05',
		note: 'Logged. A biscuit is a biscuit, not a confession.',
	},
	{
		source: 'photo',
		typed: 'Photo of your plate',
		title: 'Salmon and potatoes',
		detail: 'Salmon fillet, new potatoes, green beans, butter',
		items: [
			{ name: 'Salmon fillet', amount: '160 g', kcal: 330 },
			{ name: 'New potatoes', amount: '250 g', kcal: 190 },
			{ name: 'Green beans', amount: '80 g', kcal: 25 },
			{ name: 'Butter', amount: '10 g', kcal: 72 },
		],
		kcal: 617,
		protein: 39,
		carbs: 46,
		fat: 29,
		slot: 'dinner',
		time: '19:05',
		note: 'Oily fish twice this week. Your future self says thanks.',
	},
];

export const SLOT_LABEL: Record<Slot, string> = {
	breakfast: 'Breakfast',
	snack: 'Snack',
	lunch: 'Lunch',
	dinner: 'Dinner',
};
