import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../../../components';
import { removeCommentAsync, openModal, closeModal } from '../../../../../../actions';
import { checkAccess } from '../../../../../../utils';
import { ROLE } from '../../../../../../constants';
import { selectUserRole } from '../../../../../../selectors';
import { formatShortDate } from '../../../../../main/utils';
import styled from 'styled-components';

const CommentContainer = ({ className, id, author, content, publishedAt, postId }) => {
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const onCommentRemove = (id, postId) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(id, postId));
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	const isNotAModeratorOrAdmin = !checkAccess([ROLE.GUEST, ROLE.READER], roleId);

	return (
		<div className={className}>
			<div className="comment-block">
				<div className="information-panel">
					<div className="author">
						<Icon
							inactive={true}
							id="fa-user-circle-o"
							margin="0 5px 0 0"
							size="18px"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							inactive={true}
							id="fa-calendar-o"
							margin="0 5px 0 15px"
							size="18px"
							onClick={() => {}}
						/>
						{formatShortDate(publishedAt)}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isNotAModeratorOrAdmin && (
				<>
					<Icon
						id="fa-trash-o"
						margin="0 10px 0 10px"
						size="20px"
						onClick={() => onCommentRemove(id, postId)}
					/>
				</>
			)}
		</div>
	);
};

// комментарии
export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	.comment-block {
		width: 544px;
		padding: 5px 10px;
		border: 1px solid #ddd;
		border-radius: 2px;
	}

	.information-panel {
		display: flex;
		justify-content: space-between;
	}

	.author {
		display: flex;
	}

	.published-at {
		display: flex;
	}
`;

Comment.propTypes = {
	id: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
