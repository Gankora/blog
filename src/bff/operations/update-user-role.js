import { sessions } from '../sessions';
import { setUserRole } from '../api';
import { ROLE } from '../constants';

export const updateUserRole = (userSession, userId, newUserRoleId) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
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
