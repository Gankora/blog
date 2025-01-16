import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils/sanitize-content';
import styled from 'styled-components';
import { savePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { PROP_TYPE } from '../../../../constants';

// редактор статьи
const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitlelValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitlelValue(title);
	}, [imageUrl, title]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const requestServer = useServerRequest();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitlelValue(target.value);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input
				value={titleValue}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={() => (
					<div className="iconFloppy">
						<Icon
							id="fa-floppy-o"
							size="21px"
							margin="0 11px 0 0"
							onClick={onSave}
						/>
					</div>
				)}
			/>
			<div
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
				ref={contentRef}
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	.post-text {
		font-size: 18px;
		white-space: pre-line;
		min-height: 80px;
		border: 1px solid;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST,
};
