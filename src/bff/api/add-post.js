import { generateDate } from '../utils';

export const addPost = async ({ imageUrl, title, content }) =>
	fetch('http://localhost:3005/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			imageUrl,
			published_at: generateDate(),
			title,
			content,
		}),
	}).then((createdPost) => createdPost.json());
