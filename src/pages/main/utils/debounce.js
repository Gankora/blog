export const debounce = (fn, delay) => {
	let timeoutId;

	return (...args) => {
		clearTimeout(timeoutId); // очистка предыдущего таймера
		setTimeout(fn, delay, ...args);
	};
};
