export const getCommentsCount = (comments = [], postId) => {
	// получаем комментарии конкретного поста
	const postComments = comments.filter(
		({ postId: commentPostId }) => commentPostId === postId,
	);
	return postComments.length;
};
