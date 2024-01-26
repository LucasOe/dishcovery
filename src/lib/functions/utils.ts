export const range = (start: number, stop: number, step: number) => {
	return Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);
};

type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

// Typesafe Object.entries
export const getEntries = <T extends object>(obj: T) => {
	return Object.entries(obj) as Entries<T>;
};
