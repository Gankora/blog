import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Content, H2 } from '../../components';
import { TableRow, UserRow } from './components';
import styled from 'styled-components';
import { ROLE } from '../../constants';

const StyledColumn = styled.div`
	margin-left: 3px;
`;

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const requestServer = useServerRequest();

	useEffect(() => {
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.res || []);
				setRoles(rolesRes.res || []);
			},
		);
	}, [requestServer, shouldUpdateUserList]);

	const onUserRemove = (userId) => {
		requestServer('removeUser', userId);
		setShouldUpdateUserList(!shouldUpdateUserList);
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<StyledColumn className="login-column">Логин</StyledColumn>
						<StyledColumn className="registered-at-column">
							Дата регистрации
						</StyledColumn>
						<StyledColumn className="role-column">Роль</StyledColumn>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(({ id }) => ROLE.GUEST !== id)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</Content>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	font-size: 18px;
`;
