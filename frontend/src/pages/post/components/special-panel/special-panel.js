import PropTypes from 'prop-types';
import { Icon } from '../../../../components';
import { removePostAsync, closeModal, openModal } from '../../../../actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../constants';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => {
						navigate('/');
					});
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon
						inactive={true}
						id="fa-calendar-o"
						margin="0 10px 0 0"
						size="20px"
					/>
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons-panel">
					{editButton && editButton()}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							margin="0 0 0 8px"
							size="21px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

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

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.func.isRequired,
};
