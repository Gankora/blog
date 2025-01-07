export const deletePost = async (postId) => {
	await fetch(`http://localhost:3005/posts/${postId}`, {
		method: 'DELETE',
	});
};
