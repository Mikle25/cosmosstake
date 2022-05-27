import React, { FC } from 'react';
import Modal from './styled/Modal';

type StylesModal = {
    bg: string;
    color: string;
};

interface IModalProps {
    handleClose(): void;
    show: boolean;
    styles?: StylesModal;
}

const LayoutModal: FC<IModalProps> = (props) => {
    const { children, handleClose, show, styles } = props;
    return (
        <Modal show={show} onHide={handleClose} {...styles}>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};

export default LayoutModal;
