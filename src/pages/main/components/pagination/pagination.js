import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button onClick={() => setPage(1)} disabled={page <= 1}>
				В начало
			</Button>
			<Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 140px;
	width: 100%;
	margin: 0 0 20px 0;
	padding: 0 35px;

	button {
		margin: 0 5px;
	}

	.current-page {
		width: 100%;
		height: 32px;
		text-align: center;
		font-size: 18px;
		font-weight: 500;
		border: 1px solid #000;
		line-height: 28px;
	}
`;
