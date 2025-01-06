import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils/sanitize-content';
import styled from 'styled-components';
import { savePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';

// редактор статьи
const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const requestServer = useServerRequest();

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: newImageUrl,
				title: newTitle,
				content: newContent,
			}),
		).then(() => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input ref={imageRef} defaultValue={imageUrl} placeholder="Изображение..." />
			<Input ref={titleRef} defaultValue={title} placeholder="Заголовок..." />
			<SpecialPanel
				publishedAt={publishedAt}
				margin="20px 0 20px"
				editButton={
					<div className="iconFloppy">
						<Icon
							id="fa-floppy-o"
							margin="0 10px 0 0"
							size="21px"
							onClick={onSave}
						/>
					</div>
				}
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
	}

	.iconFloppy {
		margin-right: 3px;
	}
`;
