import styled from 'styled-components';
import { Icon, Input } from '../../../../components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по заголовкам..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="18px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	width: 320px;
	height: 40px;
	margin: 40px auto 0;
	border: 1px solid #000;

	& > input {
		font-size: 18px;
		padding: 10px 32px 10px 10px;
	}

	& > div {
		position: absolute;
		margin: 4px 0px 0px 292px;
		font-size: 20px;
	}
`;
