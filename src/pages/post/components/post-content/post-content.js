import { SpecialPanel } from '../special-panel/special-panel';
import { H2, Icon } from '../../../../components';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constants';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img className="post-image" src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={() => (
					<div className="iconPencil">
						<Icon
							id="fa-pencil-square-o"
							margin="0 10px 0 0"
							size="21px"
							onClick={() => {
								navigate(`/post/${id}/edit`);
							}}
						/>
					</div>
				)}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	.post-image {
		width: 300px;
		height: 250px;
		float: left;
		margin: 0 20px 20px 0;
	}

	.post-text {
		font-size: 18px;
		white-space: pre-line;
	}

	.iconPencil {
		margin-top: 1.4px;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST,
};
