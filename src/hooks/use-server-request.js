import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { selectUserSession } from '../selectors';
import { server } from '../bff';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			const request = ['register', 'authorize'].includes(operation) // есть ли в массиве переданная операция через requestServer();
				? params // []
				: [session, ...params]; // hash

			return server[operation](...request); // Promise {error: null, res: Array} или Promise {error: ошибка, res: null}
		},
		[session],
	);
};
