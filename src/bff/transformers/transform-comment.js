export const transformComment = (dbComment) => ({
	id: dbComment.id,
	postId: dbComment.post_id,
	authorId: dbComment.author_id,
	publishedAt: dbComment.publishedAt,
	content: dbComment.content,
});
