const createSessionManager = () => {
	const list = {};

	const create = (user) => {
		const hash = Math.random().toFixed(50);
		list[hash] = user; // присвоение ключа (hash) объекту user;

		return hash;
	};

	const remove = (hash) => {
		delete list[hash];
	};

	const access = (hash, accesRoles) => {
		const user = list[hash];
		return !!user && accesRoles.includes(user.roleId);
	};

	return {
		create,
		remove,
		access,
	};
};

export const sessions = createSessionManager();
