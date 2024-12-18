import { getUser } from './get-user';
import { addUser } from './add-user';
import { sessions } from './sessions';

// bff
export const server = {
	async logout(session) {
		sessions.remove(session);
	},

	// вход для существующего пользователя
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				res: null,
			};
		}

		if (authPassword !== user.password) {
			return {
				error: 'Неверный пароль',
				res: null,
			};
		}

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},

	// регистрация пользователя
	async register(regLogin, regPassword) {
		const user = await getUser(regLogin);

		if (user) {
			return {
				error: 'Такой логин уже занят',
				res: null,
			};
		}

		const newUser = await addUser(regLogin, regPassword);

		return {
			error: null,
			res: {
				id: newUser.id,
				login: newUser.login,
				roleId: newUser.role_id,
				session: sessions.create(newUser),
			},
		};
	},
};
