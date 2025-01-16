import { getUser, addUser } from '../api';
import { setUser } from '../../actions';
import { sessions } from '../sessions';

export const register = (regLogin, regPassword) => async (dispatch) => {
	const user = await getUser(regLogin);

	if (user) {
		return {
			error: 'Такой логин уже занят',
			res: null,
		};
	}

	const newUser = await addUser(regLogin, regPassword);

	const sessionHash = sessions.create(newUser);

	dispatch(
		setUser({
			id: newUser.id,
			login: newUser.login,
			roleId: newUser.role_id,
			session: sessionHash,
		}),
	);

	return {
		error: null,
		res: {
			id: newUser.id,
			login: newUser.login,
			roleId: newUser.role_id,
			session: sessionHash,
		},
	};
};
