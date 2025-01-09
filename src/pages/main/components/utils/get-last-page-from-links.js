export const getLastPageFromLinks = (links) => {
	const result = links.match(/_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"$/);

	return Number(result[1]);
};

/*
	<http://localhost:3005/posts?_page=1&_limit=9>; rel="first", <http://localhost:3005/posts?_page=2&_limit=9>; rel="next", <http://localhost:3005/posts?_page=2&_limit=9>; rel="last"

*/
