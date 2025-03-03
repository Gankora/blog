import { request } from "../utils/request";

export const removePostAsync = (id) => {
	return async () => {
		const result = await request(`/posts/${id}`, 'DELETE');
		return result;
	};
};
