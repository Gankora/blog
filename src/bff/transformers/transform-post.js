export const transformPost = (dbPost) => ({
	id: dbPost.id,
	title: dbPost.title,
	imageUrl: dbPost.imageUrl,
	content: dbPost.content,
	publishedAt: dbPost.publishedAt,
});
