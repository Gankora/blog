import { getUsers } from './get-users';
// получаем одного пользователя
export const getUser = async (loginToFind) => {
	const users = await getUsers();
	return users.find(({ login }) => login === loginToFind);
};
