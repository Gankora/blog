//json-server --watch src/db.json --port 3005
import { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components';
import { Authorization, Registrarion } from './pages';
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

const Content = styled.div`
	padding: 120px 0;
`;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route
						path="/"
						element={<div style={{ height: '2000px' }}>Главная страница</div>}
					/>
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registrarion />} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post/:postId" element={<div>Статья</div>} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};
