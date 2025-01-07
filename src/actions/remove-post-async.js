export const removePostAsync = (requestServer, id) => {
	return async () => {
		const result = await requestServer('removeFetchPost', id);
		return result;
	};
};
