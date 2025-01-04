import { useDispatch } from 'react-redux';
import { Icon } from '../../../../../../components';
import { removeCommentAsync, openModal, closeModal } from '../../../../../../actions';
import { useServerRequest } from '../../../../../../hooks';
import styled from 'styled-components';

const CommentContainer = ({ className, id, author, content, publishedAt, postId }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onCommentRemove = (requestServer, id, postId) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, id, postId));
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="comment-block">
				<div className="information-panel">
					<div className="author">
						<Icon
							id="fa-user-circle-o"
							margin="0 5px 0 0"
							size="18px"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							id="fa-calendar-o"
							margin="0 5px 0 15px"
							size="18px"
							onClick={() => {}}
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>

			<Icon
				id="fa-trash-o"
				margin="0 10px 0 10px"
				size="20px"
				onClick={() => onCommentRemove(requestServer, id, postId)}
			/>
		</div>
	);
};

// комментарии
export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	.comment-block {
		width: 100%;
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
