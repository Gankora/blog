import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { addCommentAsync } from '../../../../actions';
import { Comment } from './components';
import { selectUserRole } from '../../../../selectors';
import styled from 'styled-components';
import { PROP_TYPE, ROLE } from '../../../../constants';
import { checkAccess } from '../../../../utils';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);


	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
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
							onNewCommentAdd(postId, newComment)
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

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
