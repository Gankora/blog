import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { selectUserSession } from '../selectors';
import { server } from '../bff';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession); // берём hash из state

	return useCallback(
		(operation, ...params) => {
			const request = ['register', 'authorize', 'fetchPost'].includes(operation) // есть ли в массиве переданная операция через requestServer();
				? params // []
				: [session, ...params]; // hash

			return server[operation](...request); // Promise {error: null, res: Array} или Promise {error: ошибка, res: null} (request - это hash & ...params)
		},
		[session],
	);
};

/*
'Данный хук предназначен для предоставления доступа определённых страниц или операций.
Находящиееся операции в массиве request является исключением, нетребующих передачу хэша объекта user '
*/
