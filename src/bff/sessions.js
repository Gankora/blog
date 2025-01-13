import { getSession, addSession, deleteSession } from './api';

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

		return !!dbSession?.user && accesRoles.includes(dbSession.user.roleId);
	};

	return {
		create,
		remove,
		access,
	};
};

export const sessions = createSessionManager();

/*
Пример результата функции create()

	{
    "0.12345678901234567890123456789012345678901234567890": {
        id: "001",
        login: "Anton",
        password: "qwe123",
        registered_at: "2050-09-22",
        role_id: 0
    }
}


*/
