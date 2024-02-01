// null equals no filter
export type Filter = {
	difficulty: number | null;
	cost: number | null;
	preperation_time: number[] | null;
	categories: number | null;
};

// Used to assign a name to a value, like categories, types, cost or difficulty
export type FilterValue<T> = {
	id: T;
	name: string;
};

export type FilterOptions = { [key in keyof Filter]: { displayName: string; options: FilterValue<Filter[key]>[] } };
