import styled from 'styled-components';
import { Icon } from '../../../../components';

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => (
	<div className={className}>
		<div className="published-at">
			<Icon id="fa-calendar-o" margin="0 10px 0 0" size="20px" onClick={() => {}} />
			{publishedAt}
		</div>
		<div className="buttons-panel">
			{editButton}
			<Icon id="fa-trash-o" margin="0 10px 0 0" size="21px" onClick={() => {}} />
		</div>
	</div>
);

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	margin: ${({ margin }) => margin};
	font-size: 18px;
	justify-content: space-between;

	.published-at {
		display: flex;
		align-items: center;
		font-size: 18px;
	}

	i {
		position: relative;
		top: -1px;
	}

	.buttons-panel {
		display: flex;
		position: relative;
		top: 1px;
	}
`;
