import { getSession, addSession, deleteSession, getUsers } from './api';

const createSessionManager = () => {
	const create = (user) => {
		const hash = Math.random().toFixed(50);

		addSession(hash, user);

		return hash;
	};

	const remove = async (hash) => {
		const dbSession = await getSession(hash);

		if (!dbSession) {
			return;
		}

		deleteSession(dbSession.id);
	};

	const access = async (hash, accesRoles) => {
		const dbSession = await getSession(hash);
		const dbUsers = await getUsers();

		if (dbSession && dbSession.user) {
			if (dbSession && dbSession.user) {
				return accesRoles.includes(
					dbSession.user.role_id || dbSession.user.roleId,
				);
			}
		}

		if (dbUsers) {
			return dbUsers.some((user) => accesRoles.includes(user.roleId));
		}

		return false;
	};

	return {
		create,
		remove,
		access,
	};
};

export const sessions = createSessionManager();

/*
Косяк
		('roleId', dbSession.user.roleId); //отображается при авторизации
		('role_id', dbSession.user.role_id); // отображается при регистрации
*/
