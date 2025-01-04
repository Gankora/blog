import styled from 'styled-components';
import { H2, Icon } from '../../../../components';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	return (
		<div className={className}>
			<img className="post-image" src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<div className="special-panel">
				<div className="published-at">
					<Icon
						id="fa-calendar-o"
						margin="0 10px 0 0"
						size="20px"
						onClick={() => {}}
					/>
					{publishedAt}
				</div>
				<div className="buttons-panel">
					<Icon
						id="fa-pencil-square-o"
						margin="0 10px 0 0"
						size="21px"
						onClick={() => {}}
					/>
					<Icon
						id="fa-trash-o"
						margin="0 10px 0 0"
						size="21px"
						onClick={() => {}}
					/>
				</div>
			</div>
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

	.special-panel {
		display: flex;
		margin: -20px 0 20px;
		font-size: 18px;
		justify-content: space-between;
	}

	.published-at {
		display: flex;
		align-items: center;
		font-size: 18px;
	}

	i {
		position: relative;
		top: -1px;
	}

	.buttons-panel {
		display: flex;
		position: relative;
		top: 1px;
	}

	.post-text {
		font-size: 18px;
	}
`;
