//import { deleteComment, getComments, getPost } from '../api';
import { deleteComment, getComments, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeFetchComment = async (hash, id, postId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	await deleteComment(id);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	return {
		error: null,
		res: {
			...post,
			comments,
		},
	};
};
