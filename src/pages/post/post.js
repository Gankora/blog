import { useEffect, useLayoutEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { loadPostAsync, RESET_POST_DATA } from '../../actions';
import { PostContent, Comments, PostForm } from './components';
// import { initialPostState } from '../../reducers/post-reducer';
import { selectPost } from '../../selectors';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const isCreating = useMatch('/post');
	const isEditing = useMatch('/post/:id/edit');
	const requestServer = useServerRequest();
	const post = useSelector(selectPost); // вытаскиваем данные из state

	// работает, когда компонент монтируется
	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	// работает, когда компонент смонтирован
	useEffect(() => {
		// является ли страница созданием статьи
		if (isCreating) {
			return;
		}

		dispatch(loadPostAsync(requestServer, params.id));
	}, [dispatch, requestServer, params.id, isCreating]);

	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
