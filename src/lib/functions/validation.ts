export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validateUsername = (username: string): boolean => {
	const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
	return usernameRegex.test(username);
};

export const validatePassword = (password: string): boolean => {
	const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
	return passwordRegex.test(password);
};
