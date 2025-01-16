import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { addCommentAsync } from '../../../../actions';
import { Comment } from './components';
import { selectUserId, selectUserRole } from '../../../../selectors';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';
import { ROLE } from '../../../../constants';
import { checkAccess } from '../../../../utils';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const roleId = useSelector(selectUserRole);

	const requestServer = useServerRequest();

	const onNewCommentAdd = (requestServer, userId, postId, content) => {
		dispatch(addCommentAsync(requestServer, userId, postId, content));
		setNewComment('');
	};

	const isNotAGuest = !checkAccess([ROLE.GUEST], roleId);

	return (
		<div className={className}>
			{isNotAGuest && (
				<div className="comment">
					<textarea
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => {
							setNewComment(target.value);
						}}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 8px"
						size="20px"
						onClick={() =>
							onNewCommentAdd(requestServer, userId, postId, newComment)
						}
					/>
				</div>
			)}

			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
						postId={postId}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 0 auto;

	.comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	.comment textarea {
		width: 544px;
		height: 120px;
		font-size: 18px;
		resize: none;
	}
`;
