import PropTypes from 'prop-types';

export const PROP_TYPE = {
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
	COMMENT: PropTypes.shape({
		id: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
	POST: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
};
