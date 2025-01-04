export const deleteComment = async (commentId) => {
	await fetch(`http://localhost:3005/comments/${commentId}`, {
		method: 'DELETE',
	});
};
