import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useResetForm = (reset) => {
	const store = useStore();

	/*
	данный хук применяется для возможности реагирования функции с одного компонента на другой.
	(сброс данных авторизации при логауте)
	*/

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;
		const unsubscribe = store.subscribe(() => {
			let prevWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== prevWasLogout) {
				reset();
			}
		});

		return unsubscribe;
	}, [reset, store]);
};
