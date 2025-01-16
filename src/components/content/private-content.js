import PropTypes from 'prop-types';
import { Error } from '../error/error';
import { selectUserRole } from '../../selectors';
import { useSelector } from 'react-redux';
import { ERROR, PROP_TYPE } from '../../constants';
import { checkAccess } from '../../utils';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectUserRole);
	const accesError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;

	const error = serverError || accesError;

	return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID).isRequired,
	serverError: PROP_TYPE.ERROR,
};
