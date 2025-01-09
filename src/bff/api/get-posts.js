import { transformPost } from '../transformers';

// получаем список пользователей
export const getPosts = (page, limit) =>
	fetch(`http://localhost:3005/posts?_page=${page}&_limit=${limit}`)
		.then((loadedPosts) =>
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')]),
		)
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
			links,
		}));
