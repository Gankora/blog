import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import {
	selectModalText,
	selectModalOnConfirm,
	selectModalIsOpen,
	selectModalOnCancel,
} from '../../selectors';

import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 5;

	h3 {
		text-align: center;
	}

	.overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.6);
		width: 100%;
		height: 100%;
	}

	.box {
		position: relative;
		width: 295px;
		margin: 0 auto;
		padding: 0 20px 20px;
		background-color: #fff;
		border: 1px solid #000;
		z-index: 10;
		height: auto;
		top: 50%;
		transform: translate(0, -50%);
	}

	.buttons {
		display: flex;
		justify-content: center;
	}

	.buttons button {
		margin: 0 5px;
	}
`;
