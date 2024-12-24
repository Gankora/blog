import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid #000;' : null)}
	padding: 1px;

	& > div {
		display: flex;
		padding: 0 10px;
	}

	& .login-column {
		width: 172px;
	}
	& .registered-at-column {
		width: 250px;
	}
	& .role-column {
		width: auto;
	}
`;

// border: ${({ border }) => (border ? '1px solid #000;' : null)}
