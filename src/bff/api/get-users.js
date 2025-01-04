import { transformUser } from '../transformers';

// получаем список пользователей
export const getUsers = () =>
	fetch('http://localhost:3005/users')
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser));
