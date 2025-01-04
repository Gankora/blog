import { sessions } from '../sessions';
import { setUserRole } from '../api';
import { ROLE } from '../constants';

export const updateUserRole = async (hash, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	setUserRole(userId, newUserRoleId); //установить текущую роль

	return {
		error: null,
		res: true,
	};
};
