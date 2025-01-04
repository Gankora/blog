import { setPostData } from './set-post-data';

export const addCommentAsync = (requestServer, userId, postId, content) => (dispatch) => {
	requestServer('fetchComment', userId, postId, content).then((postData) => {
		dispatch(setPostData(postData.res));
	});
};
