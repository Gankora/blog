import { transformUser } from '../transformers';

// получаем список пользователей
export const getUsers = () =>
	fetch('http://localhost:3005/users')
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUser) => loadedUser && loadedUser.map(transformUser));
