// null equals no filter
export type Filter = {
	difficulty: number | null;
};

export type FilterValue<T> = {
	id: T;
	name: string;
};

export type FilterOptions = { [key in keyof Filter]: { displayName: string; options: FilterValue<Filter[key]>[] } };
