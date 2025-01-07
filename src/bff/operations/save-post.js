import { sessions } from '../sessions';
import { addPost, updatePost } from '../api';
import { ROLE } from '../constants';

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	// если id имеет пустую строку(в initialPostState), то запускается страница для создания статьи (пустая).
	const savedPost =
		newPostData.id === ''
			? await addPost(newPostData)
			: await updatePost(newPostData);

	return {
		error: null,
		res: savedPost,
	};
};
