import React, { FC } from 'react';
import Modal from './styled/Modal';

type StylesModal = {
    bg: string;
    color: string;
};

interface IModalProps {
    handleClose(): void;
    show: boolean;
    title: string;
    styles?: StylesModal;
}

const LayoutModal: FC<IModalProps> = (props) => {
    const { children, handleClose, show, title, styles } = props;
    return (
        <Modal show={show} onHide={handleClose} {...styles}>
            {/*<Modal.Header>*/}
            {/*    <Modal.Title as="h3">{title}</Modal.Title>*/}
            {/*</Modal.Header>*/}

            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};

export default LayoutModal;
