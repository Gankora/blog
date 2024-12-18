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

	return {
		create,
		remove,
	};
};

export const sessions = createSessionManager();
