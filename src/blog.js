//json-server --watch src/db.json --port 3005
import { Route, Routes } from 'react-router-dom';
import { Header, Footer, Modal } from './components';
import { Authorization, Registrarion, Users, Post, Main } from './pages';
import { setUser } from './actions';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const AppColumn = styled.div`
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 120px 0 20px;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return; // просто возвращает undefined
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route
						path="/"
						element={
							<div>
								<Main />
							</div>
						}
					/>
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registrarion />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/posts/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
