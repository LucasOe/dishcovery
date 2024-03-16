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


// Convert a Blob to a Buffer for sharp library
export const blobToBuffer = (blob: Blob): Promise<Buffer> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(Buffer.from(reader.result as ArrayBuffer));
		reader.onerror = reject;
		reader.readAsArrayBuffer(blob);
	});
}

export const resizeImage = (file: File, maxWidth: number): Promise<Blob | null> => {
	return new Promise((resolve, reject) => {
		const img = document.createElement('img');
		img.onload = function() {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			let width = img.width;
			let height = img.height;

			// calculate the width and height, constraining the proportions
			if (width > maxWidth) {
				height = Math.round(height * maxWidth / width);
				width = maxWidth;
			}

			canvas.width = width;
			canvas.height = height;

			// draw the image
			ctx!.drawImage(img, 0, 0, width, height);

			canvas.toBlob(resolve, file.type);
		};
		img.onerror = reject;
		img.src = URL.createObjectURL(file);
	});
}
