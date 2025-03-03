import { ACTION_TYPE } from './action-type';

export const addComment = (newComment) => ({
	type: ACTION_TYPE.ADD_COMMENT,
	payload: newComment,
});
